/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ReactMarkdown from 'react-markdown';

import Spinner from '../spinner/spinner';
import Tags from '../tags/tags';
import realWorldDbService from '../../services/services';
import * as actions from '../../redux/actions/actions';
import classes from './article-page.module.scss';

const ArticlePage = ({ itemId, setCurrentArticle, currentArticle, history, addTag, showModal, isModalOn }) => {
  useEffect(
    () => realWorldDbService.getCurrentArticle(itemId).then((body) => setCurrentArticle(body.article)),
    [setCurrentArticle, itemId]
  );

  if (JSON.stringify(currentArticle).length === 2 || itemId !== currentArticle.slug) {
    return <Spinner />;
  }

  const {
    title,
    favoritesCount,
    tagList,
    description,
    createdAt,
    author: { image, username },
  } = currentArticle;

  const onButtonDelete = () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const { slug } = currentArticle;

    realWorldDbService.deleteArticle(slug, token);
  };

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
        {username === JSON.parse(localStorage.getItem('user')).username ? (
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
                tagList.forEach((tag) => addTag(tag));
                history.push(`${itemId}/edit`);
              }}
            >
              Edit
            </button>
          </div>
        ) : null}
      </section>
      <ReactMarkdown className={classes['article-page__main']}>{currentArticle.body}</ReactMarkdown>
      {isModalOn ? (
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

const mapStateToProps = (state) => ({
  currentArticle: state.currentArticleReducer,
  isModalOn: state.modalReducer,
});

export default connect(mapStateToProps, actions)(withRouter(ArticlePage));

ArticlePage.defaultProps = {
  setCurrentArticle: () => {},
  addTag: () => {},
};

ArticlePage.propTypes = {
  currentArticle: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.arrayOf(PropTypes.objectOf),
      PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
    ])
  ).isRequired,
  itemId: PropTypes.string.isRequired,
  setCurrentArticle: PropTypes.func,
  history: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.objectOf(PropTypes.string), PropTypes.func])
  ).isRequired,
  addTag: PropTypes.func,
};
