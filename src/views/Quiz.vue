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
    <h1 class="text-5xl text-center mt-10 font-bold">Quiz</h1>
    <div class="grid grid-cols-1 gap-10 mt-16">
      <div
        v-for="(question, index) in quizQuestions"
        :key="index"
        class="border p-5 border-dashed rounded-lg"
      >
        <h2>{{ index + 1 }}. <span v-html="question.question"></span></h2>
        <ul>
          <label class="flex space-x-4">
            <li
              v-for="(option, index) in shuffleOptions(
                question.incorrect_answers.concat(question.correct_answer)
              )"
              :key="option"
            >
              <input type="radio" />
              <span v-html="option"></span>
            </li>
          </label>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
