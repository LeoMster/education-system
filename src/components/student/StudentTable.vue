<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { ElMessage, ElTable } from 'element-plus'
import {
  getIsSubmit,
  getStudentCourseList,
  planDesignSaveAndSubmit,
  planDesignSearch,
  getCourseIsSumbit,
  getCourseList,
  planDesignCourseSaveAndSubmit
} from '@/api/student'

interface Course {
  courseId: string
  courseName: string
  courseType: number
  courseTime: number
  courseResult: number
  courseTeacher: string
  courseTerm: number
  isChecked?: boolean
  isCourseChecked?: boolean
}

const props = defineProps<{
  routePath: string
}>()

const { id } = JSON.parse(localStorage.getItem('auth') || '{}')
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const isSubmit = ref<boolean>(false)
const courseData = ref<Course[]>([])
const courseSelection = ref<Course[]>([])
const currentPage = ref<number>(1)
const PAGE_SIZE = 10

const isSearch = computed(() => props.routePath === 'search')
const isSelect = computed(() => props.routePath === 'select')
const currentPageData = computed(() =>
  courseData?.value.slice(
    (currentPage.value - 1) * PAGE_SIZE,
    currentPage.value * PAGE_SIZE
  )
)

/** 是否已经提交 */
const requestIsSubmit = async () => {
  try {
    const { data: res } = isSelect.value
      ? await getCourseIsSumbit(id)
      : await getIsSubmit(id)
    const { code, data } = res
    if (code === 200) {
      isSubmit.value = data
    }
  } catch (error) {
    console.log(error)
  }
}
/** 请求课程列表 */
const requestStudentCourseList = async () => {
  try {
    const { data: res } = isSearch.value
      ? await planDesignSearch(id)
      : isSelect.value
      ? await getCourseList(id)
      : await getStudentCourseList(id)
    const { code, data } = res
    if (code === 200) {
      courseData.value = data
      defaultChecked()
    }
  } catch (error) {
    console.log(error)
  }
}
/** 保存或提交培养计划 */
const requestPlanDesignSaveAndSubmit = async (type: number) => {
  const list = courseSelection.value.map((select) => select.courseId)
  try {
    const { data: res } = isSelect.value
      ? await planDesignCourseSaveAndSubmit({ type, id, list })
      : await planDesignSaveAndSubmit({ type, id, list })
    const { code, msg } = res
    if (code === 200) {
      ElMessage({
        type: 'success',
        message: msg
      })
      if(type == 1){
        isSubmit.value = true
      }
    }
    if (code === 400) {
      ElMessage({
        type: 'error',
        message: msg
      })
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  requestIsSubmit()
  requestStudentCourseList()
})

const defaultChecked = async () => {
  await nextTick()
  courseData.value.forEach((row) => {
    if (row[isSelect.value ? 'isCourseChecked' : 'isChecked']) {
      multipleTableRef.value?.toggleRowSelection(row, true)
    }
  })
}

const pageChange = (page: number) => {
  currentPage.value = page
}

const selectionChangeTable = (val: Course[]) => {
  courseSelection.value = val
}

const saveTable = () => {
  requestPlanDesignSaveAndSubmit(0)
}

const submitTable = () => {
  requestPlanDesignSaveAndSubmit(1)
}

const resetTable = () => {
  multipleTableRef.value?.clearSelection()
}
</script>

<template>
  <div class="student-plan-container">
    <div class="student-plan-btns" v-show="!isSearch">
      <el-button type="primary" @click="saveTable" :disabled="isSubmit">
        保存
      </el-button>
      <el-button type="primary" @click="submitTable" :disabled="isSubmit">
        提交
      </el-button>
      <el-button type="primary" @click="resetTable" :disabled="isSubmit">
        重置
      </el-button>
    </div>
    <el-table
      class="student-plan-table"
      :class="{ 'student-plan-table-top': isSearch }"
      ref="multipleTableRef"
      :data="currentPageData"
      @selection-change="selectionChangeTable"
      row-key="courseId"
    >
      <el-table-column
        v-if="!isSearch"
        type="selection"
        :selectable="(row: Course) => {
          if (isSubmit) return false
          if (isSelect && row.isChecked) return false
          return true
        }"
        reserve-selection
      />
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
