interface ElementOption {
  tag: string;
  className?: string;
  text?: string;
  parent?: HTMLElement;
  attrs?: Record<string, string>;
}

export function createEl(options: ElementOption): HTMLElement {
  const element = document.createElement(options.tag);

  if (options.className) {
    element.className = options.className;
  }
  if (options.text) {
    element.textContent = options.text;
  }
  if (options.parent) {
    options.parent.append(element);
  }
  if (options.attrs) {
    Object.entries(options.attrs).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  return element;
}
