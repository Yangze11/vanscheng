<template>
  <div class="home-page">
    <div class="header">
      <img src="https://s1.imagehub.cc/images/2025/03/13/33df7e014c0069751ac670e99c1b6613.png" alt="首页头图" class="header-image">
    </div>
    
    <div class="content">
      <div class="quick-actions">
        <div class="grid">
          <div class="grid-item">
            <div class="grid-icon">
              <img src="https://s1.imagehub.cc/images/2025/03/13/4ffa5ac6a04bcf8ea809572102bfde72.png" alt="万程学堂" />
            </div>
            <div class="grid-text">万程学堂</div>
          </div>
          <div class="grid-item">
            <div class="grid-icon">
              <img src="https://s1.imagehub.cc/images/2025/03/13/ffdc700fceaa3bff3fbd60d6dab94abb.png" alt="培训中心" />
            </div>
            <div class="grid-text">培训中心</div>
          </div>
          <div class="grid-item">
            <div class="grid-icon">
              <img src="https://s1.imagehub.cc/images/2025/03/13/619269b11a4aac289fb54a14a78d43d5.png" alt="考勤打卡" />
            </div>
            <div class="grid-text">考勤打卡</div>
          </div>
          <div class="grid-item">
            <div class="grid-icon">
              <img src="https://s1.imagehub.cc/images/2025/03/13/a0db083e1981d5e74908f0f1afc142fd.png" alt="绩效中心" />
            </div>
            <div class="grid-text">绩效中心</div>
          </div>
        </div>
        
        <div class="notice-container">
          <div class="notice-bar">
            <img src="https://s1.imagehub.cc/images/2025/03/13/c5d762810903227a6001ddb07ffe593a.png" class="notice-icon" alt="公告" />
            <div class="notice-content">
              <transition-group name="notice-slide" tag="div" class="notice-list">
                <div 
                  :key="currentIndex" 
                  class="notice-item"
                  @click="onNoticeClick"
                >
                  {{ notices[currentIndex].title }}
                </div>
              </transition-group>
            </div>
            <div class="notice-more" @click="viewAllNotices">
              <span>更多</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="nav-bar">
      <van-tabbar v-model="active" route @change="onChange">
        <van-tabbar-item replace to="/home" name="home">
          <template #icon="props">
            <img :src="props.active ? 'https://s1.imagehub.cc/images/2025/03/13/c10048b73961dbf62f34653cc69162a7.png' : 'https://s1.imagehub.cc/images/2025/03/13/071aae5092b4e0143dc98524b113c172.png'" style="height: 25px;" />
          </template>
          <span>首页</span>
        </van-tabbar-item>
        <van-tabbar-item replace to="/workspace" name="workspace">
          <template #icon="props">
            <img :src="props.active ? 'https://s1.imagehub.cc/images/2025/03/12/207aa925aad2ce9de809451dad34c682.png' : 'https://s1.imagehub.cc/images/2025/03/12/207aa925aad2ce9de809451dad34c682.png'" style="height: 25px;" />
          </template>
          <span>工作台</span>
        </van-tabbar-item>
        <van-tabbar-item replace to="/todo" name="todo">
          <template #icon="props">
            <img :src="props.active ? 'https://s1.imagehub.cc/images/2025/03/12/ab0885d0d8deabc120bb23817b8aa5a8.png' : 'https://s1.imagehub.cc/images/2025/03/12/ab0885d0d8deabc120bb23817b8aa5a8.png'" style="height: 25px;" />
          </template>
          <span>待办</span>
        </van-tabbar-item>
        <van-tabbar-item replace to="/schedule" name="schedule">
          <template #icon="props">
            <img :src="props.active ? 'https://s1.imagehub.cc/images/2025/03/12/4a9d82791c32c42b6d09a0c1fd1d1be9.png' : 'https://s1.imagehub.cc/images/2025/03/12/4a9d82791c32c42b6d09a0c1fd1d1be9.png'" style="height: 25px;" />
          </template>
          <span>日程</span>
        </van-tabbar-item>
        <van-tabbar-item replace to="/profile" name="profile">
          <template #icon="props">
            <img :src="props.active ? 'https://s1.imagehub.cc/images/2025/03/13/edda679658282990e70683fc62ff74cc.png' : 'https://s1.imagehub.cc/images/2025/03/13/98cb92e063bee6fdcefa75be487d2c37.png'" style="height: 25px;" />
          </template>
          <span>我的</span>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon, Tabbar, TabbarItem } from 'vant'

