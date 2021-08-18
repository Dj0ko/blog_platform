import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import realWorldDbService from '../../services/services';

import Tags from '../../pages/tags/tags';

import classes from './article.module.scss';

const Article = ({ article }) => {
  // Получаем поля статей
  const {
    title,
    favoritesCount,
    tagList,
    description,
    slug,
    createdAt,
    author: { image, username },
    favorited,
  } = article;

  // Получаем доступ к объекту history
  const history = useHistory();

  // Открытие статьи в зависимости от адреса
  const handleClick = () => {
    if (history.location.pathname === '/') {
      history.push(`articles/${slug}`);
    } else {
      history.push(slug);
    }
  };

  // Устанавливаем начальные состояния
  const [likesCount, setLikesCount] = useState(favoritesCount);
  const [isLike, setLike] = useState(false);

  // Установка "Мне нравится" при загрузке статей
  useEffect(() => {
    if (favorited) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [favorited]);

  // Функция, добавляющая "Мне нравится" для статьи
  const rateArticle = () => {
    realWorldDbService.rateArticle(slug).then((body) => {
      if (body.article.favorited) {
        setLikesCount(body.article.favoritesCount);
        setLike(true);
      }
    });
  };

  // Функция, удаляющая "Мне нравится" для статьи
  const unRateArticle = () => {
    realWorldDbService.unRateArticle(slug).then((body) => {
      if (!body.article.favorited) {
        setLikesCount(body.article.favoritesCount);
        setLike(false);
      }
    });
  };

  // Установка "Мне нравится" по клику на кнопку
  const onButtonLike = () => {
    if (!isLike) {
      rateArticle();
    } else {
      unRateArticle();
    }
  };

  return (
    <li className={classes['articles-list__item']}>
      <article className={classes.article}>
        <div>
          <div className={classes['article__title-container']}>
            <h2 className={classes.article__title}>
              <a role="button" onClick={handleClick} onKeyDown={handleClick} tabIndex={0}>
                {title}
              </a>
            </h2>
            <button type="button" className={classes.article__likes} onClick={onButtonLike}>
              <svg
                className={classes['article__likes-image']}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className={classes['article__likes-red']}
                  d="M7.99998 15.1099C7.7722 15.1099 7.5526 15.0273 7.38146 14.8774C6.73509 14.3123 6.11193 13.7811 5.56212 13.3126L5.55932 13.3102C3.94738 11.9365 2.55542 10.7502 1.58691 9.58167C0.504272 8.27527 0 7.03662 0 5.68347C0 4.36877 0.450805 3.15588 1.26928 2.26807C2.09753 1.36975 3.234 0.875 4.46972 0.875C5.3933 0.875 6.23912 1.16699 6.98363 1.7428C7.35936 2.03345 7.69994 2.38916 7.99998 2.80408C8.30015 2.38916 8.64061 2.03345 9.01646 1.7428C9.76097 1.16699 10.6068 0.875 11.5304 0.875C12.766 0.875 13.9026 1.36975 14.7308 2.26807C15.5493 3.15588 16 4.36877 16 5.68347C16 7.03662 15.4958 8.27527 14.4132 9.58154C13.4447 10.7502 12.0528 11.9364 10.4411 13.3099C9.89036 13.7792 9.26622 14.3112 8.61839 14.8777C8.44737 15.0273 8.22765 15.1099 7.99998 15.1099ZM4.46972 1.81226C3.49889 1.81226 2.60705 2.19971 1.95825 2.90332C1.2998 3.61755 0.937132 4.60486 0.937132 5.68347C0.937132 6.82153 1.3601 7.83936 2.30847 8.98364C3.22509 10.0897 4.58849 11.2516 6.1671 12.5969L6.17003 12.5994C6.72191 13.0697 7.34752 13.6029 7.99864 14.1722C8.65367 13.6018 9.28026 13.0677 9.83323 12.5967C11.4117 11.2513 12.775 10.0897 13.6916 8.98364C14.6399 7.83936 15.0628 6.82153 15.0628 5.68347C15.0628 4.60486 14.7002 3.61755 14.0417 2.90332C13.393 2.19971 12.5011 1.81226 11.5304 1.81226C10.8192 1.81226 10.1662 2.03833 9.5897 2.48413C9.07591 2.88159 8.718 3.38403 8.50816 3.7356C8.40025 3.91638 8.21031 4.02429 7.99998 4.02429C7.78966 4.02429 7.59972 3.91638 7.49181 3.7356C7.28209 3.38403 6.92418 2.88159 6.41027 2.48413C5.83373 2.03833 5.18078 1.81226 4.46972 1.81226Z"
                  fill={isLike ? 'red' : 'black'}
                  fillOpacity="0.75"
                />
              </svg>
              {likesCount}
            </button>
          </div>
          <Tags taglist={tagList} />
          <p className={classes.article__text}>{description}</p>
        </div>
        <div className={classes['user-info']}>
          <img src={image} className={classes['user-info__image']} width="46px" height="46px" alt="users avatar" />
          <div className={classes['user-info__text-container']}>
            <p className={classes['user-info__text--black']}>{username}</p>
            <p className={classes['user-info__text']}>{format(new Date(createdAt), 'PP')}</p>
          </div>
        </div>
      </article>
    </li>
  );
};

export default Article;

Article.defaultProps = {
  article: {},
};

Article.propTypes = {
  article: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.arrayOf(PropTypes.objectOf),
      PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
    ])
  ),
};
