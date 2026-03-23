#!/usr/bin/env node
/**
 * MCP Server: Sponsorship & Tips Display
 * Shows sponsorship information and payment options
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

interface SponsorConfig {
  creatorName: string;
  alipayQR?: string;
  wechatQR?: string;
  afdianUrl?: string;
  gumroadUrl?: string;
}

const config: SponsorConfig = {
  creatorName: process.env.CREATOR_NAME || 'Revenue Lobster',
  alipayQR: process.env.ALIPAY_QR_PATH,
  wechatQR: process.env.WECHAT_QR_PATH,
  afdianUrl: process.env.AFDIAN_URL || 'https://afdian.com/a/toyball/shop',
  gumroadUrl: process.env.GUMROAD_URL,
};

const server = new Server(
  { name: 'mcp-tips', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_sponsor_info',
        description: 'Get sponsorship information and payment options',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'get_payment_qr',
        description: 'Get payment QR code for Alipay or WeChat',
        inputSchema: {
          type: 'object',
          properties: {
            platform: { 
              type: 'string', 
              enum: ['alipay', 'wechat'],
              description: 'Payment platform' 
            },
          },
          required: ['platform'],
        },
      },
      {
        name: 'get_sponsor_tiers',
        description: 'Get sponsorship tier information',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'get_sponsor_info') {
    return {
      content: [
        {
          type: 'text',
          text: `☕ Support ${config.creatorName}

📬 Payment Options:
- 爱发电 (Monthly): ${config.afdianUrl}
- Alipay: Scan QR code (use get_payment_qr)
- WeChat: Scan QR code (use get_payment_qr)
${config.gumroadUrl ? `- Gumroad: ${config.gumroadUrl}` : ''}

💡 Your support helps maintain and improve this project!
`,
        },
      ],
    };
  }

  if (name === 'get_payment_qr') {
    const { platform } = args as { platform: 'alipay' | 'wechat' };
    
    if (platform === 'alipay') {
      return {
        content: [
          {
            type: 'text',
            text: config.alipayQR 
              ? `Alipay QR Code: ${config.alipayQR}\n\nOpen Alipay app and scan to pay.`
              : 'Alipay QR not configured. Please use 爱发电 or contact creator.',
          },
        ],
      };
    }

    if (platform === 'wechat') {
      return {
        content: [
          {
            type: 'text',
            text: config.wechatQR
              ? `WeChat QR Code: ${config.wechatQR}\n\nOpen WeChat app and scan to pay.`
              : 'WeChat QR not configured. Please use 爱发电 or contact creator.',
          },
        ],
      };
    }
  }

  if (name === 'get_sponsor_tiers') {
    return {
      content: [
        {
          type: 'text',
          text: `🎯 Sponsorship Tiers

¥10+  Supporter
- Thank you mention
- Project update notifications

¥50+  Backer
- Priority support
- Early access to new templates

¥100+ Patron
- Custom request priority
- 30min private consultation

¥500+ Enterprise
- Enterprise support
- Custom development discount

📧 Contact: shentaobj@qq.com
`,
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
