# 动态路由切换后，先前的 clientLoader 会覆盖当前页面的数据

在同一个订单组件里从 `/orders/1` 切到 `/orders/2`，第二个订单已经加载完成。这时让第一个订单的请求返回，地址仍是 `/orders/2`，页面却显示了订单 1。数据直接取自 `useClientLoaderData`，组件里没有另外维护请求状态。

在仓库根目录执行以下命令。

```sh
npm ci
npm run build -w loader-navigation-race
npm run preview -w loader-navigation-race -- --port 4232
```

1. 打开 `http://127.0.0.1:4232/orders/1`。第一个 loader 会等待页面按钮放行，这样可以控制两个请求的完成顺序。
2. 点击 **Open order 2**，等页面显示 `Loaded order: 2`。
3. 点击 **Finish loading order 1**。结果变成 `Current order: 2`、`Loaded order: 1`。预期仍显示订单 2。

复现环境为 Umi 4.7.35、React 18.3.1、Node.js 22.23.4、macOS 15.7.7 arm64。
