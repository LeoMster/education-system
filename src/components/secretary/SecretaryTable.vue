<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { getStudentMsgList, checkCourseList } from '@/api/secretary'

interface Student {
  studentName: string
  studentId: string
  profeseionId: number
  requiredScore: number
  optionalScore: number
}

interface Course {
  classId: string
  className: string
  score: string
}

const router = useRouter()
const currentRoute = router.currentRoute.value.path.split('/').at(-1)
const isVisible = ref(false)
const tableData = ref<Student[]>([])
const checkCourseData = ref<Course[]>([])

const getType = computed(() => (currentRoute === 'professional' ? 0 : 1))

/** 学生信息列表 */
const requestStudentMsgList = async () => {
  try {
    const { data: res } = await getStudentMsgList(getType.value)
    const { code, data } = res
    if (code === 200) {
      tableData.value = data
    }
  } catch (error) {
    console.log(error)
  }
}
/** 学生课程列表 */
const requestCheckCourseList = async (id: string) => {
  try {
    const { data: res } = await checkCourseList(id)
    const { code, data } = res
    if (code === 200) {
      checkCourseData.value = data
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => requestStudentMsgList())

const checkClassList = async (id: string) => {
  isVisible.value = !isVisible.value
  await nextTick()
  requestCheckCourseList(id)
}
</script>

<template>
  <el-table class="secretary-class-table" ref="tableRef" :data="tableData">
    <el-table-column property="studentName" label="姓名" align="center" />
    <el-table-column property="studentId" label="学号" />
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
    <el-table-column property="requiredScore" label="必修学分" align="center" />
    <el-table-column property="optionalScore" label="选修学分" align="center" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          link
          type="primary"
          @click="checkClassList(scope.row.studentId)"
        >
          查看选课
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="isVisible" title="选课信息">
    <el-table :data="checkCourseData">
      <el-table-column type="index" label="序号" width="100" align="center" />
      <el-table-column property="classId" label="课程名称" align="center" />
      <el-table-column property="className" label="课程编号" align="center" />
      <el-table-column property="score" label="课程成绩" align="center" />
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
