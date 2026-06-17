// ============================================================
// Page View Tracker
// Tracks: URL, Load Time, Time on Page, Exit/Entry, UTM, etc.
// ============================================================
import { trackEvent } from './index';
import { getVisitorId, getSessionId } from './visitor';

let pageStartTime = Date.now();
let pageRefreshCount = 0;
let lastPageUrl = '';

function getUTMParams(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  return {
    UTMSource: params.get('utm_source') || '',
    UTMMedium: params.get('utm_medium') || '',
    UTMCampaign: params.get('utm_campaign') || '',
    UTMContent: params.get('utm_content') || '',
    UTMTerm: params.get('utm_term') || '',
  };
}

function getTrafficType(): string {
  const ref = document.referrer;
  const params = new URLSearchParams(window.location.search);
  if (params.get('utm_source')) return 'Paid';
  if (!ref) return 'Direct';
  if (/google|bing|yahoo|duckduckgo/i.test(ref)) return 'Organic';
  if (/facebook|twitter|linkedin|instagram|youtube/i.test(ref)) return 'Social';
  return 'Referral';
}

async function getPageLoadMetrics(): Promise<{ PageLoadTime: number; DOMLoadTime: number }> {
  return new Promise((resolve) => {
    if (document.readyState === 'complete') {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      resolve({
        PageLoadTime: nav ? Math.round(nav.loadEventEnd - nav.startTime) : 0,
        DOMLoadTime: nav ? Math.round(nav.domContentLoadedEventEnd - nav.startTime) : 0,
      });
    } else {
      window.addEventListener('load', () => {
        const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        resolve({
          PageLoadTime: nav ? Math.round(nav.loadEventEnd - nav.startTime) : 0,
          DOMLoadTime: nav ? Math.round(nav.domContentLoadedEventEnd - nav.startTime) : 0,
        });
      });
    }
  });
}

export async function trackPageView() {
  const currentUrl = window.location.href;
  const isRefresh = currentUrl === lastPageUrl;

  if (isRefresh) {
    pageRefreshCount++;
  } else {
    pageRefreshCount = 0;
  }

  lastPageUrl = currentUrl;
  pageStartTime = Date.now();

  // Increment pages viewed in session
  const pagesViewed = parseInt(sessionStorage.getItem('tg_pages_viewed') || '0') + 1;
  sessionStorage.setItem('tg_pages_viewed', String(pagesViewed));

  // Track intent based on high-value pages
  updateIntentScore(currentUrl);

  const { PageLoadTime, DOMLoadTime } = await getPageLoadMetrics();
  const utms = getUTMParams();

  trackEvent('PageViews', {
    SessionID: getSessionId(),
    VisitorID: getVisitorId(),
    PageURL: currentUrl,
    PageTitle: document.title,
    ReferrerURL: document.referrer || 'Direct',
    LandingPage: pagesViewed === 1 ? currentUrl : sessionStorage.getItem('tg_landing_page') || currentUrl,
    ExitPage: '',
    IsEntryPage: pagesViewed === 1,
    IsExitPage: false,
    PageLoadTime,
    DOMLoadTime,
    TimeOnPage: 0,
    ScrollDepth: 0,
    PageVisibility: document.visibilityState,
    PageRefreshCount: pageRefreshCount,
    Is404: document.title.toLowerCase().includes('not found') || document.title.includes('404'),
    IsError: document.title.toLowerCase().includes('error'),
    TrafficType: getTrafficType(),
    OrganicKeyword: '',
    ...utms,
  });

  if (pagesViewed === 1) {
    sessionStorage.setItem('tg_landing_page', currentUrl);
  }
}

export function trackPageExit() {
  const timeOnPage = Math.round((Date.now() - pageStartTime) / 1000);
  const scrollDepth = parseInt(sessionStorage.getItem('tg_max_scroll') || '0');

  trackEvent('PageViews', {
    SessionID: getSessionId(),
    VisitorID: getVisitorId(),
    PageURL: window.location.href,
    PageTitle: document.title,
    IsExitPage: true,
    TimeOnPage: timeOnPage,
    ScrollDepth: scrollDepth,
    PageRefreshCount: pageRefreshCount,
  });
}

function updateIntentScore(url: string) {
  let intentScore = parseFloat(sessionStorage.getItem('tg_intent_score') || '0');
  if (/pricing|contact|demo|book|schedule/i.test(url)) intentScore += 20;
  if (/services|solutions|offerings/i.test(url)) intentScore += 10;
  if (/about/i.test(url)) intentScore += 5;
  intentScore = Math.min(100, intentScore);
  sessionStorage.setItem('tg_intent_score', String(intentScore));
}
