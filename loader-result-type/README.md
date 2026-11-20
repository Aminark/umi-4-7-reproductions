# useLoaderData 的泛型返回类型缺少运行时的 data 字段

给 `useLoaderData` 传了 loader 的类型后，TypeScript 会拒绝能正常工作的 `result.data.count`，却允许访问运行时不存在的 `result.count`。

示例的 `clientLoader` 返回 `{ count: 7 }`。在仓库根目录运行类型检查。

```sh
npm ci
npm run check -w loader-result-type
```

`check.ts` 中的 `useLoaderData<typeof clientLoader>().data.count` 报错 `TS2339: Property 'data' does not exist on type '{ count: number; }'.`。改为读取 `result.count`，同一个检查就会通过。

运行下面的命令并打开 `http://127.0.0.1:4233/`。页面直接打印 hook 的返回值，数据实际是 `{"data":{"count":7}}`。预期类型检查允许读取 `result.data.count`，并能推断它是 `number`。

```sh
npm run build -w loader-result-type
npm run preview -w loader-result-type -- --port 4233
```

复现环境为 Umi 4.7.35、React 18.3.1、Node.js 22.23.4、macOS 15.7.7 arm64。 类型检查使用 TypeScript 5.6.3。
