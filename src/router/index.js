import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AnalyseDocument from "@/views/AnalyseDocument.vue";
import AutogenerateDocuments from "@/views/AutogenerateDocuments.vue";
import LandingPage from "@/views/LandingPage.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage,
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/',
      component: DashboardLayout,
      children: [
        {
          path: 'home',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'analyse_document',
          name: 'analyse_document',
          component: AnalyseDocument,
        },
        {
          path: 'autogenerate_document',
          name: 'autogenerate_document',
          component: AutogenerateDocuments,
        },
      ],
    },
  ],
})

export default router
