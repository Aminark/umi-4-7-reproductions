# SSR 首屏加载后通过 Link 进入另一页，目标页的 serverLoader 数据缺失

首页和报表页各自导出一个 `serverLoader`。直接访问报表页能拿到它的数据，但先打开首页再点链接，报表页就读不到同一份数据。

在仓库根目录运行生产构建和 SSR 服务。

```sh
npm ci
npm run build -w ssr-route-data
npm run serve -w ssr-route-data
```

1. 打开 `http://127.0.0.1:4234/`，点击 **Open report**。地址变成 `/report`，标题显示 `Missing report`。
2. 刷新当前页面，标题变成了 `Quarterly report`。预期站内跳转时也能显示这个标题。

复现用的是构建生成的 SSR 请求处理器。首页 HTML 带有首页的 loader 数据，点击链接时浏览器没有发出 `__serverLoader` 请求。

复现环境为 Umi 4.7.35、React 18.3.1、Node.js 22.23.4、macOS 15.7.7 arm64。
