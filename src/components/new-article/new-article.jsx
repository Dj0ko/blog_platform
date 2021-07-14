import React from 'react';
import TagsForm from '../tags-form/tags-form';

import classes from './new-article.module.scss';

const NewArticle = () => (
  <section className={classes['new-article']}>
    <h2 className={classes['new-article__title']}>Create new article</h2>
    <form>
      <label className={classes.form__field}>
        <span>Title</span>
        <input className={classes.form__input} type="text" id="title" name="title" placeholder="Title" required />
      </label>

      <label className={classes.form__field}>
        <span>Short description</span>
        <input
          className={classes.form__input}
          type="text"
          id="description"
          name="description"
          placeholder="Short description"
          required
        />
      </label>

      <label className={classes.form__field}>
        <span>Text</span>
        <textarea className={classes.form__input} id="text" name="text" placeholder="Text" rows="5" required />
      </label>

      <div className={classes.form__field}>
        <span>Tags</span>
        <TagsForm />
      </div>

      <button type="submit" className={`${classes.form__button} ${classes['form__button--new-article']}`}>
        Send
      </button>
    </form>
  </section>
);

export default NewArticle;
