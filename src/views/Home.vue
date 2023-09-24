<script setup>
// https://opentdb.com/api_category.php // trivia_categories

import { ref, reactive, onBeforeMount } from "vue";
import axios from "axios";

const categories = ref([]);

onBeforeMount(async () => {
  const res = await axios.get("https://opentdb.com/api_category.php");
  const data = await res.data.trivia_categories;
  categories.value = data;
});
</script>

<template>
  <h1 class="text-4xl text-center font-bold">Browse Quiz Categories</h1>
  <section class="grid grid-cols-3 gap-10 mt-16">
    <div
      id="quiz-categories"
      v-for="category in categories"
      :key="category.id"
      class="border py-10 px-5 flex flex-col justify-center items-center shadow-md rounded-lg"
    >
      <router-link :to="`/${category.id}/start-quiz`"
        ><img class="w-24" src="../assets/quiz.png" alt="" />
        <h2 class="text-2xl font-bold">
          {{ category.name.replace(/^(Entertainment: |Science:)\s*/, "") }}
        </h2></router-link
      >
    </div>
  </section>
</template>

<style scoped>
#quiz-categories {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
#quiz-categories:hover {
  transform: scale(1.1) translateY(-5px);
}
</style>
