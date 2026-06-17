// ============================================================
// Click Tracker
// Tracks: All click types, CTA, Nav, Logo, External/Internal
// ============================================================
import { trackEvent } from './index';
import { getVisitorId, getSessionId } from './visitor';

let lastClickTime = 0;
let clickCounts: Record<string, number> = {};
let rageClickCount = 0;
let deadClickCount = 0;

function classifyClick(target: Element): Record<string, boolean | string> {
  const tag = target.tagName.toLowerCase();
  const id = target.id || '';
  const className = target.className?.toString() || '';
  const text = target.textContent?.trim().slice(0, 100) || '';
  const href = (target as HTMLAnchorElement).href || '';
  const isExternal = href && !href.includes(window.location.hostname);
  const isInternal = href && href.includes(window.location.hostname);

  const isCTA =
    /book|contact|demo|get started|schedule|buy|subscribe|sign up|learn more/i.test(text) ||
    /cta|btn-primary|btn-cta/i.test(className);
  const isNav = /nav|menu|header/i.test(className) || target.closest('nav') !== null;
  const isButton = tag === 'button' || (tag === 'a' && isCTA);
  const isLogo = /logo/i.test(className) || /logo/i.test(id);
  const isFooter = target.closest('footer') !== null;
  const isImage = tag === 'img';

  return {
    ClickType: isNav ? 'Navigation' : isCTA ? 'CTA' : isButton ? 'Button' : isLogo ? 'Logo' : isImage ? 'Image' : isFooter ? 'Footer' : 'General',
    ElementTag: tag,
    ElementID: id,
    ElementClass: className.slice(0, 200),
    ElementText: text,
    TargetURL: href,
    IsExternal: !!isExternal,
    IsInternal: !!isInternal,
    IsCTA: isCTA,
    IsNavigation: isNav,
    IsButton: isButton,
    IsLogo: isLogo,
    IsFooter: isFooter,
    IsImage: isImage,
    IsDoubleClick: false,
  };
}

function detectRageClick(x: number, y: number, timestamp: number): boolean {
  const key = `${Math.round(x / 50)}_${Math.round(y / 50)}`;
  const now = timestamp;
  clickCounts[key] = (clickCounts[key] || 0) + 1;

  setTimeout(() => {
    delete clickCounts[key];
  }, 2000);

  if (clickCounts[key] >= 3) {
    rageClickCount++;
    const frustration = Math.min(100, parseInt(sessionStorage.getItem('tg_frustration_score') || '0') + 15);
    sessionStorage.setItem('tg_frustration_score', String(frustration));
    return true;
  }
  return false;
}

export function initClickTracking() {
  // Single click
  document.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as Element;
    if (!target) return;

    const now = Date.now();
    const isRage = detectRageClick(e.clientX, e.clientY, now);

    const classification = classifyClick(target);

    // Update lead score for CTA clicks
    if (classification.IsCTA) {
      const lead = Math.min(100, parseFloat(sessionStorage.getItem('tg_lead_score') || '0') + 15);
      sessionStorage.setItem('tg_lead_score', String(lead));
    }

    // Update engagement score
    const engagement = Math.min(100, parseFloat(sessionStorage.getItem('tg_engagement_score') || '0') + 2);
    sessionStorage.setItem('tg_engagement_score', String(engagement));

    trackEvent('Clicks', {
      SessionID: getSessionId(),
      VisitorID: getVisitorId(),
      PageURL: window.location.href,
      ...classification,
      PositionX: Math.round(e.clientX),
      PositionY: Math.round(e.clientY),
      IsDoubleClick: false,
      RageClick: isRage,
    });

    lastClickTime = now;
  }, true);

  // Double click
  document.addEventListener('dblclick', (e: MouseEvent) => {
    const target = e.target as Element;
    if (!target) return;
    const classification = classifyClick(target);
    trackEvent('Clicks', {
      SessionID: getSessionId(),
      VisitorID: getVisitorId(),
      PageURL: window.location.href,
      ...classification,
      PositionX: Math.round(e.clientX),
      PositionY: Math.round(e.clientY),
      IsDoubleClick: true,
    });
  });

  // Right click
  document.addEventListener('contextmenu', (e: MouseEvent) => {
    trackEvent('Mouse', {
      SessionID: getSessionId(),
      VisitorID: getVisitorId(),
      PageURL: window.location.href,
      RightClicks: 1,
      PositionX: Math.round(e.clientX),
      PositionY: Math.round(e.clientY),
    });
  });
}
