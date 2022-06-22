<script setup lang="ts"></script>

<template>
  <div class="student-info-container">
    <el-row>
      <el-col class="student-info-col" :span="8">
        <el-image style="width: 120px; height: 150px" fit="fill" />
      </el-col>
      <el-col :span="16">
        <el-descriptions title="学生基本信息" :column="2">
          <el-descriptions-item label="姓名">
            kooriookami
            <el-tag size="small">硕士</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="学号">18100000000</el-descriptions-item>
          <el-descriptions-item label="院系">Suzhou</el-descriptions-item>
          <el-descriptions-item label="专业">软件</el-descriptions-item>
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
          <div class="student-info-score-container student-info-col"></div>
          <h6>必修学分</h6>
        </el-col>
        <el-col class="student-info-col" :span="8">
          <div class="student-info-score-container student-info-col"></div>
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
    margin-top: 150px;
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
