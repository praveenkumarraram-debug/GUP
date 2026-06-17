// ============================================================
// Visitor & Session Tracker
// Tracks: Visitor ID, Session ID, Device, Browser, Network, Geo
// ============================================================
import { trackEvent } from './index';

const VISITOR_KEY = 'tg_visitor_id';
const SESSION_KEY = 'tg_session_id';
const VISIT_COUNT_KEY = 'tg_visit_count';
const LAST_VISIT_KEY = 'tg_last_visit';

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function getOrCreateVisitorId(): string {
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = generateUUID();
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

function getOrCreateSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = generateUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function getVisitorId(): string {
  return localStorage.getItem(VISITOR_KEY) || '';
}

export function getSessionId(): string {
  return sessionStorage.getItem(SESSION_KEY) || '';
}

function getDeviceType(): string {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'Tablet';
  if (/mobile|android|iphone|ipod|blackberry|opera mini|windows phone/i.test(ua)) return 'Mobile';
  return 'Desktop';
}

function getOS(): string {
  const ua = navigator.userAgent;
  if (/windows nt/i.test(ua)) return 'Windows';
  if (/mac os x/i.test(ua)) return 'macOS';
  if (/android/i.test(ua)) return 'Android';
  if (/iphone|ipad|ipod/i.test(ua)) return 'iOS';
  if (/linux/i.test(ua)) return 'Linux';
  return 'Unknown';
}

function getBrowser(): { browser: string; version: string } {
  const ua = navigator.userAgent;
  if (/chrome/i.test(ua) && !/edge|opr/i.test(ua)) {
    const m = ua.match(/chrome\/([\d.]+)/i);
    return { browser: 'Chrome', version: m ? m[1] : '' };
  }
  if (/firefox/i.test(ua)) {
    const m = ua.match(/firefox\/([\d.]+)/i);
    return { browser: 'Firefox', version: m ? m[1] : '' };
  }
  if (/safari/i.test(ua) && !/chrome/i.test(ua)) {
    const m = ua.match(/version\/([\d.]+)/i);
    return { browser: 'Safari', version: m ? m[1] : '' };
  }
  if (/edg/i.test(ua)) {
    const m = ua.match(/edg\/([\d.]+)/i);
    return { browser: 'Edge', version: m ? m[1] : '' };
  }
  return { browser: 'Unknown', version: '' };
}

function getNetworkInfo(): { networkType: string; connectionSpeed: string } {
  const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  if (!conn) return { networkType: 'Unknown', connectionSpeed: 'Unknown' };
  return {
    networkType: conn.effectiveType || conn.type || 'Unknown',
    connectionSpeed: conn.downlink ? `${conn.downlink} Mbps` : 'Unknown',
  };
}

async function getGeoData(): Promise<{ Country: string; State: string; City: string; Timezone: string }> {
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error('Geo fetch failed');
    const data = await res.json();
    return {
      Country: data.country_name || '',
      State: data.region || '',
      City: data.city || '',
      Timezone: data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  } catch {
    return {
      Country: '',
      State: '',
      City: '',
      Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  }
}

export async function initVisitorTracking() {
  const visitorId = getOrCreateVisitorId();
  const sessionId = getOrCreateSessionId();

  const visitCount = parseInt(localStorage.getItem(VISIT_COUNT_KEY) || '0') + 1;
  localStorage.setItem(VISIT_COUNT_KEY, String(visitCount));

  const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
  const isReturning = !!lastVisit;
  const isFirstVisit = visitCount === 1;
  localStorage.setItem(LAST_VISIT_KEY, new Date().toISOString());

  const { browser, version } = getBrowser();
  const network = getNetworkInfo();
  const geo = await getGeoData();

  trackEvent('Visitors', {
    VisitorID: visitorId,
    SessionID: sessionId,
    FirstVisit: isFirstVisit,
    ReturningVisitor: isReturning,
    Country: geo.Country,
    State: geo.State,
    City: geo.City,
    Timezone: geo.Timezone,
    Language: navigator.language || '',
    DeviceType: getDeviceType(),
    OS: getOS(),
    Browser: browser,
    BrowserVersion: version,
    ScreenResolution: `${screen.width}x${screen.height}`,
    ViewportSize: `${window.innerWidth}x${window.innerHeight}`,
    DeviceOrientation: screen.orientation?.type || 'unknown',
    TouchDevice: 'ontouchstart' in window,
    NetworkType: network.networkType,
    ConnectionSpeed: network.connectionSpeed,
  });

  // Track session start
  sessionStorage.setItem('tg_session_start', new Date().toISOString());
  sessionStorage.setItem('tg_visit_count', String(visitCount));
}

export function trackSessionEnd() {
  const sessionStart = sessionStorage.getItem('tg_session_start');
  if (!sessionStart) return;

  const start = new Date(sessionStart).getTime();
  const end = Date.now();
  const duration = Math.round((end - start) / 1000);

  const pagesViewed = parseInt(sessionStorage.getItem('tg_pages_viewed') || '1');
  const activeTime = parseInt(sessionStorage.getItem('tg_active_time') || '0');
  const idleTime = Math.max(0, duration - activeTime);

  trackEvent('Sessions', {
    SessionID: getSessionId(),
    VisitorID: getVisitorId(),
    SessionStart: sessionStart,
    SessionEnd: new Date().toISOString(),
    SessionDuration: duration,
    ActiveTime: activeTime,
    IdleTime: idleTime,
    PagesPerSession: pagesViewed,
    BouncSession: pagesViewed <= 1,
    ReturnFrequency: sessionStorage.getItem('tg_visit_count') || '1',
    VisitCount: localStorage.getItem(VISIT_COUNT_KEY) || '1',
    TimeBetweenPages: sessionStorage.getItem('tg_avg_time_between_pages') || '0',
    SessionQualityScore: calculateSessionScore(duration, pagesViewed, activeTime),
    EngagementScore: parseFloat(sessionStorage.getItem('tg_engagement_score') || '0'),
    IntentScore: parseFloat(sessionStorage.getItem('tg_intent_score') || '0'),
    FrustrationScore: parseFloat(sessionStorage.getItem('tg_frustration_score') || '0'),
    LeadScore: parseFloat(sessionStorage.getItem('tg_lead_score') || '0'),
    ExitPrediction: false,
  });
}

function calculateSessionScore(duration: number, pages: number, activeTime: number): number {
  let score = 0;
  if (duration > 60) score += 20;
  if (duration > 180) score += 20;
  if (pages > 2) score += 20;
  if (pages > 4) score += 10;
  if (activeTime > 30) score += 20;
  if (activeTime > 120) score += 10;
  return Math.min(100, score);
}
