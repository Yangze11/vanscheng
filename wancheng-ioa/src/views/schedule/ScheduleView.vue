<template>
  <div class="page-wrapper">
    <div class="schedule-container">
      <!-- 顶部标题栏 -->
      <div class="header">
        <h1 class="title">日程</h1>
      </div>

      <!-- 日历视图 -->
      <div class="calendar-wrapper">
        <div class="month-selector">
          <div class="arrow left" @click="prevMonth">&lt;</div>
          <span>{{ currentYearMonth }}</span>
          <div class="arrow right" @click="nextMonth">&gt;</div>
        </div>
        <div class="calendar-header">
          <div class="weekday" v-for="day in weekDays" :key="day">
            {{ day }}
          </div>
        </div>
        <div class="calendar-body">
          <div 
            v-for="(day, index) in calendarDays" 
            :key="index"
            class="calendar-day"
            :class="{
              'other-month': !day.isCurrentMonth,
              'selected': isSelectedDate(day.date),
              'today': isToday(day.date),
              'has-events': hasEvents(day.date)
            }"
            @click="selectDate(day.date)"
          >
            <span class="day-number">{{ day.dayNumber }}</span>
            <div v-if="hasShift(day.date)" class="event-indicator shift">排班</div>
            <div v-if="getEventCount(day.date) > 0" class="event-indicator event">
              {{ getEventCount(day.date) }}个日程
            </div>
          </div>
        </div>
      </div>

      <!-- 排班信息 -->
      <div class="schedule-section">
        <div class="section-title">
          <span class="icon">📅</span>
          <span>排班信息</span>
        </div>
        <div class="shift-info">
          <div v-if="selectedDateShift" class="shift-card">
            <div class="shift-header">
              <span class="icon">⏰</span>
              <span>{{ selectedDateShift.type }}</span>
            </div>
            <div class="shift-time">{{ selectedDateShift.time }}</div>
            <div class="shift-location">
              <span class="icon">📍</span>
              <span>{{ selectedDateShift.location }}</span>
            </div>
          </div>
          <div v-else class="empty-info">
            当日无排班信息
          </div>
        </div>
      </div>

      <!-- 日程列表 -->
      <div class="schedule-section">
        <div class="section-title">
          <span class="icon">📋</span>
          <span>日程安排</span>
          <span class="date-display">{{ formatDate(selectedDate) }}</span>
        </div>
        <div v-if="selectedDateEvents.length > 0" class="event-list">
          <div 
            v-for="(event, index) in selectedDateEvents" 
            :key="index" 
            class="event-card"
          >
            <div class="event-time">{{ event.time }}</div>
            <div class="event-content">
              <div class="event-type">{{ event.type }}</div>
              <div class="event-title">{{ event.title }}</div>
              <div v-if="event.location" class="event-location">
                <span class="icon">📍</span>
                <span>{{ event.location }}</span>
              </div>
              <div v-if="event.participants" class="event-participants">
                <span class="icon">👥</span>
                <span>{{ event.participants }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="empty-info">
          暂无日程安排
        </div>
      </div>
    </div>

    <!-- 底部导航栏 -->
    <div class="nav-bar">
      <van-tabbar v-model="active" route>
        <van-tabbar-item replace to="/home" name="home">
          <template #icon="props">
            <img :src="'https://s1.imagehub.cc/images/2025/03/13/2ad05005341f608e0b06350eec52da28.png'" :style="{
              height: '25px',
              filter: props.active ? 'none' : 'grayscale(100%)'
            }" />
          </template>
          <span>首页</span>
        </van-tabbar-item>
        <van-tabbar-item replace to="/workspace" name="workspace">
          <template #icon="props">
            <img :src="props.active ? 'https://s1.imagehub.cc/images/2025/03/13/26cffb1a240453f7f4a9e50c85a8fa5c.png' : 'https://s1.imagehub.cc/images/2025/03/12/207aa925aad2ce9de809451dad34c682.png'" style="height: 25px;" />
          </template>
          <span>工作台</span>
        </van-tabbar-item>
        <van-tabbar-item replace to="/todo" name="todo">
          <template #icon="props">
            <img :src="props.active ? 'https://s1.imagehub.cc/images/2025/03/13/74a2b2452a2b76748bbcb0614c49440e.png' : 'https://s1.imagehub.cc/images/2025/03/12/ab0885d0d8deabc120bb23817b8aa5a8.png'" style="height: 25px;" />
          </template>
          <span>待办</span>
        </van-tabbar-item>
        <van-tabbar-item replace to="/schedule" name="schedule">
          <template #icon="props">
            <img :src="props.active ? 'https://s1.imagehub.cc/images/2025/03/13/5c4d49b825a88559781f5c5db782c2ca.png' : 'https://s1.imagehub.cc/images/2025/03/12/4a9d82791c32c42b6d09a0c1fd1d1be9.png'" style="height: 25px;" />
          </template>
          <span>日程</span>
        </van-tabbar-item>
        <van-tabbar-item replace to="/profile" name="profile">
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
import { useRoute, useRouter } from 'vue-router';
import { 
  Calendar,
  Cell, 
  CellGroup, 
  Empty, 
  Tabbar, 
  TabbarItem, 
  Icon, 
  Field, 
  Popup,
  DatePicker
} from 'vant';

