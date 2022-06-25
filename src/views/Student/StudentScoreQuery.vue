<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCourseScoreList } from '@/api/student'

interface Score {
  courseName: string
  courseResult: number
  courseTerm: number
  score: number
}

const scoreData = ref<Score[]>([])

const requestScoreData = async () => {
  const { id } = JSON.parse(localStorage.getItem('auth') || '{}')
  try {
    const { data: res } = await getCourseScoreList(id)
    const { code, data } = res
    if (code === 200) {
      scoreData.value = data
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => requestScoreData())
</script>

<template>
  <div>
    <div class="student-score-table">
      <el-table :data="scoreData">
        <el-table-column property="courseName" label="课程" />
        <el-table-column property="courseResult" label="学分" align="center" />
        <el-table-column property="courseTerm" label="学期" align="center" />
        <el-table-column property="score" label="成绩" align="center" />
      </el-table>
    </div>
    <div>
      <el-descriptions :column="3" border>
        <el-descriptions-item label="必修学分">kooriookami</el-descriptions-item>
        <el-descriptions-item label="应修必修学分">18</el-descriptions-item>
        <el-descriptions-item label="要求最低必修学分">0</el-descriptions-item>
        <el-descriptions-item label="选修学分">0</el-descriptions-item>
        <el-descriptions-item label="应修选修学分" :span="2">
          16
        </el-descriptions-item>
        <el-descriptions-item label="总学分">kooriookami</el-descriptions-item>
        <el-descriptions-item label="应修总学分">34</el-descriptions-item>
        <el-descriptions-item label="要求最低总学分">0</el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<style scoped lang="less">
.student-score {
  &-table {
    margin: 20px 0 80px 0;
  }
}
</style>
