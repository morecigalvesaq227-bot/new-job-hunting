# 王明浩 · 金融数据与 AI 产品作品集

面向 AI 产品经理招聘方的个人作品集。以纸张纹理和丝网印刷拼贴插画呈现金融数据、产品实践与职业经历，核心浏览路径是了解定位、查看案例、联系本人。

## 本地运行

需要 Node.js 20 或更高版本。

```bash
npm install
npm run dev
```

生产构建及静态导出：

```bash
npm run build
```

静态成品输出到 `out/`，可部署到支持静态站点的托管平台。开发时访问 Next.js 输出的本地地址。

## GitHub Pages

仓库配置 Pages 的发布来源为 **GitHub Actions** 后，推送到 `main` 会自动构建并发布项目站点。工作流构建时设置 `GITHUB_PAGES=true`，按仓库名 `/new-job-hunting/` 配置 Next.js 子路径，并为静态导出的图片与简历链接补齐子路径。不要将 `node_modules/`、`.next/` 或 `out/` 提交到仓库。

Pages 是公开网站；发布前请确认简历 PDF、联系方式和肖像均可公开。GitHub Free 计划只支持从公开仓库发布 Pages。

## 主要文件

- `components/IllustratedPortfolio.tsx`：页面内容、`SectionHeading` / `PrintedIcon` 等复用组件、筛选和详情交互。
- `app/illustrated.css`：纸张底纹、字体系统、分隔纹样、组件动效与减少动态效果支持。
- `public/images/`：按选定原型风格生成并压缩为 WebP 的背景、人物、项目、经历、能力、指标、联系图标和装饰纹样；图标均为独立文件，便于单独加动效。
- `public/resume.pdf`：本人提供的可下载简历，含个人联系方式与肖像。
- `DESIGN.md`：设计选择、内容来源和公开展示边界。

## 内容与隐私

项目文案依据本人简历、本人补充和本地项目代码整理。页面未放入公司 Logo、客户名单、真实工单、内网地址或明细业务数据；页面展示了工作经历、项目摘要和经本人提供的汇总指标。背景、插画、导航 / 分类图标、标题底章和分隔纹样均为统一画风的生成式 WebP 素材；GitHub / 微信白色品牌图标按官方轮廓参照生图制作，邮件 / 电话 / 下载 / 箭头使用简洁线性图标。页面已显示简历中的联系方式，并包含可下载的简历 PDF 与人物插画。图像由 `PrintedIcon`、`ProjectArt` 等组件独立承载，可分别添加动画。中文正文采用 Noto Sans SC，中文标题采用 Noto Serif SC，英文标签与数字采用 DM Mono / Space Grotesk。答疑助手的离线检索评测仅说明来源工单 ID 的 Top-5 命中情况，不代表回答准确率。公开部署前请确认联系方式、简历、肖像、工作成果和评测汇总指标均获准公开。

## 页面功能

- 导航至关于、项目、经历、能力和联系区。
- 按金融数据 / AI 产品筛选案例，并打开项目要点。
- 移动端导航、键盘焦点样式与 `prefers-reduced-motion` 支持。

