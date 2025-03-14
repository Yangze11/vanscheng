<template>
    <div class="onboarding-container">
    <!-- 导航栏 -->
    <nav class="nav-bar">
      <div class="nav-left">
        <button class="back-button" @click="goBack">
          <i class="fas fa-arrow-left nav-icon"></i>
        </button>
      </div>
      <div class="nav-title">入职申请</div>
      <div class="nav-right">
        <i class="fas fa-question-circle nav-icon" @click="showHelp = true"></i>
      </div>
    </nav>

    <!-- 表单容器 -->
    <div class="form-container">
      <!-- 审核信息卡片 -->
          <div class="form-section">
            <div class="section-header">
              <i class="fas fa-file-alt section-icon"></i>
              <h2 class="section-title">审核信息</h2>
            </div>
            <div class="form-group">
              <div class="form-item">
                <label>审核编号</label>
            <input type="text" v-model="form.auditInfo.auditNumber" readonly>
          </div>
              <div class="form-item">
                <label>提交时间</label>
            <input type="text" v-model="form.auditInfo.submitTime" readonly>
            </div>
          <div class="form-item required">
            <label>邀请码</label>
            <input 
              type="text" 
              v-model="form.auditInfo.invitationNumber"
              placeholder="请输入邀请码"
              required
            >
              </div>
            </div>
          </div>
          
      <!-- 个人信息卡片 -->
          <div class="form-section">
            <div class="section-header">
              <i class="fas fa-user section-icon"></i>
              <h2 class="section-title">个人信息</h2>
            </div>
            <div class="form-group">
              <div class="form-item required">
                <label>姓名</label>
                <input 
                  type="text" 
                  v-model="form.personalInfo.name"
                  placeholder="请输入姓名"
                  required
                >
              </div>
              <div class="form-item required">
                <label>身份证号</label>
                <input 
                  type="text" 
                  v-model="form.personalInfo.idNumber"
                  placeholder="请输入身份证号"
                  @input="parseIdNumber($event.target.value)"
                  required
                >
              </div>
              <div class="form-item">
                <label>出生日期</label>
                <input 
                  type="text" 
                  v-model="form.personalInfo.birthdate"
                  readonly
                >
              </div>
              <div class="form-item">
                <label>性别</label>
                <input 
                  type="text" 
                  v-model="form.personalInfo.gender"
                  readonly
                >
              </div>
              <div class="form-item">
                <label>籍贯</label>
                <input 
                  type="text" 
                  v-model="form.personalInfo.nativePlace"
                  readonly
                >
              </div>
              <div class="form-item required">
                <label>手机号</label>
                <input 
                  type="tel" 
                  v-model="form.personalInfo.phone"
                  placeholder="请输入手机号"
                  required
                >
              </div>
              <div class="form-item required">
                <label>邮箱</label>
                <input 
                  type="email" 
                  v-model="form.personalInfo.email"
                  placeholder="请输入邮箱"
                  required
                >
              </div>
              <div class="form-item required">
                <label>居住地址</label>
                <input 
                  type="text" 
                  v-model="form.personalInfo.address"
                  placeholder="请输入居住地址"
                  required
                >
              </div>
              <div class="form-item required">
                <label>婚姻状况</label>
                <select v-model="form.personalInfo.maritalStatus" required>
                  <option value="">请选择婚姻状况</option>
                  <option 
                    v-for="option in maritalOptions" 
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>
              <div class="form-item required">
                <label>政治面貌</label>
                <select v-model="form.personalInfo.politicalStatus" required>
                  <option value="">请选择政治面貌</option>
                  <option 
                    v-for="option in politicalOptions" 
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          
      <!-- 部门信息卡片 -->
          <div class="form-section">
            <div class="section-header">
              <i class="fas fa-building section-icon"></i>
              <h2 class="section-title">部门信息</h2>
            </div>
            <div class="form-group">
              <div class="form-item required">
                <label>入职类型</label>
                <select v-model="form.departmentInfo.employmentType" @change="updatePositionsAndLevel" required>
                  <option value="">请选择入职类型</option>
                  <option 
                    v-for="option in employmentTypes" 
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>
              <div class="form-item required">
                <label>入职中心</label>
                <select v-model="form.departmentInfo.center" @change="updateDepartments" required>
                  <option value="">请选择入职中心</option>
                  <option 
                    v-for="option in centerOptions" 
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>
              <div class="form-item required">
                <label>入职部门</label>
                <select v-model="form.departmentInfo.department" @change="updatePositions" required>
                  <option value="">请选择入职部门</option>
                  <option 
                    v-for="option in departmentOptions" 
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>
              <div class="form-item required">
                <label>入职职位</label>
                <select v-model="form.departmentInfo.position" @change="updateLevel" required>
                  <option value="">请选择入职职位</option>
                  <option
                    v-for="option in positionOptions"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
                <div class="helper-text" v-if="!positionOptions.length">
                  请先选择部门以加载对应职位
                </div>
              </div>
              <div class="form-item required">
                <label>职级</label>
                <input
                  type="text"
                  v-model="form.departmentInfo.level"
                  placeholder="职级将根据入职类型和职位自动识别"
                  readonly
                  required
                >
              </div>
              <div class="form-item required">
                <label>入职职场</label>
                <select v-model="form.departmentInfo.workplace" required>
                  <option value="" disabled>请选择入职职场</option>
                  <option v-for="option in workplaceOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          
      <!-- 薪酬福利卡片 -->
          <div class="form-section">
            <div class="section-header">
              <i class="fas fa-money-bill-wave section-icon"></i>
              <h2 class="section-title">薪酬福利</h2>
            </div>
            <div class="form-group">
              <div class="form-item required">
                <label>银行卡号</label>
                <input 
                  type="text" 
                  v-model="form.salaryInfo.bankCardNumber"
                  placeholder="请输入银行卡号"
                  required
                >
              </div>
              <div class="form-item required">
                <label>开户银行</label>
                <select v-model="form.salaryInfo.bankName" required>
                  <option value="">请选择开户银行</option>
                  <option 
                    v-for="option in bankOptions" 
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>
              <div class="form-item required">
                <label>开户支行</label>
                <input 
                  type="text" 
                  v-model="form.salaryInfo.bankBranch"
                  placeholder="请输入开户支行"
                  required
                >
              </div>
              <div class="form-item">
                <label>期望薪资</label>
                <input 
                  type="number" 
                  v-model="form.salaryInfo.expectedSalary"
                  placeholder="请输入期望薪资（选填）"
                >
              </div>
              <div class="form-item required">
                <label>社保缴纳</label>
                <select v-model="form.salaryInfo.socialInsurance" required>
                  <option value="">请选择社保缴纳方式</option>
                  <option 
                    v-for="option in insuranceOptions" 
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>
              <div class="form-item required">
                <label>公积金缴纳</label>
                <select v-model="form.salaryInfo.housingFund" required>
                  <option value="">请选择公积金缴纳方式</option>
                  <option 
                    v-for="option in housingFundOptions" 
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          
      <!-- 学历信息卡片 -->
          <div class="form-section">
            <div class="section-header">
              <i class="fas fa-graduation-cap section-icon"></i>
              <h2 class="section-title">学历信息</h2>
            </div>
            <div class="form-group">
              <div class="form-item required">
                <label>最高学历</label>
                <select v-model="form.educationInfo.highestDegree" required>
                  <option value="">请选择最高学历</option>
                  <option 
                    v-for="option in educationOptions" 
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>
              <div class="form-item required">
                <label>毕业院校</label>
                <input 
                  type="text" 
                  v-model="form.educationInfo.school"
                  placeholder="请输入毕业院校"
                  required
                >
              </div>
              <div class="form-item required">
                <label>专业</label>
                <input 
                  type="text" 
                  v-model="form.educationInfo.major"
                  placeholder="请输入专业"
                  required
                >
              </div>
              <div class="form-item required">
                <label>毕业时间</label>
                <input 
                  type="month" 
                  v-model="form.educationInfo.graduationDate"
                  placeholder="请选择毕业时间"
                  required
                >
              </div>
              <div class="form-item">
                <label>证书编号</label>
                <input 
                  type="text" 
                  v-model="form.educationInfo.certificateNumber"
                  placeholder="请输入学历证书编号（选填）"
                >
              </div>
            </div>
          </div>
          
      <!-- 技能信息卡片 -->
          <div class="form-section">
            <div class="section-header">
              <i class="fas fa-tools section-icon"></i>
              <h2 class="section-title">技能信息</h2>
            </div>
            <div class="form-group">
              <div class="form-item">
                <label>专业技能</label>
                <textarea 
                  v-model="form.skillsInfo.professionalSkills"
                  placeholder="请输入您的专业技能，多个技能请用逗号分隔"
                  rows="3"
                  class="textarea-input"
                ></textarea>
              </div>
              <div class="form-item">
                <label>语言能力</label>
                <div class="checkbox-group">
                  <div 
                    v-for="option in languageOptions" 
                    :key="option.value" 
                    class="checkbox-item"
                  >
                    <input 
                      type="checkbox" 
                      :id="option.value" 
                      :value="option.value" 
                      v-model="form.skillsInfo.languages"
                    >
                    <label :for="option.value">{{ option.label }}</label>
                  </div>
                </div>
              </div>
              <div class="form-item">
                <label>证书</label>
                <textarea 
                  v-model="form.skillsInfo.certificates"
                  placeholder="请输入您获得的证书，多个证书请用逗号分隔"
                  rows="3"
                  class="textarea-input"
                ></textarea>
              </div>
              <div class="form-item">
                <label>工作年限</label>
                <select v-model="form.skillsInfo.workExperience">
                  <option value="">请选择工作年限</option>
                  <option 
                    v-for="option in experienceOptions" 
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          
      <!-- 个人介绍卡片 -->
          <div class="form-section">
            <div class="section-header">
              <i class="fas fa-user-edit section-icon"></i>
              <h2 class="section-title">个人介绍</h2>
            </div>
            <div class="form-group">
              <div class="form-item">
                <label>自我介绍</label>
                <textarea 
                  v-model="form.introductionInfo.selfIntroduction"
                  placeholder="请简要介绍自己的优势、特长和职业规划等"
                  rows="5"
                  class="textarea-input"
                ></textarea>
              </div>
              <div class="form-item">
                <label>兴趣爱好</label>
                <textarea 
                  v-model="form.introductionInfo.hobbies"
                  placeholder="请输入您的兴趣爱好"
                  rows="3"
                  class="textarea-input"
                ></textarea>
              </div>
              <div class="form-item">
                <label>其他说明</label>
                <textarea 
                  v-model="form.introductionInfo.otherInfo"
                  placeholder="其他需要说明的情况"
                  rows="3"
                  class="textarea-input"
                ></textarea>
              </div>
            </div>
          </div>
    </div>

    <!-- 底部按钮栏 -->
    <div class="fixed-bottom-bar">
      <button 
        class="save-button" 
        @click="saveForm" 
        :disabled="loading.save"
      >
        <i class="fas" :class="loading.save ? 'fa-spinner fa-spin' : 'fa-save'"></i>
        {{ loading.save ? '保存中...' : '保存' }}
      </button>
      <button 
        class="submit-button" 
        @click="submitForm"
        :disabled="loading.submit"
      >
        <i class="fas" :class="loading.submit ? 'fa-spinner fa-spin' : 'fa-paper-plane'"></i>
        {{ loading.submit ? '提交中...' : '提交' }}
      </button>
    </div>

    <!-- 帮助对话框 -->
    <el-dialog
      v-model="showHelp"
      title="帮助信息"
      width="90%"
      :show-close="true"
      :close-on-click-modal="true"
      class="help-dialog"
      align-center
    >
      <div class="help-content">
        <h3>填写说明</h3>
        <p>1. 带 * 号的字段为必填项</p>
        <p>2. 身份证号码输入后会自动识别出生日期、性别和籍贯</p>
        <p>3. 选择中心后会自动加载对应的部门列表</p>
        <p>4. 表单可以随时保存，下次打开会自动恢复</p>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElDialog, ElDatePicker } from 'element-plus'

