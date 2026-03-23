#!/usr/bin/env node
/**
 * MCP Server: Web Search & Scraping
 * Search the web and fetch page content
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fetch from 'node-fetch';

const server = new Server(
  { name: 'mcp-websearch', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'search',
        description: 'Search the web (uses Brave API or similar)',
        inputSchema: {
          type: 'object',
          properties: {
            query: { type: 'string', description: 'Search query' },
            limit: { type: 'number', description: 'Max results (default: 10)' },
          },
          required: ['query'],
        },
      },
      {
        name: 'fetch',
        description: 'Fetch and extract content from a URL',
        inputSchema: {
          type: 'object',
          properties: {
            url: { type: 'string', description: 'URL to fetch' },
          },
          required: ['url'],
        },
      },
      {
        name: 'get_json',
        description: 'Fetch JSON from an API endpoint',
        inputSchema: {
          type: 'object',
          properties: {
            url: { type: 'string', description: 'API URL' },
          },
          required: ['url'],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'search') {
    const { query, limit = 10 } = args as { query: string; limit?: number };
    // Mock search - integrate with Brave API or similar
    return {
      content: [{ type: 'text', text: `Search results for "${query}": [mock - integrate API]` }],
    };
  }

  if (name === 'fetch') {
    const { url } = args as { url: string };
    try {
      const response = await fetch(url);
      const text = await response.text();
      return { content: [{ type: 'text', text: text.slice(0, 5000) }] };
    } catch (error) {
      return { content: [{ type: 'text', text: `Error: ${error}` }] };
    }
  }

  if (name === 'get_json') {
    const { url } = args as { url: string };
    try {
      const response = await fetch(url);
      const json = await response.json();
      return { content: [{ type: 'text', text: JSON.stringify(json, null, 2) }] };
    } catch (error) {
      return { content: [{ type: 'text', text: `Error: ${error}` }] };
    }
  }

  throw new Error(`Unknown tool: ${name}`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