// 路由相关
const route = useRoute();
const router = useRouter();

// 当前激活的标签页
const active = ref('schedule');

// 在组件挂载时初始化数据
onMounted(() => {
  // 设置当前日期
  currentDate.value = new Date();
  selectedDate.value = new Date();
  
  // 设置激活的标签页
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

// 当前日期
const currentDate = ref(new Date());
const selectedDate = ref(new Date());

// 日期范围
const minDate = new Date(new Date().getFullYear() - 1, 0, 1);
const maxDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

// 当前年月显示
const currentYearMonth = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth() + 1;
  return `${year}年${month}月`;
});

// 月份切换
const prevMonth = () => {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(newDate.getMonth() - 1);
  const minYearMonth = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
  if (newDate >= minYearMonth) {
    currentDate.value = newDate;
    selectedDate.value = newDate;
  }
};

const nextMonth = () => {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(newDate.getMonth() + 1);
  const now = new Date();
  const maxYearMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  if (newDate <= maxYearMonth) {
    currentDate.value = newDate;
    selectedDate.value = newDate;
  }
};

// 模拟的排班数据
const allShifts = [
  // 当前月
  {
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 5),
    type: '早班',
    time: '08:30 - 17:30',
    location: 'A区办公室'
  },
  {
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 6),
    type: '晚班',
    time: '13:30 - 22:30',
    location: 'B区办公室'
  },
  {
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 7),
    type: '中班',
    time: '10:30 - 19:30',
    location: 'A区办公室'
  }
];

// 模拟的日程数据
const events = [
  {
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 5),
    title: '部门周会',
    time: '10:00 - 11:30',
    type: '会议',
    location: '3楼会议室A',
    participants: '全体部门成员'
  },
  {
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 5),
    title: '项目进度汇报',
    time: '14:00 - 15:00',
    type: '工作',
    location: '2楼小会议室',
    participants: '项目组成员'
  }
];

// 根据选中日期过滤排班信息
const selectedDateShift = computed(() => {
  return allShifts.find(shift => 
    shift.date.getFullYear() === selectedDate.value.getFullYear() &&
    shift.date.getMonth() === selectedDate.value.getMonth() &&
    shift.date.getDate() === selectedDate.value.getDate()
  );
});

// 根据选中日期过滤事件
const selectedDateEvents = computed(() => {
  return events.filter(event => 
    event.date.getFullYear() === selectedDate.value.getFullYear() &&
    event.date.getMonth() === selectedDate.value.getMonth() &&
    event.date.getDate() === selectedDate.value.getDate()
  );
});

// 日历单元格格式化
const calendarFormatter = (day) => {
  const result = {
    ...day,
    text: String(day.date.getDate()),
    topInfo: '',
    bottomInfo: ''
  };
  
  // 检查是否有排班
  const hasShift = allShifts.some(shift => 
    shift.date.getFullYear() === day.date.getFullYear() &&
    shift.date.getMonth() === day.date.getMonth() &&
    shift.date.getDate() === day.date.getDate()
  );
  
  // 检查是否有日程
  const eventsForDay = events.filter(event => 
    event.date.getFullYear() === day.date.getFullYear() &&
    event.date.getMonth() === day.date.getMonth() &&
    event.date.getDate() === day.date.getDate()
  );
  
  if (hasShift) {
    result.topInfo = '排班';
  }
  
  if (eventsForDay.length > 0) {
    result.bottomInfo = `${eventsForDay.length}个日程`;
  }
  
  return result;
};

