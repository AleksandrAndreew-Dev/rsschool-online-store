import { describe, it, expect } from 'vitest';
import { Footer } from '../footer';

describe('Footer тесты', () => {
  it('корневой тег', () => {
    const footer = Footer();
    expect(footer.tagName).toBe('FOOTER');
  });

  it('ссылки в подвале', () => {
    const footer = Footer();
    const links = footer.querySelectorAll('.footer__link');
    expect(links).toHaveLength(4);
  });

  it('копирайт', () => {
    const footer = Footer();
    const footerClass = footer.querySelector('.footer__down');
    expect(footerClass?.textContent).toContain('Novamedika.com');
  });
});
