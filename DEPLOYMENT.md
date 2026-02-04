# 部署指南

本文档提供了将 TritonDFT 演示网站部署到各种托管平台的详细说明。

## 目录

- [本地测试](#本地测试)
- [GitHub Pages](#github-pages)
- [Netlify](#netlify)
- [Vercel](#vercel)
- [其他托管选项](#其他托管选项)

---

## 本地测试

在部署之前，建议先在本地测试网站。

### 方法 1: Python HTTP 服务器

```bash
# 进入项目目录
cd TritonDFT-Demo-Web

# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

然后在浏览器访问 `http://localhost:8000`

### 方法 2: Node.js http-server

```bash
# 安装 http-server（首次使用）
npm install -g http-server

# 运行服务器
http-server -p 8000
```

### 方法 3: PHP 内置服务器

```bash
php -S localhost:8000
```

### 方法 4: VS Code Live Server

如果使用 VS Code：
1. 安装 "Live Server" 扩展
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"

---

## GitHub Pages

GitHub Pages 是免费且简单的静态网站托管方案。

### 步骤 1: 创建 GitHub 仓库

```bash
# 初始化 Git 仓库
cd TritonDFT-Demo-Web
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: TritonDFT demo website"

# 添加远程仓库（替换为你的仓库 URL）
git remote add origin https://github.com/yourusername/tritondft-demo.git

# 推送到 GitHub
git push -u origin main
```

### 步骤 2: 启用 GitHub Pages

1. 进入你的 GitHub 仓库
2. 点击 "Settings"（设置）
3. 在左侧菜单中找到 "Pages"
4. 在 "Source" 下选择 "main" 分支
5. 选择根目录 "/ (root)"
6. 点击 "Save"

几分钟后，你的网站将在 `https://yourusername.github.io/tritondft-demo/` 上线。

### 自定义域名（可选）

1. 在 "Custom domain" 输入你的域名
2. 在你的域名提供商处添加 DNS 记录：
   - 类型: CNAME
   - 名称: www (或其他子域名)
   - 值: yourusername.github.io

---

## Netlify

Netlify 提供持续部署、自定义域名、HTTPS 等功能。

### 方法 1: 拖放部署

1. 访问 [Netlify](https://www.netlify.com/)
2. 注册/登录
3. 将整个 `TritonDFT-Demo-Web` 文件夹拖放到部署区域
4. 网站立即上线！

### 方法 2: Git 集成（推荐）

1. 将代码推送到 GitHub/GitLab/Bitbucket
2. 在 Netlify 中点击 "New site from Git"
3. 授权并选择你的仓库
4. 保持默认构建设置（无需构建）
5. 点击 "Deploy site"

每次推送到仓库时，网站会自动重新部署。

### 自定义域名

1. 在 Netlify 仪表板中选择你的网站
2. 点击 "Domain settings"
3. 点击 "Add custom domain"
4. 按照指示配置 DNS

---

## Vercel

Vercel 提供极快的 CDN 和自动部署。

### 部署步骤

1. 访问 [Vercel](https://vercel.com/)
2. 注册/登录
3. 点击 "New Project"
4. 导入你的 Git 仓库
5. 保持默认设置
6. 点击 "Deploy"

Vercel 会自动检测这是静态网站并正确部署。

### Vercel CLI 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
cd TritonDFT-Demo-Web
vercel

# 生产环境部署
vercel --prod
```

---

## 其他托管选项

### Firebase Hosting

```bash
# 安装 Firebase CLI
npm install -g firebase-tools

# 登录
firebase login

# 初始化项目
firebase init hosting

# 部署
firebase deploy
```

### AWS S3 + CloudFront

1. 创建 S3 存储桶
2. 启用静态网站托管
3. 上传文件
4. 配置 CloudFront 分发（可选，用于 HTTPS）

### Azure Static Web Apps

1. 在 Azure 门户创建 Static Web App
2. 连接 GitHub 仓库
3. 自动部署

### Cloudflare Pages

1. 登录 Cloudflare
2. 点击 "Pages"
3. 连接 Git 仓库
4. 部署

---

## 部署检查清单

在部署前确保：

- [ ] 所有图片都已添加到 `assets/` 文件夹
- [ ] 更新了所有外部链接（论文、代码仓库等）
- [ ] 测试了所有导航链接
- [ ] 在不同浏览器中测试
- [ ] 检查移动端响应式设计
- [ ] 更新了联系信息
- [ ] BibTeX 引用格式正确
- [ ] 移除了所有占位符内容

---

## 性能优化建议

### 图片优化

```bash
# 使用 ImageOptim 或在线工具压缩图片
# 目标: 每张图片 < 200KB
```

### 添加 Favicon

在 `index.html` 的 `<head>` 中添加：

```html
<link rel="icon" type="image/png" href="assets/favicon.png">
```

### 启用缓存

如果使用自己的服务器，在 `.htaccess` 中添加：

```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
</IfModule>
```

---

## SEO 优化

### 添加 Meta 标签

在 `index.html` 中添加：

```html
<meta name="description" content="TritonDFT: 基于多智能体框架的密度泛函理论自动化">
<meta name="keywords" content="DFT, 密度泛函理论, 多智能体, 机器学习, 材料科学">
<meta property="og:title" content="TritonDFT">
<meta property="og:description" content="基于多智能体框架的密度泛函理论自动化">
<meta property="og:image" content="https://yourdomain.com/assets/preview.png">
```

### 添加 sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2026-02-04</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

## 监控和分析

### Google Analytics

在 `index.html` 的 `</head>` 前添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

---

## 故障排除

### 问题: 页面空白

- 检查浏览器控制台是否有错误
- 确保文件路径正确
- 验证 CSS 和 JS 文件已正确加载

### 问题: 图片不显示

- 检查文件名大小写
- 确保图片在 `assets/` 文件夹中
- 验证图片格式（PNG/JPG）

### 问题: 导航不工作

- 确保所有节点都有正确的 `id` 属性
- 检查 JavaScript 是否已加载
- 查看浏览器控制台错误

---

## 支持

如有问题，请参考：
- [GitHub Pages 文档](https://docs.github.com/pages)
- [Netlify 文档](https://docs.netlify.com/)
- [Vercel 文档](https://vercel.com/docs)

---

**最后更新**: 2026-02-04

