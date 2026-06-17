// ============================================================
// Analytics SDK — Main Orchestrator
// Initializes all trackers and wires up the event pipeline
// ============================================================
import { startAnalytics, stopAnalytics } from './index';
import { initVisitorTracking, trackSessionEnd } from './visitor';
import { trackPageView, trackPageExit, resetScrollTracking } from './pageview';
import { initClickTracking } from './clicks';
import { initScrollTracking } from './scroll';
import { initMouseTracking } from './mouse';
import { initFormTracking } from './forms';
import { initPerformanceTracking } from './performance';
import { initErrorTracking } from './errors';

// Re-export resetScrollTracking so it can be used in router
export { resetScrollTracking } from './scroll';

let initialized = false;

export async function initAnalytics() {
  if (typeof window === 'undefined' || initialized) return;
  initialized = true;

  // Start the batch flush engine
  startAnalytics();

  // Error tracking first (catch errors during init)
  initErrorTracking();

  // Performance tracking (observes from page start)
  initPerformanceTracking();

  // Visitor & session data (async geo lookup)
  await initVisitorTracking();

  // Interaction trackers
  initClickTracking();
  initScrollTracking();
  initMouseTracking();
  initFormTracking();

  // First page view
  await trackPageView();

  // Session end on unload
  window.addEventListener('beforeunload', () => {
    trackPageExit();
    trackSessionEnd();
    stopAnalytics();
  });

  // Handle SPA route changes via History API
  const originalPushState = history.pushState.bind(history);
  const originalReplaceState = history.replaceState.bind(history);

  history.pushState = (...args) => {
    originalPushState(...args);
    handleRouteChange();
  };
  history.replaceState = (...args) => {
    originalReplaceState(...args);
    handleRouteChange();
  };
  window.addEventListener('popstate', handleRouteChange);
}

async function handleRouteChange() {
  // Small delay to let the page title update
  await new Promise((r) => setTimeout(r, 100));
  resetScrollTracking();
  await trackPageView();
}
