<script setup lang="ts">
import { shallowRef , computed, onMounted } from 'vue'
import { getStudentMsg } from '@/api/student'

interface StudentMsg {
  studentName: string
  classId: number
  studentId: string
  department: string
  professionId: number
  studentImg:string
}

const studentMsg = shallowRef <StudentMsg>({
  studentName: '',
  classId: 0,
  studentId: '',
  department: '',
  professionId: 0,
  studentImg:'',
})

const classType = computed(() => (studentMsg.value.classId ? '学硕' : '专硕'))
const professionName = computed(() => {
  switch (studentMsg.value.professionId) {
    case 0:
      return '电子信息'
    case 1:
      return '人工智能'
    case 2:
      return '计算机技术'
    default:
      return ''
  }
})

/** 学生信息请求 */
const requestStudentMsg = async () => {
  const { id } = JSON.parse(localStorage.getItem('auth') || '{}')
  try {
    const { data: res } = await getStudentMsg(id)
    const { code, data } = res
    if (code === 200) {
      
      //const {studentName,studentId,classId,department,professionId,studentImg} = data[0]
      //studentMsg.value = {studentName,studentId,classId,department,professionId,studentImg}
      studentMsg.value = data[0]
      console.log(studentMsg.value.department)
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  requestStudentMsg()
})
</script>

<template>
  <div class="student-info-container">
    <el-row>
      <el-col class="student-info-col" :span="8">
        <el-image style="width: 120px; height: 150px" fit="fill" />
      </el-col>
      <el-col :span="16">
        <el-descriptions title="学生基本信息" :column="2">
          <el-descriptions-item label="姓名">
            {{ studentMsg.studentName }}
            <el-tag size="small">{{ classType }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="学号">
            {{ studentMsg.studentId }}
          </el-descriptions-item>
          <el-descriptions-item label="院系">
            {{ studentMsg.department }}
          </el-descriptions-item>
          <el-descriptions-item label="专业">
            {{ professionName }}
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
    <div class="student-info-score">
      <h4>学分详情</h4>
      <el-row>
        <el-col class="student-info-col" :span="8">
          <div class="student-info-score-container student-info-col">
            <p>14</p>
            <p>总计28</p>
          </div>
          <h6>总学分</h6>
        </el-col>
        <el-col class="student-info-col" :span="8">
          <div class="student-info-score-container student-info-col">
            <p>14</p>
            <p>总计28</p>
          </div>
          <h6>必修学分</h6>
        </el-col>
        <el-col class="student-info-col" :span="8">
          <div class="student-info-score-container student-info-col">
            <p>14</p>
            <p>总计28</p>
          </div>
          <h6>选修分</h6>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped lang="less">
.student-info {
  &-container {
    margin-top: 20px;
  }
  &-col {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    h6 {
      margin: 10px 0;
    }
  }
  &-score {
    margin-top: 70px;
    &-container {
      width: 150px;
      height: 150px;
      background-color: bisque;
      border-radius: 50%;
      p {
        margin: 5px 0;
      }
    }
  }
}
</style>
