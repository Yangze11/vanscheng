# 万程IOA后台管理系统

这是一个基于React和Node.js的万程IOA后台管理系统，提供用户管理、人事审批、数据管理和系统设置等功能。系统采用前后端分离架构。

## 技术栈

### 前端
- React 18
- Redux Toolkit
- React Router v6
- Ant Design 5
- Chart.js
- Axios

### 后端
- Node.js
- Express
- MongoDB
- Mongoose
- JWT认证
- bcryptjs

## 功能特性

- 管理员登录（支持工号和邮箱登录）
- 仪表盘数据可视化
- 人事审批管理
- 数据管理
- 系统设置（管理员账号管理）
- 基于角色的权限控制

## 快速开始

### 前提条件

- Node.js (v14+)
- MongoDB

### 安装和运行

1. 克隆仓库
```bash
git clone <repository-url>
cd wancheng-ioa-admin
```

2. 安装依赖
```bash
# 安装所有依赖
npm run install-all

# 或者分别安装
# 安装根目录依赖
npm install

# 安装服务器依赖
cd server
npm install

# 安装客户端依赖
cd ../client
npm install
```

3. 使用批处理文件启动项目
```bash
# 返回项目根目录
cd ..
# 运行批处理文件
start.bat
```

或者手动启动：

```bash
# 创建管理员账号
cd server
npm run create-admin

# 启动后端服务器
npm run dev

# 启动前端应用
cd ../client
npm start
```

4. 访问应用
- 前端应用: http://localhost:3000/login
- 后端API: http://localhost:5000
- 默认管理员账号：
  - 工号: 12001
  - 密码: 122388
  - 姓名: 姚家荣
  - 部门: 总经办

## 系统架构

系统采用前后端分离架构：
- 前端：React应用，运行在端口3000
- 后端：Express API服务，运行在端口5000
- 前端通过代理将API请求转发到后端

## 系统功能说明

### 登录页面
- 支持工号和邮箱两种登录方式
- 只有管理员和超级管理员可以登录后台

### 仪表盘
- 显示员工总数、待审批数量等统计数据
- 展示部门人员分布饼图
- 展示员工增长趋势图
- 显示待审批列表和通知

### 系统设置
- 管理员账号管理：添加、编辑、删除管理员账号

### 个人资料
- 查看和编辑个人信息
- 修改密码

## 项目结构

```
wancheng-ioa-admin/
├── client/                 # 前端代码
│   ├── public/             # 静态资源
│   └── src/                # 源代码
│       ├── components/     # 组件
│       ├── pages/          # 页面
│       ├── slices/         # Redux状态管理
│       ├── App.js          # 应用入口
│       └── index.js        # 主入口
├── server/                 # 后端代码
│   ├── config/             # 配置文件
│   ├── controllers/        # 控制器
│   ├── middleware/         # 中间件
│   ├── models/             # 数据模型
│   ├── routes/             # 路由
│   ├── scripts/            # 脚本
│   └── index.js            # 服务器入口
├── package.json            # 项目配置
└── start.bat               # 启动脚本
```

## 许可证

MIT 