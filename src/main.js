import './assets/main.css'
import 'primeicons/primeicons.css';

import { createApp } from 'vue'

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

import Aura from '@primeuix/themes/aura';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.use(ToastService);
app.component('Toast', Toast);

app.mount('#app')