// 点击日期事件
const onClickDate = (date) => {
  selectedDate.value = date;
};

// 格式化日期显示
const formatDate = (date) => {
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return `${date.getMonth() + 1}月${date.getDate()}日 ${weekdays[date.getDay()]}`;
};

// 根据事件类型获取样式类
const getEventClass = (type) => {
  switch (type) {
    case '会议': return 'meeting';
    case '工作': return 'work';
    case '外勤': return 'field';
    case '活动': return 'activity';
    default: return '';
  }
};

// 根据排班类型获取样式类
const getShiftClass = (type) => {
  switch (type) {
    case '早班': return 'morning-shift';
    case '中班': return 'mid-shift';
    case '晚班': return 'night-shift';
    default: return '';
  }
};

// 根据排班类型获取图标
const getShiftIcon = (type) => {
  switch (type) {
    case '早班': return 'sunrise';
    case '中班': return 'clock-o';
    case '晚班': return 'moon-o';
    default: return 'clock-o';
  }
};

// 处理标签页切换
const handleTabChange = async (index) => {
  try {
    const routes = {
      0: '/home',
      1: '/workspace',
      2: '/todo',
      3: '/schedule',
      4: '/profile'
    };
    
    const path = routes[index];
    if (path && path !== route.path) {
      await router.push(path);
    }
  } catch (error) {
    console.error('路由跳转错误:', error);
  }
};

// 计算日历天数
const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const days = [];
  
  // 添加上个月的日期
  const firstDayWeekday = firstDay.getDay();
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    const date = new Date(year, month, -i);
    days.push({
      date,
      dayNumber: date.getDate(),
      isCurrentMonth: false
    });
  }
  
  // 添加当前月的日期
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i);
    days.push({
      date,
      dayNumber: i,
      isCurrentMonth: true
    });
  }
  
  // 添加下个月的日期
  const remainingDays = 42 - days.length; // 保持6行
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i);
    days.push({
      date,
      dayNumber: i,
      isCurrentMonth: false
    });
  }
  
  return days;
});

// 日期选择
const selectDate = (date) => {
  selectedDate.value = date;
};

// 日期判断工具函数
const isSelectedDate = (date) => {
  return date.getFullYear() === selectedDate.value.getFullYear() &&
         date.getMonth() === selectedDate.value.getMonth() &&
         date.getDate() === selectedDate.value.getDate();
};

const isToday = (date) => {
  const today = new Date();
  return date.getFullYear() === today.getFullYear() &&
         date.getMonth() === today.getMonth() &&
         date.getDate() === today.getDate();
};

// 事件相关函数
const hasShift = (date) => {
  return allShifts.some(shift => 
    shift.date.getFullYear() === date.getFullYear() &&
    shift.date.getMonth() === date.getMonth() &&
    shift.date.getDate() === date.getDate()
  );
};

const getEventCount = (date) => {
  return events.filter(event => 
    event.date.getFullYear() === date.getFullYear() &&
    event.date.getMonth() === date.getMonth() &&
    event.date.getDate() === date.getDate()
  ).length;
};

const hasEvents = (date) => {
  return hasShift(date) || getEventCount(date) > 0;
};
</script>

<style scoped>
.page-wrapper {
  height: 100vh;
  overflow-y: auto;
  position: relative;
}

.schedule-container {
  display: flex;
  flex-direction: column;
  background-color: #f7f8fa;
  padding-bottom: 60px;
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

.calendar-wrapper {
  background-color: white;
  margin: 12px;
  box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
  border-radius: 8px;
  overflow: hidden;
}

.month-selector {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #1989fa;
  color: white;
}

.month-selector span {
  font-size: 18px;
  font-weight: 500;
}

.month-selector .van-icon {
  font-size: 20px;
  color: white;
  cursor: pointer;
}

.calendar-header {
  display: flex;
  justify-content: space-around;
  padding: 12px 0;
  background-color: #f7f8fa;
  border-bottom: 1px solid #ebedf0;
}

.weekday {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #646566;
}

.calendar-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #eee;
}

