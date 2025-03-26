<template>
  <div id="container">
    <!-- 顶部布局 -->
    <div class="top-layout">
      <!-- 导航链接 -->
      <!-- <router-link to="/"></router-link> -->
    </div>
    <!-- 底部布局 -->
    <div class="bottom-layout">
      <!-- 路由出口 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
/* 整体布局样式 */
#container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 顶部布局样式 */
.top-layout {
  height: 77px;
  background: url("./assets/images/header-bg.png") no-repeat center center;
}

/* 底部布局样式 */
.bottom-layout {
  flex: 1;
  overflow: auto;
}
</style>
