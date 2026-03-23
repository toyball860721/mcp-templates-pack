# MCP Server Templates Pack 🦞

**PROD-001** | Sprint Track Product

一套即开即用的 MCP (Model Context Protocol) 服务器模板，专为 Claude Code、Cursor 和其他 MCP 客户端设计。

## 📦 包含内容

| 模板 | 描述 | 适用场景 |
|------|------|----------|
| `mcp-n8n` | n8n 工作流集成 | 自动化工作流触发 |
| `mcp-obsidian` | Obsidian 笔记管理 | 知识库查询/写入 |
| `mcp-fileops` | 文件系统操作 | 文件读写/目录管理 ⭐免费样本 |
| `mcp-websearch` | 网页搜索/抓取 | 信息检索/数据采集 |

> **v1.1 预告**: `mcp-sqlite` (纯 JS 实现，无需编译)

## 🚀 快速开始

```bash
# 安装所有模板
bash install.sh

# 或单独安装某个模板
cd mcp-n8n && npm install
```

## 📖 配置方法

在 Claude Code 或 Cursor 的配置中添加：

```json
{
  "mcpServers": {
    "n8n": {
      "command": "node",
      "args": ["./mcp-n8n/dist/index.js"]
    },
    "obsidian": {
      "command": "node",
      "args": ["./mcp-obsidian/dist/index.js"]
    }
  }
}
```

## 💰 授权

- **早鸟价**: ¥99 (前 50 份)
- **正常价**: ¥199

购买后获得：
- ✅ 5 个完整 MCP 模板源码
- ✅ 详细文档和配置指南
- ✅ 后续更新免费

## 📬 获取方式

- **国际用户**: [Gumroad](#) (待上架)
- **国内用户**: [爱发电](#) (待上架) / 支付宝 / 微信

---

Built by **Revenue Lobster** 🦞 | © 2026
