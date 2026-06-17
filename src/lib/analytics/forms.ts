// ============================================================
// Form Analytics Tracker
// Tracks: Start, Submit, Abandon, Field focus, Errors, Time
// ============================================================
import { trackEvent } from './index';
import { getVisitorId, getSessionId } from './visitor';

interface FormState {
  name: string;
  id: string;
  startTime: number;
  fieldFocused: string;
  validationErrors: number;
  repeatedEdits: Record<string, number>;
  submitted: boolean;
}

const activeForms: Map<string, FormState> = new Map();

export function initFormTracking() {
  // Track all form interactions via delegation
  document.addEventListener('focusin', (e: FocusEvent) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;

    const form = target.closest('form');
    if (!form) return;

    const formId = form.id || form.name || form.className?.toString().split(' ')[0] || 'unknown-form';

    if (!activeForms.has(formId)) {
      // Form started for the first time
      const state: FormState = {
        name: form.getAttribute('aria-label') || formId,
        id: formId,
        startTime: Date.now(),
        fieldFocused: target.name || target.id || target.type,
        validationErrors: 0,
        repeatedEdits: {},
        submitted: false,
      };
      activeForms.set(formId, state);

      trackEvent('Forms', {
        SessionID: getSessionId(),
        VisitorID: getVisitorId(),
        PageURL: window.location.href,
        FormName: state.name,
        FormID: formId,
        FormStarted: true,
        FormSubmitted: false,
        FormAbandoned: false,
        FieldFocused: target.name || target.id || target.type,
        FieldBlurred: '',
        ValidationErrors: 0,
        SubmissionSuccess: false,
        SubmissionFailure: false,
        TimeToComplete: 0,
        RepeatedEdits: 0,
        AbandonedField: '',
      });

      // Update lead score
      const lead = Math.min(100, parseFloat(sessionStorage.getItem('tg_lead_score') || '0') + 10);
      sessionStorage.setItem('tg_lead_score', String(lead));
    }

    // Track repeated field focus
    const state = activeForms.get(formId)!;
    const fieldKey = target.name || target.id || 'field';
    state.fieldFocused = fieldKey;
    state.repeatedEdits[fieldKey] = (state.repeatedEdits[fieldKey] || 0) + 1;
  });

  // Field blur
  document.addEventListener('focusout', (e: FocusEvent) => {
    const target = e.target as HTMLInputElement;
    if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;
    const form = target.closest('form');
    if (!form) return;
    const formId = form.id || form.name || 'unknown-form';
    const state = activeForms.get(formId);
    if (!state) return;

    trackEvent('Forms', {
      SessionID: getSessionId(),
      VisitorID: getVisitorId(),
      PageURL: window.location.href,
      FormName: state.name,
      FormID: formId,
      FormStarted: true,
      FormSubmitted: false,
      FormAbandoned: false,
      FieldFocused: '',
      FieldBlurred: target.name || target.id || target.type,
      ValidationErrors: state.validationErrors,
      SubmissionSuccess: false,
      SubmissionFailure: false,
      TimeToComplete: 0,
      RepeatedEdits: Object.values(state.repeatedEdits).reduce((a, b) => a + b, 0),
      AbandonedField: '',
    });
  });

  // Form submit
  document.addEventListener('submit', (e: SubmitEvent) => {
    const form = e.target as HTMLFormElement;
    if (!form) return;
    const formId = form.id || form.name || 'unknown-form';
    const state = activeForms.get(formId);
    const timeToComplete = state ? Math.round((Date.now() - state.startTime) / 1000) : 0;

    if (state) state.submitted = true;

    trackEvent('Forms', {
      SessionID: getSessionId(),
      VisitorID: getVisitorId(),
      PageURL: window.location.href,
      FormName: state?.name || formId,
      FormID: formId,
      FormStarted: true,
      FormSubmitted: true,
      FormAbandoned: false,
      FieldFocused: '',
      FieldBlurred: '',
      ValidationErrors: state?.validationErrors || 0,
      SubmissionSuccess: true,
      SubmissionFailure: false,
      TimeToComplete: timeToComplete,
      RepeatedEdits: state ? Object.values(state.repeatedEdits).reduce((a, b) => a + b, 0) : 0,
      AbandonedField: '',
    });

    // Update conversion tracking
    trackEvent('Conversions', {
      SessionID: getSessionId(),
      VisitorID: getVisitorId(),
      PageURL: window.location.href,
      EventType: 'FormSubmit',
      EventLabel: state?.name || formId,
      LeadGenerated: true,
      ConversionEvent: true,
      GoalCompleted: true,
      ContactForm: true,
    });

    const lead = Math.min(100, parseFloat(sessionStorage.getItem('tg_lead_score') || '0') + 30);
    sessionStorage.setItem('tg_lead_score', String(lead));

    activeForms.delete(formId);
  });

  // Validation errors
  document.addEventListener('invalid', (e: Event) => {
    const target = e.target as HTMLInputElement;
    const form = target.closest('form');
    if (!form) return;
    const formId = form.id || form.name || 'unknown-form';
    const state = activeForms.get(formId);
    if (state) {
      state.validationErrors++;
      const frustration = Math.min(100, parseFloat(sessionStorage.getItem('tg_frustration_score') || '0') + 10);
      sessionStorage.setItem('tg_frustration_score', String(frustration));
    }
  }, true);

  // Form abandon (page unload with active unsubmitted form)
  window.addEventListener('beforeunload', () => {
    activeForms.forEach((state, formId) => {
      if (!state.submitted) {
        trackEvent('Forms', {
          SessionID: getSessionId(),
          VisitorID: getVisitorId(),
          PageURL: window.location.href,
          FormName: state.name,
          FormID: formId,
          FormStarted: true,
          FormSubmitted: false,
          FormAbandoned: true,
          FieldFocused: '',
          FieldBlurred: '',
          ValidationErrors: state.validationErrors,
          SubmissionSuccess: false,
          SubmissionFailure: false,
          TimeToComplete: Math.round((Date.now() - state.startTime) / 1000),
          RepeatedEdits: Object.values(state.repeatedEdits).reduce((a, b) => a + b, 0),
          AbandonedField: state.fieldFocused,
        });
      }
    });
  });
}
