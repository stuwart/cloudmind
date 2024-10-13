# CloudMind Blog

CloudMind Blog 是一个使用 Next.js 构建的现代化博客平台。该项目采用了最新的 Web 开发技术和最佳实践,旨在提供一个高性能、可扩展且用户友好的博客系统。

## 主要特性

1. 使用 Next.js 14 框架,支持服务器端渲染和静态生成
2. 采用 TypeScript 进行类型检查,提高代码质量和可维护性
3. 使用 Tailwind CSS 进行样式设计,实现响应式布局
4. 集成 Shadcn UI 组件库,提供美观一致的用户界面
5. 使用 React Hook Form 和 Zod 进行表单处理和验证
6. 集成 Supabase 进行身份认证和数据存储
7. 支持 Google One Tap 登录功能

## 项目结构

- `app/`: 包含 Next.js 应用程序的主要路由和页面组件
- `components/`: 存放可复用的 React 组件
- `lib/`: 包含工具函数和通用逻辑
- `utils/`: 存放辅助函数和工具类
- `public/`: 静态资源文件夹

## 主要组件

1. LoginPage: 用户登录和注册页面
2. OneTapComponent: 实现 Google One Tap 登录功能
3. NavigationMenu: 网站导航菜单组件
4. Form 相关组件: 用于构建和处理表单

## 开始使用

1. 克隆仓库
2. 安装依赖: `npm install`
3. 运行开发服务器: `npm run dev`
4. 在浏览器中打开 http://localhost:3000

## 部署

项目可以轻松部署到 Vercel 平台。详细部署说明请参考 Next.js 官方文档。

## 贡献

欢迎提交 Pull Requests 来改进这个项目。在提交之前,请确保遵循现有的代码风格并通过所有的测试。

## 许可证

本项目采用 MIT 许可证。详情请参见 LICENSE 文件。
