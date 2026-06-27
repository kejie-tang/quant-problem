# Quant Problem

数学与量化题库，使用 VitePress 生成静态站点，并通过 GitHub Actions 部署到 GitHub Pages。

## 本地使用

```bash
npm install
npm run docs:dev
```

本地预览默认地址：

```text
http://localhost:5173/quant-problem/
```

## 发布

提交并推送到 `main` 后，GitHub Actions 会自动构建并发布到 GitHub Pages。

公开地址：

```text
https://kejie-tang.github.io/quant-problem/
```

## 题目组织

题目放在 `docs/problems/` 下，建议一题一个 Markdown 文件。可以从 `docs/problems/templates/problem-template.md` 复制模板开始。
