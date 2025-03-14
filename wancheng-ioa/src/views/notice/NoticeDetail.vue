<template>
  <div class="notice-detail">
    <van-nav-bar
      title="公告详情"
      left-arrow
      @click-left="onClickLeft"
      fixed
      placeholder
    />
    
    <div class="header-image">
      <img :src="headerImage" class="banner-img" />
    </div>
    
    <div class="notice-content">
      <div class="notice-container">
        <div class="notice-header">
          <h1 class="title">{{ currentNotice?.title }}</h1>
          <div class="meta">
            <div class="meta-item">
              <span class="label">发文部门：</span>
              <span class="value department">{{ currentNotice?.department }}</span>
            </div>
            <div class="meta-item">
              <span class="label">发文时间：</span>
              <span class="value">{{ currentNotice?.time }}</span>
            </div>
          </div>
        </div>
        <div class="content" v-html="currentNotice?.content"></div>
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
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const headerImage = new URL('@/assets/images/banner/banner1.png', import.meta.url).href

const currentNotice = ref(null)

const noticeData = {
  '1': {
    id: '1',
    title: '关于启动万程IOA系统通知',
    time: '2025-03-11',
    department: '人资与组织运营中心',
    content: `
      <p>尊敬的各位同事：</p>
      <p>为提升公司整体办公效率，我们很高兴地宣布万程IOA系统正式启用。该系统将全面覆盖日常办公所需的各项功能，包括但不限于：考勤打卡、请假申请、报销管理、绩效考核等。</p>
      <p>请各部门员工及时登录系统，完成个人信息的初始化设置。</p>
    `
  },
  '2': {
    id: '2',
    title: '2025年新入职流程规范',
    time: '2025-03-11',
    department: '人资与组织运营中心',
    content: `
      <p>各部门负责人：</p>
      <p>为进一步规范新员工入职流程，提升入职体验，现对2025年新入职流程进行优化和规范。主要变更包括：</p>
      <p>1. 入职材料电子化提交</p>
      <p>2. 入职培训系统化管理</p>
      <p>3. 导师制度全面实施</p>
    `
  },
  '3': {
    id: '3',
    title: '2025年广西三月三放假通知',
    time: '2025-03-11',
    department: '人资与组织运营中心',
    content: `
      <p>全体员工：</p>
      <p>根据国家法定节假日安排，现将2025年广西三月三放假安排通知如下：</p>
      <p>1. 放假时间：2025年3月3日至3月5日，共3天</p>
      <p>2. 调休安排：3月1日（周六）正常上班</p>
      <p>请各部门合理安排工作，确保放假期间各项工作有序进行。</p>
    `
  },
  '4': {
    id: '4',
    title: '2025年清明节放假通知',
    time: '2025-03-11',
    department: '人资与组织运营中心',
    content: `
      <p>全体员工：</p>
      <p>根据国务院办公厅通知，现将2025年清明节放假安排通知如下：</p>
      <p>1. 放假时间：2025年4月4日至4月6日，共3天</p>
      <p>2. 调休安排：无需调休</p>
      <p>请大家提前做好工作安排，确保节日期间各项工作正常开展。</p>
    `
  }
}

onMounted(() => {
  const noticeId = route.params.id
  console.log('当前公告ID:', noticeId)
  console.log('可用的公告数据:', noticeData)
  if (noticeId && noticeData[noticeId]) {
    currentNotice.value = noticeData[noticeId]
    console.log('加载的公告数据:', currentNotice.value)
  } else {
    console.log('未找到公告数据，返回首页')
    router.replace('/home')
  }
})

const onClickLeft = () => {
  router.push('/home')
}
</script>

<style lang="scss" scoped>
.notice-detail {
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

:deep(.van-nav-bar .van-icon) {
  color: #333;
}

.notice-content {
  background: #fff;
  min-height: calc(100vh - 160px);
  margin-top: -46px;
  position: relative;
  z-index: 1;
}

.notice-container {
  padding: 20px 16px;
}

.notice-header {
  text-align: center;
  margin-bottom: 24px;
}

.title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px;
  line-height: 1.4;
}

.meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #666;
  font-size: 14px;
}

.meta-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.label {
  color: #666;
}

.value {
  color: #333;
}

.department {
  color: #4a90e2;
}

.content {
  line-height: 1.8;
  text-align: justify;
}

.content p {
  margin: 0 0 16px;
  color: #333;
  font-size: 15px;
  text-indent: 2em;
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