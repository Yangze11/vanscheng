# 万程IOA后台管理系统 - 角色与权限说明

本文档详细说明了万程IOA后台管理系统的角色与权限设计，包括角色定义、权限分配和使用方法。

## 角色体系

系统根据万程IOA的组织结构和业务需求，设计了以下角色体系：

### 管理角色

- **超级管理员 (super-admin)**: 拥有系统最高权限，可以管理所有功能和数据
- **管理员 (admin)**: 拥有大部分系统管理权限，但无法修改系统核心配置

### 人力资源角色

- **HR**: 负责基础人事管理，包括员工信息维护、审批处理等
- **HRBP**: 人力资源业务伙伴，拥有更高级的人力资源管理权限

### 主播部门角色

- **星探**: 负责主播招募和管理的专职人员

### 管理层级角色

- **组长**: 团队基层管理者
- **主管**: 部门管理者
- **经理**: 部门高级管理者
- **总经理**: 中心或公司级别的高级管理者

### 普通角色

- **员工**: 基础用户角色，拥有有限的系统访问权限

## 权限分类

系统权限分为以下几类：

### 系统管理权限

- **system:admin**: 系统管理权限
- **system:config**: 系统配置权限

### 用户管理权限

- **user:view**: 查看用户信息
- **user:create**: 创建用户
- **user:edit**: 编辑用户信息
- **user:delete**: 删除用户

### 审批权限

- **approval:view**: 查看审批信息
- **approval:create**: 创建审批申请
- **approval:process**: 处理审批
- **approval:admin**: 管理所有审批

### 员工管理权限

- **employee:view**: 查看员工信息
- **employee:create**: 创建员工记录
- **employee:edit**: 编辑员工信息
- **employee:delete**: 删除员工记录

### 部门管理权限

- **department:view**: 查看部门信息
- **department:manage**: 管理部门

### 数据权限

- **data:view**: 查看数据
- **data:export**: 导出数据
- **data:admin**: 管理数据

### 薪资权限

- **salary:view**: 查看薪资信息
- **salary:manage**: 管理薪资

### 绩效权限

- **performance:view**: 查看绩效信息
- **performance:manage**: 管理绩效

## 角色权限映射

每个角色拥有的默认权限如下：

### 超级管理员 (super-admin)

拥有系统所有权限。

### 管理员 (admin)

拥有除系统管理外的所有权限：
- 用户管理（查看、创建、编辑、删除）
- 审批管理（查看、创建、处理、管理）
- 员工管理（查看、创建、编辑、删除）
- 部门管理（查看、管理）
- 数据管理（查看、导出、管理）
- 薪资管理（查看、管理）
- 绩效管理（查看、管理）

### HR

拥有基础人事管理权限：
- 用户查看
- 审批查看和处理
- 员工信息管理（查看、创建、编辑）
- 部门查看
- 数据查看
- 薪资查看
- 绩效查看

### HRBP

拥有高级人事管理权限：
- 用户查看
- 审批管理（查看、处理、管理）
- 员工信息管理（查看、创建、编辑、删除）
- 部门查看
- 数据查看和导出
- 薪资管理（查看、管理）
- 绩效管理（查看、管理）

### 星探

拥有主播管理相关权限：
- 审批查看和创建
- 员工查看
- 数据查看

### 组长

拥有团队管理权限：
- 审批查看和处理
- 员工查看
- 数据查看
- 绩效查看

### 主管

拥有部门管理权限：
- 审批查看和处理
- 员工查看和编辑
- 部门查看
- 数据查看和导出
- 绩效管理（查看、管理）

### 经理

拥有高级部门管理权限：
- 审批管理（查看、处理、管理）
- 员工查看和编辑
- 部门管理（查看、管理）
- 数据查看和导出
- 薪资查看
- 绩效管理（查看、管理）

### 总经理

拥有中心级管理权限：
- 用户查看
- 审批管理（查看、处理、管理）
- 员工查看和编辑
- 部门管理（查看、管理）
- 数据管理（查看、导出、管理）
- 薪资管理（查看、管理）
- 绩效管理（查看、管理）

### 员工

拥有基础权限：
- 审批查看和创建
- 员工查看
- 数据查看

## 部门设置

系统根据万程IOA的组织结构，设置了以下部门：

### MCN直播运营中心
- 视频娱乐主播部 (mcn-video-ent)
- 视频带货主播部 (mcn-video-ecom)
- 视频艺人主播部 (mcn-video-celeb)
- 语音娱乐主播部 (mcn-audio-ent)
- 语音交友主播部 (mcn-audio-social)
- 语音点唱主播部 (mcn-audio-music)
- 语音电台主播部 (mcn-audio-radio)
- 星探经纪部 (mcn-talent-scout)
- 直播监管部 (mcn-scene-control)
- 运营支持部 (mcn-operation)
- 执行管理部 (mcn-management)
- 内容策划与制作部 (mcn-content)
- 数据分析与评估部 (mcn-data-analysis)

### HRO人资组织中心
- 人事管理部 (hro-admin)
- 招聘管理部 (hro-recruit)
- 培训发展部 (hro-training)
- 薪酬福利部 (hro-compensation)
- 员工关系部 (hro-employee)
- 组织发展部 (hro-organization)

## 使用方法

### 前端使用

在前端组件中，可以通过检查用户的角色和权限来控制UI元素的显示：

```jsx
// 检查用户是否有特定权限
const hasPermission = (permission) => {
  return userInfo?.permissions?.includes(permission);
};

// 检查用户是否有多个权限中的任意一个
const hasAnyPermission = (permissions) => {
  return permissions.some(permission => userInfo?.permissions?.includes(permission));
};

// 在组件中使用
{hasPermission('user:create') && (
  <Button type="primary" onClick={handleAddUser}>添加用户</Button>
)}
```

### 后端使用

在后端路由中，使用中间件来保护API端点：

```javascript
// 使用权限中间件保护路由
router.route('/users')
  .get(protect, userPermissions.view, getUsers)
  .post(protect, userPermissions.create, createUser);

// 使用角色中间件保护路由
router.route('/system/config')
  .get(protect, superAdmin, getSystemConfig)
  .put(protect, superAdmin, updateSystemConfig);
```

## 自定义权限

超级管理员可以为特定用户分配自定义权限，覆盖其角色默认权限：

1. 进入用户管理页面
2. 选择需要编辑的用户
3. 在权限设置选项卡中，勾选或取消勾选特定权限
4. 保存更改

## 初始管理员账户

系统初始化时会创建一个超级管理员账户：

- 工号: 12001
- 密码: 122388
- 角色: super-admin

首次登录后请立即修改密码。 