import { describe, it, expect } from 'vitest';
import { Header } from '../header';

describe('Header тесты', () => {
  it('Корневой тег и класс', () => {
    const header = Header();
    expect(header.tagName).toBe('HEADER');
    expect(header.classList.contains('header')).toBe(true);
  });

  it('Логотип и ссылки навигации', () => {
    const header = Header();
    const logo = header.querySelector('.header__logo');
    const links = header.querySelectorAll('.header__link');
    expect(links).toHaveLength(3);
    expect(logo?.textContent).toBe('Novamedika.com');
  });

  it('Счётчик корзины', () => {
    const header = Header();
    const cartCount = header.querySelector('#cart-count');
    expect(cartCount).not.toBeNull();
    expect(cartCount?.textContent).toBe('0');
  });
});
