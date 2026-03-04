import { execSync } from "node:child_process";

const run = (cmd) => {
  console.log(`$ ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
};

const dir = ".obsidian/plugins/obsidian-smart-kanban";

run(`node --check ${dir}/main.js`);
run(`node --check ${dir}/core.js`);
run(`node --check ${dir}/constants.js`);
run(`node --check ${dir}/core-fallback.js`);
run(`node --check ${dir}/utils.js`);
run(`node --check ${dir}/modals.js`);
run(`node --check ${dir}/view.js`);
run(`node --check ${dir}/settings-tab.js`);
run(`node --test ${dir}/tests/core.test.js`);

console.log("Release checks passed.");
