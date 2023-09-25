<script setup>
import { ref, onBeforeMount, computed, onMounted, onBeforeUnmount } from "vue";

const quizQuestions = ref([]);

const selectedOption = ref(null);

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

const minutes = ref(1);
const seconds = ref(0);
let timer = ref(null);

const startTimer = () => {
  timer = setInterval(() => {
    if (minutes.value === 0 && seconds.value === 0) {
      clearInterval(timer);
    } else if (seconds.value === 0) {
      minutes.value--;
      seconds.value = 59;
    } else {
      seconds.value--;
    }
  }, 1000);
};

onMounted(() => {
  startTimer();
});

onBeforeUnmount(() => {
  clearInterval(timer);
});

const isTimerExpired = computed(() => minutes.value === 0 && seconds.value === 0);
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
    <!-- Add sticky display this div on the top  -->
    <div
      class="flex justify-between items-center mt-10 text-2xl font-medium sticky top-0 bg-white p-5"
    >
      <p>Total Questions: {{ quizQuestions.length }}</p>
      <p>Total Marks: {{ quizQuestions.length }}</p>
      <p>Remaining Time: {{ minutes }}:{{ seconds }} Minutes</p>
    </div>

    <div class="grid grid-cols-1 gap-10 mt-16" v-if="minutes > 0 || seconds > 0">
      <div
        v-for="(question, index) in quizQuestions"
        :key="index"
        class="border p-5 border-dashed rounded-lg flex flex-col space-y-5"
      >
        <h2 class="text-2xl">
          {{ index + 1 }}. <span v-html="question.question"></span>
        </h2>
        <div
          class="flex items-center"
          v-for="(option, index) in question.incorrect_answers.concat(
            question.correct_answer
          )"
          :key="option"
        >
          <input
            class="w-5 h-5 mr-3"
            type="radio"
            :value="option"
            v-model="question.answer"
            :disabled="isTimerExpired"
          />
          <label v-html="option"></label>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-center my-10 text-3xl font-semibold text-red-500">
        Quiz Time Expired!
      </p>
      <p class="text-center font-semibold text-red-500" v-if="isTimerExpired">
        (Please Submit Your Quiz)
      </p>
    </div>
    <router-link
      :to="{
        name: 'QuizResult',
        query: { quizQuestions: JSON.stringify(quizQuestions) },
      }"
    >
      <button type="button" class="bg-blue-500 text-white px-10 py-4 mt-10 w-full">
        Submit Quiz
      </button></router-link
    >
  </section>
</template>

<style scoped></style>
