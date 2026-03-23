#!/bin/bash

# MCP Templates Pack - 统一安装脚本
# PROD-001

set -e

echo "🦞 MCP Templates Pack 安装程序"
echo "================================"

TEMPLATES=("mcp-n8n" "mcp-obsidian" "mcp-fileops" "mcp-websearch" "mcp-tips")

for template in "${TEMPLATES[@]}"; do
    echo ""
    echo "📦 安装 $template..."
    if [ -d "$template" ]; then
        cd "$template"
        npm install
        npm run build 2>/dev/null || echo "⚠️  $template 无 build 脚本"
        cd ..
    else
        echo "❌ $template 目录不存在"
    fi
done

echo ""
echo "✅ 安装完成！"
echo ""
echo "配置说明：请查看 README.md 中的配置方法"
