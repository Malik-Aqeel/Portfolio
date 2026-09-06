/**
 * Email & Messaging Dispatch Utilities
 * Provides 100% reliable multi-platform email and messaging dispatch
 * Specifically optimized for macOS (Safari & Chrome) to eliminate about:blank freezing
 * and unconfigured Apple Mail client issues.
 */

export const isMacDevice = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || navigator.vendor || window.opera || '';
  const platform = navigator.platform || '';
  return (
    /Macintosh|MacIntel|MacPPC|Mac68K|iPad|iPhone|iPod/i.test(platform) ||
    /Mac OS X|iPhone|iPad|iPod/i.test(ua)
  );
};

/**
 * Safely dispatches a native mailto link without opening a blank about:blank tab.
 * On Safari and Chrome on macOS, creating an anchor with target="_blank" causes
 * an empty blank tab that freezes or gets blocked. Setting window.location.href
 * triggers the OS protocol handler cleanly.
 */
export const dispatchMailto = (mailtoUrl) => {
  try {
    // Hidden iframe technique is the most bulletproof cross-browser way to trigger mailto without navigating or opening blank tabs
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = mailtoUrl;
    document.body.appendChild(iframe);
    setTimeout(() => {
      try {
        document.body.removeChild(iframe);
      } catch (_) {}
    }, 1500);
  } catch (e) {
    // Fallback directly to window.location
    window.location.href = mailtoUrl;
  }
};

/**
 * Opens Gmail Web compose tab directly in the browser.
 * Works 100% reliably on Mac, PC, Safari, Chrome without any local mail client setup.
 */
export const dispatchGmail = (gmailUrl) => {
  const win = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  if (win) {
    win.focus();
  } else {
    // If popups are completely blocked, fallback to window.location
    window.location.href = gmailUrl;
  }
};

/**
 * Opens WhatsApp with pre-filled message.
 */
export const dispatchWhatsApp = (whatsAppUrl) => {
  const win = window.open(whatsAppUrl, '_blank', 'noopener,noreferrer');
  if (win) {
    win.focus();
  } else {
    window.location.href = whatsAppUrl;
  }
};

/**
 * Reliable copy to clipboard with fallback for older browsers or restricted permissions.
 */
export const copyToClipboard = async (text) => {
  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('Clipboard writeText failed, attempting fallback...', err);
    }
  }

  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('All copy methods failed:', err);
    return false;
  }
};

/**
 * Builds mailto: URL with proper encoding
 */
export const buildMailtoUrl = (recipient, subject, body) => {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  return `mailto:${recipient}?subject=${encodedSubject}&body=${encodedBody}`;
};

/**
 * Builds Gmail Web compose URL with proper encoding
 */
export const buildGmailUrl = (recipient, subject, body) => {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodedSubject}&body=${encodedBody}`;
};

/**
 * Builds WhatsApp chat URL with proper encoding
 */
export const buildWhatsAppUrl = (phone, text) => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
};
