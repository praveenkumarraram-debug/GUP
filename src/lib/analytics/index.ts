// ============================================================
// TRUSTGRID.AI — Analytics SDK
// Comprehensive 100-point behavioral tracking system
// ============================================================

// ─── Configuration ────────────────────────────────────────────
export const ANALYTICS_CONFIG = {
  ENDPOINT: 'https://script.google.com/macros/s/AKfycbwY9hhrWePQWqXMUXPVVfqMGVG30XDsg1hg3irPDdZ-_6WqIAdysRUEeuaadsoTzGQ/exec',
  BATCH_INTERVAL_MS: 8000,  // Send events every 8 seconds
  MAX_BATCH_SIZE: 30,       // Max events per batch
  ENABLED: true,
  DEBUG: true,              // Enable to verify in browser console
};

// ─── Event Queue ──────────────────────────────────────────────
let eventQueue: AnalyticsEvent[] = [];
let batchTimer: ReturnType<typeof setInterval> | null = null;

export interface AnalyticsEvent {
  type: string;
  payload: Record<string, unknown>;
  timestamp: string;
}

export function trackEvent(type: string, payload: Record<string, unknown>) {
  if (!ANALYTICS_CONFIG.ENABLED) return;
  if (ANALYTICS_CONFIG.DEBUG) console.log('[Analytics] Queued:', type, payload);

  eventQueue.push({
    type,
    payload,
    timestamp: new Date().toISOString(),
  });

  if (eventQueue.length >= ANALYTICS_CONFIG.MAX_BATCH_SIZE) {
    flushEvents();
  }
}

export function flushEvents() {
  if (eventQueue.length === 0) return;
  if (!ANALYTICS_CONFIG.ENDPOINT || ANALYTICS_CONFIG.ENDPOINT.includes('YOUR_APPS')) return;

  const batch = [...eventQueue];
  eventQueue = [];

  if (ANALYTICS_CONFIG.DEBUG) console.log('[Analytics] Flushing', batch.length, 'events...');

  // ─── Method 1: no-cors fetch (works when deployment is fully public) ───
  fetch(ANALYTICS_CONFIG.ENDPOINT, {
    method: 'POST',
    mode: 'no-cors',
    redirect: 'follow',
    body: JSON.stringify(batch),
  }).then(() => {
    if (ANALYTICS_CONFIG.DEBUG) console.log('[Analytics] ✅ Batch sent via fetch');
  }).catch(() => {
    // ─── Method 2: Image beacon fallback (always works, GET request) ───
    // Encodes data as a URL parameter — bypasses all CORS/auth issues
    if (ANALYTICS_CONFIG.DEBUG) console.log('[Analytics] 🔄 Trying Image beacon fallback...');
    const encoded = encodeURIComponent(JSON.stringify(batch));
    const url = `${ANALYTICS_CONFIG.ENDPOINT}?data=${encoded}`;
    const img = new Image();
    img.src = url;
    if (ANALYTICS_CONFIG.DEBUG) img.onload = () => console.log('[Analytics] ✅ Sent via beacon');
  });
}

// ─── Start / Stop ─────────────────────────────────────────────
export function startAnalytics() {
  if (typeof window === 'undefined') return;

  // Start batch flush timer
  batchTimer = setInterval(flushEvents, ANALYTICS_CONFIG.BATCH_INTERVAL_MS);

  // Flush immediately when tab is hidden or user leaves
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushEvents();
  });

  window.addEventListener('pagehide', () => flushEvents());
  window.addEventListener('beforeunload', () => flushEvents());
}

export function stopAnalytics() {
  if (batchTimer) {
    clearInterval(batchTimer);
    batchTimer = null;
  }
  flushEvents();
}
