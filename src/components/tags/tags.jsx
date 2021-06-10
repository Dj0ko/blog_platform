import React from 'react';
import PropTypes from 'prop-types';

import classes from './tags.module.scss';

const Tags = ({ taglist }) => {
  const allTags = taglist.map((tag) => (
    <li className={classes['articles__tags-list-item']} key={tag}>
      {tag}
    </li>
  ));

  return <ul className={classes['article__tags-list']}>{allTags}</ul>;
};

export default Tags;

Tags.defaultProps = {
  taglist: [],
};

Tags.propTypes = {
  taglist: PropTypes.arrayOf(PropTypes.string),
};
