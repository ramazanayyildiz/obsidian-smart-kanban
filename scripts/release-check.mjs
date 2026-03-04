import { execSync } from "node:child_process";

const run = (cmd) => {
  console.log(`$ ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
};

const dir = ".obsidian/plugins/obsidian-smart-kanban";

// Check source files
for (const f of ["main.js", "core.js", "constants.js", "core-fallback.js", "utils.js", "modals.js", "view.js", "settings-tab.js"]) {
  run(`node --check ${dir}/src/${f}`);
}

// Build
run(`cd "${dir}" && npm run build`);

// Check bundled output
run(`node --check ${dir}/main.js`);

// Run tests
run(`node --test ${dir}/tests/core.test.js`);

console.log("Release checks passed.");
