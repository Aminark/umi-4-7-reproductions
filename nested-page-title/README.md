# 嵌套路由预渲染时，较慢的父级 loader 会覆盖子页标题

文档栏目和安装指南都通过 `metadataLoader` 设置标题。构建出来的安装指南正文正确，HTML 标题却取了栏目名。只交换父子 loader 的完成顺序，标题就变了。

在仓库根目录执行以下命令。

```sh
npm ci
npm run build -w nested-page-title
```

查看 `nested-page-title/dist/docs/install/index.html`，其中有 `<h1>Installation</h1>`，但标题是 `<title>Documentation</title>`。

把 `src/pages/section.tsx` 中 100 毫秒的等待从父级 `serverLoader` 移到 `src/pages/install.tsx` 的子级 `serverLoader`，再次构建，标题就成了 `Installation`。两次使用完全相同的路由和标题配置，预期子页标题始终优先。

复现环境为 Umi 4.7.35、React 18.3.1、Node.js 22.23.4、macOS 15.7.7 arm64。
