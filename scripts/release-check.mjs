import { execSync } from "node:child_process";

const run = (cmd) => {
  console.log(`$ ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
};

run("node --check .obsidian/plugins/obsidian-smart-kanban/main.js");
run("node --check .obsidian/plugins/obsidian-smart-kanban/core.js");
run("node --test .obsidian/plugins/obsidian-smart-kanban/tests/core.test.js");

console.log("Release checks passed.");
