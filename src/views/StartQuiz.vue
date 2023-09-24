<script setup>
import { useRoute } from "vue-router";

import { ref } from "vue";

const route = useRoute();
const categoryId = route.params.categoryId;

const quizTypes = ref([
  {
    id: 1,
    name: "Quiz 01",
    totalQuestions: 20,
    time: 20,
    totalMarks: 20,
  },
  {
    id: 2,
    name: "Quiz 02",
    totalQuestions: 30,
    time: 30,
    totalMarks: 30,
  },
  {
    id: 3,
    name: "Quiz 03",
    totalQuestions: 40,
    time: 40,
    totalMarks: 40,
  },
  {
    id: 4,
    name: "Quiz 04",
    totalQuestions: 50,
    time: 50,
    totalMarks: 50,
  },
]);

const selectedOption = ref(null);

import { useRouter } from "vue-router";

const router = useRouter();

const startQuiz = () => {
  if (selectedOption.value !== null) {
    router.push({
      name: "quiz",
      params: {
        categoryId: categoryId,
        questionsLimit: quizTypes.value[selectedOption.value - 1].totalQuestions,
      },
    });
  } else {
    alert("Please select a quiz option before starting the quiz.");
  }
};
</script>

<template>
  <section>
    <h1 class="text-4xl text-center mt-10 font-bold">Select Your Quiz Option</h1>

    <div class="grid grid-cols-2 gap-10 mt-16">
      <div
        v-for="quizType of quizTypes"
        :key="quizType.id"
        class="border border-dashed p-4 rounded-lg"
      >
        <label class="flex space-x-4">
          <input
            class="w-5"
            type="radio"
            name="quizType"
            :value="quizType.id"
            v-model="selectedOption"
          />
          <div>
            <h4>{{ quizType.name }}</h4>
            <p>Total Questions: {{ quizType.totalQuestions }}</p>
            <p>Total Time: {{ quizType.time }} Minutes</p>
            <p>Total Marks: {{ quizType.totalMarks }}</p>
          </div>
        </label>
      </div>
    </div>
    <button
      type="button"
      @click="startQuiz"
      class="bg-blue-500 text-white px-10 py-4 mt-10 w-full"
    >
      Start Quiz
    </button>
  </section>
</template>

<style scoped></style>
