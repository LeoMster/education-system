<script setup lang="ts">
import { computed } from 'vue'

interface Course {
  courseId: string
  courseName: string
  courseType: string
  credit: number
  creditHours: number
  term: number
  teacher: string
}

const props = defineProps<{
  routePath: string
}>()

const courseData: Course[] = [
  {
    courseId: '1',
    courseName: 'xxx',
    courseType: '选修',
    credit: 10,
    creditHours: 20,
    term: 1,
    teacher: 'hyn'
  }
]

const isSearch = computed(() => props.routePath === 'search')

const selectionTable = () => null
</script>

<template>
  <div class="student-plan-container">
    <div class="student-plan-btns" v-show="!isSearch">
      <el-button type="primary">保存</el-button>
      <el-button type="primary">提交</el-button>
      <el-button type="primary">重置</el-button>
    </div>
    <el-table
      class="student-plan-table"
      :class="{ 'student-plan-table-top': isSearch }"
      ref="multipleTableRef"
      :data="courseData"
      @selection-change="selectionTable"
    >
      <el-table-column type="selection" v-if="!isSearch" />
      <el-table-column property="courseId" label="课程编号" align="center" />
      <el-table-column property="courseName" label="课程名称" />
      <el-table-column property="courseType" label="课程类别" align="center" />
      <el-table-column property="credit" label="学分" align="center" />
      <el-table-column property="creditHours" label="学时" align="center" />
      <el-table-column property="term" label="学期" align="center" />
      <el-table-column property="teacher" label="任课教师" align="center" />
    </el-table>
    <el-pagination
      class="student-plan-page"
      background
      layout="prev, pager, next"
      :total="50"
    />
  </div>
</template>

<style scoped lang="less">
.student-plan {
  &-container {
    text-align: right;
  }
  &-page {
    float: right;
  }
  &-btns {
    margin-top: 20px;
  }
  &-table {
    margin: 40px 0 40px 0;
    &-top {
      margin-top: 20px;
    }
  }
  &-unvisible {
    display: none;
  }
}
</style>
