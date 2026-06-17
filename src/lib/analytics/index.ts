// ============================================================
// TRUSTGRID.AI — Analytics SDK
// Comprehensive 100-point behavioral tracking system
// ============================================================

// ─── Configuration ────────────────────────────────────────────
// TODO: Replace with your deployed Google Apps Script Web App URL
export const ANALYTICS_CONFIG = {
  ENDPOINT: 'YOUR_APPS_SCRIPT_WEB_APP_URL_HERE',
  BATCH_INTERVAL_MS: 10000, // Send events every 10 seconds
  MAX_BATCH_SIZE: 50,       // Max events per batch
  ENABLED: true,
  DEBUG: false,
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
  if (ANALYTICS_CONFIG.DEBUG) console.log('[Analytics]', type, payload);

  eventQueue.push({
    type,
    payload,
    timestamp: new Date().toISOString(),
  });

  if (eventQueue.length >= ANALYTICS_CONFIG.MAX_BATCH_SIZE) {
    flushEvents();
  }
}

export async function flushEvents() {
  if (eventQueue.length === 0) return;
  if (!ANALYTICS_CONFIG.ENDPOINT || ANALYTICS_CONFIG.ENDPOINT.includes('YOUR_APPS')) return;

  const batch = [...eventQueue];
  eventQueue = [];

  try {
    // Use sendBeacon for page unload, fetch otherwise
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(batch)], { type: 'application/json' });
      navigator.sendBeacon(ANALYTICS_CONFIG.ENDPOINT, blob);
    } else {
      await fetch(ANALYTICS_CONFIG.ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(batch),
        keepalive: true,
      });
    }
  } catch (err) {
    if (ANALYTICS_CONFIG.DEBUG) console.error('[Analytics] Flush failed:', err);
    // Re-queue failed events
    eventQueue = [...batch, ...eventQueue];
  }
}

// ─── Start / Stop ─────────────────────────────────────────────
export function startAnalytics() {
  if (typeof window === 'undefined') return;

  // Start batch flush timer
  batchTimer = setInterval(flushEvents, ANALYTICS_CONFIG.BATCH_INTERVAL_MS);

  // Flush on page unload
  window.addEventListener('beforeunload', () => flushEvents());
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushEvents();
  });
}

export function stopAnalytics() {
  if (batchTimer) {
    clearInterval(batchTimer);
    batchTimer = null;
  }
  flushEvents();
}
