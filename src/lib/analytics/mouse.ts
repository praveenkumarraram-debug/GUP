// ============================================================
// Mouse Behaviour Tracker
// Tracks: Movement, Hover, Rage/Dead Clicks, Cursor Speed
// ============================================================
import { trackEvent } from './index';
import { getVisitorId, getSessionId } from './visitor';

let mouseMovements = 0;
let lastMousePos = { x: 0, y: 0 };
let lastMouseTime = Date.now();
let cursorSpeeds: number[] = [];
let hoverElement = '';
let hoverStart = 0;
let mouseFlushTimer: ReturnType<typeof setTimeout> | null = null;

export function initMouseTracking() {
  // Mouse movement - throttled, just counts
  document.addEventListener('mousemove', (e: MouseEvent) => {
    mouseMovements++;
    const now = Date.now();
    const dx = e.clientX - lastMousePos.x;
    const dy = e.clientY - lastMousePos.y;
    const dt = now - lastMouseTime;
    if (dt > 0) {
      const speed = Math.round(Math.sqrt(dx * dx + dy * dy) / dt * 100);
      cursorSpeeds.push(speed);
      if (cursorSpeeds.length > 100) cursorSpeeds.shift();
    }
    lastMousePos = { x: e.clientX, y: e.clientY };
    lastMouseTime = now;

    // Batch flush mouse data every 30 seconds
    if (mouseFlushTimer) clearTimeout(mouseFlushTimer);
    mouseFlushTimer = setTimeout(() => {
      const avgSpeed = cursorSpeeds.length > 0
        ? Math.round(cursorSpeeds.reduce((a, b) => a + b, 0) / cursorSpeeds.length)
        : 0;
      trackEvent('Mouse', {
        SessionID: getSessionId(),
        VisitorID: getVisitorId(),
        PageURL: window.location.href,
        MouseMovements: mouseMovements,
        CursorSpeed: avgSpeed,
        HoverElement: hoverElement,
        HoverDuration: 0,
        RageClicks: 0,
        DeadClicks: 0,
        MouseLeaveWindow: false,
        RightClicks: 0,
      });
      mouseMovements = 0;
      cursorSpeeds = [];
    }, 30000);
  }, { passive: true });

  // Hover tracking
  document.addEventListener('mouseover', (e: MouseEvent) => {
    const target = e.target as Element;
    const tag = target.tagName?.toLowerCase();
    const label = target.id || target.className?.toString().split(' ')[0] || tag;
    hoverElement = `${tag}#${label}`.slice(0, 100);
    hoverStart = Date.now();
  });

  document.addEventListener('mouseout', (e: MouseEvent) => {
    const duration = Date.now() - hoverStart;
    if (duration > 500) {
      // Only track meaningful hovers (>0.5s)
      trackEvent('Mouse', {
        SessionID: getSessionId(),
        VisitorID: getVisitorId(),
        PageURL: window.location.href,
        HoverElement: hoverElement,
        HoverDuration: Math.round(duration / 1000),
        MouseMovements: 0,
        RageClicks: 0,
        DeadClicks: 0,
        MouseLeaveWindow: false,
        RightClicks: 0,
      });
    }
  });

  // Mouse leaves window
  document.addEventListener('mouseleave', (e: MouseEvent) => {
    if (e.clientY <= 0) {
      trackEvent('Mouse', {
        SessionID: getSessionId(),
        VisitorID: getVisitorId(),
        PageURL: window.location.href,
        MouseLeaveWindow: true,
        MouseMovements: mouseMovements,
        CursorSpeed: 0,
        HoverElement: '',
        HoverDuration: 0,
        RageClicks: 0,
        DeadClicks: 0,
        RightClicks: 0,
      });
    }
  });
}