// 路由
const router = useRouter()
const showHelp = ref(false)

// 返回上一页
const goBack = () => {
  router.back()
}

// 加载Font Awesome
const loadFontAwesome = () => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'
  document.head.appendChild(link)
}

// ===== 表单数据 =====
const form = reactive({
  // 审核信息
  auditInfo: {
    auditNumber: '',    // 审核编号
    submitTime: '',     // 提交时间
    invitationNumber: '' // 邀请码
  },
  // 个人信息
  personalInfo: {
    name: '',           // 姓名
    idNumber: '',       // 身份证号
    birthdate: '',      // 出生日期
    gender: '',         // 性别
    nativePlace: '',    // 籍贯
    phone: '',          // 手机号
    email: '',          // 邮箱
    address: '',        // 居住地址
    maritalStatus: '',  // 婚姻状况
    politicalStatus: '' // 政治面貌
  },
  // 部门信息
  departmentInfo: {
    employmentType: '', // 入职类型
    center: '',         // 中心
    department: '',     // 部门
    position: '',       // 职位
    level: '',         // 职级
    workplace: ''        // 入职职场
  },
  // 薪酬福利
  salaryInfo: {
    bankCardNumber: '', // 银行卡号
    bankName: '',       // 开户银行
    bankBranch: '',     // 开户支行
    expectedSalary: '', // 期望薪资
    socialInsurance: '', // 社保缴纳
    housingFund: ''     // 公积金缴纳
  },
  // 学历信息
  educationInfo: {
    highestDegree: '',  // 最高学历
    school: '',         // 毕业院校
    major: '',          // 专业
    graduationDate: '', // 毕业时间
    certificateNumber: '' // 证书编号
  },
  // 技能信息
  skillsInfo: {
    professionalSkills: '', // 专业技能
    languages: [],          // 语言能力
    certificates: '',      // 证书
    workExperience: ''     // 工作年限
  },
  // 个人介绍
  introductionInfo: {
    selfIntroduction: '', // 自我介绍
    hobbies: '',          // 兴趣爱好
    otherInfo: ''          // 其他说明
  }
})

