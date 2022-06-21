<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import router from '@/router';

const userType = {
  STUDENT: 0,
  TEACHER: 1,
  TEACH_SECRETARY: 2
}

const userFormRef = ref<FormInstance>()
const userForm = ref({
  type: userType.STUDENT,
  name: '',
  pwd: ''
})
const userFormRules = ref<FormRules>({
  type: [{ required: true }],
  name: [
    { required: true, message: '请输入用户名' }, 
    { min: 2, max: 10, message: '用户名长度应该为2-10' }
  ],
  pwd: [
    { required: true, message: '请输入密码' },
    { min: 6, max: 20, message: '密码长度应该为6-20' }
  ]
})

const submitForm = (formRef?: FormInstance) => {
  if (!formRef) return
  formRef.validate((valid) => {
    if (valid) {
      const { type, name, pwd } = userForm.value
    }
  })
}
</script>

<template>
  <div class="login-container">
    <el-card shadow="always">
      <template #header>
        <span>Education-System</span>
      </template>
      <div class="login-form">
        <el-form
          ref="userFormRef"
          :model="userForm"
          :rules="userFormRules"
          label-position="top"
        >
          <el-form-item label="用户类型" prop="type">
            <el-radio-group v-model="userForm.type">
              <el-radio :label="userType.STUDENT">学生</el-radio>
              <el-radio :label="userType.TEACHER">教师</el-radio>
              <el-radio :label="userType.TEACH_SECRETARY">教学秘书</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="用户名" prop="name">
            <el-input v-model.trim="userForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input v-model.trim="userForm.pwd" type="password"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="submitForm(userFormRef)">登录</el-button>
      </div>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.login {
  &-container {
    width: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &-form {
    text-align: center;
  }
}
</style>
