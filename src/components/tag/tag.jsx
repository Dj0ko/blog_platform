import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../redux/actions/actions';
import classes from './tag.module.scss';

const Tag = ({ tag, id, removeTag }) => (
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
      onClick={() => removeTag(id)}
    >
      Delete
    </button>
  </>
);

const mapStateToProps = (state) => ({
  tagsList: state.tagsReducer,
});

export default connect(mapStateToProps, actions)(Tag);

Tag.defaultProps = {
  tag: '',
  removeTag: () => {},
};

Tag.propTypes = {
  tag: PropTypes.string,
  removeTag: PropTypes.func,
  id: PropTypes.number.isRequired,
};
