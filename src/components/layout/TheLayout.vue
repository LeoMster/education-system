<script setup lang="ts">
import { ref, computed } from 'vue'
import studentMenuList from '@/router/student'
import teacherMenuList from '@/router/teacher'
import secretaryMenuList from '@/router/secretary'
import { Expand } from '@element-plus/icons-vue'

const menuList = [
  [...studentMenuList],
  [...teacherMenuList],
  [...secretaryMenuList]
]
const { type = 0 } = JSON.parse(localStorage.getItem('auth') || '{}')
const isCollapse = ref(true)

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

const currentMenuList = computed(() => menuList[type])
const defaultActiveMenu = computed(() => {
  const menuFirstItem = menuList[type][0]
  return menuFirstItem.children?.length
    ? menuFirstItem.children[0].path
    : menuFirstItem.path
})
</script>

<template>
  <el-container class="layout">
    <el-aside width="auto">
      <el-menu
        class="layout-menu"
        :default-active="defaultActiveMenu"
        :collapse="isCollapse"
        active-color="#ffd04b"
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
        router
      >
        <template v-for="{ path, name, icon, children } of currentMenuList">
          <el-sub-menu v-if="children?.length" :index="path" :key="path">
            <template #title>
              <el-icon><component :is="icon" /></el-icon>
              <span>{{ name }}</span>
            </template>
            <el-menu-item
              v-for="{ path, name, icon } of children"
              :index="path"
              :key="path"
            >
              <el-icon><component :is="icon" /></el-icon>
              <template #title>
                {{ name }}
              </template>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item v-else :index="path" :key="path + 1">
            <el-icon><component :is="icon" /></el-icon>
            <template #title>
              {{ name }}
            </template>
          </el-menu-item>
        </template>
        <el-icon
          class="layout-collapse-btn"
          :class="{ 'layout-btn-rotate': !isCollapse }"
          color="#fff"
          :size="18"
          @click="toggleCollapse"
        >
          <Expand />
        </el-icon>
      </el-menu>
      <div class="layout-menu-collapse"></div>
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <span>当前学期</span>
      </el-header>
      <el-main :style="{ background: 'none' }">
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="less">
.layout {
  height: 100vh;
  .el-menu--collapse {
    height: 100%;
  }
  &-menu:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
  }
  &-collapse-btn {
    position: absolute;
    left: 50%;
    bottom: 10px;
    cursor: pointer;
    transform: translateX(-50%);
  }
  &-btn-rotate {
    transform: translateX(-50%) rotate(180deg);
  }
  &-header {
    line-height: 60px;
    background-color: #545c64;
    color: #ffd04b;
  }
}
</style>
