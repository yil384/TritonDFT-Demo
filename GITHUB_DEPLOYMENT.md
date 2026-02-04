# GitHub Pages 部署 + 自定义域名绑定指南

## 📋 完整部署流程

将 TritonDFT 网站部署到 GitHub Pages 并绑定 tritondft.com 域名。

---

## 第一步：准备 Git 仓库

### 1. 初始化 Git 仓库

```bash
cd /Users/yil384/UCSD/TritonDFT-Demo-Web

# 初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: TritonDFT demo website"
```

### 2. 在 GitHub 创建仓库

1. 访问 https://github.com/
2. 点击右上角 "+" → "New repository"
3. 填写信息：
   - **Repository name**: `TritonDFT-Demo` 或 `tritondft-website`
   - **Description**: "TritonDFT: Automating DFT with a Multi-Agent Framework"
   - **Public** 或 **Private**（推荐 Public 用于 GitHub Pages）
   - ❌ 不要勾选 "Initialize with README"（已有文件）
4. 点击 "Create repository"

### 3. 连接并推送到 GitHub

```bash
# 添加远程仓库（替换 YOUR_USERNAME 和 YOUR_REPO_NAME）
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

---

## 第二步：配置 GitHub Pages

### 1. 启用 GitHub Pages

1. 进入 GitHub 仓库页面
2. 点击 **Settings** （仓库设置）
3. 在左侧菜单找到 **Pages**
4. 在 "Source" 下：
   - **Branch**: 选择 `main`
   - **Folder**: 选择 `/ (root)`
5. 点击 **Save**

⏱️ 等待 2-3 分钟，网站就会部署完成。

### 2. 查看默认网址

部署完成后，会显示网址：
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

在浏览器测试这个网址，确认网站正常显示。

---

## 第三步：添加自定义域名

### 1. 在 GitHub 中配置域名

1. 仍在 **Settings** → **Pages** 页面
2. 找到 "Custom domain" 部分
3. 输入：`tritondft.com`
4. 点击 **Save**

### 2. 创建 CNAME 文件

GitHub 会自动创建，但您也可以手动创建：

```bash
cd /Users/yil384/UCSD/TritonDFT-Demo-Web
echo "tritondft.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

### 3. 启用 HTTPS（推荐）

在 GitHub Pages 设置中：
- ✅ 勾选 "Enforce HTTPS"

⚠️ 注意：必须先配置 DNS 记录后，HTTPS 才能生效。

---

## 第四步：配置 Squarespace DNS

### 方法 1：使用 A 记录（推荐用于根域名）

1. 登录 Squarespace
2. 进入您的域名管理
3. 找到 DNS 设置
4. 添加以下 **A 记录**：

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |

### 方法 2：使用 CNAME 记录（如果要用 www）

如果您想用 `www.tritondft.com`：

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME | www | YOUR_USERNAME.github.io | 3600 |

### 方法 3：同时支持根域名和 www

1. 添加上述 4 个 A 记录（用于 tritondft.com）
2. 添加 CNAME 记录（用于 www.tritondft.com）
3. 在 GitHub Pages 设置中，选择主域名（tritondft.com）

### Squarespace DNS 设置步骤

1. 登录 Squarespace: https://account.squarespace.com/
2. 点击您的域名 **tritondft.com**
3. 选择 **DNS Settings** 或 **Advanced DNS**
4. 删除或暂停与 @ 主机冲突的现有记录
5. 添加上述 A 记录
6. 保存更改

⏱️ DNS 传播时间：通常 15 分钟到 48 小时

---

## 第五步：验证部署

### 1. 检查 DNS 传播

```bash
# 检查 A 记录
dig tritondft.com

# 检查 CNAME（如果使用）
dig www.tritondft.com

# 或使用在线工具
# https://dnschecker.org/
```

### 2. 测试网站访问

访问以下网址，确认都能正常访问：
- ✅ https://tritondft.com
- ✅ https://www.tritondft.com （如果配置了）
- ✅ HTTPS 已启用（绿色锁图标）

### 3. 检查重定向

