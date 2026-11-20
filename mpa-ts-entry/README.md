# MPA 的 index.ts 入口会生成含 JSX 的 .ts 文件，导致构建失败

一个不含 JSX 的 TypeScript 页面，用 `createElement` 返回普通元素。MPA 模式能识别它作为入口，但编译时在框架生成的文件里报错。

在仓库根目录执行以下命令。

```sh
npm ci
npm run build -w mpa-ts-entry
```

出错的是 `src/.umi-production/mpa/reports.ts`，里面生成了 `.render(<App />)`，错误为 `Expected ">" but found "/"`。业务入口 `src/pages/reports/index.ts` 里没有 JSX。

将该入口改名为 `index.tsx`，保留原样再构建，就能生成 `dist/reports.html`。文档列出的入口模式是 `*/index.[jt]sx?`，预期相同代码放在 `index.ts` 中也能构建。[MPA 入口约定](https://github.com/umijs/umi/blob/d99289e69be57953a45dac79297776e1d25da84d/docs/docs/docs/guides/mpa.md#L33-L39)

复现环境为 Umi 4.7.35、React 18.3.1、Node.js 22.23.4、macOS 15.7.7 arm64。
