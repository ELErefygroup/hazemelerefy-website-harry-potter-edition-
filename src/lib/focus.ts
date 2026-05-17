const TABBABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
  'audio[controls]',
  'video[controls]',
  'summary',
].join(',');

export function getTabbableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(TABBABLE_SELECTOR),
  ).filter((element) => {
    const inertElement = element as HTMLElement & { inert?: boolean };

    return (
      !element.hasAttribute('disabled') &&
      element.getAttribute('aria-hidden') !== 'true' &&
      !inertElement.inert &&
      element.tabIndex !== -1 &&
      element.getClientRects().length > 0
    );
  });
}

export function trapFocus(event: KeyboardEvent, container: HTMLElement) {
  if (event.key !== 'Tab') return false;

  const tabbable = getTabbableElements(container);
  if (tabbable.length === 0) {
    event.preventDefault();
    return true;
  }

  const first = tabbable[0]!;
  const last = tabbable[tabbable.length - 1]!;
  const active = document.activeElement instanceof HTMLElement
    ? document.activeElement
    : null;

  if (!active || !container.contains(active)) {
    event.preventDefault();
    (event.shiftKey ? last : first).focus();
    return true;
  }

  if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
    return true;
  }

  if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
    return true;
  }

  return false;
}
