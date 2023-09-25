<script setup>
import { useRoute } from "vue-router";

import { ref, onBeforeMount } from "vue";

const route = useRoute();
const quizQuestions = JSON.parse(route.query.quizQuestions);

const questions = ref(quizQuestions);

const submittedAnswers = ref([]);

const correctAnswers = ref([]);

onBeforeMount(() => {
  questions.value.forEach((question) => {
    const userAnswer = question.answer;
    const correctAnswer = question.correct_answer;

    if (userAnswer != undefined) {
      submittedAnswers.value.push(userAnswer);

      if (userAnswer === correctAnswer) {
        correctAnswers.value.push(userAnswer);
      }
    }
  });
});
</script>

<template>
  <h1 class="text-5xl text-center mt-10 font-bold">Quiz Result</h1>
  <div
    class="flex flex-col items-center mt-16 space-y-8 text-2xl border py-5 font-medium rounded border-dashed"
  >
    <p>Total Questions: {{ questions.length }}</p>
    <p>Submitted answers: {{ submittedAnswers.length }}</p>
    <p>Correct answers: {{ correctAnswers.length }}</p>
    <p>Your Marks: {{ correctAnswers.length }}</p>
  </div>
</template>

<style scoped></style>
