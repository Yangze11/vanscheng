<template>
  <div class="notice-list">
    <van-nav-bar
      title="公告列表"
      left-arrow
      @click-left="onClickLeft"
      fixed
      placeholder
    />
    
    <div class="header-image">
      <img :src="headerImage" class="banner-img" />
    </div>
    
    <div class="list-content">
      <div class="notice-section">
        <van-cell 
          v-for="notice in notices" 
          :key="notice.id"
          :title="notice.title"
          :label="notice.date"
          is-link
          @click="viewNotice(notice)"
        />
      </div>
    </div>

    <div class="nav-bar">
      <van-tabbar route>
        <van-tabbar-item replace to="/home" icon="wap-home">
          <span>首页</span>
        </van-tabbar-item>
        <van-tabbar-item replace to="/workspace" icon="apps-o">
          <span>工作台</span>
        </van-tabbar-item>
        <van-tabbar-item replace to="/todo" icon="todo-list">
          <span>待办</span>
        </van-tabbar-item>
        <van-tabbar-item replace to="/schedule" icon="calendar-o">
          <span>日程</span>
        </van-tabbar-item>
        <van-tabbar-item replace to="/profile" icon="contact">
          <span>我的</span>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const headerImage = new URL('@/assets/images/banner/banner1.png', import.meta.url).href
const notices = ref([
  { id: '1', title: '关于启动万程IOA系统通知', date: '2025-03-11' },
  { id: '2', title: '2025年新入职流程规范', date: '2025-03-11' },
  { id: '3', title: '2025年广西三月三放假通知', date: '2025-03-11' },
  { id: '4', title: '2025年清明节放假通知', date: '2025-03-11' }
])

onMounted(() => {
  console.log('NoticeList组件已挂载')
})

const onClickLeft = () => {
  router.push('/home')
}

const viewNotice = (notice) => {
  router.push(`/notice/${notice.id}`)
}
</script>

<style lang="scss" scoped>
.notice-list {
  width: 100vw;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: calc(50px + env(safe-area-inset-bottom));
}

.header-image {
  width: 100%;
  height: 160px;
  margin-top: 0;
  overflow: hidden;
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

:deep(.van-nav-bar) {
  background: transparent;
  border-bottom: none;
  z-index: 100;
}

:deep(.van-nav-bar__title) {
  color: #333;
  font-size: 16px;
}

:deep(.van-nav-bar__arrow) {
  color: #333;
}

.list-content {
  background: #fff;
  min-height: calc(100vh - 160px);
  margin-top: -46px;
  position: relative;
  z-index: 1;
}

.notice-section {
  background: #fff;
  padding: 12px 0;
}

:deep(.van-cell) {
  background-color: transparent;
  padding: 16px;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &:last-child {
    border-bottom: none;
  }
}

:deep(.van-cell__title) {
  font-size: 15px;
  color: #323233;
  line-height: 1.4;
  margin-bottom: 4px;
}

:deep(.van-cell__label) {
  font-size: 12px;
  color: #969799;
  line-height: 1.4;
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
}

:deep(.van-tabbar-item) {
  color: #646566;
  font-size: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

:deep(.van-tabbar-item--active) {
  color: #1989fa;
}

:deep(.van-tabbar-item__icon) {
  font-size: 20px;
  margin-bottom: 4px;
}

:deep(.van-tabbar-item__text) {
  transform: scale(0.9);
}
</style> 