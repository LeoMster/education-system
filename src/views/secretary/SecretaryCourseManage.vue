<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'

const isVisible = ref(false)
const tableData = [{}]

const deleteCourseList = () => {
  ElMessageBox.confirm('确定要删除该数据吗?', '', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除'
      })
    })
}

const checkStudentList = () => {
  isVisible.value = !isVisible.value
}
</script>

<template>
  <el-table class="secretary-class-table" ref="tableRef" :data="tableData">
    <el-table-column property="classId" label="课程号" align="center" />
    <el-table-column property="className" label="课程名称" align="center" />
    <el-table-column property="professionName" label="学时" align="center" />
    <el-table-column property="compulsory" label="学分分" align="center" />
    <el-table-column property="term" label="学期" align="center" />
    <el-table-column property="classTeacher" label="任课教师" align="center" />
    <el-table-column property="elective" label="选课人数" align="center" />
    <el-table-column label="操作">
      <template #default>
        <el-button link type="primary" @click="deleteCourseList">
          删除
        </el-button>
        <el-button link type="primary" @click="checkStudentList">
          查看
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="isVisible" title="学生信息">
    <el-table :data="[{}]">
      <el-table-column type="index" label="序号" width="100" align="center" />
      <el-table-column property="studentId" label="学号" align="center" />
      <el-table-column property="studentName" label="姓名" align="center" />
      <el-table-column property="profession" label="专业" align="center" />
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