// ===== 选项数据 =====
const maritalOptions = [
  { value: 'single', label: '未婚' },
  { value: 'married', label: '已婚' },
  { value: 'divorced', label: '离异' },
  { value: 'widowed', label: '丧偶' }
]

const politicalOptions = [
  { value: 'party_member', label: '中共党员' },
  { value: 'probationary_member', label: '中共预备党员' },
  { value: 'league_member', label: '共青团员' },
  { value: 'democratic_party', label: '民主党派' },
  { value: 'masses', label: '群众' }
]

// ===== 部门信息选项 =====
const employmentTypes = [
  { value: 'full-time', label: '正式' },
  { value: 'intern', label: '实习' },
  { value: 'part-time', label: '兼职' },
  { value: 'outsource', label: '外包' },
  { value: 'sinking', label: '下沉' }
]

const centerOptions = [
  { value: 'mcn', label: 'MCN直播运营中心' },
  { value: 'vcp', label: 'VCP短视频创作中心' },
  { value: 'cac', label: 'CAC城市陪玩中心' },
  { value: 'gac', label: 'GAC游戏陪玩中心' },
  { value: 'cbc', label: 'CBC跨境电商中心' },
  { value: 'dec', label: 'DEC国内电商中心' },
  { value: 'adm', label: 'ADM行政管理中心' },
  { value: 'mkt', label: 'MKT市场供应链中心' },
  { value: 'hro', label: 'HRO人资组织中心' },
  { value: 'smc', label: 'SMC战略管理中心' },
  { value: 'csc', label: 'CSC客户服务中心' },
  { value: 'bec', label: 'BEC业务赋能中心' },
  { value: 'uec', label: 'UEC用户体验中心' }
]

const departmentMap = {
  // MCN直播运营中心 - 保持不变
  mcn: [
    { value: 'mcn-video-ent', label: '视频娱乐主播部' },
    { value: 'mcn-video-ecom', label: '视频带货主播部' },
    { value: 'mcn-video-celeb', label: '视频艺人主播部' },
    { value: 'mcn-audio-ent', label: '语音娱乐主播部' },
    { value: 'mcn-audio-social', label: '语音交友主播部' },
    { value: 'mcn-audio-music', label: '语音点唱主播部' },
    { value: 'mcn-audio-radio', label: '语音电台主播部' },
    { value: 'mcn-talent-scout', label: '星探经纪部' },
    { value: 'mcn-scene-control', label: '直播监管部' },
    { value: 'mcn-operation', label: '运营支持部' },
    { value: 'mcn-management', label: '执行管理部' },
    { value: 'mcn-content', label: '内容策划与制作部' },
    { value: 'mcn-data-analysis', label: '数据分析与评估部' }
  ],
  // VCP短视频创作中心
  vcp: [
    { value: 'vcp-production', label: '视频制作部' },
    { value: 'vcp-editing', label: '视频剪辑部' },
    { value: 'vcp-planning', label: '内容策划部' },
    { value: 'vcp-operation', label: '运营推广部' },
    { value: 'vcp-data', label: '数据分析部' }
  ],
  // CAC城市陪玩中心
  cac: [
    { value: 'cac-operation', label: '运营管理部' },
    { value: 'cac-service', label: '陪玩服务部' },
    { value: 'cac-quality', label: '品质管理部' },
    { value: 'cac-market', label: '市场拓展部' }
  ],
  // GAC游戏陪玩中心
  gac: [
    { value: 'gac-operation', label: '运营管理部' },
    { value: 'gac-service', label: '陪玩服务部' },
    { value: 'gac-quality', label: '品质管理部' },
    { value: 'gac-market', label: '市场拓展部' }
  ],
  // CBC跨境电商中心
  cbc: [
    { value: 'cbc-operation', label: '运营管理部' },
    { value: 'cbc-product', label: '产品开发部' },
    { value: 'cbc-supply', label: '供应链管理部' },
    { value: 'cbc-market', label: '市场营销部' },
    { value: 'cbc-logistics', label: '跨境物流部' },
    { value: 'cbc-customer', label: '客户服务部' }
  ],
  // DEC国内电商中心
  dec: [
    { value: 'dec-operation', label: '运营管理部' },
    { value: 'dec-product', label: '产品开发部' },
    { value: 'dec-supply', label: '供应链管理部' },
    { value: 'dec-market', label: '市场营销部' },
    { value: 'dec-logistics', label: '仓储物流部' },
    { value: 'dec-customer', label: '客户服务部' }
  ],
  // ADM行政管理中心
  adm: [
    { value: 'adm-admin', label: '行政事务部' },
    { value: 'adm-facility', label: '设施管理部' },
    { value: 'adm-security', label: '安全保卫部' },
    { value: 'adm-asset', label: '资产管理部' },
    { value: 'adm-procurement', label: '采购管理部' }
  ],
  // MKT市场供应链中心
  mkt: [
    { value: 'mkt-strategy', label: '市场战略部' },
    { value: 'mkt-brand', label: '品牌管理部' },
    { value: 'mkt-supplier', label: '供应商管理部' },
    { value: 'mkt-purchase', label: '采购管理部' },
    { value: 'mkt-quality', label: '质量管理部' }
  ],
  // HRO人资组织中心
  hro: [
    { value: 'hro-admin', label: '人事管理部' },
    { value: 'hro-recruit', label: '招聘管理部' },
    { value: 'hro-training', label: '培训发展部' },
    { value: 'hro-compensation', label: '薪酬福利部' },
    { value: 'hro-employee', label: '员工关系部' },
    { value: 'hro-organization', label: '组织发展部' }
  ],
  // SMC战略管理中心
  smc: [
    { value: 'smc-strategy', label: '战略规划部' },
    { value: 'smc-investment', label: '投资管理部' },
    { value: 'smc-risk', label: '风险管理部' },
    { value: 'smc-legal', label: '法务合规部' },
    { value: 'smc-finance', label: '财务管理部' }
  ],
  // CSC客户服务中心
  csc: [
    { value: 'csc-service', label: '客服管理部' },
    { value: 'csc-quality', label: '服务质量部' },
    { value: 'csc-operation', label: '运营管理部' },
    { value: 'csc-data', label: '数据分析部' }
  ],
  // BEC业务赋能中心
  bec: [
    { value: 'bec-solution', label: '解决方案部' },
    { value: 'bec-support', label: '业务支持部' },
    { value: 'bec-innovation', label: '创新研发部' },
    { value: 'bec-integration', label: '系统集成部' }
  ],
  // UEC用户体验中心
  uec: [
    { value: 'uec-design', label: '用户界面设计部' },
    { value: 'uec-research', label: '用户研究部' },
    { value: 'uec-interaction', label: '交互设计部' },
    { value: 'uec-product', label: '产品体验部' }
  ]
}

