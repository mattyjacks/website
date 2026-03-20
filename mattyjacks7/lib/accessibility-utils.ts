// Accessibility utilities and helpers

export const ARIA_LABELS = {
  closeButton: "Close dialog",
  openMenu: "Open menu",
  submitForm: "Submit form",
  loadMore: "Load more items",
  search: "Search",
  filter: "Filter results",
  sort: "Sort results",
  previous: "Previous page",
  next: "Next page",
};

export const KEYBOARD_CODES = {
  ENTER: 13,
  ESCAPE: 27,
  SPACE: 32,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39,
  TAB: 9,
};

export function isKeyboardEvent(event: any): event is KeyboardEvent {
  return event && typeof event.key === 'string';
}

export function handleKeyboardNavigation(
  event: KeyboardEvent,
  callbacks: Record<number, () => void>
): void {
  const callback = callbacks[event.keyCode];
  if (callback) {
    event.preventDefault();
    callback();
  }
}

// Focus management
export class FocusManager {
  private focusStack: HTMLElement[] = [];

  push(element: HTMLElement): void {
    this.focusStack.push(element);
    element.focus();
  }

  pop(): void {
    this.focusStack.pop();
    const previous = this.focusStack[this.focusStack.length - 1];
    if (previous) {
      previous.focus();
    }
  }

  clear(): void {
    this.focusStack = [];
  }
}

// Screen reader announcements
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  document.body.appendChild(announcement);

  setTimeout(() => {
    announcement.remove();
  }, 1000);
}