const route = useRoute()
const router = useRouter()
const active = ref(0)
const currentIndex = ref(0)

const onChange = (index) => {
  active.value = index
}

const notices = [
  { id: '1', title: '关于启动万程IOA系统通知' },
  { id: '2', title: '2025年新入职流程规范' },
  { id: '3', title: '2025年广西三月三放假通知' },
  { id: '4', title: '2025年清明节放假通知' }
]

let timer = null

const rotateNotice = () => {
  currentIndex.value = (currentIndex.value + 1) % notices.length
}

const onNoticeClick = () => {
  const currentNotice = notices[currentIndex.value]
  if (currentNotice) {
    router.push(`/notice/${currentNotice.id}`)
  }
}

const viewAllNotices = () => {
  router.push('/notice/list')
}

onMounted(() => {
  timer = setInterval(rotateNotice, 7000)
  // 根据当前路由设置激活的标签
  const routeMap = {
    '/home': 0,
    '/workspace': 1,
    '/todo': 2,
    '/schedule': 3,
    '/profile': 4
  }
  active.value = routeMap[route.path] || 0
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  width: 100vw;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.header {
  width: 100%;
  height: 40vh;
  position: relative;
  background: linear-gradient(180deg, #4a90e2 0%, #357abd 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.header-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.content {
  flex: 1;
  background: transparent;
  overflow-y: auto;
  margin-top: -4rem;
  padding-bottom: calc(50px + env(safe-area-inset-bottom));
  position: relative;
  z-index: 2;
}

.quick-actions {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 1rem 1rem 0 0;
  padding: 0.75rem 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 0.5rem;
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.grid-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
}

.grid-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.grid-text {
  font-size: 0.875rem;
  color: #333;
  text-align: center;
}

.notice-container {
  margin-top: 0.5rem;
  padding: 0 1rem;
  width: 100%;
  height: 32px;
  overflow: hidden;
}

.notice-bar {
  display: flex;
  align-items: center;
  height: 32px;
  border-radius: 16px;
  padding: 0 12px;
  background: rgba(255, 255, 255, 0.6);
}

.notice-icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  object-fit: contain;
}

.notice-content {
  flex: 1;
  position: relative;
  height: 32px;
  overflow: hidden;
}

.notice-list {
  position: relative;
  height: 32px;
}

.notice-item {
  position: absolute;
  width: 100%;
  height: 32px;
  line-height: 32px;
  font-size: 0.875rem;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

.notice-item:hover {
  color: #4a90e2;
}

.notice-slide-enter-active,
.notice-slide-leave-active {
  transition: all 0.5s ease;
}

.notice-slide-enter-from {
  transform: translateY(100%);
}

.notice-slide-enter-to {
  transform: translateY(0);
}

.notice-slide-leave-from {
  transform: translateY(0);
}

.notice-slide-leave-to {
  transform: translateY(-100%);
}

.nav-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

:deep(.van-tabbar) {
  height: 50px;
  background: #fff;
  border-top: 1px solid #eee;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.1);
  padding-bottom: env(safe-area-inset-bottom);
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
  transform: scale(0.9);
}

.notice-more {
  display: flex;
  align-items: center;
  padding-left: 12px;
  margin-left: 8px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  color: #666;
}

.notice-more:hover {
  color: #4a90e2;
}

.notice-more span {
  font-size: 0.875rem;
}
</style> 