// 职位映射，根据部门自动推荐职位
const positionMap = {
  // MCN直播运营中心
  'mcn-video-ent': [
    { value: 'normal-anchor', label: '普通主播' },
    { value: 'gold-anchor', label: '金牌主播' },
    { value: 'artist-anchor', label: '艺人主播' }
  ],
  'mcn-video-ecom': [
    { value: 'normal-ecom-anchor', label: '普通带货主播' },
    { value: 'gold-ecom-anchor', label: '金牌带货主播' },
    { value: 'celebrity-ecom-anchor', label: '明星带货主播' }
  ],
  'mcn-video-celeb': [
    { value: 'trainee-artist', label: '艺人练习生' },
    { value: 'junior-artist', label: '初级艺人' },
    { value: 'senior-artist', label: '高级艺人' }
  ],
  'mcn-audio-ent': [
    { value: 'normal-voice-anchor', label: '普通语音主播' },
    { value: 'gold-voice-anchor', label: '金牌语音主播' },
    { value: 'celebrity-voice-anchor', label: '明星语音主播' }
  ],
  'mcn-audio-social': [
    { value: 'normal-social-anchor', label: '普通社交主播' },
    { value: 'gold-social-anchor', label: '金牌社交主播' },
    { value: 'celebrity-social-anchor', label: '明星社交主播' }
  ],
  'mcn-audio-music': [
    { value: 'normal-singer', label: '普通歌手' },
    { value: 'gold-singer', label: '金牌歌手' },
    { value: 'celebrity-singer', label: '明星歌手' }
  ],
  'mcn-audio-radio': [
    { value: 'normal-radio-host', label: '普通电台主播' },
    { value: 'gold-radio-host', label: '金牌电台主播' },
    { value: 'celebrity-radio-host', label: '明星电台主播' }
  ],
  'mcn-talent-scout': [
    { value: 'junior-scout', label: '初级星探' },
    { value: 'senior-scout', label: '高级星探' },
    { value: 'chief-scout', label: '首席星探' },
    { value: 'talent-director', label: '选角总监' }
  ],
  'mcn-scene-control': [
    { value: 'junior-supervisor', label: '初级监管专员' },
    { value: 'senior-supervisor', label: '高级监管专员' },
    { value: 'chief-supervisor', label: '首席监管专员' },
    { value: 'compliance-director', label: '合规总监' }
  ],
  'mcn-operation': [
    { value: 'junior-operator', label: '初级运营专员' },
    { value: 'senior-operator', label: '高级运营专员' },
    { value: 'operation-manager', label: '运营经理' },
    { value: 'operation-director', label: '运营总监' }
  ],
  'mcn-management': [
    { value: 'junior-manager', label: '初级管理专员' },
    { value: 'senior-manager', label: '高级管理专员' },
    { value: 'department-manager', label: '部门经理' },
    { value: 'executive-director', label: '执行总监' }
  ],
  'mcn-content': [
    { value: 'junior-planner', label: '初级内容策划' },
    { value: 'senior-planner', label: '高级内容策划' },
    { value: 'content-manager', label: '内容经理' },
    { value: 'content-director', label: '内容总监' }
  ],
  'mcn-data-analysis': [
    { value: 'junior-analyst', label: '初级数据分析师' },
    { value: 'senior-analyst', label: '高级数据分析师' },
    { value: 'data-manager', label: '数据经理' },
    { value: 'analysis-director', label: '分析总监' }
  ],
  
  // 默认职位选项，当没有特定映射时使用
  'default': [
    { value: 'specialist', label: '专员' },
    { value: 'senior-specialist', label: '高级专员' },
    { value: 'manager', label: '经理' },
    { value: 'director', label: '总监' }
  ]
}

