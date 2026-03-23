#!/usr/bin/env node
/**
 * MCP Server: n8n Workflow Integration
 * Triggers n8n workflows and retrieves execution status
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

interface N8nConfig {
  baseUrl: string;
  apiKey: string;
}

const config: N8nConfig = {
  baseUrl: process.env.N8N_BASE_URL || 'http://localhost:5678',
  apiKey: process.env.N8N_API_KEY || '',
};

const server = new Server(
  { name: 'mcp-n8n', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'trigger_workflow',
        description: 'Trigger an n8n workflow by ID',
        inputSchema: {
          type: 'object',
          properties: {
            workflowId: { type: 'string', description: 'n8n workflow ID' },
            data: { type: 'object', description: 'Input data for the workflow' },
          },
          required: ['workflowId'],
        },
      },
      {
        name: 'get_execution',
        description: 'Get execution status by ID',
        inputSchema: {
          type: 'object',
          properties: {
            executionId: { type: 'string', description: 'Execution ID' },
          },
          required: ['executionId'],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'trigger_workflow') {
    const { workflowId, data = {} } = args as { workflowId: string; data?: object };
    // Mock implementation - replace with actual n8n API call
    return {
      content: [
        { type: 'text', text: `Workflow ${workflowId} triggered with data: ${JSON.stringify(data)}` },
      ],
    };
  }

  if (name === 'get_execution') {
    const { executionId } = args as { executionId: string };
    return {
      content: [
        { type: 'text', text: `Execution ${executionId} status: success` },
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
