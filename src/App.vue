<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import TheLayout from '@/components/layout/TheLayout.vue'

const store = useAuthStore()
const isAuth = ref(localStorage.getItem('id'))
</script>

<template>
  <TheLayout v-if="isAuth">
    <RouterView />
  </TheLayout>
  <RouterView v-else />
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
}
</style>
