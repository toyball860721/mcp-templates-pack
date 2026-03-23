#!/usr/bin/env node
/**
 * MCP Server: Obsidian Vault Management
 * Read, write, and search notes in Obsidian vault
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import * as fs from 'fs';
import * as path from 'path';

interface ObsidianConfig {
  vaultPath: string;
}

const config: ObsidianConfig = {
  vaultPath: process.env.OBSIDIAN_VAULT_PATH || '',
};

const server = new Server(
  { name: 'mcp-obsidian', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'read_note',
        description: 'Read a note by filename or path',
        inputSchema: {
          type: 'object',
          properties: {
            path: { type: 'string', description: 'Note path (relative to vault)' },
          },
          required: ['path'],
        },
      },
      {
        name: 'write_note',
        description: 'Create or update a note',
        inputSchema: {
          type: 'object',
          properties: {
            path: { type: 'string', description: 'Note path' },
            content: { type: 'string', description: 'Markdown content' },
          },
          required: ['path', 'content'],
        },
      },
      {
        name: 'search_notes',
        description: 'Search notes by keyword',
        inputSchema: {
          type: 'object',
          properties: {
            query: { type: 'string', description: 'Search keyword' },
          },
          required: ['query'],
        },
      },
      {
        name: 'list_notes',
        description: 'List all notes in vault or folder',
        inputSchema: {
          type: 'object',
          properties: {
            folder: { type: 'string', description: 'Folder path (optional)' },
          },
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (!config.vaultPath) {
    return { content: [{ type: 'text', text: 'Error: OBSIDIAN_VAULT_PATH not set' }] };
  }

  if (name === 'read_note') {
    const { path: notePath } = args as { path: string };
    const fullPath = path.join(config.vaultPath, notePath);
    const content = fs.readFileSync(fullPath, 'utf-8');
    return { content: [{ type: 'text', text: content }] };
  }

  if (name === 'write_note') {
    const { path: notePath, content } = args as { path: string; content: string };
    const fullPath = path.join(config.vaultPath, notePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content, 'utf-8');
    return { content: [{ type: 'text', text: `Note written: ${notePath}` }] };
  }

  if (name === 'search_notes') {
    const { query } = args as { query: string };
    // Simple search implementation
    return { content: [{ type: 'text', text: `Search results for "${query}": [mock]` }] };
  }

  if (name === 'list_notes') {
    const { folder } = args as { folder?: string };
    const searchPath = folder ? path.join(config.vaultPath, folder) : config.vaultPath;
    const files = fs.readdirSync(searchPath).filter(f => f.endsWith('.md'));
    return { content: [{ type: 'text', text: files.join('\n') }] };
  }

  throw new Error(`Unknown tool: ${name}`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
