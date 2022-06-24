<script setup lang="ts">
import { ref } from 'vue'

interface TableItem {
  studentName: string
  studentId: string
  department: string
  professionName: string
  score: number | null
}

const tableData = ref<TableItem[]>([
  {
    studentName: 'xsxs',
    studentId: '1231',
    department: '123123',
    professionName: 'xxx',
    score: null
  },
  {
    studentName: 'xsxs',
    studentId: '1222',
    department: '123123',
    professionName: 'xxx',
    score: 99
  }
])

const submitScores = () => {
  console.log(
    tableData.value.map(({ studentId, score }) => ({
      studentId,
      score: Number(score) || null
    }))
  )
  console.log(tableData.value.some(({ score }) => score === null))
}
</script>

<template>
  <div class="course-manage-container">
    <el-button class="course-manage-btn" type="primary" @click="submitScores">
      提交
    </el-button>
    <el-table class="course-manage-table" ref="tableRef" :data="tableData">
      <el-table-column property="studentName" label="姓名" align="center" />
      <el-table-column property="studentId" label="学号" />
      <el-table-column property="department" label="院系" align="center" />
      <el-table-column property="professionName" label="专业" align="center" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-input
            v-model="scope.row.score"
            type="number"
            placeholder="请输入成绩"
            :min="0"
            :max="100"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="course-manage-page"
      background
      layout="prev, pager, next"
      :total="50"
    />
  </div>
</template>

<style scoped lang="less">
.course-manage {
  &-container {
    text-align: right;
  }
  &-btn {
    margin-top: 20px;
  }
  &-table {
    margin: 40px 0 40px 0;
  }
  &-page {
    float: right;
  }
}
</style>
