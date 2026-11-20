# keepQuery 遇到自带查询参数的重定向目标，会把两个参数拼成一个值

旧列表地址重定向到 `/items?sort=date`，同时希望保留旧链接里的分页参数。开启 `keepQuery` 后，原来的页码被拼进了 `sort` 的值。

复现中的路由配置如下。

```ts
{ path: '/old', redirect: '/items?sort=date', keepQuery: true }
```

在仓库根目录启动示例。

```sh
npm ci
npm run build -w redirect-query
npm run preview -w redirect-query -- --port 4231
```

访问 `http://127.0.0.1:4231/old?page=2#results` 后，浏览器实际跳到了 `/items?sort=date?page=2#results`。页面用 `URLSearchParams` 读到的 `sort` 是 `date?page=2`，`page` 为 `null`。

预期目标里同时包含 `sort=date` 和 `page=2`，并保留 `#results`。这两个键没有冲突。直接打开不带参数的 `/old` 时，目标页可以正常读到 `sort=date`。

复现环境为 Umi 4.7.35、React 18.3.1、Node.js 22.23.4、macOS 15.7.7 arm64。
