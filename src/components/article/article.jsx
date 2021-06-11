import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import Tags from '../tags/tags';

import classes from './article.module.scss';

const Article = ({ article }) => {
  const {
    title,
    favoritesCount,
    tagList,
    body,
    createdAt,
    author: { image, username },
  } = article;

  return (
    <article className={classes.article}>
      <div>
        <div className={classes['article__title-container']}>
          <h2 className={classes.article__title}>{title}</h2>
          <span className={classes.article__likes}>{favoritesCount}</span>
        </div>
        <Tags taglist={tagList} />
        <p className={classes.article__text}>{body}</p>
      </div>
      <div className={classes['user-info']}>
        <img src={image} className={classes['user-info__image']} width="46px" height="46px" alt="users avatar" />
        <div className={classes['user-info__text-container']}>
          <p className={classes['user-info__text--black']}>{username}</p>
          <p className={classes['user-info__text']}>{format(new Date(createdAt), 'PP')}</p>
        </div>
      </div>
    </article>
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
