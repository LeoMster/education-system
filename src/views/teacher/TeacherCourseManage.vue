<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getIsSubmit, getStudentScoreList, submitScoures } from '@/api/teacher'
import { ElMessage, ElMessageBox } from 'element-plus'

interface TableItem {
  studentName: string
  studentId: string
  department: string
  professionId: string
  score: string | number | null
}

const { id } = JSON.parse(localStorage.getItem('auth') || '{}')
const isSubmit = ref(false)
const tableData = ref<TableItem[]>([])
const currentPage = ref(1)
const PAGE_SIZE = 10
const iptValue = ref('')


/**搜索框 */
const searchData = computed(() =>
  tableData?.value.filter(({ studentName }) =>
    studentName.includes(iptValue.value)
  )
)
const currentPageData = computed(() => {
  const data = iptValue.value ? searchData : tableData
  return data?.value.slice(
    (currentPage.value - 1) * PAGE_SIZE,
    currentPage.value * PAGE_SIZE
  )
})
/** 是否已经提交 */
const requestIsSumbit = async () => {
  try {
    const { data: res } = await getIsSubmit(id)
    const { code, data } = res
    if (code === 200) {
      isSubmit.value = data
    }
  } catch (error) {
    console.log(error)
  }
}
/** 列表 */
const requestStudentCourseList = async () => {
  try {
    const { data: res } = await getStudentScoreList(id)
    const { code, data } = res
    if (code === 200) {
      tableData.value = data
    }
  } catch (error) {
    console.log(error)
  }
}
/** 提交 */
const requestsubmitScoures = async () => {
  try {
    const list = tableData.value.map(({ studentId, score }) => ({
      studentId,
      score: Number(score)
    }))
    const { data: res } = await submitScoures({ teacherId: id, list })
    const { code, msg } = res
    if (code === 200) {
      ElMessage({
        type: 'success',
        message: msg
      })
      isSubmit.value = true
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
  requestIsSumbit()
  requestStudentCourseList()
})

const pageChange = (page: number) => {
  currentPage.value = page
}

const submitScores = () => {
  if (tableData.value.some(({ score }) => score === null)) {
    ElMessage({
      type: 'error',
      message: '还有暂未输入的成绩！'
    })
  } else {
    ElMessageBox.confirm('确定要提交成绩吗?', '', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        requestsubmitScoures()
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消提交'
        })
      })
  }
}
</script>

<template>
  <div class="course-manage-container">
    <span class="course-manage-search-label">搜索：</span>
    <el-input class="course-manage-ipt" v-model.trim="iptValue" clearable placeholder="输入学生姓名" />
    <el-button class="course-manage-btn" type="primary" @click="submitScores" :disabled="isSubmit">
      提交
    </el-button>
    <el-table class="course-manage-table" ref="tableRef" :data="currentPageData">
      <el-table-column property="studentName" label="姓名" align="center" />
      <el-table-column property="studentId" label="学号" align="center" />
      <el-table-column property="department" label="院系" align="center" />
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
      <el-table-column label="操作">
        <template #default="scope">
          <el-input v-model="scope.row.score" type="number" placeholder="请输入成绩" :min="0" :max="100"
            :disabled="isSubmit" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="course-manage-page" background layout="prev, pager, next" :total="iptValue ? searchData.length : tableData.length"
      @current-change="pageChange" />
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

  &-ipt {
    width: 20%;
    float: left;
  }

  &-search-label {
    float: left;
    line-height: 30px;
    color: rgb(144, 147, 152);
  }
}
</style>
