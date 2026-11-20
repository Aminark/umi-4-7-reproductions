# Umi 4.7.35 最小复现

这些例子共用一次依赖安装。在仓库根目录运行 `npm install`，下面的命令也都在根目录执行。验证环境为 Node.js 22.23.4、React 18.3.1 和 macOS 15.7.7 arm64。

## 路由、数据加载和构建

- [动态路由切换后，先前的 clientLoader 会覆盖当前页面的数据](./loader-navigation-race)
- [SSR 首屏加载后通过 Link 进入另一页，目标页的 serverLoader 数据缺失](./ssr-route-data)
- [嵌套路由预渲染时，较慢的父级 loader 会覆盖子页标题](./nested-page-title)
- [MPA 的 index.ts 入口会生成含 JSX 的 .ts 文件，导致构建失败](./mpa-ts-entry)
- [keepQuery 遇到自带查询参数的重定向目标，会把两个参数拼成一个值](./redirect-query)
- [useLoaderData 的泛型返回类型缺少运行时的 data 字段](./loader-result-type)

## 静态导出拒绝对象数组

[项目文件](./static-extra-routes) · [上游 issue #13486](https://github.com/umijs/umi/issues/13486)

```sh
npm run build -w static-extra-routes
```

项目有一条动态路由 `/news/:id`。配置为 `extraRoutePaths: [{ path: '/news/1', prerender: false }]` 时，构建在校验配置时退出，错误为 `Expected string, received object`。在 `static-extra-routes/.umirc.ts` 里把值改为 `() => [{ path: '/news/1', prerender: false }]` 再构建，可以生成 `static-extra-routes/dist/news/1/index.html`。

## 单文件路由丢失文件名末尾的 index

[项目文件](./convention-route-index) · [上游 issue #13487](https://github.com/umijs/umi/issues/13487)

```sh
npm run build -w convention-route-index
```

两个页面都使用约定式路由。开启 `exportStatic` 是为了直接从构建产物看到路径。

| 页面文件 | 预期的输出 | 实际的输出 |
| --- | --- | --- |
| `src/pages/search-index.tsx` | `dist/search-index/index.html` | `dist/search-/index.html` |
| `src/pages/archive-index/index.tsx` | `dist/archive-index/index.html` | `dist/archive-index/index.html` |

## preview 在关闭 mock 后仍返回 mock 数据

[项目文件](./preview-mock) · [上游 issue #13488](https://github.com/umijs/umi/issues/13488)

```sh
npm run build -w preview-mock
cat preview-mock/dist/status.json
npm run preview -w preview-mock -- --port 4194
```

构建产物是 `{"source":"static"}`。保持预览服务运行，在另一个终端请求同一文件。端口已被占用时，使用预览服务打印的端口。

```sh
curl -s http://127.0.0.1:4194/status.json
```

实际得到 `{"source":"mock"}`。项目已经设置了 `mock: false`，预期拿到构建产物里的 `{"source":"static"}`。
