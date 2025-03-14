<template>
  <div class="workspace-page">
    <div class="header-image">
      <img :src="headerImage" class="banner-img" />
    </div>

    <!-- 功能区域 -->
    <div class="functions-wrapper">
      <!-- 人事办理 -->
      <div class="function-section">
        <div class="section-title">
          <van-icon name="friends-o" color="#4a90e2" />
          <span>人事办理</span>
        </div>
        <van-grid :column-num="3" :border="false" :gutter="8">
          <van-grid-item @click="router.push('/onboarding')">
            <template #icon>
              <img src="https://s1.imagehub.cc/images/2025/03/12/0b22b415478697226af4e592143ed1af.png" alt="入职办理" style="width: 20px; height: 20px; object-fit: contain;" />
            </template>
            <template #text>入职办理</template>
          </van-grid-item>
          <van-grid-item>
            <template #icon>
              <img src="https://s1.imagehub.cc/images/2025/03/12/e822ee782ada3494a9b205de542a49d0.png" alt="离职办理" style="width: 20px; height: 20px; object-fit: contain;" />
            </template>
            <template #text>离职办理</template>
          </van-grid-item>
          <van-grid-item>
            <template #icon>
              <img src="https://s1.imagehub.cc/images/2025/03/12/9a223269b3f6b96fb9570f46333f73cc.png" alt="转正申请" style="width: 20px; height: 20px; object-fit: contain;" />
            </template>
            <template #text>转正申请</template>
          </van-grid-item>
        </van-grid>
      </div>
      
      <!-- 考勤管理 -->
      <div class="function-section">
        <div class="section-title">
          <van-icon name="clock-o" color="#4a90e2" />
          <span>考勤管理</span>
        </div>
        <van-grid :column-num="3" :border="false" :gutter="8">
          <van-grid-item>
            <template #icon>
              <img src="https://s1.imagehub.cc/images/2025/03/12/e5f3e9e8870ed772455bf716adc8c009.png" alt="请假申请" style="width: 20px; height: 20px; object-fit: contain;" />
            </template>
            <template #text>请假申请</template>
          </van-grid-item>
          <van-grid-item>
            <template #icon>
              <img src="https://s1.imagehub.cc/images/2025/03/12/ddd8e67d955bd3ed2261200a1051d84f.png" alt="补卡申请" style="width: 20px; height: 20px; object-fit: contain;" />
            </template>
            <template #text>补卡申请</template>
          </van-grid-item>
          <van-grid-item>
            <template #icon>
              <img src="https://s1.imagehub.cc/images/2025/03/12/54799c089d0774bf3a0088f7463f5901.png" alt="加班申请" style="width: 20px; height: 20px; object-fit: contain;" />
            </template>
            <template #text>加班申请</template>
          </van-grid-item>
          <van-grid-item>
            <template #icon>
              <img src="https://s1.imagehub.cc/images/2025/03/12/45261c176ed7b19164eeef1ddf76027c.png" alt="调休申请" style="width: 20px; height: 20px; object-fit: contain;" />
            </template>
            <template #text>调休申请</template>
          </van-grid-item>
          <van-grid-item>
            <template #icon>
              <img src="https://s1.imagehub.cc/images/2025/03/12/28ca98c0fe3c25aa3b2247a0f303faa2.png" alt="排休申请" style="width: 20px; height: 20px; object-fit: contain;" />
            </template>
            <template #text>排休申请</template>
          </van-grid-item>
          <van-grid-item>
            <template #icon>
              <img src="https://s1.imagehub.cc/images/2025/03/12/aab4660208ddcd89a0e7da524d4085c0.png" alt="换班申请" style="width: 20px; height: 20px; object-fit: contain;" />
            </template>
            <template #text>换班申请</template>
          </van-grid-item>
        </van-grid>
      </div>
      
      <!-- 职位调动 -->
      <div class="function-section">
        <div class="section-title">
          <van-icon name="cluster-o" color="#4a90e2" />
          <span>职位调动</span>
        </div>
        <van-grid :column-num="3" :border="false" :gutter="8">
          <van-grid-item>
            <template #icon>
              <img src="https://s1.imagehub.cc/images/2025/03/12/fcd6c7224badffb4299f2d63fda6baeb.png" alt="职场调换" style="width: 20px; height: 20px; object-fit: contain;" />
            </template>
            <template #text>职场调换</template>
          </van-grid-item>
          <van-grid-item>
            <template #icon>
              <img src="https://s1.imagehub.cc/images/2025/03/12/8eea9ff2861bc6ecd207cc9a3dac001b.png" alt="部门调换" style="width: 20px; height: 20px; object-fit: contain;" />
            </template>
            <template #text>部门调换</template>
          </van-grid-item>
          <van-grid-item>
            <template #icon>
              <img src="https://s1.imagehub.cc/images/2025/03/12/6309f20a2111e7d3a3f35cd70c386861.png" alt="工位调换" style="width: 20px; height: 20px; object-fit: contain;" />
            </template>
            <template #text>工位调换</template>
          </van-grid-item>
          <van-grid-item>
            <template #icon>
              <img src="https://s1.imagehub.cc/images/2025/03/12/692bee80afefcf5f0861b3d6359531e9.png" alt="晋升申请" style="width: 20px; height: 20px; object-fit: contain;" />
            </template>
            <template #text>晋升申请</template>
          </van-grid-item>
          <van-grid-item>
            <template #icon>
              <img src="https://s1.imagehub.cc/images/2025/03/12/4cd51e75941bea4630561b33189ee2b4.png" alt="停薪留职" style="width: 20px; height: 20px; object-fit: contain;" />
            </template>
            <template #text>停薪留职</template>
          </van-grid-item>
        </van-grid>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const headerImage = new URL('@/assets/images/banner/banner1.png', import.meta.url).href
</script>

<style lang="scss" scoped>
.workspace-page {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #f5f5f5;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;

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

  .functions-wrapper {
    padding: 0 0 calc(50px + env(safe-area-inset-bottom));
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: -46px;
    position: relative;
    z-index: 1;
    min-height: calc(100vh - 160px);
  }

  .function-section {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    margin: 0 12px;
    width: calc(100% - 24px);
    box-sizing: border-box;
  }

  .section-title {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    padding: 0 0.25rem;
  }

  .section-title .van-icon {
    font-size: 1.25rem;
    margin-right: 0.5rem;
  }

  .section-title span {
    font-size: 1rem;
    color: #323233;
    font-weight: 500;
  }

  :deep(.van-grid) {
    margin: 0;
  }

  :deep(.van-grid-item__content) {
    padding: 1rem 0.5rem;
    background-color: transparent !important;
  }

  :deep(.van-grid-item__icon) {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  :deep(.van-grid-item__text) {
    font-size: 0.875rem;
    color: #323233;
    margin-top: 0.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    text-align: center;
  }

  :deep(.van-grid-item) {
    padding: 0.25rem;
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
}
</style> 