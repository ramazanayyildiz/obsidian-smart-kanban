/**
 * Group By — enables grouping cards by any frontmatter field, not just status.
 */

/**
 * Get the value of a field from a card object.
 */
export function getCardFieldValue(card, fieldName, eff) {
  // Check known field mappings
  if (fieldName === eff.statusField || fieldName === "status") return card.status;
  if (fieldName === eff.categoryField || fieldName === "category") return card.category;
  if (fieldName === eff.priorityField || fieldName === "priority") return card.priority;
  if (fieldName === eff.tagsField || fieldName === "tags") {
    return Array.isArray(card.tags) ? card.tags.join(", ") : "";
  }
  // Check custom fields
  if (card.customFields && card.customFields[fieldName]) {
    return card.customFields[fieldName];
  }
  return card[fieldName] || "";
}

/**
 * Collect unique group values from all cards for a given field.
 */
export function collectGroupValues(cards, fieldName, eff, explicitOrder) {
  if (explicitOrder) {
    const ordered = explicitOrder.split(",").map(s => s.trim()).filter(Boolean);
    // Add any values from cards that aren't in the explicit order
    const seen = new Set(ordered);
    for (const card of cards) {
      const val = getCardFieldValue(card, fieldName, eff);
      if (val && !seen.has(val)) {
        ordered.push(val);
        seen.add(val);
      }
    }
    return ordered;
  }

  // No explicit order — collect from cards and sort
  const values = new Set();
  for (const card of cards) {
    const val = getCardFieldValue(card, fieldName, eff);
    if (val) values.add(val);
  }
  return [...values].sort();
}

/**
 * Filter cards for a given group value.
 */
export function filterCardsByGroup(cards, groupValue, fieldName, eff) {
  return cards.filter(card => {
    const val = getCardFieldValue(card, fieldName, eff);
    return val === groupValue;
  });
}

/**
 * Determine the field name to write when drag-dropping between groups.
 */
export function resolveGroupFieldForWrite(groupByField, eff) {
  if (groupByField === "status" || groupByField === eff.statusField) return eff.statusField;
  if (groupByField === "category" || groupByField === eff.categoryField) return eff.categoryField;
  if (groupByField === "priority" || groupByField === eff.priorityField) return eff.priorityField;
  return groupByField; // custom field — write directly
}
