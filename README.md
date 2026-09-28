# 毛茸茸 · PAW SPA

Next.js App Router + TypeScript 单页，保留原洗护店设计、预约演示、环境轮播及门店地图。预约仅在页面内生成意向，不发送或存储数据。

## 本地开发

需要 Node.js 20.9 或更新版本，以及 npm。

```sh
npm ci
npm run dev
```

打开终端显示的本地地址，默认 http://localhost:3000。不要双击 HTML 或使用 file:// 访问。

## 检查与生产预览

```sh
npm run typecheck
npm run build
npm run preview
```

`next build` 静态导出到 `out/`，`preview` 通过 HTTP 提供该目录。可用 `PORT` 环境变量调整预览端口。部署时发布整个 `out/`，不是只上传 index.html。静态导出不使用 `next start`，也不需要图片优化服务。

## 结构

- `app/`：首页、布局、中文元数据、全局 CSS。
- `components/`：服务端内容组件及客户端预约、轮播组件。
- `public/`：原有照片、环境图片、位置插画和站点图标。
- `.openai/hosting.json`：保留原 Site ID，静态发布目录为 `out`。

预约输入不持久化；轮播支持手动切换、触摸、键盘、暂停与减少动态效果偏好。地图链接保留上海市陕西北路1620号。
