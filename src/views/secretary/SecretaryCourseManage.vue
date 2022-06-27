<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getCourseList, getStudentList, deleteCourse } from '@/api/secretary'

interface Course {
  courseId: string
  courseName: string
  courseTime: number
  courseResult: number
  courseTerm: number
  courseTeacher: number
  studentNumber: number
}

interface Student {
  studentId: string
  studentName: string
  professionId: number
}

const isVisible = ref(false)
const tableData = ref<Course[]>([])
const courseListData = ref<Student[]>([])

/** 课程列表 */
const requestCourseList = async () => {
  try {
    const { data: res } = await getCourseList()
    const { code, data } = res
    if (code === 200) {
      tableData.value = data
    }
  } catch (error) {
    console.log(error)
  }
}
/** 选课学生列表 */
const requestCourseStudentList = async (id: string) => {
  try {
    const { data: res } = await getStudentList(id)
    const { code, data } = res
    if (code === 200) {
      courseListData.value = data
    }
  } catch (error) {
    console.log(error)
  }
}
/** 删除课程 */
const requestDeleteCourse = async (id: string) => {
  try {
    const { data: res } = await deleteCourse(id)
    const { code, msg } = res
    if (code === 200) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
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

onMounted(() => requestCourseList())

const deleteCourseList = (id: string) => {
  ElMessageBox.confirm('确定要删除该数据吗?', '', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      requestDeleteCourse(id)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除'
      })
    })
}

const checkStudentList = async (id: string) => {
  isVisible.value = !isVisible.value
  await nextTick()
  requestCourseStudentList(id)
}
</script>

<template>
  <el-table class="secretary-class-table" ref="tableRef" :data="tableData">
    <el-table-column property="courseId" label="课程号" align="center" />
    <el-table-column property="courseName" label="课程名称" align="center" />
    <el-table-column property="courseTime" label="学时" align="center" />
    <el-table-column property="courseResult" label="学分" align="center" />
    <el-table-column property="courseTerm" label="学期" align="center" />
    <el-table-column property="courseTeacher" label="任课教师" align="center" />
    <el-table-column property="studentNumber" label="选课人数" align="center" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          link
          type="primary"
          @click="deleteCourseList(scope.row.courseId)"
        >
          删除
        </el-button>
        <el-button
          link
          type="primary"
          @click="checkStudentList(scope.row.courseId)"
        >
          查看
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="isVisible" title="学生信息">
    <el-table :data="courseListData">
      <el-table-column type="index" label="序号" width="100" align="center" />
      <el-table-column property="studentId" label="学号" align="center" />
      <el-table-column property="studentName" label="姓名" align="center" />
      <el-table-column property="professionId" label="专业" align="center">
        <template #default="scope">
          {{
            !scope.row.professionId
              ? '电子信息'
              : scope.row.professionId === 1
              ? '人工智能'
              : '计算机技术'
          }}
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<style scoped lang="less">
.secretary-class {
  &-table {
    margin: 20px 0;
  }
}
</style>
