import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { withRouter } from 'react-router-dom';

import Tags from '../tags/tags';

import classes from './article-header.module.scss';

const ArticleHeader = ({ article, style, history }) => {
  const {
    title,
    favoritesCount,
    tagList,
    description,
    slug,
    createdAt,
    author: { image, username },
  } = article;

  return (
    <article className={classes['article-header']} style={style}>
      <div>
        <div className={classes['article-header__title-container']}>
          <h2 className={classes['article-header__title']}>
            <a
              role="button"
              onClick={() => history.push(`article/${slug}`)}
              onKeyDown={() => history.push(`article/${slug}`)}
              tabIndex={0}
            >
              {title}
            </a>
          </h2>
          <span className={classes['article-header__likes']}>{favoritesCount}</span>
        </div>
        <Tags taglist={tagList} />
        <p className={classes['article-header__text']}>{description}</p>
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

export default withRouter(ArticleHeader);

ArticleHeader.defaultProps = {
  article: {},
  style: {},
};

ArticleHeader.propTypes = {
  article: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.arrayOf(PropTypes.objectOf),
      PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
    ])
  ),
  style: PropTypes.objectOf(PropTypes.string),
  history: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.objectOf(PropTypes.string), PropTypes.func])
  ).isRequired,
};
