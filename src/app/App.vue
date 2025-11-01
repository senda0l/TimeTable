<script setup>
import SideBar from "@/widgets/sidebar/ui/index.vue";
import "@/shared/styles/main.css";
</script>

<template>
  <body>
    <div id="app" class="container min-h-screen">
      <SideBar />
      <main class="flex-1 p-4">
        <router-view />
      </main>
    </div>
  </body>
</template>

<style>
#app {
  display: flex;
  height: 100vh;
}

main {
  flex: 1;
  background-color: var(--primary); 
}
</style>
