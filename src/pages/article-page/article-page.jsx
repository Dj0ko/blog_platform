import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

import realWorldDbService from '../../services/services';

import Spinner from '../../components/spinner/spinner';
import Tags from '../../components/tags/tags';

import classes from './article-page.module.scss';

const ArticlePage = ({ itemId }) => {
  // Устанавливаем начальное состояние
  const [currentArticle, setCurrentArticle] = useState();
  const [isModal, showModal] = useState(false);
  const [isDeleted, deleteCurrentArticle] = useState(false);

  const history = useHistory();

  // Получаем выбранную статью
  useEffect(
    () => realWorldDbService.getCurrentArticle(itemId).then((body) => setCurrentArticle(body.article)),
    [itemId]
  );

  // Если нет статьи, то показываем индикатор загрузки
  if (!currentArticle) {
    return <Spinner />;
  }

  // Получаем поля статьи
  const {
    title,
    favoritesCount,
    tagList,
    description,
    createdAt,
    author: { image, username },
    slug,
  } = currentArticle;

  // Кнопка удаления статьи
  const onButtonDelete = () => {
    realWorldDbService.deleteArticle(slug).then(() => deleteCurrentArticle(true));
  };

  if (isDeleted) {
    return <p className={classes.alert}>Статья успешно удалена</p>;
  }

  return (
    <div className={classes['article-page']}>
      <article className={classes['article-page__header']}>
        <div>
          <div className={classes['article-page__title-container']}>
            <h2 className={classes['article-page__title']}>{title}</h2>
            <span className={classes['article-page__likes']}>{favoritesCount}</span>
          </div>
          <Tags taglist={tagList} />
          <p className={classes['article-page__text']}>{description}</p>
        </div>
        <div className={classes['user-info']}>
          <img src={image} className={classes['user-info__image']} width="46px" height="46px" alt="users avatar" />
          <div className={classes['user-info__text-container']}>
            <p className={classes['user-info__text--black']}>{username}</p>
            <p className={classes['user-info__text']}>{format(new Date(createdAt), 'PP')}</p>
          </div>
        </div>
      </article>
      <section>
        {JSON.parse(localStorage.getItem('user')) && username === JSON.parse(localStorage.getItem('user')).username ? (
          <div className={classes['article-page__button-container']}>
            <button
              type="button"
              className={`${classes.button} ${classes['button--delete']}`}
              onClick={() => showModal(true)}
            >
              Delete
            </button>
            <button
              type="button"
              className={`${classes.button} ${classes['button--edit']}`}
              onClick={() => {
                history.push(`${itemId}/edit`);
              }}
            >
              Edit
            </button>
          </div>
        ) : null}
      </section>
      <div className={classes['article-page__main']} id="divForMarkdown" />
      <ReactMarkdown className={classes['article-page__main']}>{currentArticle.body}</ReactMarkdown>
      {isModal ? (
        <div className={classes['article-page__modal']}>
          <p className={classes['article-page__modal-text']}>Are you sure to delete this article?</p>
          <button
            type="button"
            className={`${classes['article-page__modal-button']} ${classes['article-page__modal-button--no']}`}
            onClick={() => showModal(false)}
          >
            No
          </button>
          <button
            type="button"
            className={`${classes['article-page__modal-button']} ${classes['article-page__modal-button--yes']}`}
            onClick={onButtonDelete}
          >
            Yes
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ArticlePage;

ArticlePage.propTypes = {
  itemId: PropTypes.string.isRequired,
};
