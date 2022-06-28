<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import studentMenuList from '@/router/student'
import teacherMenuList from '@/router/teacher'
import secretaryMenuList from '@/router/secretary'
import { Expand, ArrowDownBold } from '@element-plus/icons-vue'

const menuList = [
  [...studentMenuList],
  [...teacherMenuList],
  [...secretaryMenuList]
]
const { type = 0, name } = JSON.parse(localStorage.getItem('auth') || '{}')
const isCollapse = ref(true)
const router = useRouter()

const currentMenuList = computed(() => menuList[type])
const defaultActiveMenu = computed(() => router.currentRoute.value.path)

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

const userLogOut = () => {
  router.replace('/login')
}
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
        <el-row>
          <el-col :span="12">
            <span class="layout-header-title">当前学期：</span>
            <span>2021-2022学年</span>
          </el-col>
          <el-col :span="12" class="layout-header-right">
            <el-dropdown>
              <el-icon color="#fff"><ArrowDownBold /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="userLogOut">退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <div class="layout-header-right-name">{{ name }}</div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
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
    &-title {
      color: #fff;
    }
    &-term {
      text-align: right;
    }
    &-right {
      display: flex;
      align-items: center;
      justify-content: right;
      &-name {
        margin: 0 20px 0 10px;
      }
    }
  }
}
</style>
