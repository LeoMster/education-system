<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'

const menuList = [
  [
    { name: '个人信息', path: '/student/info' },
    { name: '培养计划制定', path: '/student/design-plan' },
    { name: '培养计划查询', path: '/student/search-plan' },
    { name: '学生网上选课', path: '/student/select-course' },
    { name: '课程成绩查询', path: '/student/query-score' }
  ],
  [],
  []
]
const { type } = JSON.parse(localStorage.getItem('auth'))
console.log(type)
</script>

<template>
  <div>
    <el-container class="layout">
      <el-aside width="200px">
        <el-menu class="layout-menu" active-color="#ffd04b" router>
          <el-menu-item index="/student/info">
            <template #title>个人信息</template>
          </el-menu-item>
          <el-menu-item index="/student/design-plan">
            <template #title>培养计划制定</template>
          </el-menu-item>
          <el-menu-item index="3">
            <template #title>培养计划查询</template>
          </el-menu-item>
          <el-menu-item index="4">
            <template #title>学生网上选课</template>
          </el-menu-item>
          <el-menu-item index="5">
            <template #title>课程成绩查询</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="layout-header">
          <span>当前学期</span>
          <!-- <el-dropdown>
            <div>
              Hyn
              <el-icon>
                <arrow-down />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>退出当前账号</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown> -->
        </el-header>
        <el-main>
          <slot></slot>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="less">
.layout {
  height: 100vh;
  &-menu {
    height: 100%;
  }
  &-header {
    line-height: 60px;
  }
}
</style>


