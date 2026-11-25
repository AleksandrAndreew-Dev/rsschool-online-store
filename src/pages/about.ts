import '../styles/about.css';
import { createEl } from '../utils/createElement.ts';
export function AboutPage(): HTMLElement {
  const section = createEl({
    tag: 'section',
    className: 'about-page',
  });
  const title = createEl({
    tag: 'h1',
    className: 'about-page__title',
    text: 'О нас',
  });
  const projectTitle = createEl({
    tag: 'h2',
    className: 'about-page__rsschool',
    text: 'RSSchool: Team Project (Online Store)',
  });
  const intro = createEl({
    tag: 'p',
    className: 'about-page__intro',
    text: 'Novamedika.com — учебный аптечный интернет-магазин. Основан на действующей сети аптек. Здесь можно подобрать лекарства и медицинские товары по категориям, воспользоваться поиском по названию, фильтром по категории и диапазону цен, а также сортировкой.',
  });

  const teamTitle = createEl({
    tag: 'h2',
    className: 'about-page__team-title',
    text: 'Команда разработки',
  });
  const dev1 = createEl({
    tag: 'article',
    className: 'about-page__member',
  });
  createEl({
    tag: 'h3',
    className: 'about-page__member-name',
    text: 'Разработчик: Aleksandr',
    parent: dev1,
  });
  createEl({
    tag: 'a',
    className: 'about-page__member-link',
    text: 'AleksandrAndreew-Dev',
    attrs: {
      href: 'https://github.com/AleksandrAndreew-Dev',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    parent: dev1,
  });

  createEl({
    tag: 'p',
    className: 'about-page__member-role',
    text: 'Базовый роутер SPA, каталог товаров: карточки товара, поиск, фильтры по категории и цене, сортировка, сообщение «Ничего не найдено» и сброс фильтров, стили каталога, тесты каталога, деплой.',

    parent: dev1,
  });

  const dev2 = createEl({
    tag: 'article',
    className: 'about-page__member',
  });
  createEl({
    tag: 'h3',
    className: 'about-page__member-name',
    text: 'Разработчик: Diana',
    parent: dev2,
  });

  createEl({
    tag: 'a',
    className: 'about-page__member-link',
    text: 'Diana-dedo',
    attrs: {
      href: 'https://github.com/Diana-dedo',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    parent: dev2,
  });
  createEl({
    tag: 'p',
    className: 'about-page__member-role',
    text: 'Инфраструктура: общая оболочка приложения (Header, Footer, outlet), компоненты корзины, изменение количества, итоговая стоимость, промокод SALE10, localStorage, стили оболочки и корзины, Vitest, тесты корзины.',
    parent: dev2,
  });
  section.append(title, projectTitle, intro, teamTitle, dev1, dev2);

  return section;
}