.calendar-day {
  background: white;
  min-height: 80px;
  padding: 8px;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.calendar-day:hover {
  background-color: #f5f5f5;
}

.day-number {
  font-size: 16px;
  font-weight: 500;
}

.other-month {
  color: #999;
  background-color: #fafafa;
}

.selected {
  background-color: #e6f7ff;
}

.today .day-number {
  color: #1989fa;
  font-weight: bold;
}

.event-indicator {
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 4px;
  text-align: center;
}

.event-indicator.shift {
  background-color: #ffecb3;
  color: #ff9800;
}

.event-indicator.event {
  background-color: #e3f2fd;
  color: #1989fa;
}

.schedule-section {
  background-color: white;
  margin: 0 12px 12px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
}

.section-title {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #ebedf0;
  position: relative;
}

.section-icon {
  font-size: 18px;
  color: #1989fa;
  margin-right: 8px;
}

.section-title span {
  font-size: 16px;
  font-weight: 500;
}

.date-display {
  position: absolute;
  right: 16px;
  font-size: 14px;
  color: #969799;
  font-weight: normal;
}

.shift-info {
  padding: 16px;
}

.shift-card {
  background-color: #f7f8fa;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.shift-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.shift-header .van-icon {
  font-size: 18px;
  margin-right: 8px;
}

.shift-header span {
  font-size: 16px;
  font-weight: 500;
}

.shift-time {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
}

.shift-location {
  display: flex;
  align-items: center;
  color: #646566;
}

.shift-location .van-icon {
  font-size: 14px;
  margin-right: 4px;
}

.empty-shift {
  padding: 20px 0;
}

.event-list {
  padding: 8px 16px;
}

.event-card {
  display: flex;
  margin-bottom: 16px;
  background-color: #f7f8fa;
  border-radius: 8px;
  overflow: hidden;
}

.event-time {
  width: 80px;
  padding: 12px;
  background-color: #f2f3f5;
  font-size: 14px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.event-content {
  flex: 1;
  padding: 12px;
}

.event-tag {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  color: white;
  margin-bottom: 8px;
}

.event-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
}

.event-location, .event-participants {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #646566;
  margin-top: 4px;
}

.event-location .van-icon, .event-participants .van-icon {
  font-size: 14px;
  margin-right: 4px;
}

.meeting {
  background-color: #1989fa;
}

.work {
  background-color: #07c160;
}

.field {
  background-color: #ff976a;
}

.activity {
  background-color: #7232dd;
}

.empty-events {
  padding: 20px 0;
}

.nav-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.bottom-placeholder {
  height: 60px;
}

:deep(.custom-calendar) {
  --calendar-height: auto;
  --calendar-day-height: 64px;
}

:deep(.van-calendar__day) {
  height: var(--calendar-day-height);
  margin: 0;
  border-bottom: 1px solid #ebedf0;
  border-right: 1px solid #ebedf0;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 8px 0;
}

:deep(.van-calendar__day:nth-child(7n)) {
  border-right: none;
}

:deep(.van-calendar__day--today) {
  color: #1989fa;
  background-color: rgba(25, 137, 250, 0.1);
  font-weight: 500;
}

:deep(.van-calendar__selected-day) {
  background-color: #1989fa !important;
  color: white !important;
}

:deep(.van-calendar__day-label) {
  display: none !important;
}

:deep(.van-calendar__text) {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-size: 16px;
  font-weight: normal;
  color: #323233;
  border-radius: 4px;
}

:deep(.van-calendar__selected-day .van-calendar__text) {
  background-color: #1989fa;
  color: white;
}

:deep(.van-calendar__top-info),
:deep(.van-calendar__bottom-info) {
  position: absolute;
  left: 0;
  right: 0;
  font-size: 10px;
  padding: 2px 4px;
  text-align: center;
  height: auto;
  line-height: 1.2;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

:deep(.van-calendar__top-info) {
  top: 4px;
}

:deep(.van-calendar__bottom-info) {
  bottom: 4px;
}

:deep(.van-tabbar) {
  height: 60px;
  border-top: 1px solid #f2f2f2;
  background-color: white;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.05);
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