// 职级映射，根据职位和入职类型自动推荐职级
const levelMapping = {
  // 正式员工
  'full-time': {
    // MCN视频娱乐主播部
    'normal-anchor': 'C1-普通主播',
    'gold-anchor': 'C2-金牌主播',
    'artist-anchor': 'C3-艺人主播',
    
    // MCN视频带货主播部
    'normal-ecom-anchor': 'C1-普通带货主播',
    'gold-ecom-anchor': 'C2-金牌带货主播',
    'celebrity-ecom-anchor': 'C3-明星带货主播',
    
    // MCN视频艺人主播部
    'trainee-artist': 'C1-练习生',
    'junior-artist': 'C2-初级艺人',
    'senior-artist': 'C3-高级艺人',
    
    // MCN语音娱乐主播部
    'normal-voice-anchor': 'C1-普通语音主播',
    'gold-voice-anchor': 'C2-金牌语音主播',
    'celebrity-voice-anchor': 'C3-明星语音主播',
    
    // MCN语音社交主播部
    'normal-social-anchor': 'C1-普通社交主播',
    'gold-social-anchor': 'C2-金牌社交主播',
    'celebrity-social-anchor': 'C3-明星社交主播',
    
    // MCN语音音乐主播部
    'normal-singer': 'C1-普通歌手',
    'gold-singer': 'C2-金牌歌手',
    'celebrity-singer': 'C3-明星歌手',
    
    // MCN语音电台主播部
    'normal-radio-host': 'C1-普通电台主播',
    'gold-radio-host': 'C2-金牌电台主播',
    'celebrity-radio-host': 'C3-明星电台主播',
    
    // MCN星探经纪部 - 调整为C级别
    'junior-scout': 'C1-初级星探',
    'senior-scout': 'C2-高级星探',
    'chief-scout': 'C3-首席星探',
    'talent-director': 'M1-选角总监',
    
    // MCN直播监管部
    'junior-supervisor': 'P1-初级监管',
    'senior-supervisor': 'P2-高级监管',
    'chief-supervisor': 'P3-首席监管',
    'compliance-director': 'M1-合规总监',
    
    // MCN运营支持部
    'junior-operator': 'P1-初级运营',
    'senior-operator': 'P2-高级运营',
    'operation-manager': 'M1-运营经理',
    'operation-director': 'M2-运营总监',
    
    // MCN执行管理部
    'junior-manager': 'P1-初级管理',
    'senior-manager': 'P2-高级管理',
    'department-manager': 'M1-部门经理',
    'executive-director': 'M2-执行总监',
    
    // MCN内容策划部
    'junior-planner': 'P1-初级策划',
    'senior-planner': 'P2-高级策划',
    'content-manager': 'M1-内容经理',
    'content-director': 'M2-内容总监',
    
    // MCN数据分析部
    'junior-analyst': 'P1-初级分析',
    'senior-analyst': 'P2-高级分析',
    'data-manager': 'M1-数据经理',
    'analysis-director': 'M2-分析总监'
  },
  
  // 实习生
  'intern': {
    // 所有职位默认为I1
    'default': 'I1-实习生'
  },
  
  // 兼职
  'part-time': {
    // 所有职位默认为PT1
    'default': 'PT1-兼职'
  },
  
  // 外包
  'outsource': {
    // 所有职位默认为O1
    'default': 'O1-外包'
  },
  
  // 下沉
  'sinking': {
    // 所有职位默认为S1
    'default': 'S1-下沉'
  }
}

// 部门列表（根据选择的中心动态变化）
const departmentOptions = ref([])

// 职位列表（根据选择的部门动态变化）
const positionOptions = ref([])

// 更新部门列表
const updateDepartments = () => {
  const centerValue = form.departmentInfo.center
  if (!centerValue) {
    departmentOptions.value = []
    form.departmentInfo.department = ''
    form.departmentInfo.position = ''
    form.departmentInfo.level = ''
    positionOptions.value = []
    return
  }
  
  departmentOptions.value = departmentMap[centerValue] || []
  
  // 如果当前选择的部门不在新的列表中，清空相关字段
  const departmentExists = departmentOptions.value.some(
    option => option.value === form.departmentInfo.department
  )
  
  if (!departmentExists) {
    form.departmentInfo.department = ''
    form.departmentInfo.position = ''
    form.departmentInfo.level = ''
    positionOptions.value = []
  } else {
    // 如果部门存在，更新职位选项
    updatePositions()
  }
}

// 更新职位选项
const updatePositions = () => {
  const departmentValue = form.departmentInfo.department
  
  // 清空已选职位和职级
  form.departmentInfo.position = ''
  form.departmentInfo.level = ''
  
  if (!departmentValue) {
    positionOptions.value = []
    return
  }
  
  // 根据部门获取对应的职位选项
  if (positionMap[departmentValue]) {
    positionOptions.value = positionMap[departmentValue]
  } else {
    // 如果没有特定映射，使用默认选项
    positionOptions.value = positionMap['default'] || []
  }
}

// 更新职级
const updateLevel = () => {
  const employmentType = form.departmentInfo.employmentType
  const positionValue = form.departmentInfo.position
  
  console.log('入职类型:', employmentType)
  console.log('选择的职位:', positionValue)
  
  if (!employmentType || !positionValue) {
    console.log('入职类型或职位为空，无法自动设置职级')
    return
  }
  
  // 获取对应的职级映射
  const employmentMapping = levelMapping[employmentType]
  if (!employmentMapping) {
    console.log('没有找到对应入职类型的职级映射')
    return
  }
  
  // 获取职位对应的职级
  let level = employmentMapping[positionValue]
  
  // 如果没有特定职位的映射，使用默认值
  if (!level && employmentMapping['default']) {
    level = employmentMapping['default']
  }
  
  if (level) {
    console.log('自动设置职级为:', level)
    form.departmentInfo.level = level
  } else {
    console.log('没有找到对应的职级映射')
  }
}

// 当入职类型变更时，更新职位和职级
const updatePositionsAndLevel = () => {
  // 如果已经选择了部门和职位，则更新职级
  if (form.departmentInfo.position) {
    updateLevel()
  }
}

// ===== 城市代码映射 =====
const cityCodeMap = {
  // 北京市
  '110100': '北京市',
  
  // 天津市
  '120100': '天津市',
  
  // 广西壮族自治区
  '450100': '南宁市',
  '450200': '柳州市',
  '450300': '桂林市',
  '450400': '梧州市',
  '450500': '北海市',
  '450600': '防城港市',
  '450700': '钦州市',
  '450800': '贵港市',
  '450900': '玉林市',
  '451000': '百色市',
  '451100': '贺州市',
  '451200': '河池市',
  '451300': '来宾市',
  '451400': '崇左市',
  
  // 广东省
  '440100': '广州市',
  '440200': '韶关市',
  '440300': '深圳市',
  '440400': '珠海市',
  '440500': '汕头市',
  '440600': '佛山市',
  '440700': '江门市',
  '440800': '湛江市',
  '440900': '茂名市',
  '441200': '肇庆市',
  '441300': '惠州市',
  '441400': '梅州市',
  '441500': '汕尾市',
  '441600': '河源市',
  '441700': '阳江市',
  '441800': '清远市',
  '441900': '东莞市',
  '442000': '中山市',
  '445100': '潮州市',
  '445200': '揭阳市',
  '445300': '云浮市',
  
  // 海南省
  '460100': '海口市',
  '460200': '三亚市',
  '460300': '三沙市',
  '460400': '儋州市',
  
  // 其他主要城市保持不变
  '310100': '上海市',
  '320100': '南京市',
  '330100': '杭州市',
  '340100': '合肥市',
  '350100': '福州市',
  '360100': '南昌市',
  '370100': '济南市',
  '410100': '郑州市',
  '420100': '武汉市',
  '430100': '长沙市',
  '500100': '重庆市',
  '510100': '成都市',
  '520100': '贵阳市',
  '530100': '昆明市',
  '540100': '拉萨市',
  '610100': '西安市',
  '620100': '兰州市',
  '630100': '西宁市',
  '640100': '银川市',
  '650100': '乌鲁木齐市'
}

