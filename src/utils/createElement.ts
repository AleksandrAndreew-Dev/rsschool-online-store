export interface ElementOption {
  tag: string;
  className?: string;
  text?: string;
  parent?: HTMLElement;
  attrs?: Record<string, string | number | boolean>;
}

export function createEl(options: ElementOption): HTMLElement {
  if (!options.tag || !options.tag.trim()) {
    throw new Error('Tag is required');
  }

  const element = document.createElement(options.tag);

  if (options.className) {
    element.className = options.className;
  }
  if (options.text) {
    element.textContent = options.text;
  }
  if (options.attrs) {
    Object.entries(options.attrs).forEach(([key, value]) => {
      element.setAttribute(key, String(value));
    });
  }
  if (options.parent) {
    options.parent.append(element);
  }

  return element;
}
