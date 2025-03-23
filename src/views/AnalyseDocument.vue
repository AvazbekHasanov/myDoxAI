<template>
  <div class="flex flex-col items-center justify-center h-full bg-gray-100 p-6">
    <div v-if="!analysisResult" class="p-8 shadow-lg bg-white rounded-2xl w-full max-w-lg text-center">
      <h1 class="text-3xl font-bold text-gray-900">Analyze <span class="text-blue-600">Documents</span></h1>
      <p class="text-gray-600 mt-2">Upload DOC or DOCX files for in-depth content analysis.</p>

      <div class="mt-6">
        <label class="relative cursor-pointer w-full">
          <input type="file" class="hidden" @change="handleFileUpload" />
          <div class="bg-blue-600 text-white py-3 px-6 rounded-lg w-full text-lg font-semibold text-center">
            Select Documents
          </div>
        </label>
        <p class="text-gray-500 mt-2">or drop your documents here</p>
      </div>

      <div v-if="loading" class="mt-4 text-blue-600">Uploading...</div>

      <div v-if="fileUploaded" class="mt-6">
        <button @click="getFileDetails" class="bg-green-600 text-white py-3 px-6 rounded-lg w-full text-lg font-semibold hover:bg-green-700">
          Analyze Document
        </button>
      </div>
    </div>

    <div v-if="loadingAnalysis" class="mt-6 text-blue-600">Analyzing document...</div>

    <div v-if="analysisResult">
      <div class="mt-6 p-4 bg-gray-50 border rounded-lg text-left">
        <div class="flex justify-between items-start">
          <div>
            <h2 class="text-xl font-semibold text-gray-800">Analysis Result</h2>
            <p class="text-gray-700 mt-2"><strong>Document Name:</strong> {{ analysisResult.name }}</p>
            <p class="text-gray-700"><strong>Document ID:</strong> {{ analysisResult.documentId }}</p>
          </div>
          <button @click="viewDocument" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
            <i class="pi pi-eye mr-2"></i>View Document
          </button>
        </div>
        <p class="text-gray-700 mt-4"><strong>Document main information:</strong></p>
        <p class="text-gray-600 whitespace-pre-line">{{ analysisResult.response }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, ref, watch} from 'vue';
import {useRouter, useRoute} from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    const analysisResult = ref(null);
    const loading = ref(false);
    const loadingAnalysis = ref(false);
    const fileUploaded = ref(false);
    const fileData = ref({});
    const error = ref('');

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (!file) return;

      loading.value = true;
      fileUploaded.value = false;

      const formData = new FormData();
      formData.append("file", file);

      // Get the JWT token from localStorage
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('No token found');
        loading.value = false;
        alert('Please sign in to upload files');
        router.push('/signin');
        return;
      }

      // Parse the JWT token to get userId
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
      const { userId } = JSON.parse(jsonPayload);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", `http://51.20.142.143:8000/api/doc/upload/${userId}`, true);
      // xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      

      xhr.onload = () => {
        loading.value = false;
        if (xhr.status === 200) {
          try {
            fileData.value = JSON.parse(xhr.responseText);
            console.log("Upload successful:", fileData.value);
            fileUploaded.value = true;
          } catch (error) {
            console.error("Error parsing response:", error);
          }
        } else {
          console.error("Upload failed:", xhr.statusText);
        }
      };

      xhr.onerror = () => {
        loading.value = false;
        console.error("Request failed");
      };

      xhr.send(formData);
    };

    const getFileDetails = () => {
      if (!fileData.value.id) {
        console.error('No document ID provided');
        return;
      }

      console.log(`Attempting to analyze document with ID: ${fileData.value.id}`);
      loadingAnalysis.value = true;
      analysisResult.value = null;
      error.value = '';

      fetch(`http://51.20.142.143:8000/api/doc/analyse/${fileData.value.id}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        },
      })
        .then(res => {
          if (!res.ok) {
            if (res.status === 500) {
              throw new Error(`Server error while analyzing document ${fileData.value.id}. The document might be invalid or corrupted.`);
            }
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
          .then(data => {
            console.log("File Details:", data);
            analysisResult.value = data;
            
            // After successful analysis, classify the document
            return fetch(`http://51.20.142.143:8000/api/doc/classify/${fileData.value.id}`, {
              method: "POST",
              headers: {
                "Accept": "application/json",
                "ngrok-skip-browser-warning": "true",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
              },
            });
          })
          .then(res => {
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.text();
          })
          .then(category => {
            console.log("Document classified as:", category);
            // You can add additional logic here to handle the category
          })
          .catch(error => {
            console.error("Error during analysis or classification:", error);
          })
          .finally(() => {
            loadingAnalysis.value = false;
          });
    };

    onMounted(() => {
      if (route.query.id) {
        console.log("router.query.id", route.query.id);
        fileData.value.id = route.query.id;
        getFileDetails();
      }else {
        analysisResult.value = null;
      }
    });

    watch(() => route.query.id, (newId, oldId) => {
      if (newId !== oldId && fileData.value.id) {
        console.log("Query ID changed:", newId);
        fileData.value.id = newId;
        getFileDetails();
      }
      if(!newId) {
        fileData.value.id = null
        analysisResult.value = null;
      }
    });

    const viewDocument = () => {
      if (!analysisResult.value || !analysisResult.value.documentId) {
        error.value = 'No document ID available for viewing';
        return;
      }

      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        error.value = 'No access token found';
        return;
      }

      const url = `http://51.20.142.143:8000/api/doc/view/${analysisResult.value.documentId}`;
      const newTab = window.open('', '_blank');
      
      fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) throw new Error('Failed to load document');
        return response.blob();
      })
      .then(blob => {
        const objectUrl = URL.createObjectURL(blob);
        newTab.location.href = objectUrl;
      })
      .catch(err => {
        error.value = 'Error loading document: ' + err.message;
        newTab.close();
      });
    };

    return {loading, fileUploaded, handleFileUpload, getFileDetails, analysisResult, loadingAnalysis, viewDocument};
  },
};
</script>
