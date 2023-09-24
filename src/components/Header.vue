<script setup></script>

<template>
  <nav class="flex justify-between items-center">
    <router-link to="/"
      ><div class="flex items-center space-x-2">
        <img class="w-14" src="../assets/icon.png" alt="" />
        <h1 class="font-bold text-3xl">IQ Insight</h1>
      </div></router-link
    >
    <ul class="flex space-x-10 text-2xl font-semibold">
      <router-link to="/"><li>Home</li></router-link>
      <router-link to="/about"><li>About</li></router-link>
      <router-link to="/contact"><li>Contact</li></router-link>
    </ul>
  </nav>
</template>

<style scoped></style>