// 修改身份证解析函数
const parseIdNumber = (idNumber) => {
  if (idNumber.length !== 18) {
    return
  }

  try {
    // 解析出生日期
    const year = idNumber.substring(6, 10)
    const month = idNumber.substring(10, 12)
    const day = idNumber.substring(12, 14)
    form.personalInfo.birthdate = `${year}-${month}-${day}`

    // 解析性别
    const genderCode = parseInt(idNumber.substring(16, 17))
    form.personalInfo.gender = genderCode % 2 === 0 ? '女' : '男'

    // 解析籍贯（前6位是地区码）
    const cityCode = idNumber.substring(0, 4) + '00'  // 修改为取前4位
    const cityName = cityCodeMap[cityCode] || '未知城市'
    form.personalInfo.nativePlace = cityName
  } catch (error) {
    console.error('身份证解析错误:', error)
  }
}

// 添加入职职场选项
const workplaceOptions = [
  { value: 'shanghai', label: '上海总部' },
  { value: 'guangzhou', label: '广州分部' },
  { value: 'huizhou', label: '惠州分部' },
  { value: 'zhuhai', label: '珠海分部' },
  { value: 'changsha', label: '长沙分部' },
  { value: 'chongqing', label: '重庆分部' },
  { value: 'chengdu', label: '成都分部' },
  { value: 'xian', label: '西安分部' },
  { value: 'wuhan', label: '武汉分部' },
  { value: 'sanya', label: '三亚分部' },
  { value: 'haikou', label: '海口分部' },
  { value: 'nanning', label: '南宁分部' },
  { value: 'beihai', label: '北海分部' },
  { value: 'qinzhou', label: '钦州分部' }
]

// 银行选项
const bankOptions = [
  { value: 'icbc', label: '中国工商银行' },
  { value: 'abc', label: '中国农业银行' },
  { value: 'boc', label: '中国银行' },
  { value: 'ccb', label: '中国建设银行' },
  { value: 'psbc', label: '中国邮政储蓄银行' },
  { value: 'cmb', label: '招商银行' },
  { value: 'spdb', label: '浦发银行' },
  { value: 'cib', label: '兴业银行' },
  { value: 'citic', label: '中信银行' },
  { value: 'cmbc', label: '民生银行' },
  { value: 'gdb', label: '广发银行' },
  { value: 'pingan', label: '平安银行' },
  { value: 'hxb', label: '华夏银行' },
  { value: 'bob', label: '北京银行' },
  { value: 'other', label: '其他银行' }
]

// 社保缴纳选项
const insuranceOptions = [
  { value: 'full', label: '全额缴纳' },
  { value: 'base', label: '最低基数缴纳' },
  { value: 'none', label: '暂不缴纳' },
  { value: 'transfer', label: '社保转入' }
]

// 公积金缴纳选项
const housingFundOptions = [
  { value: 'full', label: '全额缴纳' },
  { value: 'base', label: '最低基数缴纳' },
  { value: 'none', label: '暂不缴纳' },
  { value: 'transfer', label: '公积金转入' }
]

// 学历选项
const educationOptions = [
  { value: 'high_school', label: '高中/中专' },
  { value: 'junior_college', label: '大专' },
  { value: 'bachelor', label: '本科' },
  { value: 'master', label: '硕士' },
  { value: 'doctor', label: '博士' },
  { value: 'other', label: '其他' }
]

// 语言能力选项
const languageOptions = [
  { value: 'chinese', label: '中文' },
  { value: 'english', label: '英语' },
  { value: 'japanese', label: '日语' },
  { value: 'korean', label: '韩语' },
  { value: 'french', label: '法语' },
  { value: 'german', label: '德语' },
  { value: 'spanish', label: '西班牙语' },
  { value: 'russian', label: '俄语' },
  { value: 'other', label: '其他' }
]

// 工作经验选项
const experienceOptions = [
  { value: 'fresh', label: '应届毕业生' },
  { value: '1-3', label: '1-3年' },
  { value: '3-5', label: '3-5年' },
  { value: '5-10', label: '5-10年' },
  { value: '10+', label: '10年以上' }
]

// ===== 生命周期钩子 =====
onMounted(() => {
  loadFontAwesome()
  generateAuditNumber()
  setSubmitTime()
  loadDraft()
})

// ===== 审核信息相关函数 =====
// 生成审核编号
const generateAuditNumber = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  form.auditInfo.auditNumber = `HR${year}${month}${day}${random}`
}

// 设置提交时间
const setSubmitTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  form.auditInfo.submitTime = `${year}-${month}-${day} ${hours}:${minutes}`
}

// ===== 工具函数 =====
// 加载草稿
const loadDraft = () => {
  const draft = localStorage.getItem('onboardingFormDraft')
  if (draft) {
    const draftData = JSON.parse(draft)
    Object.assign(form, draftData)
    
    // 如果有保存的中心和部门信息，重新初始化相关选项
    if (form.departmentInfo.center) {
      // 初始化部门选项
      departmentOptions.value = departmentMap[form.departmentInfo.center] || []
      
      // 如果有保存的部门信息，初始化职位选项
      if (form.departmentInfo.department) {
        if (positionMap[form.departmentInfo.department]) {
          positionOptions.value = positionMap[form.departmentInfo.department]
        } else {
          positionOptions.value = positionMap['default'] || []
        }
      }
    }
  }
}

// ===== 添加加载状态 =====
const loading = reactive({
  save: false,
  submit: false
})

// ===== 表单操作 =====
// 保存表单
const saveForm = async () => {
  if (loading.save) return
  loading.save = true

  try {
    // 保存到localStorage
    localStorage.setItem('onboardingFormDraft', JSON.stringify(form))
    await new Promise(resolve => setTimeout(resolve, 500)) // 模拟保存延迟
    
    // 使用简单方式显示消息
    ElMessage.success('表单已保存')
  } catch (error) {
    console.error('Save error:', error)
    ElMessage.error('保存失败，请重试')
  } finally {
    loading.save = false
  }
}

