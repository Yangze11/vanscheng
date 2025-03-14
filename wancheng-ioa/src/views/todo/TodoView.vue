# 待办页面
<template>
  <div class="page-wrapper">
    <div class="todo-container">
      <!-- 顶部标题栏 -->
      <div class="header">
        <h1 class="title">待办</h1>
      </div>

      <!-- 功能分类 -->
      <div class="category-tabs">
        <div 
          v-for="(tab, index) in tabs" 
          :key="index"
          class="tab-item"
          :class="{ active: currentTab === index }"
          @click="currentTab = index"
        >
          <img :src="tab.icon" :alt="tab.name" class="tab-icon" />
          <span>{{ tab.name }}</span>
          <span class="count" v-if="tab.count > 0">{{ tab.count }}</span>
        </div>
      </div>

      <!-- 待办列表 -->
      <div class="content-area" v-if="currentTab === 0">
        <div class="todo-list">
          <div v-if="filteredTodos.length > 0">
            <div 
              v-for="(todo, index) in filteredTodos" 
              :key="index"
              class="todo-item"
              :class="{ completed: todo.completed }"
            >
              <div class="todo-checkbox" @click="toggleTodo(index)">
                <span class="checkbox-icon">{{ todo.completed ? '✓' : '' }}</span>
              </div>
              <div class="todo-content">
                <div class="todo-title">{{ todo.title }}</div>
                <div class="todo-info">
                  <span class="priority" :class="'priority-' + todo.priority">
                    {{ getPriorityText(todo.priority) }}
                  </span>
                  <span class="deadline">截止时间：{{ todo.deadline }}</span>
                </div>
                <div class="todo-description">{{ todo.description }}</div>
              </div>
            </div>
          </div>
          <div v-else class="empty-state">
            暂无待办事项
          </div>
        </div>
      </div>

      <!-- 审批列表 -->
      <div class="content-area" v-if="currentTab === 1">
        <div class="approval-list">
          <div v-if="approvals.length > 0">
            <div 
              v-for="(approval, index) in approvals" 
              :key="index"
              class="approval-item"
            >
              <div class="approval-content">
                <div class="approval-header">
                  <span class="approval-type">{{ approval.type }}</span>
                  <span class="approval-status" :class="approval.status">
                    {{ getStatusText(approval.status) }}
                  </span>
                </div>
                <div class="approval-title">{{ approval.title }}</div>
                <div class="approval-info">
                  <span class="applicant">申请人：{{ approval.applicant }}</span>
                  <span class="submit-time">提交时间：{{ approval.submitTime }}</span>
                </div>
              </div>
              <div class="approval-actions" v-if="approval.status === 'pending'">
                <button class="approve-btn" @click="handleApprove(index)">同意</button>
                <button class="reject-btn" @click="handleReject(index)">拒绝</button>
              </div>
            </div>
          </div>
          <div v-else class="empty-state">
            暂无审批事项
          </div>
        </div>
      </div>

      <!-- 申请列表 -->
      <div class="content-area" v-if="currentTab === 2">
        <div class="application-list">
          <div v-if="applications.length > 0">
            <div 
              v-for="(application, index) in applications" 
              :key="index"
              class="application-item"
            >
              <div class="application-content">
                <div class="application-header">
                  <span class="application-type">{{ application.type }}</span>
                  <span class="application-status" :class="application.status">
                    {{ getStatusText(application.status) }}
                  </span>
                </div>
                <div class="application-title">{{ application.title }}</div>
                <div class="application-info">
                  <span class="submit-time">提交时间：{{ application.submitTime }}</span>
                  <span class="approver">审批人：{{ application.approver }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="empty-state">
            暂无申请记录
          </div>
        </div>
      </div>

      <!-- 添加按钮 -->
      <div class="add-button" @click="showAddMenu = true">
        <div class="plus-icon">+</div>
      </div>

      <!-- 添加菜单 -->
      <div class="add-menu" v-if="showAddMenu" @click="showAddMenu = false">
        <div class="menu-content" @click.stop>
          <div class="menu-item" @click="handleAddTodo">
            <span class="menu-icon">📝</span>
            <span>添加待办</span>
          </div>
          <div class="menu-item" @click="handleAddApplication">
            <span class="menu-icon">📋</span>
            <span>新建申请</span>
          </div>
        </div>
      </div>

      <!-- 申请详情弹窗 -->
      <van-popup
        v-model:show="showDetail"
        position="bottom"
        :style="{ height: '80%' }"
        round
      >
        <div class="application-detail">
          <div class="detail-header">
            <h3>申请详情</h3>
            <van-icon name="cross" @click="showDetail = false" />
          </div>
          <van-form v-if="currentApplication">
            <div class="detail-content">
              <div class="detail-item">
                <span class="label">申请类型：</span>
                <span class="value">{{ currentApplication.type }}</span>
              </div>
              <div class="detail-item">
                <span class="label">审批编号：</span>
                <span class="value">{{ currentApplication.auditNumber }}</span>
              </div>
              <div class="detail-item">
                <span class="label">申请标题：</span>
                <span class="value">{{ currentApplication.title }}</span>
              </div>
              <div class="detail-item">
                <span class="label">提交时间：</span>
                <span class="value">{{ currentApplication.submitTime }}</span>
              </div>
              <div class="detail-item">
                <span class="label">审批状态：</span>
                <span class="value" :class="currentApplication.status">
                  {{ getStatusText(currentApplication.status) }}
                </span>
              </div>
              <div class="detail-item">
                <span class="label">审批人：</span>
                <span class="value">{{ currentApplication.approver }}</span>
              </div>
              <div class="detail-content-section">
                <h4>申请内容</h4>
                <div class="content-box">
                  <pre>{{ JSON.stringify(currentApplication.content, null, 2) }}</pre>
                </div>
              </div>
            </div>
          </van-form>
        </div>
      </van-popup>
    </div>

    <!-- 底部导航栏 -->
    <div class="nav-bar">
      <van-tabbar v-model="active" route>
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
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const showAddMenu = ref(false);
const active = ref('todo');

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

// 导航栏数据
const navItems = [
  { 
    icon: `<svg viewBox="0 0 1024 1024" width="24" height="24"><path d="M512 128L128 447.936V896h255.936V640c0-35.328 28.736-64 64.064-64h128c35.328 0 64 28.672 64 64v256H896V447.936L512 128z" fill="currentColor"/></svg>`,
    text: '首页', 
    route: '/home' 
  },
  { 
    icon: `<img src="https://s1.imagehub.cc/images/2025/03/12/0b22b415478697226af4e592143ed1af.png" alt="工作台" style="width: 22px; height: 22px; object-fit: contain;">`,
    text: '工作台', 
    route: '/workspace' 
  },
  { 
    icon: `<svg viewBox="0 0 1024 1024" width="24" height="24"><path d="M896 192H128v640h768V192zM128 128h768c35.328 0 64 28.672 64 64v640c0 35.328-28.672 64-64 64H128c-35.328 0-64-28.672-64-64V192c0-35.328 28.672-64 64-64z m64 160h640v64H192V288z m0 160h640v64H192V448z m0 160h640v64H192V608z" fill="currentColor"/></svg>`,
    text: '待办', 
    route: '/todo' 
  },
  { 
    icon: `<svg viewBox="0 0 1024 1024" width="24" height="24"><path d="M896 192H128v640h768V192zM128 128h768c35.328 0 64 28.672 64 64v640c0 35.328-28.672 64-64 64H128c-35.328 0-64-28.672-64-64V192c0-35.328 28.672-64 64-64z m64 256h128v128H192V384z m0 256h128v128H192V640z m256-256h128v128H448V384z m0 256h128v128H448V640z m256-256h128v128H704V384z m0 256h128v128H704V640z" fill="currentColor"/></svg>`,
    text: '日程', 
    route: '/schedule' 
  },
  { 
    icon: `<svg viewBox="0 0 1024 1024" width="24" height="24"><path d="M512 128c-106.368 0-192 85.632-192 192s85.632 192 192 192 192-85.632 192-192-85.632-192-192-192z m0 320c-70.912 0-128-57.088-128-128s57.088-128 128-128 128 57.088 128 128-57.088 128-128 128z m0 128c-159.936 0-288 128.064-288 288v32c0 17.664 14.336 32 32 32s32-14.336 32-32v-32c0-123.52 100.48-224 224-224s224 100.48 224 224v32c0 17.664 14.336 32 32 32s32-14.336 32-32v-32c0-159.936-128.064-288-288-288z" fill="currentColor"/></svg>`,
    text: '我的', 
    route: '/profile' 
  }
];

// 标签页数据
const tabs = [
  { 
    name: '待办事项', 
    count: 3,
    icon: 'https://s1.imagehub.cc/images/2025/03/12/b4c75332f64ca25ddd2074c468b881a9.png'
  },
  { 
    name: '待审批', 
    count: 2,
    icon: 'https://s1.imagehub.cc/images/2025/03/12/abd8a105ab447b212fae6bde3b157b9a.png'
  },
  { 
    name: '我的申请', 
    count: 1,
    icon: 'https://s1.imagehub.cc/images/2025/03/12/e8c06da845505dee5f308e580aacecb7.png'
  }
];

const currentTab = ref(0);

// 待办事项数据
const todos = ref([
  {
    title: '完成项目报告',
    description: '整理本周项目进度，编写周报',
    deadline: '2024-03-15 18:00',
    priority: 'high',
    completed: false
  },
  {
    title: '部门会议',
    description: '讨论下季度工作计划',
    deadline: '2024-03-16 10:00',
    priority: 'medium',
    completed: false
  }
]);

// 审批数据
const approvals = ref([
  {
    type: '请假申请',
    title: '张三的病假申请',
    applicant: '张三',
    submitTime: '2024-03-15 09:00',
    status: 'pending'
  },
  {
    type: '报销申请',
    title: '差旅费报销',
    applicant: '李四',
    submitTime: '2024-03-14 14:30',
    status: 'approved'
  }
]);

// 申请数据
const applications = ref([
  {
    type: '加班申请',
    title: '项目加急加班',
    submitTime: '2024-03-13 18:00',
    approver: '王经理',
    status: 'approved'
  },
  {
    type: '请假申请',
    title: '年假申请',
    submitTime: '2024-03-12 10:00',
    approver: '王经理',
    status: 'rejected'
  }
]);

// 根据当前标签过滤待办事项
const filteredTodos = computed(() => todos.value);

// 切换待办事项状态
const toggleTodo = (index) => {
  todos.value[index].completed = !todos.value[index].completed;
};

// 获取优先级文本
const getPriorityText = (priority) => {
  const map = {
    high: '高优先级',
    medium: '中优先级',
    low: '低优先级'
  };
  return map[priority] || '';
};

// 获取状态文本
const getStatusText = (status) => {
  const map = {
    pending: '待审批',
    approved: '已通过',
    rejected: '已拒绝'
  };
  return map[status] || '';
};

// 处理审批操作
const handleApprove = (index) => {
  approvals.value[index].status = 'approved';
};

const handleReject = (index) => {
  approvals.value[index].status = 'rejected';
};

// 处理添加操作
const handleAddTodo = () => {
  showAddMenu.value = false;
  // 添加待办的逻辑
};

const handleAddApplication = () => {
  showAddMenu.value = false;
  // 添加申请的逻辑
};

// 处理导航点击
const handleNavClick = (index) => {
  active.value = index;
  router.push(navItems[index].route);
};

// 申请详情弹窗
const showDetail = ref(false);
const currentApplication = ref(null);

// 处理申请详情弹窗
const handleApplicationDetail = (application) => {
  currentApplication.value = application;
  showDetail.value = true;
};
</script>

<style scoped>
.page-wrapper {
  height: 100vh;
  overflow-y: auto;
  background-color: #f7f8fa;
}

.todo-container {
  padding-bottom: calc(50px + env(safe-area-inset-bottom));
}

.header {
  background-color: #1989fa;
  color: white;
  padding: 16px;
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 100;
}

.title {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
}

.category-tabs {
  display: flex;
  background-color: white;
  padding: 12px;
  margin-bottom: 12px;
  box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 8px 0;
  font-size: 14px;
  color: #666;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.tab-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.tab-item.active {
  color: #1989fa;
  font-weight: 500;
}

.tab-item .count {
  background-color: #ff4d4f;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  position: absolute;
  top: 0;
  right: 20%;
  transform: translateY(-50%);
}

.content-area {
  padding: 12px;
}

.todo-list {
  padding: 12px;
}

.todo-item {
  background-color: white;
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 16px;
  display: flex;
  align-items: flex-start;
  box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
}

.todo-checkbox {
  width: 24px;
  height: 24px;
  border: 2px solid #ddd;
  border-radius: 4px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}

.completed .todo-checkbox {
  background-color: #1989fa;
  border-color: #1989fa;
}

.checkbox-icon {
  color: white;
  font-size: 16px;
}

.todo-content {
  flex: 1;
}

.todo-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
}

