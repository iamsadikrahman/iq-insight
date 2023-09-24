<script setup>
import { ref, onBeforeMount } from "vue";

const quizQuestions = ref([]);

import { useRoute } from "vue-router";
const route = useRoute();
const categoryId = route.params.categoryId;
const questionsLimit = route.params.questionsLimit;

onBeforeMount(async () => {
  const res = await fetch(
    `https://opentdb.com/api.php?amount=${questionsLimit}&category=${categoryId}&type=multiple`
  );
  const data = await res.json();
  quizQuestions.value = data.results;
});

const shuffleOptions = (options) => {
  // create a copy of the options array
  const shuffledOptions = [...options];

  // Shuffle the copy using the Fisher-Yates algorithm
  for (let i = shuffledOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
  }
  return shuffledOptions;
};
</script>

<template>
  <section>
    <h1 class="text-5xl text-center mt-10 font-bold">
      {{
        quizQuestions.length > 0 && quizQuestions[0].category
          ? quizQuestions[0].category.replace(/^(Entertainment: |Science:)\s*/, "") +
            " Quiz"
          : "Quiz"
      }}
    </h1>
    <!-- I want to sticky display this div on the top  -->
    <div
      class="flex justify-between items-center mt-10 text-2xl font-medium sticky top-0 bg-white p-5"
    >
      <p>Total Questions: {{ quizQuestions.length }}</p>
      <p>Total Marks: {{ quizQuestions.length }}</p>
      <p>Total Time: {{ quizQuestions.length }} Minutes</p>
    </div>

    <div class="grid grid-cols-1 gap-10 mt-16">
      <div
        v-for="(question, index) in quizQuestions"
        :key="index"
        class="border p-5 border-dashed rounded-lg flex flex-col space-y-5"
      >
        <h2 class="text-2xl">
          {{ index + 1 }}. <span v-html="question.question"></span>
        </h2>
        <ul class="">
          <li
            class=""
            v-for="(option, index) in shuffleOptions(
              question.incorrect_answers.concat(question.correct_answer)
            )"
            :key="option"
          >
            <label class="flex items-center">
              <input class="w-5 h-5 mr-2" type="radio" name="option" />
              <span class="text-2xl" v-html="option"></span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
