<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getStudentCourseList } from '@/api/student'

interface Course {
  courseId: string
  courseName: string
  courseType: number
  courseTime: number
  courseResult: number
  courseTeacher: string
  courseTerm: number
}

const props = defineProps<{
  routePath: string
}>()

const courseData = ref<Course[]>([])
const currentPageData = ref<Course[]>([])
const PAGE_SIZE = 10

const isSearch = computed(() => props.routePath === 'search')

const requestStudentCourseList = async () => {
  try {
    const { data: res } = await getStudentCourseList()
    const { code, data } = res
    if (code === 200) {
      courseData.value = data
      pageChange(1)
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  requestStudentCourseList()
  //pageChange(1)
})

const selectionTable = () => null

const pageChange = (page: number) => {
  console.log(page);
  currentPageData.value = courseData.value?.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  )
}
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
      :data="currentPageData"
      @selection-change="selectionTable"
    >
      <el-table-column type="selection" v-if="!isSearch" />
      <el-table-column property="courseId" label="课程编号" align="center" />
      <el-table-column property="courseName" label="课程名称" align="center" />
      <el-table-column property="courseType" label="课程类别" align="center">
        <template #default="scope">
          {{ scope.row.courseType ? '必修' : '选修' }}
        </template>
      </el-table-column>
      <el-table-column property="courseResult" label="学分" align="center" />
      <el-table-column property="courseTime" label="学时" align="center" />
      <el-table-column property="courseTerm" label="学期" align="center" />
      <el-table-column
        property="courseTeacher"
        label="任课教师"
        align="center"
      />
    </el-table>
    <el-pagination
      class="student-plan-page"
      background
      layout="prev, pager, next"
      :total="courseData.length"
      @current-change="pageChange"
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
