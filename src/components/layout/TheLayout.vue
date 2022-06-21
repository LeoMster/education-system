<template>
  <div>
    <el-container :style="{ height: '100vh' }">
      <el-aside width="200">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <slot></slot>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