确认以下重定向正常：
- `http://tritondft.com` → `https://tritondft.com`
- `www.tritondft.com` → `tritondft.com` （如果设置）

---

## 故障排除

### 问题 1：GitHub Pages 显示 404

**解决方案：**
```bash
# 确保 index.html 在根目录
ls -la index.html

# 重新推送
git add .
git commit -m "Fix deployment"
git push
```

### 问题 2：自定义域名不工作

**检查清单：**
1. ✅ CNAME 文件存在且内容正确
2. ✅ DNS 记录已正确添加
3. ✅ 等待 DNS 传播（最多 48 小时）
4. ✅ 清除浏览器缓存

**验证 DNS：**
```bash
nslookup tritondft.com
# 应该返回 GitHub Pages 的 IP 地址
```

### 问题 3：HTTPS 无法启用

**原因：** DNS 还未传播完成

**解决方案：**
1. 等待 DNS 完全传播
2. 在 GitHub Pages 设置中取消勾选 "Enforce HTTPS"
3. 等待几小时后重新勾选

### 问题 4：CSS/JS 文件加载失败

**原因：** 文件路径问题

**解决方案：**
确保 `index.html` 中的路径是相对路径：
```html
<!-- 正确 -->
<link rel="stylesheet" href="styles.css">
<script src="script.js"></script>

<!-- 错误 -->
<link rel="stylesheet" href="/styles.css">
```

---

## 后续更新流程

### 更新网站内容

```bash
cd /Users/yil384/UCSD/TritonDFT-Demo-Web

# 修改文件...

# 提交更改
git add .
git commit -m "Update content"
git push

# 等待 1-2 分钟，更改会自动部署
```

### 添加图片

```bash
# 添加图片到 assets 文件夹
cp your-image.png assets/

# 提交并推送
git add assets/
git commit -m "Add images"
git push
```

---

## 性能优化建议

### 1. 压缩图片

使用工具压缩图片：
- https://tinypng.com/
- https://squoosh.app/

目标：每张图片 < 200KB

### 2. 启用缓存

GitHub Pages 自动处理，无需额外配置。

### 3. 使用 CDN

如果需要更快的加载速度，考虑：
- Cloudflare（免费 CDN）
- 或保持使用 GitHub Pages（已经很快）

---

## 安全建议

### 1. 保护敏感信息

确保不要提交：
- ❌ API 密钥
- ❌ 邮箱密码
- ❌ 私人信息

检查 `.gitignore` 文件。

### 2. 使用 HTTPS

✅ 已在 GitHub Pages 中启用

### 3. 定期备份

```bash
# 本地备份
cp -r /Users/yil384/UCSD/TritonDFT-Demo-Web ~/Backups/

# 或使用 Git tag 标记重要版本
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

---

## 监控和分析

### 添加 Google Analytics（可选）

在 `index.html` 的 `</head>` 前添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID');
</script>
```

---

## 快速命令参考

```bash
# 初次部署
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main

# 日常更新
git add .
git commit -m "描述更改"
git push

# 查看状态
git status

# 查看日志
git log --oneline

# 回退更改
git reset --hard HEAD~1  # 回退一个提交
```

---

## 检查清单

部署前确认：

- [ ] Git 仓库已初始化
- [ ] 代码已推送到 GitHub
- [ ] GitHub Pages 已启用
- [ ] 自定义域名已配置
- [ ] DNS 记录已添加
- [ ] CNAME 文件已创建
- [ ] HTTPS 已启用
- [ ] 网站可访问
- [ ] 所有链接正常
- [ ] 图片正常加载
- [ ] 移动端测试通过

---

## 额外资源

- [GitHub Pages 文档](https://docs.github.com/pages)
- [自定义域名指南](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [DNS 检查工具](https://dnschecker.org/)
- [Squarespace DNS 帮助](https://support.squarespace.com/hc/en-us/articles/360002101888)

---

**部署时间**: ~30 分钟  
**DNS 传播**: 15 分钟 - 48 小时  
**完成后网址**: https://tritondft.com

祝部署顺利！🚀

