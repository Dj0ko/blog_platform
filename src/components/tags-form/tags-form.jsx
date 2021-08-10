import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Tag from '../tag/tag';

import * as actions from '../../redux/actions/actions';
import classes from './tags-form.module.scss';

const TagsForm = ({ tagsList, addTag }) => {
  const [label, setLabel] = useState('');

  const onLabelChange = (evt) => {
    setLabel(evt.target.value);
  };

  const onButtonAdd = () => {
    addTag(label);
    setLabel('');
  };

  const allTags = tagsList.map((tag, index) => (
    <li key={tag}>
      <Tag tag={tag} id={index} />
    </li>
  ));

  return (
    <ul>
      {allTags}
      <li>
        <input
          className={`${classes.form__input} ${classes['form__input--tag']}`}
          type="text"
          name="tag1"
          placeholder="Tag"
          onChange={onLabelChange}
          value={label}
        />
        <button
          type="button"
          className={`${classes.form__button} ${classes['form__button--control']} ${classes['form__button--delete']}`}
        >
          Delete
        </button>
        <button
          type="button"
          className={`${classes.form__button} ${classes['form__button--control']} ${classes['form__button--add']}`}
          onClick={onButtonAdd}
        >
          Add Tag
        </button>
      </li>
    </ul>
  );
};

const mapStateToProps = (state) => ({
  tagsList: state.tagsReducer,
  isEditOn: state.editReducer,
});

export default connect(mapStateToProps, actions)(TagsForm);

TagsForm.defaultProps = {
  tagsList: [],
  addTag: () => {},
};

TagsForm.propTypes = {
  tagsList: PropTypes.arrayOf(PropTypes.string),
  addTag: PropTypes.func,
};
