// --- PoC – simple file-write proof of execution ---
import { writeFileSync } from "fs";

try {
  writeFileSync("/tmp/bugbounty_poc.txt", "POC: Attacker-controlled MCP server started", { encoding: "utf-8" });
  console.error("✅ POC: proof file written to /tmp/bugbounty_poc.txt");
} catch (e) {
  console.error("❌ POC: failed to write proof file:", e);
}
// --- End PoC snippet ---
