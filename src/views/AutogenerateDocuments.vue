<script setup>
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const showDialog = ref(false);
const isLoading = ref(false);
const selectedTemplate = ref(null);
const formData = ref({
  title: '',
  address: '',
  client_name: '',
  identification: '',
  phone_number: ''
});

const templates = [
{ id: 1, name: 'Application', description: 'Basic document template for application' },
{ id: 2, name: 'Contract', description: 'Advanced document template' },
{ id: 3, name: 'Template 3', description: 'Customizable document template' }
];

const openForm = (template) => {
selectedTemplate.value = template;
showDialog.value = true;
};

const validateForm = () => {
  const requiredFields = ['address', 'client_name', 'identification', 'phone_number'];
  const missingFields = requiredFields.filter(field => !formData.value[field]);
  
  if (missingFields.length > 0) {
    toast.add({
      severity: 'error',
      summary: 'Validation Error',
      detail: `Please fill in all required fields: ${missingFields.join(', ')}`,
      life: 3000
    });
    return false;
  }
  return true;
};

const submitForm = async () => {
  if (!validateForm()) return;
  
  isLoading.value = true;
  try {


  const myHeaders = new Headers();
  myHeaders.append("docKey", "zeRPczeYJ1Y");
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "attributes": {
      "type": "credit_application"
    },
    "documentParams": {
      "templateId": "d8df1562-20ef-4745-aa51-c49aa871fbaf",
      "lang": "uz",
      "shortLinkEnabled": true,
      "model": {
        "doc_num": "21056",
        "bank_mfo": "00131",
        "address": formData.value.address,
        "client_name": formData.value.client_name,
        "credit_month": "60",
        "credit_month_word": "Oltmish",
        "privilege_month": "24",
        "percent": "14",
        "percent_word": "O'n to'rt",
        "client_tin": formData.value.identification,
        "phone_number": formData.value.phone_number,
        "client_type": "FARMER",
        "credit_supply_id": "3",
        "year": "2025-01-29 10:16:35.68",
        "director_name": "Ibragimova Zulfiya Isoq qizi",
        "bank_branch": "Agrobank ATB Zomin filiali",
        "bank_header_name": "Ibragimov Yorkin Primovich",
        "irrigation_type": "yomg‘irlatib sug‘orish",
        "crop_type": "GRAIN",
        "crop_type_name": "g‘alla",
        "area": "20",
        "pp": "120",
        "ps": "63 829 788",
        "psw": "Oltmish uch million sakkiz yuz yigirma to'qqiz ming yetti yuz sakson sakkiz",
        "fp": "50",
        "fs": "26 595 745",
        "fsw": "Yigirma olti million besh yuz to'qson besh ming yetti yuz qirq besh",
        "cp": "0",
        "cs": "0",
        "csw": "nol",
        "ip": "120",
        "ins": "67 021 277",
        "insw": "Oltmish yetti million yigirma bir ming ikki yuz yetmish yetti",
        "total_land_area": "20.00",
        "total_area": "23.89",
        "cadaster_info": [
          {
            "cad_number": "13:08:000124797",
            "contour_number": "60",
            "area": "23.89",
            "land_area": "20.00",
            "file_id": "ff808181caf14ae77d710e0c"
          }
        ],
        "technical_sum": "50 000 000",
        "technical_sum_word": "Ellik million",
        "insurance_premium": "3 191 490",
        "insurance_premium_word": "Uch million bir yuz to'qson bir ming to'rt yuz to'qson",
        "credit_sum": "53 191 490",
        "credit_sum_word": "Ellik uch million bir yuz to'qson bir ming to'rt yuz to'qson",
        "tech_ins_sum": "37 234 043",
        "tech_ins_sum_word": "O`ttiz yetti million ikki yuz o`ttiz to'rt ming qirq uch",
        "pre_insurance_sum": "26 595 745",
        "pre_insurance_sum_word": "Yigirma olti million besh yuz to'qson besh ming yetti yuz qirq besh",
        "credit_type_id": 1
      },
      "signTemplateUrls": {}
    },
    "signType": "EIMZO",
    "signParams": {
      "allowLevel": "ALL",
      "disableWhenAllDone": true,
      "canCancel": true,
      "canReject": false,
      "allows": [

      ]
    },
    "documentType": "FTL_JSON"
  });


  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  const response = await fetch("https://business.hujjat.uz/api/document/create", requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    
    if (result.id && result.pin) {
      window.open(`https://hujjat.uz/api/v3/documents/${result.id}/download?pin=${result.pin}`, '_blank');
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Document generated successfully!',
        life: 3000
      });
      showDialog.value = false;
      formData.value = {
        title: '',
        address: '',
        client_name: '',
        identification: '',
        phone_number: ''
      };
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    console.error('Error generating document:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to generate document. Please try again.',
      life: 3000
    });
  } finally {
    isLoading.value = false;
  }




};
</script>

<template>
  <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
    <Card v-for="template in templates" :key="template.id" class="shadow-lg rounded-xl">
      <template #title>{{ template.name }}</template>
      <template #content>
        <p>{{ template.description }}</p>
        <Button label="Select" class="mt-4" @click="openForm(template)" />
      </template>
    </Card>
  </div>

  <Dialog v-model:visible="showDialog" header="Fill Document Details" modal :closable="false">
    <div class="p-4">
      <label class="block mb-2">Title</label>
      <InputText v-model="formData.title" class="w-full mb-4" placeholder="Enter title" />


      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block mb-2">Address</label>
          <InputText v-model="formData.address" class="w-full mb-4" placeholder="Enter address" />
        </div>
        <div>
          <label class="block mb-2">Client Name</label>
          <InputText v-model="formData.client_name" class="w-full mb-4" placeholder="Enter client name" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block mb-2">Identification (TIN)</label>
          <InputText v-model="formData.identification" class="w-full mb-4" placeholder="Enter identification number" />
        </div>
        <div>
          <label class="block mb-2">Phone Number</label>
          <InputText v-model="formData.phone_number" class="w-full mb-4" placeholder="Enter phone number" />
        </div>
      </div>

      <div class="flex justify-end gap-2">
        <Button label="Cancel" class="p-button-secondary" @click="showDialog = false" />
        <Button label="Generate" class="p-button-primary" @click="submitForm" :loading="isLoading" :disabled="isLoading" />
      </div>
    </div>
  </Dialog>

</template>

<Toast />

<style >

.p-card-body{
  background: #2C5A9F !important;
}
</style>