// 提交表单
const submitForm = async () => {
  if (loading.submit) return
  
  if (!validateForm()) {
    return
  }

  loading.submit = true

  try {
    // 将表单数据转换为后端 API 需要的格式
    const apiData = {
      name: form.personalInfo.name,
      gender: form.personalInfo.gender,
      birthDate: form.personalInfo.birthdate,
      idNumber: form.personalInfo.idNumber,
      phone: form.personalInfo.phone,
      email: form.personalInfo.email,
      department: form.departmentInfo.department,
      position: form.departmentInfo.position,
      entryDate: form.departmentInfo.entryDate,
      employeeId: form.auditInfo.invitationNumber, // 使用邀请码作为员工ID
      address: form.personalInfo.address,
      // 添加空值检查，避免访问不存在的属性
      emergencyContact: '',  // 紧急联系人姓名
      emergencyPhone: '',    // 紧急联系人电话
      emergencyRelation: '', // 紧急联系人关系
      remarks: form.introductionInfo?.otherInfo || '',
      auditNumber: form.auditInfo.auditNumber // 添加审批编号
    }
    
    try {
      // 直接提交到后端 API，不需要认证
      const response = await fetch('http://localhost:5001/api/approvals/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(apiData)
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || '提交失败，服务器响应错误')
      }
      
      const data = await response.json()
      console.log('提交成功，服务器响应:', data)
      
      // 清除草稿
      localStorage.removeItem('onboardingFormDraft')
      
      // 使用简单方式显示消息
      ElMessage.success('提交成功，即将返回上一页')
      
      // 提交成功后返回上一页
      setTimeout(() => {
        router.back()
      }, 3000)
    } catch (apiError) {
      console.error('API 调用错误:', apiError)
      
      // 如果是网络错误，使用模拟提交
      if (apiError.message === 'Failed to fetch') {
        ElMessage.warning('后端服务器连接失败，使用模拟提交')
        
        // 模拟提交成功
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // 清除草稿
        localStorage.removeItem('onboardingFormDraft')
        
        // 使用简单方式显示消息
        ElMessage.success('模拟提交成功，即将返回上一页')
        
        // 提交成功后返回上一页
        setTimeout(() => {
          router.back()
        }, 3000)
      } else {
        // 如果是其他错误，重新抛出
        throw apiError
      }
    }
  } catch (error) {
    console.error('Submit error:', error)
    ElMessage.error(error.message || '提交失败，请检查网络后重试')
  } finally {
    loading.submit = false
  }
}

// ===== 表单验证规则 =====
const validateForm = () => {
  const { auditInfo, personalInfo, departmentInfo, salaryInfo, educationInfo } = form

  // 审核信息验证
  if (!auditInfo.invitationNumber) {
    ElMessage.warning('请输入邀请码')
    return false
  }

  // 个人信息验证
  if (!personalInfo.name) {
    ElMessage.warning('请输入姓名')
    return false
  }

  if (!personalInfo.idNumber) {
    ElMessage.warning('请输入身份证号')
    return false
  }

  // 身份证号格式验证
  const idNumberPattern = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (!idNumberPattern.test(personalInfo.idNumber)) {
    ElMessage.warning('请输入正确的身份证号')
    return false
  }

  if (!personalInfo.phone) {
    ElMessage.warning('请输入手机号')
    return false
  }

  // 手机号格式验证
  const phonePattern = /^1[3-9]\d{9}$/
  if (!phonePattern.test(personalInfo.phone)) {
    ElMessage.warning('请输入正确的手机号')
    return false
  }

  if (!personalInfo.email) {
    ElMessage.warning('请输入邮箱')
    return false
  }

  // 邮箱格式验证
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  if (!emailPattern.test(personalInfo.email)) {
    ElMessage.warning('请输入正确的邮箱地址')
    return false
  }

  if (!personalInfo.address) {
    ElMessage.warning('请输入居住地址')
    return false
  }

  if (!personalInfo.maritalStatus) {
    ElMessage.warning('请选择婚姻状况')
    return false
  }

  if (!personalInfo.politicalStatus) {
    ElMessage.warning('请选择政治面貌')
    return false
  }

  // 部门信息验证
  if (!departmentInfo.employmentType) {
    ElMessage.warning('请选择入职类型')
    return false
  }

  if (!departmentInfo.center) {
    ElMessage.warning('请选择中心')
    return false
  }

  if (!departmentInfo.department) {
    ElMessage.warning('请选择部门')
    return false
  }

  if (!departmentInfo.position) {
    ElMessage.warning('请输入职位')
    return false
  }

  if (!departmentInfo.level) {
    ElMessage.warning('请选择职级')
    return false
  }

  if (!departmentInfo.workplace) {
    ElMessage.warning('请选择入职职场')
    return false
  }

  // 薪酬福利验证
  if (!salaryInfo.bankCardNumber) {
    ElMessage.warning('请输入银行卡号')
    return false
  }

  // 银行卡号格式验证
  const bankCardPattern = /^\d{16,19}$/
  if (!bankCardPattern.test(salaryInfo.bankCardNumber)) {
    ElMessage.warning('请输入正确的银行卡号')
    return false
  }

  if (!salaryInfo.bankName) {
    ElMessage.warning('请选择开户银行')
    return false
  }

  if (!salaryInfo.bankBranch) {
    ElMessage.warning('请输入开户支行')
    return false
  }

  if (!salaryInfo.socialInsurance) {
    ElMessage.warning('请选择社保缴纳方式')
    return false
  }

  if (!salaryInfo.housingFund) {
    ElMessage.warning('请选择公积金缴纳方式')
    return false
  }

  // 学历信息验证
  if (!educationInfo.highestDegree) {
    ElMessage.warning('请选择最高学历')
    return false
  }

  if (!educationInfo.school) {
    ElMessage.warning('请输入毕业院校')
    return false
  }

  if (!educationInfo.major) {
    ElMessage.warning('请输入专业')
    return false
  }

  if (!educationInfo.graduationDate) {
    ElMessage.warning('请选择毕业时间')
    return false
  }

  return true
}
</script>

<style scoped>
/* 容器样式 */
.onboarding-container {
  min-height: 100vh;
  background-color: #f7f8fa;
  padding-bottom: 68px;
}

/* 导航栏样式 */
.nav-bar {
  position: sticky;
  top: 0;
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  align-items: center;
  padding: 12px 16px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  z-index: 100;
}

.nav-left {
  display: flex;
  align-items: center;
}

.nav-title {
  font-size: 16px;
  font-weight: 500;
  color: #323233;
  text-align: center;
}

.nav-icon {
  font-size: 20px;
  color: #1989fa;
  cursor: pointer;
}

.nav-back {
  font-size: 20px;
  color: #323233;
  cursor: pointer;
}

.ml-2 {
  margin-left: 12px;
}

/* 表单容器样式 */
.form-container {
  padding: 16px 0;
}

.form-section {
  margin-bottom: 24px;
  padding: 0 20px;
}

