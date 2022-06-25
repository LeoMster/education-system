<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentRoute = router.currentRoute.value.path.split('/').at(-1)
const isVisible = ref(false)
const tableData = [{}]

const checkClassList = () => {
  isVisible.value = !isVisible.value
}
</script>

<template>
  <el-table class="secretary-class-table" ref="tableRef" :data="tableData">
    <el-table-column property="studentName" label="姓名" align="center" />
    <el-table-column property="studentId" label="学号" />
    <el-table-column property="professionName" label="专业" align="center" />
    <el-table-column property="compulsory" label="必修学分" align="center" />
    <el-table-column property="elective" label="选修学分" align="center" />
    <el-table-column label="操作">
      <template #default>
        <el-button link type="primary" @click="checkClassList">
          查看选课
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="isVisible" title="选课信息">
    <el-table :data="[{}]">
      <el-table-column type="index" label="序号" width="100" align="center" />
      <el-table-column property="classId" label="课程名称" align="center" />
      <el-table-column property="className" label="课程编号" align="center" />
      <el-table-column property="classScore" label="课程成绩" align="center" />
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
