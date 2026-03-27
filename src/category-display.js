/**
 * Category Display — truncates deep category paths for card badges.
 * Full path shown on hover via native tooltip.
 */

export function truncateCategory(category, maxDepth = 1) {
  if (!category) return { display: "", full: "", truncated: false };
  const parts = category.split("/").map(s => s.trim()).filter(Boolean);
  if (parts.length <= maxDepth) {
    return { display: category, full: category, truncated: false };
  }
  const display = parts.slice(-maxDepth).join("/");
  return { display, full: category, truncated: true };
}
