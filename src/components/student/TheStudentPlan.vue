<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import StudentTable from '@/components/student/StudentTable.vue'

const router = useRouter()

const routePath = computed(() => router.currentRoute.value.path.split('-')[1])
</script>

<template>
  <StudentTable :route-path="routePath" />
</template>
