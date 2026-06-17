// ============================================================
// Performance Tracker
// Tracks: LCP, CLS, INP, FCP, TTFB, Page Load, DOM Load
// ============================================================
import { trackEvent } from './index';
import { getVisitorId, getSessionId } from './visitor';

interface PerformanceMetrics {
  LCP: number;
  CLS: number;
  INP: number;
  FCP: number;
  TTFB: number;
  PageLoadTime: number;
  DOMLoadTime: number;
  TBT: number;
  JSHeapSize: number;
  ResourceCount: number;
  NetworkLatency: number;
}

const metrics: Partial<PerformanceMetrics> = {};

export function initPerformanceTracking() {
  // Wait for page to fully load
  window.addEventListener('load', () => {
    setTimeout(() => captureAndSendMetrics(), 2000);
  });

  // LCP (Largest Contentful Paint)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1] as any;
        if (last) metrics.LCP = Math.round(last.startTime);
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (_) {}

    // CLS (Cumulative Layout Shift)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        metrics.CLS = parseFloat(clsValue.toFixed(4));
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (_) {}

    // INP (Interaction to Next Paint) / FID fallback
    try {
      const inpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (entry.duration > (metrics.INP || 0)) {
            metrics.INP = Math.round(entry.duration);
          }
        }
      });
      inpObserver.observe({ type: 'event', buffered: true, durationThreshold: 16 } as any);
    } catch (_) {}

    // FCP (First Contentful Paint)
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            metrics.FCP = Math.round(entry.startTime);
          }
        }
      });
      fcpObserver.observe({ type: 'paint', buffered: true });
    } catch (_) {}
  }
}

function captureAndSendMetrics() {
  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

  if (nav) {
    metrics.TTFB = Math.round(nav.responseStart - nav.requestStart);
    metrics.PageLoadTime = Math.round(nav.loadEventEnd - nav.startTime);
    metrics.DOMLoadTime = Math.round(nav.domContentLoadedEventEnd - nav.startTime);
    metrics.NetworkLatency = Math.round(nav.responseStart - nav.fetchStart);
  }

  // JS Heap Size
  if ((performance as any).memory) {
    metrics.JSHeapSize = Math.round((performance as any).memory.usedJSHeapSize / 1048576); // MB
  }

  // Resource count
  metrics.ResourceCount = performance.getEntriesByType('resource').length;

  trackEvent('Performance', {
    SessionID: getSessionId(),
    VisitorID: getVisitorId(),
    PageURL: window.location.href,
    PageLoadTime: metrics.PageLoadTime || 0,
    DOMLoadTime: metrics.DOMLoadTime || 0,
    LCP: metrics.LCP || 0,
    CLS: metrics.CLS || 0,
    INP: metrics.INP || 0,
    FCP: metrics.FCP || 0,
    TTFB: metrics.TTFB || 0,
    TBT: metrics.TBT || 0,
    JSHeapSize: metrics.JSHeapSize || 0,
    ResourceCount: metrics.ResourceCount || 0,
    ResourceLoadTime: 0,
    NetworkLatency: metrics.NetworkLatency || 0,
  });
}
