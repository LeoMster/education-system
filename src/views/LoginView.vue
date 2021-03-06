<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { userLogin } from '@/api/student'
import type { UserLoginParams } from '@/api/student'

const userType = {
  STUDENT: 0,
  TEACHER: 1,
  TEACH_SECRETARY: 2
}
const router = useRouter()
const userFormRef = ref<FormInstance>()
const userForm = ref({
  type: userType.STUDENT,
  id: '',
  pwd: ''
})
const userFormRules = ref<FormRules>({
  type: [{ required: true }],
  id: [
    { required: true, message: '请输入学工号' },
    { min: 4, max: 10, message: '学工号长度为4-10位' },
    {
      validator(_, value, callback) {
        if (!/^[\d]+$/.test(value))
          return callback(new Error('学工号只能包含数字'))
        return callback()
      }
    }
  ],
  pwd: [
    { required: true, message: '请输入密码' },
    { min: 6, max: 20, message: '密码长度为6-20位' }
  ]
})

onMounted(() => {
  localStorage.removeItem('auth')
})

/** 登录请求 */
const requestUserLogin = async (params: UserLoginParams) => {
  // localStorage.setItem('auth', JSON.stringify({ type: 0, id: '', name: '' }))
  // router.replace('/student')
  try {
    const { data: res } = await userLogin(params)
    const { code, data, msg } = res
    if (code === 200) {
      const { type, id, name } = data[0]
      localStorage.setItem(
        'auth',
        JSON.stringify({ type: Number(type), id, name })
      )
      switch (Number(type)) {
        case 0:
          router.replace('/student')
          break
        case 1:
          router.replace('/teacher')
          break
        case 2:
          router.replace('/secretary')
          break
      }
      ElMessage({
        type: 'success',
        message: msg
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

const submitForm = (formRef?: FormInstance) => {
  if (!formRef) return
  formRef.validate((valid) => {
    if (valid) {
      const { type, id, pwd } = userForm.value
      requestUserLogin({ type, id, pwd })
    }
  })
}
</script>

<template>
  <div class="login-bg">
    <el-card
      class="login-container"
      shadow="always"
      :body-style="{ padding: 0 }"
    >
      <div class="login-header">Education-System</div>
      <div class="login-form-container">
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
          <el-form-item label="学工号" prop="id" required>
            <el-input v-model.trim="userForm.id" placeholder="请输入学工号" />
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input
              v-model.trim="userForm.pwd"
              type="password"
              placeholder="请输入统一身份认证密码"
            />
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="submitForm(userFormRef)">
          登录
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="less">
.login {
  &-bg {
    width: 100%;
    height: 100vh;
    background-image: url('@/assets/bg.webp');
    background-size: 100% 100%;
  }
  &-container {
    width: 30%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  &-header {
    padding: 20px;
    background-color: #92beeb;
    color: #fff;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom: 1px solid rgb(228, 231, 237);
  }
  &-form-container {
    padding: 20px;
  }
}
</style>
