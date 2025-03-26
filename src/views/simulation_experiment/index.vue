<template>
  <div class="layout-container">
    <!-- 左侧布局 -->
    <div class="left-layout">
      <!-- 这里可以放置左侧的内容，例如菜单等 -->
      <CesiumViewar />
    </div>
    <!-- 右侧布局 -->
    <div class="right-layout"></div>
  </div>
</template>

<script setup>
import CesiumViewar from "@/components/CesiumViewer.vue";
const value = ref("");

const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];
</script>

<style scoped>
.layout-container {
  display: flex; /* 使用 flexbox 布局 */
  height: 100%; /* 占满整个视口高度 */
  padding: 33px;
  gap: 20px; /* 布局之间的间距 */
}

.left-layout {
  flex: 1;
  border: 1px solid #52e8fd;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16) inset;
}

.right-layout {
  width: 460px;
  border-radius: 0 0 5px 5px;
  background: linear-gradient(180deg, #215778 0%, #358597 100%);
  opacity: 90%;
}
</style>
