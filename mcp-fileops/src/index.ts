#!/usr/bin/env node
/**
 * MCP Server: File System Operations
 * Read, write, list, and manage files
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import * as fs from 'fs';
import * as path from 'path';

const server = new Server(
  { name: 'mcp-fileops', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'read_file',
        description: 'Read file contents',
        inputSchema: {
          type: 'object',
          properties: {
            path: { type: 'string', description: 'File path' },
          },
          required: ['path'],
        },
      },
      {
        name: 'write_file',
        description: 'Write content to file',
        inputSchema: {
          type: 'object',
          properties: {
            path: { type: 'string', description: 'File path' },
            content: { type: 'string', description: 'File content' },
          },
          required: ['path', 'content'],
        },
      },
      {
        name: 'list_dir',
        description: 'List directory contents',
        inputSchema: {
          type: 'object',
          properties: {
            path: { type: 'string', description: 'Directory path' },
          },
          required: ['path'],
        },
      },
      {
        name: 'delete_file',
        description: 'Delete a file',
        inputSchema: {
          type: 'object',
          properties: {
            path: { type: 'string', description: 'File path' },
          },
          required: ['path'],
        },
      },
      {
        name: 'file_exists',
        description: 'Check if file exists',
        inputSchema: {
          type: 'object',
          properties: {
            path: { type: 'string', description: 'File path' },
          },
          required: ['path'],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'read_file') {
    const { path: filePath } = args as { path: string };
    const content = fs.readFileSync(filePath, 'utf-8');
    return { content: [{ type: 'text', text: content }] };
  }

  if (name === 'write_file') {
    const { path: filePath, content } = args as { path: string; content: string };
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, 'utf-8');
    return { content: [{ type: 'text', text: `File written: ${filePath}` }] };
  }

  if (name === 'list_dir') {
    const { path: dirPath } = args as { path: string };
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const result = entries.map(e => `${e.isDirectory() ? '📁' : '📄'} ${e.name}`).join('\n');
    return { content: [{ type: 'text', text: result }] };
  }

  if (name === 'delete_file') {
    const { path: filePath } = args as { path: string };
    fs.unlinkSync(filePath);
    return { content: [{ type: 'text', text: `File deleted: ${filePath}` }] };
  }

  if (name === 'file_exists') {
    const { path: filePath } = args as { path: string };
    const exists = fs.existsSync(filePath);
    return { content: [{ type: 'text', text: exists ? 'exists' : 'not found' }] };
  }

  throw new Error(`Unknown tool: ${name}`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
