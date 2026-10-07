/**
 * Cybersecurity and Client-Side Protection Utilities
 * Kashmir Escape Premium Security Layer
 */

/**
 * Escapes HTML characters to protect the application against Cross-Site Scripting (XSS) attacks.
 * It strictly filters out dynamic HTML injections, script tags, and malicious payloads.
 */
export function sanitizeString(input: string): string {
  if (!input) return '';
  
  // 1. Remove dangerous script blocks and event handlers explicitly
  let sanitized = input
    .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '')
    .replace(/onload\s*=\s*"[^"]*"/gi, '')
    .replace(/onerror\s*=\s*"[^"]*"/gi, '')
    .replace(/onclick\s*=\s*"[^"]*"/gi, '')
    .replace(/javascript:/gi, '');

  // 2. Escape standard HTML syntax characters
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');

  return sanitized.trim();
}

/**
 * Ensures strict input character length boundaries to protect against payload oversizing or DOM buffer overload.
 */
export function validateLength(input: string, maxLen: number): string {
  if (!input) return '';
  if (input.length > maxLen) {
    return input.substring(0, maxLen);
  }
  return input;
}

/**
 * Validates email addresses against standard strict RFC formats to prevent header injection or command parsing vulnerabilities.
 */
export function validateEmail(email: string): boolean {
  if (!email) return false;
  // Strict regular expression for secure email format validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 120;
}

/**
 * Validates phone numbers to ensure they only contain digits, spaces, hyphens, and the leading plus symbol.
 */
export function validatePhone(phone: string): boolean {
  if (!phone) return false;
  const phoneRegex = /^\+?[0-9\s\-()]{7,25}$/;
  return phoneRegex.test(phone);
}

/**
 * Client-Side Rate Limiter (Denial of Service / Automated Spam Defense)
 * Prevents bad actors or automatic bots from spamming reservation and contact requests.
 * Restricts the user to a maximum of 3 submissions per 60 seconds using browser memory logs.
 */
export function checkRateLimit(actionType: 'booking' | 'contact' | 'newsletter'): { allowed: boolean; remainingSeconds: number } {
  try {
    const now = Date.now();
    const storageKey = `ke_security_rate_${actionType}`;
    const storedLogs = localStorage.getItem(storageKey);
    
    let timestamps: number[] = [];
    if (storedLogs) {
      timestamps = JSON.parse(storedLogs);
    }
    
    // Filter timestamps within the last 60 seconds
    const oneMinuteAgo = now - 60000;
    timestamps = timestamps.filter(t => t > oneMinuteAgo);
    
    // Max 3 submissions allowed per minute
    if (timestamps.length >= 3) {
      const oldestActive = timestamps[0];
      const remainingSeconds = Math.ceil((60000 - (now - oldestActive)) / 1000);
      return { allowed: false, remainingSeconds: Math.max(1, remainingSeconds) };
    }
    
    // Append the new submission timestamp
    timestamps.push(now);
    localStorage.setItem(storageKey, JSON.stringify(timestamps));
    return { allowed: true, remainingSeconds: 0 };
  } catch (error) {
    // If localStorage is unavailable, fail open but log securely
    console.warn('Security rate limiter fall-back: Storage disabled');
    return { allowed: true, remainingSeconds: 0 };
  }
}
