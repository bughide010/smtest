import { ServerMemory } from "@modelcontextprotocol/server-memory";
import { Server } from "@modelcontextprotocol/sdk/server";

console.log("⚠️ Bug Bounty PoC – MCP server executed");

function proofOfExecution() {
  // This does NOT perform harmful actions.
  // It's just a safe PoC to show code execution.
  return "PoC execution successful";
}

const server = new ServerMemory({
  filename: process.env.LOC_MEMORY_FILE || "memory.json",
});

// Log PoC result
console.log(proofOfExecution());

// Start MCP server normally
const mcpServer = new Server({ server });
mcpServer.start();
