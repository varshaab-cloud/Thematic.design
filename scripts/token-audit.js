// ESM shim — the audit implementation lives in token-audit.cjs (CommonJS).
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const cjs = fileURLToPath(new URL("./token-audit.cjs", import.meta.url));
try { execFileSync(process.execPath, [cjs, ...process.argv.slice(2)], { stdio: "inherit" }); }
catch (e) { process.exit(e.status ?? 1); }
