<template>
  <div class="page-wrapper">
    <div class="profile-container">
      <!-- 顶部用户信息 -->
      <div class="user-header">
        <div class="user-info">
          <div class="avatar">
            <img src="https://s1.imagehub.cc/images/2025/03/12/fcd6c7224badffb4299f2d63fda6baeb.png" alt="用户头像">
          </div>
          <div class="info">
            <div class="name">{{ username }}</div>
            <div class="details">
              <template v-if="isOnboarded">
                <span class="detail-item">技术部</span>
                <span class="divider">|</span>
                <span class="detail-item">工号：10086</span>
              </template>
              <template v-else>
                <span class="detail-item">未入职</span>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- 功能列表 -->
      <div class="menu-list">
        <!-- 个人设置 -->
        <div class="menu-group">
          <div class="group-title">个人设置</div>
          <div class="menu-items">
            <div class="menu-item" v-for="(item, index) in settingItems" :key="index">
              <span class="icon">{{ item.icon }}</span>
              <span class="label">{{ item.label }}</span>
              <span class="arrow">›</span>
            </div>
          </div>
    </div>

        <!-- 系统信息 -->
        <div class="menu-group">
          <div class="group-title">系统信息</div>
          <div class="menu-items">
            <div class="menu-item" v-for="(item, index) in systemItems" :key="index">
              <span class="icon">{{ item.icon }}</span>
              <span class="label">{{ item.label }}</span>
              <span class="arrow">›</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 退出登录按钮 -->
      <div class="logout-button" @click="handleLogout">
        退出登录
      </div>
    </div>

    <!-- 底部导航栏 -->
    <div class="nav-bar">
      <van-tabbar route>
        <van-tabbar-item replace to="/home">
          <template #icon="props">
            <img :src="'https://s1.imagehub.cc/images/2025/03/13/2ad05005341f608e0b06350eec52da28.png'" :style="{
              height: '25px',
              filter: props.active ? 'none' : 'grayscale(100%)'
            }" />
          </template>
          <span>首页</span>
        </van-tabbar-item>
        <van-tabbar-item replace to="/workspace">
          <template #icon="props">
            <img :src="props.active ? 'https://s1.imagehub.cc/images/2025/03/13/26cffb1a240453f7f4a9e50c85a8fa5c.png' : 'https://s1.imagehub.cc/images/2025/03/12/207aa925aad2ce9de809451dad34c682.png'" style="height: 25px;" />
          </template>
          <span>工作台</span>
        </van-tabbar-item>
        <van-tabbar-item replace to="/todo">
          <template #icon="props">
            <img :src="props.active ? 'https://s1.imagehub.cc/images/2025/03/13/74a2b2452a2b76748bbcb0614c49440e.png' : 'https://s1.imagehub.cc/images/2025/03/12/ab0885d0d8deabc120bb23817b8aa5a8.png'" style="height: 25px;" />
          </template>
          <span>待办</span>
        </van-tabbar-item>
        <van-tabbar-item replace to="/schedule">
          <template #icon="props">
            <img :src="props.active ? 'https://s1.imagehub.cc/images/2025/03/13/5c4d49b825a88559781f5c5db782c2ca.png' : 'https://s1.imagehub.cc/images/2025/03/12/4a9d82791c32c42b6d09a0c1fd1d1be9.png'" style="height: 25px;" />
          </template>
          <span>日程</span>
        </van-tabbar-item>
        <van-tabbar-item replace to="/profile">
          <template #icon="props">
            <img :src="props.active ? 'https://s1.imagehub.cc/images/2025/03/13/5fb06da7fc42107aa2487ef541cdf2ee.png' : 'https://s1.imagehub.cc/images/2025/03/13/98cb92e063bee6fdcefa75be487d2c37.png'" style="height: 25px;" />
          </template>
          <span>我的</span>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { showToast } from 'vant';

const router = useRouter();
const route = useRoute();
const active = ref('profile');

// 从 localStorage 获取用户名和入职状态
const username = ref(localStorage.getItem('username') || '未登录');
const isOnboarded = ref(localStorage.getItem('isOnboarded') === 'true');

// 个人设置菜单项
const settingItems = [
  { icon: '🔒', label: '账号安全' },
  { icon: '🔔', label: '消息通知' },
  { icon: '🎨', label: '主题设置' },
  { icon: '🌙', label: '深色模式' }
];

// 系统信息菜单项
const systemItems = [
  { icon: '❓', label: '帮助中心' },
  { icon: '📑', label: '用户协议' },
  { icon: '🔒', label: '隐私政策' },
  { icon: '📱', label: '关于我们' }
];

// 退出登录处理函数
const handleLogout = () => {
  // 清除本地存储的用户信息
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('isOnboarded');
  
  // 显示退出成功提示
  showToast('退出登录成功');
  
  // 跳转到登录页面
  router.push('/auth/login');
};

onMounted(() => {
  const path = route.path;
  if (path.includes('/home')) {
    active.value = 'home';
  } else if (path.includes('/workspace')) {
    active.value = 'workspace';
  } else if (path.includes('/todo')) {
    active.value = 'todo';
  } else if (path.includes('/schedule')) {
    active.value = 'schedule';
  } else if (path.includes('/profile')) {
    active.value = 'profile';
  }
});
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.profile-container {
  padding-bottom: calc(60px + 50px); /* 增加底部导航栏的高度 */
}

.user-header {
  background-color: #1989fa;
  color: white;
  padding: 24px 16px;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 32px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info {
  margin-left: 16px;
}

.name {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 4px;
}

.details {
  font-size: 14px;
  opacity: 0.8;
  margin-top: 8px;
}

.detail-item {
  color: rgba(255, 255, 255, 0.9);
}

.divider {
  margin: 0 8px;
  color: rgba(255, 255, 255, 0.5);
}

.menu-list {
  padding: 16px;
}

.menu-group {
  background-color: white;
  border-radius: 8px;
  margin-bottom: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
}

.group-title {
  padding: 12px 16px;
  color: #666;
  font-size: 14px;
  border-bottom: 1px solid #f5f5f5;
}

.menu-items {
  padding: 0 16px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f5f5f5;
  font-size: 16px;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item .icon {
  margin-right: 12px;
  font-size: 20px;
}

.menu-item .label {
  flex: 1;
  color: #333;
  font-size: 16px;
}

.menu-item .value {
  color: #999;
  margin-right: 8px;
}

.menu-item .arrow {
  color: #999;
  font-size: 20px;
}

.logout-button {
  margin: 24px 16px;
  background-color: white;
  color: #ff4d4f;
  text-align: center;
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
  box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
}

.nav-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

:deep(.van-tabbar-item) {
  color: #999;
}

:deep(.van-tabbar-item--active) {
  color: #FFA500;
}

:deep(.van-tabbar-item__icon) {
  margin-bottom: 4px;
}

:deep(.van-tabbar-item__text) {
  font-size: 12px;
}
</style> 