.completed .todo-title {
  color: #999;
  text-decoration: line-through;
}

.todo-info {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
}

.priority {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.priority-high {
  background-color: #fff1f0;
  color: #ff4d4f;
}

.priority-medium {
  background-color: #fff7e6;
  color: #fa8c16;
}

.priority-low {
  background-color: #f6ffed;
  color: #52c41a;
}

.deadline {
  font-size: 12px;
  color: #666;
}

.todo-description {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.empty-state {
  text-align: center;
  padding: 32px;
  color: #999;
}

.add-button {
  position: fixed;
  right: 24px;
  bottom: 84px;
  width: 56px;
  height: 56px;
  background-color: #1989fa;
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(25, 137, 250, 0.3);
  cursor: pointer;
}

.plus-icon {
  color: white;
  font-size: 32px;
  font-weight: 300;
}

.approval-list {
  padding: 12px;
}

.approval-item {
  background-color: white;
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
}

.approval-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.approval-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.approval-type {
  font-size: 14px;
  color: #666;
}

.approval-status {
  font-size: 14px;
  padding: 2px 8px;
  border-radius: 4px;
}

.pending {
  background-color: #e6f7ff;
  color: #1989fa;
}

.approved {
  background-color: #f6ffed;
  color: #52c41a;
}

.rejected {
  background-color: #fff1f0;
  color: #ff4d4f;
}

.approval-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
}

.approval-info {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
}

.approval-actions {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}

.approve-btn, .reject-btn {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.approve-btn {
  background-color: #1989fa;
  color: white;
}

.reject-btn {
  background-color: #ff4d4f;
  color: white;
}

.application-list {
  padding: 12px;
}

.application-item {
  background-color: white;
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
}

.application-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.application-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.application-type {
  font-size: 14px;
  color: #666;
}

.application-status {
  font-size: 14px;
  padding: 2px 8px;
  border-radius: 4px;
}

.application-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
}

.application-info {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
}

.add-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.menu-content {
  background-color: white;
  width: 100%;
  border-radius: 16px 16px 0 0;
  padding: 16px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 16px;
  font-size: 16px;
  cursor: pointer;
}

.menu-icon {
  font-size: 20px;
  margin-right: 12px;
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

.application-detail {
  padding: 16px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.detail-header h3 {
  font-size: 18px;
  font-weight: 500;
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  font-weight: 500;
}

.value {
  margin-left: 16px;
}

.detail-content-section {
  margin-top: 16px;
}

.content-box {
  background-color: #f7f8fa;
  padding: 16px;
  border-radius: 8px;
}
</style> 