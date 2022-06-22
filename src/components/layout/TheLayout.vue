<script setup lang="ts">
import { computed } from 'vue'
import studentMenuList from '@/router/student'

const menuList = [[...studentMenuList]]
const { type = 0 } = JSON.parse(localStorage.getItem('auth') || '{}')

const currentMenuList = computed(() => menuList[type])
const defaultActiveMenu = computed(() => menuList[type][0].path)
</script>

<template>
  <el-container class="layout">
    <el-aside width="200px">
      <el-menu
        class="layout-menu"
        :default-active="defaultActiveMenu"
        active-color="#ffd04b"
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
        router
      >
        <el-menu-item
          v-for="{ path, name } of currentMenuList"
          :index="path"
          :key="path"
        >
          <template #title>{{ name }}</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <span>当前学期</span>
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
  &-menu {
    height: 100%;
  }
  &-header {
    line-height: 60px;
    background-color: #545c64;
    color: #ffd04b;
  }
}
</style>
