// Re-export core utilities directly.
// esbuild bundles core.js alongside this file, so the try/catch fallback
// that previously duplicated every function here is unnecessary.
module.exports = require("./core");
