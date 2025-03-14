<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import api from '@/utils/api'

const router = useRouter()
const username = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreement = ref(false)

const handleRegister = async () => {
  if (!username.value || !phone.value || !password.value || !confirmPassword.value) {
    showToast('请填写完整信息')
    return
  }
  
  if (password.value !== confirmPassword.value) {
    showToast('两次输入的密码不一致')
    return
  }
  
  if (!agreement.value) {
    showToast('请阅读并同意用户协议')
    return
  }
  
  try {
    await api.post('/api/auth/register', {
      username: username.value,
      phone: phone.value,
      password: password.value
    })
    showToast('注册成功')
    router.push('/auth/login')
  } catch (error) {
    showToast(error.message)
  }
}
</script>

<template>
  <div class="login-page">
    <div class="header">
      <van-nav-bar
        title=""
        left-arrow
        fixed
        placeholder
        :border="false"
        @click-left="router.back()"
      />
      <img src="@/assets/images/register-header.png" alt="注册页面头图" class="header-image">
    </div>
    
    <div class="form-container">
      <div class="glass-panel">
        <div class="form-group">
          <van-field
            v-model="username"
            placeholder="请输入用户名"
            left-icon="user-o"
            :border="false"
          />
        </div>
        
        <div class="form-group">
          <van-field
            v-model="phone"
            type="tel"
            placeholder="请输入手机号"
            maxlength="11"
            left-icon="phone-o"
            :border="false"
          />
        </div>
        
        <div class="form-group">
          <van-field
            v-model="password"
            type="password"
            placeholder="请输入密码"
            left-icon="lock"
            :border="false"
          />
        </div>
        
        <div class="form-group">
          <van-field
            v-model="confirmPassword"
            type="password"
            placeholder="请确认密码"
            left-icon="lock"
            :border="false"
          />
        </div>

        <div class="agreement">
          <van-checkbox v-model="agreement" shape="square">
            我已阅读并同意<a href="#" @click.prevent>《用户协议》</a>
          </van-checkbox>
        </div>
        
        <div class="actions">
          <van-button block type="primary" @click="handleRegister">注册</van-button>
        </div>
        
        <div class="links">
          <router-link to="/auth/login">返回登录</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  width: 100%;
  height: 35vh;
  position: relative;
  background: linear-gradient(180deg, #4a90e2 0%, #357abd 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.form-container {
  width: 100%;
  padding: 0;
  margin-top: -3.5rem;
  position: relative;
  z-index: 1;
  flex: 1;
  background: transparent;
}

.glass-panel {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 2rem 2rem 0 0;
  padding: 2rem 1.5rem;
  box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.1);
  min-height: calc(65vh + 3.5rem);
}

.form-group {
  margin-bottom: 1.25rem;
  padding: 0 0.5rem;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group :deep(.van-field) {
  background: rgba(245, 245, 245, 0.8);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  height: 3.25rem;
}

.form-group :deep(.van-field__left-icon) {
  font-size: 1.25rem;
  color: #666;
  margin-right: 0.75rem;
}

.form-group :deep(.van-field__control) {
  font-size: 1rem;
}

.form-group :deep(.van-field__placeholder) {
  color: #999;
}

.agreement {
  margin: 1rem 0.5rem 2rem;
  font-size: 0.875rem;
}

.agreement :deep(.van-checkbox__label) {
  color: #666;
}

.agreement a {
  color: #4a90e2;
  text-decoration: none;
}

.actions {
  margin-top: 2rem;
  padding: 0 0.5rem;
}

.actions :deep(.van-button) {
  height: 3.25rem;
  border-radius: 0.75rem;
  font-size: 1.125rem;
  font-weight: 500;
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  border: none;
}

.links {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  font-size: 0.875rem;
  padding: 0 1rem;
}

.links a {
  color: #666;
  text-decoration: none;
  padding: 0.5rem 0;
}

/* 移动端适配 */
@media screen and (max-width: 375px) {
  .glass-panel {
    padding: 1.75rem 1.25rem;
  }
  
  .form-group :deep(.van-field) {
    height: 3rem;
  }
  
  .actions :deep(.van-button) {
    height: 3rem;
    font-size: 1rem;
  }
}

/* 安全区域适配 */
@supports (padding: env(safe-area-inset-top)) {
  .login-page {
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
  }
}

:deep(.van-nav-bar) {
  background-color: transparent;
  --van-nav-bar-icon-color: #fff;
  --van-nav-bar-text-color: #fff;
}

:deep(.van-nav-bar__content) {
  height: 2.75rem;
}

:deep(.van-nav-bar__arrow) {
  font-size: 1.25rem;
}
</style> 