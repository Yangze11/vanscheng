<script setup>
// App.vue
import 'element-plus/dist/index.css'
</script>

<template>
  <router-view></router-view>
</template>

<style>
/* 全局重置样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  color: #323233;
  background-color: #f7f8fa;
}

/* 重写 Element Plus 消息样式 */
.el-message {
  min-width: 300px !important;
  max-width: 80% !important;
  box-sizing: border-box !important;
  border-radius: 12px !important;
  border: none !important;
  position: fixed !important;
  left: 50% !important;
  top: 20px !important;
  transform: translateX(-50%) !important;
  background-color: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  transition: opacity 0.3s, transform 0.4s, top 0.4s !important;
  padding: 14px 15px 14px 20px !important;
  display: flex !important;
  align-items: center !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
  animation: message-slide-up 0.3s ease forwards;
}

@keyframes message-slide-up {
  from {
    opacity: 0;
    transform: translate(-50%, 20px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

.el-message p {
  margin: 0 !important;
}

.el-message--success {
  border-left: 4px solid #67c23a !important;
}

.el-message--success .el-message__icon {
  color: #67c23a !important;
}

.el-message--warning {
  border-left: 4px solid #e6a23c !important;
}

.el-message--warning .el-message__icon {
  color: #e6a23c !important;
}

.el-message--error {
  border-left: 4px solid #f56c6c !important;
}

.el-message--error .el-message__icon {
  color: #f56c6c !important;
}

.el-message__content {
  color: #333 !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 1.4 !important;
}

.el-message__closeBtn {
  position: absolute !important;
  top: 50% !important;
  right: 15px !important;
  transform: translateY(-50%) !important;
  cursor: pointer !important;
  color: #909399 !important;
  font-size: 16px !important;
}

.el-message__icon {
  margin-right: 10px !important;
  font-size: 16px !important;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  overflow-x: hidden;
}

#app {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  position: relative;
}

/* 禁用双指缩放 */
body {
  touch-action: manipulation;
}

/* 禁用文本选择 */
* {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

/* 允许输入框的文本选择 */
input, textarea {
  -webkit-user-select: text;
  user-select: text;
}
</style>
