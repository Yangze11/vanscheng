@echo off
echo 正在启动万程IOA后台管理系统...

cd server
echo 创建管理员账号...
call npm run create-admin

echo 启动后端服务器(API)...
start cmd /k npm run dev

cd ../client
echo 启动前端应用...
start cmd /k npm start

echo 系统启动完成！
echo 前端应用访问地址: http://localhost:3001/login
echo 后端API地址: http://localhost:5001
echo 默认管理员账号：工号 12001，密码 122388
pause 