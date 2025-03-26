<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Menubar from "primevue/menubar";
import TieredMenu from "primevue/tieredmenu";
import Button from "primevue/button";

const menu = ref();
const router = useRouter();
const company = ref('');
const userId = ref('');
const userEmail = ref('');
const loading = ref(false);
const error = ref('');

const items = ref([
  {
    label: 'Analyse document',
    icon: 'pi pi-folder',
    link: '/analyse_document',
    children: [],
    showChildren: false,
    categories: []
  },
  {
    label: 'Autogenerate document',
    icon: 'pi pi-plus',
    link: '/autogenerate_document',
    children: [],
    showChildren: false
  }
]);

const navigateTo = (link, event) => {
  if (event.target.tagName.toLowerCase() === 'i') {
    return; // Prevent navigation if clicking the `<i>` element
  }
  router.push(link);
};

const toggleHistory = (index) => {
  items.value[index].showChildren = !items.value[index].showChildren;
};

onMounted(() => {
  loading.value = true;
  error.value = '';

  // Get company from localStorage
  company.value = localStorage.getItem('company');
  if (!company.value) {
    error.value = 'No company information found';
    router.push('/signin');
    loading.value = false;
    return;
  }
  
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    error.value = 'No access token found';
    router.push('/signin');
    loading.value = false;
    return;
  }

  // Parse the JWT token to get userId and email
  try {
    const base64Url = accessToken.split('.');
    if (base64Url.length !== 3) {
      throw new Error('Invalid token format');
    }
    const base64 = base64Url[1].replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    
    if (!payload.userId || !payload.email) {
      throw new Error('Invalid token payload');
    }
    
    userId.value = payload.userId.toString();
    userEmail.value = payload.email;

    fetch(`https://mydoxai.work.gd/api/doc/get-all/${userId.value}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    // Update the fetch response handler
    .then((data) => {
      console.log(data);
      // Create a map to store unique categories
      const categoryMap = new Map();
      
      // Process each document and organize by category
      data.forEach(doc => {
        const categoryName = doc.category || 'Uncategorized';
        if (!categoryMap.has(categoryName)) {
          categoryMap.set(categoryName, {
            name: categoryName,
            icon: 'pi pi-file',
            documents: []
          });
        }
        categoryMap.get(categoryName).documents.push(doc);
      });
      
      // Convert map to array and update categories
      items.value[0].categories = Array.from(categoryMap.values());
      items.value[0].children = data;
    })
    .catch(err => {
      error.value = 'Error fetching documents: ' + (err.message || 'Unknown error');
      if (err.response?.status === 401) {
        localStorage.removeItem('accessToken');
        router.push('/signin');
      }
    })
    .finally(() => {
      loading.value = false;
    });
  } catch (err) {
    error.value = 'Error parsing token: ' + (err.message || 'Unknown error');
    localStorage.removeItem('accessToken');
    router.push('/signin');
    loading.value = false;
  }
});
</script>

<template>
  <div class="app-container">
    <div v-if="error" class="error-banner">
      {{ error }}
    </div>
    <div v-if="loading" class="loading-banner">
      Loading...
    </div>
    <Menubar class="navbar">
      <template #start>
        <h1 class="text-white font-bold text-lg">
          <router-link to="/home">Document Management</router-link>
        </h1>
      </template>
      <template #end>
        <Button :label="userEmail" class="contact-btn" />
      </template>
    </Menubar>

    <div class="main-layout">
      <div class="left-sidebar">
        <div class="profile-section">
          <div class="avatar">{{ company.charAt(0).toUpperCase() }}</div>
          <p class="username">{{ company }}</p>
        </div>
        <ul class="menu">
          <li v-for="(item, index) in items" :key="index" class="flex flex-col menu-item">
            <div class="flex justify-between items-center cursor-pointer p-2 hover:bg-blue-700 rounded">
              <div class="flex items-center gap-2" @click="navigateTo(item.link, $event)">
                <i :class="item.icon"></i>
                <span>{{ item.label }}</span>
              </div>
              <i v-if="item.children.length || item.categories" 
                 :class="[item.showChildren ? 'pi pi-chevron-up' : 'pi pi-chevron-down']" 
                 @click.stop="toggleHistory(index)"></i>
            </div>

            <div v-if="item.showChildren" class="pl-4 mt-2">
              <div v-if="item.categories" class="categories">
                <div v-for="(category, catIndex) in item.categories" :key="catIndex" class="category mb-2">
                  <div class="flex items-center gap-2 text-sm font-semibold mb-1">
                    <i :class="category.icon"></i>
                    <span>{{ category.name }}</span>
                  </div>
                  <ul class="pl-4">
                    <li v-for="doc in category.documents" :key="doc.documentId" 
                        class="py-1 hover:bg-blue-700 rounded cursor-pointer">
                      <a @click.prevent="() => window.open(`https://mydoxai.work.gd/api/doc/view/${doc.documentId}`, '_blank')" 
                         class="flex items-center gap-2 cursor-pointer">
                          <i class="pi pi-file text-sm"></i>
                          <span class="text-sm">{{ doc.name }}</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <ul v-else class="pl-4">
                <li v-for="(child, childIndex) in item.children" :key="childIndex">
                  <router-link :to="`/analyse_document?id=${child.documentId}`">
                    {{ child.name }}
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      <!-- Main Content -->
      <div class="content-area">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-banner {
  background-color: #f8d7da;
  color: #721c24;
  padding: 0.75rem;
  text-align: center;
  width: 100%;
}

.loading-banner {
  background-color: #cce5ff;
  color: #004085;
  padding: 0.75rem;
  text-align: center;
  width: 100%;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.navbar {
  background-color: #2C5A9F;
  border-bottom: 1px solid #ddd;
  padding: 0 1rem;
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: space-between;
}

.contact-btn {
  margin-left: 10px;
  background: white;
  color: #2C5A9F;
  font-weight: bold;
  border-radius: 20px;
}

.main-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.left-sidebar {
  width: 250px;
  min-width: 250px;
  background-color: #2C5A9F;
  color: white;
  padding: 1rem;
  height: calc(100vh - 60px);
  border-right: 1px solid #ddd;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;
}

.avatar {
  background-color: white;
  color: #2C5A9F;
  font-weight: bold;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-area {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.menu-item {
  margin-bottom: 0.5rem;
}

.category {
  padding: 0.5rem;
  border-radius: 0.375rem;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
