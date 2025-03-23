<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style scoped>
/* ✅ App Container */
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Full height of the screen */
  overflow: hidden; /* Prevent scrolling on the entire app */
}

/* ✅ Navbar */
.navbar {
  background-color: #2C5A9F; /* Blue Theme */
  border-bottom: 1px solid #ddd;
  padding: 0 1rem;
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: space-between;
}

.search-input {
  padding: 6px 10px;
  border: none;
  border-radius: 5px;
  outline: none;
  width: 250px;
}

.search-btn {
  margin-left: 5px;
  background: #1F4C86;
  color: white;
  border-radius: 5px;
}

.contact-btn {
  margin-left: 10px;
  background: white;
  color: #2C5A9F;
  font-weight: bold;
  border-radius: 20px;
}

/* ✅ Layout */
.main-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* ✅ Sidebar */
.left-sidebar {
  width: 250px;
  min-width: 250px;
  background-color: #2C5A9F; /* Sidebar Blue */
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
  font-size: 1.2rem;
}

.username {
  font-weight: bold;
}

/* ✅ Custom Menu */
.custom-menu {
  background: transparent;
  border: none;
}



/* ✅ Main Content */
.content-area {
  flex-grow: 1;
  background-color: #ffffff;
  overflow: auto;
  padding: 1rem;
  height: calc(100vh - 60px); /* Full height minus navbar */
}
.menu{
  display: flex;
  flex-direction: column;
  cursor: pointer;
  gap: 1rem;
}
.menu-item{
  border: 1px solid white;
  border-radius: 5px;
  padding: 0.5rem;
  user-select: none;
}
.menu-item:hover {
  scale: 1.01;
}
.p-menubar{
  border-radius: 0 !important;
}

</style>
