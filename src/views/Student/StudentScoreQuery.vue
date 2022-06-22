<script setup lang="ts">
interface Score {
  courseName: string
  credit: number
  term: number
  score: number
}

const scoreData: Score[] = [
  {
    courseName: 'xxx',
    credit: 10,
    term: 1,
    score: 100
  }
]
</script>

<template>
  <el-row>
    <el-col :span="24">
      <el-space :size="50" align="start">
        <div>
          <el-table :data="scoreData">
            <el-table-column property="courseId" label="课程" />
            <el-table-column property="credit" label="学分" align="center" />
            <el-table-column property="term" label="学期" align="center" />
            <el-table-column property="score" label="成绩" align="center" />
          </el-table>
        </div>
        <div>
          <el-descriptions :column="3" border>
            <el-descriptions-item label="必修学分">kooriookami</el-descriptions-item>
            <el-descriptions-item label="应修必修学分">1</el-descriptions-item>
            <el-descriptions-item label="要求最低必修学分">1</el-descriptions-item>
            <el-descriptions-item label="选修学分">0</el-descriptions-item>
            <el-descriptions-item label="应修选修学分" :span="2">
              2
            </el-descriptions-item>
            <el-descriptions-item label="总学分">kooriookami</el-descriptions-item>
            <el-descriptions-item label="应修总学分">1</el-descriptions-item>
            <el-descriptions-item label="要求最低总学分">Suzhou</el-descriptions-item>
          </el-descriptions>
        </div>
      </el-space>
    </el-col>
  </el-row>
</template>

<style scoped lang="less">
.student-core {
  &-container {
    height: 100%;
    width: 100%;
    background-color: red;
  }
}
</style>
