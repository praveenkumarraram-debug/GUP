// ============================================================
// Scroll Tracker
// Tracks: Depth milestones, max scroll, speed, direction
// ============================================================
import { trackEvent } from './index';
import { getVisitorId, getSessionId } from './visitor';

let maxScrollDepth = 0;
let lastScrollY = 0;
let lastScrollTime = Date.now();
let scrollStops = 0;
let scrollStopTimer: ReturnType<typeof setTimeout> | null = null;
let milestone25 = false, milestone50 = false, milestone75 = false, milestone100 = false;

function getScrollPercent(): number {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight <= 0) return 100;
  return Math.round((scrollTop / docHeight) * 100);
}

function getScrollSpeed(currentY: number): number {
  const now = Date.now();
  const dy = Math.abs(currentY - lastScrollY);
  const dt = now - lastScrollTime;
  lastScrollY = currentY;
  lastScrollTime = now;
  return dt > 0 ? Math.round(dy / dt * 100) : 0; // px per 100ms
}

export function initScrollTracking() {
  document.addEventListener('scroll', () => {
    const percent = getScrollPercent();
    const scrollY = window.scrollY;
    const direction = scrollY > lastScrollY ? 'Down' : 'Up';
    const speed = getScrollSpeed(scrollY);

    maxScrollDepth = Math.max(maxScrollDepth, percent);
    sessionStorage.setItem('tg_max_scroll', String(maxScrollDepth));

    // Update engagement score based on scroll
    if (percent > 50) {
      const engagement = Math.min(100, parseFloat(sessionStorage.getItem('tg_engagement_score') || '0') + 5);
      sessionStorage.setItem('tg_engagement_score', String(engagement));
    }

    // Scroll stop detection
    if (scrollStopTimer) clearTimeout(scrollStopTimer);
    scrollStopTimer = setTimeout(() => {
      scrollStops++;
      // Flush a scroll event on stop
      trackEvent('Scrolls', {
        SessionID: getSessionId(),
        VisitorID: getVisitorId(),
        PageURL: window.location.href,
        ScrollPercent: percent,
        ScrollDepthPixels: scrollY,
        MaxScrollDepth: maxScrollDepth,
        ScrollSpeed: speed,
        ScrollDirection: direction,
        HorizontalScroll: window.scrollX > 0,
        ScrollStops: scrollStops,
        ReadingDepth: percent,
        ScrollToReadRatio: 1.0,
        Milestone25: milestone25,
        Milestone50: milestone50,
        Milestone75: milestone75,
        Milestone100: milestone100,
      });
    }, 1500);

    // Milestones (only fire once)
    if (percent >= 25 && !milestone25) {
      milestone25 = true;
      trackEvent('Scrolls', {
        SessionID: getSessionId(),
        VisitorID: getVisitorId(),
        PageURL: window.location.href,
        ScrollPercent: 25,
        Milestone25: true,
        Milestone50: false,
        Milestone75: false,
        Milestone100: false,
        MaxScrollDepth: maxScrollDepth,
        ScrollDirection: direction,
      });
    }
    if (percent >= 50 && !milestone50) {
      milestone50 = true;
      trackEvent('Scrolls', {
        SessionID: getSessionId(),
        VisitorID: getVisitorId(),
        PageURL: window.location.href,
        ScrollPercent: 50,
        Milestone25: true,
        Milestone50: true,
        Milestone75: false,
        Milestone100: false,
        MaxScrollDepth: maxScrollDepth,
        ScrollDirection: direction,
      });
    }
    if (percent >= 75 && !milestone75) {
      milestone75 = true;
      trackEvent('Scrolls', {
        SessionID: getSessionId(),
        VisitorID: getVisitorId(),
        PageURL: window.location.href,
        ScrollPercent: 75,
        Milestone25: true,
        Milestone50: true,
        Milestone75: true,
        Milestone100: false,
        MaxScrollDepth: maxScrollDepth,
        ScrollDirection: direction,
      });
    }
    if (percent >= 100 && !milestone100) {
      milestone100 = true;
      trackEvent('Scrolls', {
        SessionID: getSessionId(),
        VisitorID: getVisitorId(),
        PageURL: window.location.href,
        ScrollPercent: 100,
        Milestone25: true,
        Milestone50: true,
        Milestone75: true,
        Milestone100: true,
        MaxScrollDepth: maxScrollDepth,
        ScrollDirection: direction,
      });
    }
  }, { passive: true });
}

export function resetScrollTracking() {
  maxScrollDepth = 0;
  lastScrollY = 0;
  scrollStops = 0;
  milestone25 = false;
  milestone50 = false;
  milestone75 = false;
  milestone100 = false;
}
