<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import myDoxLogo from '@/assets/image.png'; 

const router = useRouter();
const isMenuOpen = ref(false);

const navigateToSignup = () => {
  router.push('/signup');
};

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
  isMenuOpen.value = false;
};

const features = [
  "AI-powered document processing",
  "Real-time data extraction",
  "Automated report generation",
  "Secure cloud storage",
  "Seamless integrations",
  "Enterprise-level solutions",
];

const plans = [
  { name: "Starter", price: "$10/month" },
  { name: "Pro", price: "$19.99/month" },
  { name: "Enterprise", price: "Custom Pricing" }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Operations Manager",
    company: "Tech Solutions Inc.",
    comment: "DocAI has transformed our document processing workflow. We've reduced processing time by 75% and virtually eliminated errors."
  },
  {
    name: "Michael Chen",
    role: "CTO",
    company: "Innovation Labs",
    comment: "The AI-powered features are impressive. It's like having a dedicated team working 24/7 on document processing."
  },
  {
    name: "Emma Davis",
    role: "HR Director",
    company: "Global Enterprises",
    comment: "Implementation was smooth and the support team is exceptional. DocAI has streamlined our entire HR documentation process."
  }
];
</script>

<template>
  <div class="bg-gray-50 min-h-screen text-gray-900">
    <!-- Background Animations -->
    <div class="bg-animation">
      <div class="gradient-wave"></div>
      <svg class="floating-shape shape-1" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="currentColor" class="text-blue-600"/>
      </svg>
      <svg class="floating-shape shape-2" viewBox="0 0 100 100">
        <rect width="100" height="100" fill="currentColor" class="text-blue-600"/>
      </svg>
      <svg class="floating-shape shape-3" viewBox="0 0 100 100">
        <polygon points="50,0 100,87 0,87" fill="currentColor" class="text-blue-600"/>
      </svg>
    </div>
    <!-- Navigation Header -->
    <header class="fixed w-full bg-white shadow-md z-50">
      <nav class="container mx-auto px-6 py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <img :src="myDoxLogo" alt="myDoxAI" class="w-12 h-12">
            <div class="text-xl font-bold text-blue-600 ml-4">myDoxAI</div>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button @click="isMenuOpen = !isMenuOpen" class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600">
              <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path v-if="!isMenuOpen" fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
                <path v-if="isMenuOpen" fill-rule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
              </svg>
            </button>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            <a @click="scrollToSection('home')" class="text-gray-700 hover:text-blue-600 cursor-pointer">Home</a>
            <a @click="scrollToSection('features')" class="text-gray-700 hover:text-blue-600 cursor-pointer">Why Choose Us</a>
            <a @click="scrollToSection('pricing')" class="text-gray-700 hover:text-blue-600 cursor-pointer">Pricing</a>
            <a @click="scrollToSection('contact')" class="text-gray-700 hover:text-blue-600 cursor-pointer">Contact</a>
            <button @click="navigateToSignup" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Sign Up</button>
          </div>
        </div>
      </nav>
    </header>

    <div class="pt-16">
      <!-- Hero Section -->
      <section class="text-center py-20 px-5">
        <h1 class="text-5xl font-bold">Automate Your Document Processing with AI</h1>
        <p class="mt-4 text-lg text-gray-600">Save time, reduce errors, and streamline workflow with DocAI.</p>
        <button @click="navigateToSignup" class="mt-6 px-6 py-3 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Get Started for Free
        </button>
      </section>
    </div>

    <!-- Features Section -->
    <section class="py-16 px-5 bg-white">
      <h2 class="text-4xl font-semibold text-center">Why Choose DocAI?</h2>
      <div class="grid md:grid-cols-3 gap-6 mt-10">
        <div v-for="(feature, index) in features" :key="index" class="transform hover:scale-105 transition-transform duration-200">
          <div class="p-6 text-center bg-white rounded-lg shadow-md">
            <i class="pi pi-check-circle text-blue-500 text-4xl mb-3"></i>
            <div class="text-lg">{{ feature }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 text-center bg-blue-600 text-white">
      <h2 class="text-4xl font-bold">Start Automating Today</h2>
      <p class="mt-4 text-lg">Join thousands of businesses optimizing their document workflow with DocAI.</p>
      <button @click="navigateToSignup" class="mt-6 bg-white text-blue-600 px-6 py-3 text-lg rounded-lg hover:bg-gray-100 transition-colors">
        Get Started
      </button>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-16 px-5 bg-gray-50">
      <h2 class="text-4xl font-semibold text-center mb-12">Choose Your Plan</h2>
      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div v-for="plan in plans" :key="plan.name" class="bg-white rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform duration-200">
          <h3 class="text-2xl font-bold text-center">{{ plan.name }}</h3>
          <div class="text-center mt-4 text-blue-600 text-2xl font-bold">{{ plan.price }}</div>
          <button @click="navigateToSignup" class="w-full mt-8 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-16 px-5 bg-white">
      <h2 class="text-4xl font-semibold text-center mb-12">What Our Customers Say</h2>
      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div v-for="testimonial in testimonials" :key="testimonial.name" class="bg-gray-50 rounded-lg p-6">
          <p class="text-gray-600 italic">"{{ testimonial.comment }}"</p>
          <div class="mt-4">
            <p class="font-semibold">{{ testimonial.name }}</p>
            <p class="text-sm text-gray-500">{{ testimonial.role }} at {{ testimonial.company }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-16 px-5 bg-gray-50">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-4xl font-semibold text-center mb-12">Get in Touch</h2>
        <form class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Message</label>
            <textarea rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
          </div>
          <div class="text-center">
            <button type="submit" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
.bg-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.floating-shape {
  position: absolute;
  opacity: 0.08;
  filter: blur(2px);
  animation: float 25s infinite ease-in-out;
  will-change: transform;
}

.shape-1 {
  top: 15%;
  left: 10%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
}

.shape-2 {
  top: 45%;
  right: 15%;
  width: 100px;
  height: 100px;
  animation-delay: -5s;
}

.shape-3 {
  bottom: 20%;
  left: 20%;
  width: 120px;
  height: 120px;
  animation-delay: -10s;
}

@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  25% {
    transform: translate(60px, 40px) rotate(90deg) scale(1.1);
  }
  50% {
    transform: translate(0, 80px) rotate(180deg) scale(1);
  }
  75% {
    transform: translate(-60px, 40px) rotate(270deg) scale(0.9);
  }
  100% {
    transform: translate(0, 0) rotate(360deg) scale(1);
  }
}

.gradient-wave {
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  background: radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, rgba(96, 165, 250, 0.1) 25%, rgba(147, 197, 253, 0.05) 50%, transparent 75%);
  animation: rotate 40s infinite linear;
  will-change: transform;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
