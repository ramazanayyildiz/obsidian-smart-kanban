/**
 * Virtual Scroll — IntersectionObserver-based lazy rendering for card lanes.
 * Renders cards in batches as the user scrolls down each lane.
 */

const BATCH_SIZE = 30;

export class LaneVirtualizer {
  constructor() {
    this._observers = new Map(); // laneId -> IntersectionObserver
    this._renderState = new Map(); // laneId -> { cards, offset, container, renderFn }
  }

  /**
   * Initialize lazy rendering for a lane.
   * @param {string} laneId - Unique identifier for the lane (e.g., status value)
   * @param {HTMLElement} container - The .smart-kanban-card-list element
   * @param {Array} cards - Full array of cards for this lane
   * @param {Function} renderFn - Function(parent, card) to render a single card
   */
  initLane(laneId, container, cards, renderFn) {
    // Clean up any existing observer for this lane
    this.destroyLane(laneId);

    if (cards.length <= BATCH_SIZE) {
      // Small lane — render everything, no virtualization needed
      for (const card of cards) {
        renderFn(container, card);
      }
      return;
    }

    // Render first batch
    const firstBatch = cards.slice(0, BATCH_SIZE);
    for (const card of firstBatch) {
      renderFn(container, card);
    }

    const state = {
      cards,
      offset: BATCH_SIZE,
      container,
      renderFn,
    };
    this._renderState.set(laneId, state);

    // Create sentinel element
    const sentinel = document.createElement("div");
    sentinel.className = "smart-kanban-scroll-sentinel";
    sentinel.style.height = "1px";
    container.appendChild(sentinel);

    // IntersectionObserver triggers next batch when sentinel is visible
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this._loadNextBatch(laneId, sentinel);
          }
        }
      },
      { root: container, rootMargin: "200px" }
    );
    observer.observe(sentinel);
    this._observers.set(laneId, observer);
  }

  _loadNextBatch(laneId, sentinel) {
    const state = this._renderState.get(laneId);
    if (!state) return;

    const { cards, offset, container, renderFn } = state;
    if (offset >= cards.length) {
      // All cards rendered — remove sentinel and observer
      this.destroyLane(laneId);
      sentinel.remove();
      return;
    }

    const end = Math.min(offset + BATCH_SIZE, cards.length);
    const batch = cards.slice(offset, end);

    // Insert batch before sentinel
    for (const card of batch) {
      const cardEl = renderFn(container, card);
      if (cardEl && sentinel.parentNode) {
        container.insertBefore(cardEl, sentinel);
      }
    }

    state.offset = end;

    if (end >= cards.length) {
      this.destroyLane(laneId);
      sentinel.remove();
    }
  }

  /**
   * Force-render all remaining cards for a lane (needed before drag operations).
   */
  forceRenderAll(laneId) {
    const state = this._renderState.get(laneId);
    if (!state) return;

    const { cards, offset, container, renderFn } = state;
    const sentinel = container.querySelector(".smart-kanban-scroll-sentinel");

    for (let i = offset; i < cards.length; i++) {
      const cardEl = renderFn(container, cards[i]);
      if (cardEl && sentinel && sentinel.parentNode) {
        container.insertBefore(cardEl, sentinel);
      }
    }

    state.offset = cards.length;
    this.destroyLane(laneId);
    if (sentinel) sentinel.remove();
  }

  destroyLane(laneId) {
    const observer = this._observers.get(laneId);
    if (observer) {
      observer.disconnect();
      this._observers.delete(laneId);
    }
    this._renderState.delete(laneId);
  }

  destroyAll() {
    for (const [laneId] of this._observers) {
      this.destroyLane(laneId);
    }
  }

  /**
   * Get the total card count for a lane (rendered + unrendered).
   */
  getTotalCount(laneId) {
    const state = this._renderState.get(laneId);
    return state ? state.cards.length : 0;
  }

  /**
   * Check if a lane still has unrendered cards.
   */
  hasMore(laneId) {
    const state = this._renderState.get(laneId);
    return state ? state.offset < state.cards.length : false;
  }
}
