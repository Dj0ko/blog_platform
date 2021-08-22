import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Tag from '../tag/tag';

import classes from './tags-form.module.scss';

const TagsForm = ({ tagList, addTag, deleteTag }) => {
  const [label, setLabel] = useState('');

  const onLabelChange = (evt) => {
    setLabel(evt.target.value);
  };

  const onButtonAdd = () => {
    addTag(label);
    setLabel('');
  };

  const allTags = tagList.map((tag, index) => (
    <li key={tag}>
      <Tag tag={tag} id={index} deleteTag={() => deleteTag(index)} />
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

export default TagsForm;

TagsForm.defaultProps = {
  tagList: [],
  addTag: () => {},
  deleteTag: () => {},
};

TagsForm.propTypes = {
  tagList: PropTypes.arrayOf(PropTypes.string),
  addTag: PropTypes.func,
  deleteTag: PropTypes.func,
};