.section-header {
  display: flex;
  align-items: center;
  background: linear-gradient(to right, #1989fa, #39b9fa);
  border-radius: 8px 8px 0 0;
  padding: 12px 16px;
  margin-bottom: -1px;
  position: relative;
  z-index: 1;
}

.section-icon {
  font-size: 20px;
  color: #fff;
  margin-right: 8px;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  margin: 0;
  padding: 0;
}

.form-group {
  background: #fff;
  border-radius: 0 0 8px 8px;
  padding: 8px 16px;
}

/* 底部按钮栏样式 */
.fixed-bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 20px;
  background: #fff;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  z-index: 100;
}

.save-button {
  width: 30%;
  height: 44px;
  border: 1px solid #1989fa;
  background-color: #fff;
  color: #1989fa;
  font-size: 14px;
  border-radius: 22px;
  cursor: pointer;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-button {
  width: 65%;
  height: 44px;
  border: none;
  background-color: #1989fa;
  color: #fff;
  font-size: 14px;
  border-radius: 22px;
  cursor: pointer;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.save-button:hover,
.submit-button:hover {
  opacity: 0.9;
}

.button-icon {
  font-size: 16px;
  margin-right: 4px;
}

/* 帮助对话框样式 */
:deep(.help-dialog) {
  border-radius: 16px;
  overflow: hidden;
}

:deep(.help-dialog .el-dialog) {
  margin-top: 20vh !important;
  border-radius: 16px;
}

:deep(.help-dialog .el-dialog__header) {
  margin: 0;
  padding: 16px 20px;
  border-bottom: 1px solid #ebedf0;
}

:deep(.help-dialog .el-dialog__title) {
  font-size: 16px;
  font-weight: 500;
  color: #323233;
}

:deep(.help-dialog .el-dialog__headerbtn) {
  top: 16px;
  right: 16px;
}

:deep(.help-dialog .el-dialog__body) {
  padding: 20px;
}

.help-content {
  padding: 0;
}

.help-content h3 {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 16px;
  color: #323233;
}

.help-content p {
  margin: 8px 0;
  font-size: 14px;
  color: #646566;
  line-height: 1.5;
}

/* 添加表单项样式 */
.form-item {
  position: relative;
  padding: 10px 0;
  border-bottom: 1px solid #ebedf0;
}

.form-item:last-child {
  border-bottom: none;
}

.form-item.required label::before {
  content: '*';
  color: #ee0a24;
  margin-right: 4px;
}

.form-item label {
  display: block;
  font-size: 14px;
  color: #646566;
  margin-bottom: 8px;
}

.form-item input {
  width: 100%;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #dcdee0;
  border-radius: 8px;
  font-size: 14px;
  color: #323233;
  background: #fff;
}

.form-item input:focus {
  outline: none;
  border-color: #1989fa;
  box-shadow: 0 0 0 2px rgba(25, 137, 250, 0.1);
}

.form-item input:hover {
  border-color: #1989fa;
}

.form-item input::placeholder {
  color: #969799;
}

.form-item input:read-only {
  background-color: #f7f8fa;
  color: #969799;
  border: 1px solid #ebedf0;
}

/* 在style部分添加select样式 */
.form-item select {
  width: 100%;
  height: 36px;
  padding: 0 32px 0 12px;
  border: 1px solid #dcdee0;
  border-radius: 8px;
  font-size: 14px;
  color: #323233;
  background: #fff url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="%23969799" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>') no-repeat right 12px center;
  background-size: 12px;
  appearance: none;
  -webkit-appearance: none;
  transition: all 0.3s;
}

.form-item select:focus {
  outline: none;
  border-color: #1989fa;
  box-shadow: 0 0 0 2px rgba(25, 137, 250, 0.1);
}

.form-item select:hover {
  border-color: #1989fa;
}

.form-item select:disabled {
  background-color: #f7f8fa;
  color: #969799;
  border: 1px solid #ebedf0;
  cursor: not-allowed;
}

/* 日期选择器样式优化 */
:deep(.el-input__wrapper) {
  background-color: #fff;
  box-shadow: 0 0 0 1px #dcdee0 !important;
  border-radius: 8px;
  height: 36px;
  padding: 0 12px;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #1989fa !important;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #1989fa, 0 0 0 3px rgba(25, 137, 250, 0.1) !important;
}

:deep(.el-input__prefix-icon) {
  font-size: 12px !important;
  width: 12px !important;
  height: 12px !important;
  margin-right: 4px;
  color: #969799;
}

:deep(.el-input__inner) {
  font-size: 14px;
  color: #323233;
  height: 36px;
  line-height: 36px;
}

/* 消息提示样式 */
:deep(.el-message) {
  background: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  border: none !important;
  border-radius: 12px !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
  padding: 14px 24px !important;
  transform: translateY(10px);
  animation: message-slide-up 0.3s ease forwards;
}

@keyframes message-slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:deep(.el-message__content) {
  color: #333 !important;
  font-size: 14px !important;
  font-weight: 500 !important;
}

:deep(.el-message--success) {
  border-left: 4px solid #67c23a !important;
}

:deep(.el-message--success .el-message__icon) {
  color: #67c23a !important;
}

:deep(.el-message--error) {
  border-left: 4px solid #f56c6c !important;
}

:deep(.el-message--error .el-message__icon) {
  color: #f56c6c !important;
}

:deep(.el-message--warning) {
  border-left: 4px solid #e6a23c !important;
}

:deep(.el-message--warning .el-message__icon) {
  color: #e6a23c !important;
}

/* 返回按钮样式优化 */
.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 6px;
  background-color: transparent;
  color: #323233;
  cursor: pointer;
  transition: all 0.3s;
}

.back-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.back-button:active {
  background-color: rgba(0, 0, 0, 0.1);
}

.back-button .nav-icon {
  font-size: 16px;
}

/* 文本域样式 */
.textarea-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #dcdee0;
  border-radius: 8px;
  font-size: 14px;
  color: #323233;
  background: #fff;
  resize: vertical;
  min-height: 80px;
  line-height: 1.5;
}

.textarea-input:focus {
  outline: none;
  border-color: #1989fa;
  box-shadow: 0 0 0 2px rgba(25, 137, 250, 0.1);
}

.textarea-input:hover {
  border-color: #1989fa;
}

.textarea-input::placeholder {
  color: #969799;
}

/* 复选框组样式 */
.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  margin-right: 16px;
}

.checkbox-item input[type="checkbox"] {
  width: 18px;
  height: 18px;
  margin-right: 6px;
  cursor: pointer;
}

.checkbox-item label {
  font-size: 14px;
  color: #323233;
  margin-bottom: 0;
  cursor: pointer;
}
</style>