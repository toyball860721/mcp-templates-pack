# mcp-tips

MCP Server for displaying sponsorship and tipping information.

## 功能

- `get_sponsor_info` - 获取赞助信息和支付方式
- `get_payment_qr` - 获取支付宝/微信收款码
- `get_sponsor_tiers` - 获取赞助等级信息

## 配置

```bash
export CREATOR_NAME="Your Name"
export ALIPAY_QR_PATH="/path/to/alipay-qr.png"
export WECHAT_QR_PATH="/path/to/wechat-qr.png"
export AFDIAN_URL="https://afdian.com/a/your-profile"
export GUMROAD_URL="https://yourname.gumroad.com"
```

## 使用

```bash
npm install
npm run build
npm start
```

## 示例输出

```
☕ Support Revenue Lobster

📬 Payment Options:
- 爱发电 (Monthly): https://afdian.com/a/toyball/shop
- Alipay: Scan QR code
- WeChat: Scan QR code

💡 Your support helps maintain and improve this project!
```
