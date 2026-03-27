/**
 * URL Preview — renders a clickable URL link on cards.
 */

export function formatUrlDisplay(url, maxLen = 45) {
  if (!url) return null;
  try {
    const u = new URL(url);
    let display = u.hostname.replace(/^www\./, "");
    if (u.pathname && u.pathname !== "/") {
      display += u.pathname;
    }
    if (display.length > maxLen) {
      display = display.slice(0, maxLen - 1) + "…";
    }
    return { display, href: url };
  } catch {
    return null;
  }
}

export function renderUrlLink(parent, url) {
  const info = formatUrlDisplay(url);
  if (!info) return null;

  const link = parent.createEl("a", {
    text: info.display,
    cls: "smart-kanban-card-url",
    href: info.href,
  });
  link.setAttr("title", info.href);
  link.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(info.href, "_blank");
  });
  return link;
}
