export const DEFAULT_SELECTORS = [{
    keyFilter: "*",
    labelFilter: "\0"
}];

// Request Tracing
export const VERSION = "0.1.0";
export const USER_AGENT = `JavaScriptProvider/${VERSION}`;

// Client Retry Options
export const MAX_RETRIES = 2;
export const MAX_RETRY_DELAY_IN_MS = 60 * 1000;