// ============================================================
// Error Tracker
// Tracks: JS errors, promise rejections, API/network failures
// ============================================================
import { trackEvent } from './index';
import { getVisitorId, getSessionId } from './visitor';

let errorCount = 0;

export function initErrorTracking() {
  // JavaScript errors
  window.addEventListener('error', (e: ErrorEvent) => {
    errorCount++;
    trackEvent('Errors', {
      SessionID: getSessionId(),
      VisitorID: getVisitorId(),
      PageURL: window.location.href,
      ErrorType: 'JavaScript',
      ErrorMessage: e.message?.slice(0, 500) || '',
      StackTrace: e.error?.stack?.slice(0, 1000) || '',
      ErrorLine: e.lineno || 0,
      ErrorColumn: e.colno || 0,
      SourceFile: e.filename?.slice(0, 200) || '',
      IsJSError: true,
      IsAPIError: false,
      IsNetworkError: false,
      IsPromiseError: false,
      IsResourceError: false,
      ErrorCount: errorCount,
    });
  });

  // Unhandled promise rejections
  window.addEventListener('unhandledrejection', (e: PromiseRejectionEvent) => {
    errorCount++;
    const reason = e.reason;
    const message = reason?.message || String(reason) || 'Unhandled promise rejection';
    trackEvent('Errors', {
      SessionID: getSessionId(),
      VisitorID: getVisitorId(),
      PageURL: window.location.href,
      ErrorType: 'Promise',
      ErrorMessage: message.slice(0, 500),
      StackTrace: reason?.stack?.slice(0, 1000) || '',
      ErrorLine: 0,
      ErrorColumn: 0,
      SourceFile: '',
      IsJSError: false,
      IsAPIError: false,
      IsNetworkError: false,
      IsPromiseError: true,
      IsResourceError: false,
      ErrorCount: errorCount,
    });
  });

  // Resource load errors (images, scripts, stylesheets)
  window.addEventListener('error', (e: Event) => {
    const target = e.target as HTMLElement;
    if (target && target !== window as any) {
      const tag = target.tagName?.toLowerCase();
      if (['img', 'script', 'link', 'iframe', 'video', 'audio'].includes(tag)) {
        errorCount++;
        const src = (target as any).src || (target as any).href || '';
        trackEvent('Errors', {
          SessionID: getSessionId(),
          VisitorID: getVisitorId(),
          PageURL: window.location.href,
          ErrorType: 'Resource',
          ErrorMessage: `Failed to load ${tag}: ${src}`.slice(0, 500),
          StackTrace: '',
          ErrorLine: 0,
          ErrorColumn: 0,
          SourceFile: src.slice(0, 200),
          IsJSError: false,
          IsAPIError: false,
          IsNetworkError: false,
          IsPromiseError: false,
          IsResourceError: true,
          ErrorCount: errorCount,
        });
      }
    }
  }, true);
}
