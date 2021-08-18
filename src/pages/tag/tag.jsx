import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../redux/actions/actions';
import classes from './tag.module.scss';

const Tag = ({ tag, deleteTag }) => (
  <>
    <input
      className={`${classes.form__input} ${classes['form__input--tag']}`}
      type="text"
      id={tag}
      name={tag}
      placeholder="Tag"
      defaultValue={tag}
    />
    <button
      type="button"
      className={`${classes.form__button} ${classes['form__button--control']} ${classes['form__button--delete']}`}
      onClick={deleteTag}
    >
      Delete
    </button>
  </>
);

export default connect(null, actions)(Tag);

Tag.defaultProps = {
  tag: '',
  deleteTag: () => {},
};

Tag.propTypes = {
  tag: PropTypes.string,
  deleteTag: PropTypes.func,
};
