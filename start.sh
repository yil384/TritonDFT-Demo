#!/bin/bash

# TritonDFT 演示网站快速启动脚本

echo "========================================="
echo "  TritonDFT 演示网站启动脚本"
echo "========================================="
echo ""

# 检查 Python 是否可用
if command -v python3 &> /dev/null
then
    echo "✓ 检测到 Python 3"
    echo "正在启动服务器..."
    echo ""
    echo "网站地址: http://localhost:8000"
    echo "按 Ctrl+C 停止服务器"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null
then
    echo "✓ 检测到 Python"
    echo "正在启动服务器..."
    echo ""
    echo "网站地址: http://localhost:8000"
    echo "按 Ctrl+C 停止服务器"
    echo ""
    python -m SimpleHTTPServer 8000
elif command -v php &> /dev/null
then
    echo "✓ 检测到 PHP"
    echo "正在启动服务器..."
    echo ""
    echo "网站地址: http://localhost:8000"
    echo "按 Ctrl+C 停止服务器"
    echo ""
    php -S localhost:8000
else
    echo "❌ 未检测到 Python 或 PHP"
    echo ""
    echo "请安装以下任一工具后重试："
    echo "  - Python 3: https://www.python.org/downloads/"
    echo "  - PHP: https://www.php.net/downloads"
    echo ""
    echo "或者使用其他 HTTP 服务器："
    echo "  - npx http-server -p 8000"
    echo "  - VS Code Live Server 扩展"
    exit 1
fi

