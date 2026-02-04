# 🚀 快速部署指南

## 第一步：创建 GitHub 仓库

1. 访问 https://github.com/new
2. 创建新仓库（Public）
3. 不要初始化 README

## 第二步：部署到 GitHub（首次）

```bash
cd /Users/yil384/UCSD/TritonDFT-Demo-Web

# 初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: TritonDFT website"

# 连接到 GitHub（替换 YOUR_USERNAME 和 YOUR_REPO）
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 推送
git branch -M main
git push -u origin main
```

## 第三步：启用 GitHub Pages

1. 进入 GitHub 仓库
2. Settings → Pages
3. Source: **main** / **/ (root)**
4. Save

⏱️ 等待 2-3 分钟

## 第四步：配置自定义域名

### GitHub 端

1. Settings → Pages → Custom domain
2. 输入：`tritondft.com`
3. Save
4. ✅ 勾选 "Enforce HTTPS"

### Squarespace DNS 设置

登录 Squarespace，添加以下 DNS 记录：

```
Type: A     Host: @    Value: 185.199.108.153
Type: A     Host: @    Value: 185.199.109.153
Type: A     Host: @    Value: 185.199.110.153
Type: A     Host: @    Value: 185.199.111.153
```

⏱️ DNS 传播：15 分钟 - 48 小时

## 第五步：验证

访问：https://tritondft.com

---

## 日常更新命令

### 方法 1：使用脚本（推荐）

```bash
./deploy.sh
```

### 方法 2：手动命令

```bash
git add .
git commit -m "描述更改"
git push
```

---

## 常用命令

```bash
# 查看状态
git status

# 查看日志
git log --oneline

# 查看远程仓库
git remote -v

# 拉取最新更改
git pull

# 查看差异
git diff
```

---

## Squarespace DNS 访问

1. https://account.squarespace.com/
2. 选择域名：tritondft.com
3. DNS Settings / Advanced DNS

---

## 验证工具

- DNS 检查：https://dnschecker.org/
- 测试命令：`dig tritondft.com`

---

## 故障排除

### 404 错误
```bash
# 确保 index.html 在根目录
ls -la index.html
```

### 域名不工作
1. 检查 CNAME 文件：`cat CNAME`
2. 检查 DNS：`dig tritondft.com`
3. 等待 DNS 传播

### 推送失败
```bash
# 查看远程仓库
git remote -v

# 重新设置
git remote set-url origin https://github.com/USERNAME/REPO.git
```

---

## 需要帮助？

查看完整指南：`GITHUB_DEPLOYMENT.md`

---

**您的网址**: https://tritondft.com

