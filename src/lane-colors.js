/**
 * Lane Color Picker — Notion-style color palette for lane headers.
 * Colors are designed so that:
 *   - bg at 15% mix = pastel header pill
 *   - bg at 4% mix = very faint lane background
 *   - text = darker shade for header text
 */

export const NOTION_COLORS = [
  { name: "Default",  bg: "", text: "" },
  { name: "Gray",     bg: "#9b9b9b", text: "#6b6b6b" },
  { name: "Brown",    bg: "#c48a5c", text: "#8b5e3c" },
  { name: "Orange",   bg: "#e8805a", text: "#c05621" },
  { name: "Yellow",   bg: "#d4a22c", text: "#96700a" },
  { name: "Green",    bg: "#2bae7e", text: "#1a7a54" },
  { name: "Blue",     bg: "#5b9bd5", text: "#2e6da4" },
  { name: "Purple",   bg: "#9775c4", text: "#6b4d96" },
  { name: "Pink",     bg: "#d46b8d", text: "#a44a6a" },
  { name: "Red",      bg: "#d46b6b", text: "#a44a4a" },
];

/**
 * Show a color picker popup anchored to an element.
 * @param {HTMLElement} anchor - Element to position near
 * @param {string} currentBg - Current bg color for checkmark
 * @param {Function} onSelect - Callback({bg, text}) when color picked
 */
export function showLaneColorPicker(anchor, currentBg, onSelect) {
  // Remove any existing picker
  document.querySelectorAll(".sk-lane-color-picker").forEach(el => el.remove());

  const picker = document.createElement("div");
  picker.className = "sk-lane-color-picker";

  for (const color of NOTION_COLORS) {
    const item = document.createElement("div");
    item.className = "sk-lane-color-item";

    const swatch = document.createElement("span");
    swatch.className = "sk-lane-color-swatch";
    if (color.bg) {
      swatch.style.background = color.bg;
      swatch.style.opacity = "0.35";
    } else {
      swatch.style.background = "var(--background-modifier-border)";
    }

    const label = document.createElement("span");
    label.className = "sk-lane-color-label";
    label.textContent = color.name;

    item.appendChild(swatch);
    item.appendChild(label);

    // Checkmark for current color
    if (currentBg === color.bg || (!currentBg && !color.bg)) {
      const check = document.createElement("span");
      check.className = "sk-lane-color-check";
      check.textContent = "✓";
      item.appendChild(check);
    }

    item.addEventListener("click", (e) => {
      e.stopPropagation();
      onSelect({ bg: color.bg, text: color.text });
      picker.remove();
    });

    picker.appendChild(item);
  }

  // Position near anchor
  const rect = anchor.getBoundingClientRect();
  picker.style.position = "fixed";
  picker.style.top = `${rect.bottom + 4}px`;
  picker.style.left = `${rect.left}px`;
  picker.style.zIndex = "1000";

  document.body.appendChild(picker);

  // Close on outside click
  const closeHandler = (e) => {
    if (!picker.contains(e.target)) {
      picker.remove();
      document.removeEventListener("click", closeHandler, true);
    }
  };
  setTimeout(() => document.addEventListener("click", closeHandler, true), 50);
}
