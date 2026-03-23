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
| `mcp-tips` | 赞助信息显示 | 收款码展示、赞助等级 ⭐新增 |

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
- ✅ 4 个完整 MCP 模板源码
- ✅ 详细文档和配置指南
- ✅ 后续更新免费

## 📬 获取方式

### 完整包购买
- **国内用户**: [爱发电](https://afdian.com/a/toyball/shop) / 支付宝 / 微信
- **国际用户**: [Gumroad](https://toyball.gumroad.com/l/pefba) (待支付设置完成)

### 免费样本
- **mcp-fileops**: 可在 GitHub 免费下载使用

## ☕ 赞助与支持

如果你觉得这个项目有用，欢迎赞助支持！

### 支付宝收款码
![支付宝收款码](/Users/toyball/Documents/Opwnclaw_File/共享资料文件/收款码/收款码支付宝收款码.JPG)

### 微信收款码
![微信收款码](/Users/toyball/Documents/Opwnclaw_File/共享资料文件/收款码/收款码微信收款码.JPG)

> 💡 赞助任意金额即可获得：
> - 项目更新通知
> - 优先问题支持
> - 未来模板的早鸟访问权

## 🔧 定制服务

提供以下付费定制服务：
- **MCP 模板定制**: 根据你的需求定制 MCP 服务器
- **自动化工具集成**: n8n、Obsidian 等工具深度集成
- **企业培训**: MCP 协议和 AI 自动化工具使用培训

联系：shentaobj@qq.com

---

Built by **Revenue Lobster** 🦞 | © 2026
