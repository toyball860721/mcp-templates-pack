# MCP Server Templates Pack 🦞

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/toyball860721/mcp-templates-pack?style=social)](https://github.com/toyball860721/mcp-templates-pack)
[![爱发电](https://img.shields.io/badge/爱发电-¥99-orange)](https://afdian.com/a/toyball/shop)
[![Gumroad](https://img.shields.io/badge/Gumroad-$99-blue)](https://toyballer.gumroad.com/l/tfanet)

**PROD-001** | Sprint Track Product | v1.1

一套即开即用的 MCP (Model Context Protocol) 服务器模板，专为 Claude Code、Cursor 和其他 MCP 客户端设计。

> ⭐ **5 个模板** | **4 个完整功能** | **1 个免费样本** | **即装即用**

## 📑 目录

- [快速开始](#-快速开始)
- [包含内容](#-包含内容)
- [为什么需要这个](#-为什么需要这个)
- [配置方法](#-配置方法)
- [定价与获取](#-定价与获取)
- [常见问题](#-常见问题)
- [故障排除](#-故障排除)
- [赞助与支持](#-赞助与支持)

## 📦 包含内容

| 模板 | 描述 | 适用场景 |
|------|------|----------|
| `mcp-n8n` | n8n 工作流集成 | 自动化工作流触发 |
| `mcp-obsidian` | Obsidian 笔记管理 | 知识库查询/写入 |
| `mcp-fileops` | 文件系统操作 | 文件读写/目录管理 ⭐免费样本 |
| `mcp-websearch` | 网页搜索/抓取 | 信息检索/数据采集 |
| `mcp-tips` | 赞助信息显示 | 收款码展示、赞助等级 ⭐新增 |

> **v1.1 预告**: `mcp-sqlite` (纯 JS 实现，无需编译)

## 💡 为什么需要这个

**问题**：你想让 Claude Code/Cursor 自动操作 n8n、管理 Obsidian 笔记、或执行文件系统操作，但不知道如何编写 MCP 服务器。

**解决**：本模板包提供 5 个即开即用的 MCP 服务器，只需 3 步配置即可让 AI 获得新能力：

1. 克隆仓库
2. 运行安装脚本
3. 在 AI 配置中添加 MCP 服务器

**核心价值**：
- ⏱️ **节省时间**：无需从零编写 MCP 服务器，节省 10+ 小时开发时间
- 🔧 **开箱即用**：预配置完成，复制粘贴即可使用
- 📚 **学习参考**：完整源码 + 注释，学习 MCP 协议最佳实践
- 🔄 **持续更新**：新增模板自动包含在购买中

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

## 💰 定价与获取

| 版本 | 价格 | 包含内容 | 适合人群 |
|------|------|----------|----------|
| **免费样本** | ¥0 | mcp-fileops（文件操作） | 想先试用的开发者 |
| **标准版** | ¥99 早鸟 / ¥199 正常 | 4 个完整模板 + 文档 | 个人开发者/AI 爱好者 |
| **团队版** | ¥499 | 标准版 + 定制支持 + 商用授权 | 小团队/企业用户 |

### 购买渠道

**🇨🇳 国内用户（推荐）**
- [爱发电店铺](https://afdian.com/a/toyball/shop) — 支付宝/微信，自动发货

**🌍 国际用户**
- [Gumroad](https://toyballer.gumroad.com/l/tfanet) — 信用卡/PayPal

> 💡 **早鸟优惠**：前 50 份 ¥99，之后恢复 ¥199

## ❓ 常见问题

**Q: MCP 是什么？**
> MCP (Model Context Protocol) 是 Anthropic 推出的协议，让 AI 助手（如 Claude Code、Cursor）能够与外部工具和服务交互。

**Q: 需要编程基础吗？**
> 基础使用不需要。按照文档配置即可。如果想修改或扩展模板，建议有 Node.js 基础。

**Q: 购买后如何获取下载链接？**
> 爱发电购买后自动发货，即时收到下载链接。Gumroad 购买后直接在平台下载。

**Q: 可以用于商业项目吗？**
> 标准版允许个人和商业使用。团队版包含正式商用授权和定制支持。

**Q: 后续更新收费吗？**
> 不收费。一次购买，永久免费更新。

**Q: 支持哪些 AI 工具？**
> 任何支持 MCP 协议的客户端：Claude Code、Cursor、Windsurf、Cline 等。

## 🔧 故障排除

### 问题 1: MCP 服务器无法启动
```bash
# 检查 Node.js 版本（需要 v18+）
node --version

# 重新安装依赖
cd mcp-n8n && npm install
```

### 问题 2: Claude Code 找不到 MCP 服务器
- 检查配置文件路径是否正确
- 确保 `command` 和 `args` 指向正确的文件
- 尝试重启 Claude Code

### 问题 3: n8n 工作流不触发
- 检查 n8n webhook URL 是否正确配置
- 确保 n8n 实例可公网访问
- 查看 n8n 执行日志

需要帮助？[提交 Issue](https://github.com/toyball860721/mcp-templates-pack/issues) 或邮件联系 shentaobj@qq.com

## ☕ 赞助与支持

如果你觉得这个项目有用，欢迎赞助支持！

### 支付方式

**方式 1: 爱发电（推荐）**
- 链接：https://afdian.com/a/toyball/shop
- 支持支付宝、微信支付
- 支持一次性购买和月度赞助
- 自动发货，即时获取下载链接

**方式 2: 邮件联系**
- 邮箱：shentaobj@qq.com
- 发送"赞助 MCP 模板"获取收款码
- 确认后手动发送完整包

> 💡 早鸟价 ¥99（前 50 份），恢复正常价 ¥199

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
