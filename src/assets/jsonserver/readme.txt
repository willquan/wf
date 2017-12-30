1. 安装jsonServer环境
    npm install json-server --save-dev
2. 运行node server.js


1. 为什么要分 系统角色 业务角色？
   业务角色 和 权限隔离
   建2个表是为了权限角色和业务角色分离，比如都是值长，值长1要管理岗位，值长2要管理部门信息，但是他们业务角色都是值长，这时候就得分离了