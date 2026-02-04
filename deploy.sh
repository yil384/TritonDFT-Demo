#!/bin/bash

# TritonDFT GitHub 部署脚本
# 用途：快速推送更新到 GitHub

echo "========================================="
echo "  TritonDFT GitHub 部署脚本"
echo "========================================="
echo ""

# 检查是否在正确的目录
if [ ! -f "index.html" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

# 检查是否有 Git 仓库
if [ ! -d ".git" ]; then
    echo "❌ 错误：未找到 Git 仓库"
    echo "请先运行："
    echo "  git init"
    echo "  git remote add origin YOUR_REPO_URL"
    exit 1
fi

# 检查 Git 状态
echo "📊 检查 Git 状态..."
git status

echo ""
echo "是否继续提交并推送？(y/n)"
read -r response

if [ "$response" != "y" ] && [ "$response" != "Y" ]; then
    echo "❌ 取消部署"
    exit 0
fi

# 获取提交信息
echo ""
echo "请输入提交信息（默认：Update website）："
read -r commit_message

if [ -z "$commit_message" ]; then
    commit_message="Update website"
fi

# 添加所有更改
echo ""
echo "📦 添加文件..."
git add .

# 提交更改
echo "💾 提交更改..."
git commit -m "$commit_message"

# 推送到 GitHub
echo "🚀 推送到 GitHub..."
git push

# 检查推送结果
if [ $? -eq 0 ]; then
    echo ""
    echo "========================================="
    echo "✅ 部署成功！"
    echo "========================================="
    echo ""
    echo "您的网站将在 1-2 分钟内更新"
    echo ""
    echo "访问网址："
    echo "  • https://tritondft.com"
    echo "  • https://YOUR_USERNAME.github.io/YOUR_REPO/"
    echo ""
else
    echo ""
    echo "========================================="
    echo "❌ 推送失败"
    echo "========================================="
    echo ""
    echo "可能的原因："
    echo "  1. 未设置远程仓库"
    echo "  2. 网络连接问题"
    echo "  3. 权限不足"
    echo ""
    echo "解决方法："
    echo "  git remote -v  # 查看远程仓库"
    echo "  git push -u origin main  # 首次推送"
    exit 1
fi

