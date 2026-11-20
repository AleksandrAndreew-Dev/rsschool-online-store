import { createEl } from '../utils/createElement';
import '../styles/footer.css';

export function Footer(): HTMLElement {
  const footer = createEl({ tag: 'footer', className: 'footer' });
  const container = createEl({ tag: 'div', className: 'footer__container', parent: footer });

  const nav = createEl({ tag: 'nav', className: 'footer__nav', parent: container });
  const list = createEl({ tag: 'ul', className: 'footer__list', parent: nav });

  const termOfUse = createEl({ tag: 'li', className: 'footer__item', parent: list });
  createEl({
    tag: 'a',
    className: 'footer__link',
    text: 'Условия использования',
    attrs: { href: '#/' },
    parent: termOfUse,
  });

  const confid = createEl({ tag: 'li', className: 'footer__item', parent: list });
  createEl({
    tag: 'a',
    className: 'footer__link',
    text: 'Конфиденциальность',
    attrs: { href: '#/' },
    parent: confid,
  });

  const contact = createEl({ tag: 'li', className: 'footer__item', parent: list });
  createEl({
    tag: 'a',
    className: 'footer__link',
    text: 'Контакты',
    attrs: { href: '#/' },
    parent: contact,
  });

  const help = createEl({ tag: 'li', className: 'footer__item', parent: list });
  createEl({
    tag: 'a',
    className: 'footer__link',
    text: 'Помощь',
    attrs: { href: '#/' },
    parent: help,
  });

  createEl({
    tag: 'p',
    className: 'footer__down',
    text: '© 2027 Novamedika.com',
    parent: container,
  });

  return footer;
}
