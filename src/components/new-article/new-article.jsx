import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TagsForm from '../tags-form/tags-form';
import realWorldDbService from '../../services/services';

import classes from './new-article.module.scss';
import * as actions from '../../redux/actions/actions';

const NewArticle = ({ tagList, currentUser, currentArticle, location }) => {
  const userData = () => {
    if (JSON.stringify(currentUser).length === 2) {
      return JSON.parse(localStorage.getItem('user'));
    }
    return currentUser;
  };

  const { token } = userData();
  // Деструктурируем useForm()
  const { register, handleSubmit } = useForm({ mode: 'onSubmit' });

  const onSubmit = (data) => {
    const newObj = { ...data, tagList };

    realWorldDbService.addNewArticle(newObj, token);
  };

  if (location.pathname.slice(-4) === 'edit') {
    const { title, description, body, slug } = currentArticle;

    const onSubmitEdited = (data) => {
      const newObj = { ...data, tagList };
      realWorldDbService.updateArticle(newObj, slug, token);
    };

    return (
      <section className={classes['new-article']}>
        <h2 className={classes['new-article__title']}>Edit article</h2>
        <form
          onSubmit={handleSubmit(onSubmitEdited)}
          method="PUT"
          action={`https://conduit.productionready.io/articles/${slug}`}
        >
          <label className={classes.form__field}>
            <span>Title</span>
            <input
              className={classes.form__input}
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              defaultValue={title}
              required
              {...register('title', { required: true })}
            />
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
              defaultValue={description}
              {...register('description', { required: true })}
            />
          </label>

          <label className={classes.form__field}>
            <span>Text</span>
            <textarea
              className={classes.form__input}
              id="body"
              name="body"
              placeholder="Text"
              rows="5"
              defaultValue={body}
              required
              {...register('body', { required: true })}
            />
          </label>

          <fieldset className={classes.form__field}>
            <span>Tags</span>
            <TagsForm />
          </fieldset>

          <button type="submit" className={`${classes.form__button} ${classes['form__button--new-article']}`}>
            Send
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className={classes['new-article']}>
      <h2 className={classes['new-article__title']}>Create new article</h2>
      <form onSubmit={handleSubmit(onSubmit)} method="POST" action="https://conduit.productionready.io/api/articles">
        <label className={classes.form__field}>
          <span>Title</span>
          <input
            className={classes.form__input}
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            required
            {...register('title', { required: true })}
          />
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
            {...register('description', { required: true })}
          />
        </label>

        <label className={classes.form__field}>
          <span>Text</span>
          <textarea
            className={classes.form__input}
            id="body"
            name="body"
            placeholder="Text"
            rows="5"
            required
            {...register('body', { required: true })}
          />
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
};

const mapStateToProps = (state) => ({
  tagList: state.tagsReducer,
  currentUser: state.currentUserReducer,
  isEditOn: state.editReducer,
  currentArticle: state.currentArticleReducer,
});

export default connect(mapStateToProps, actions)(withRouter(NewArticle));

NewArticle.defaultProps = {
  tagList: [],
  currentUser: {},
  addNewArticle: () => {},
};

NewArticle.propTypes = {
  tagList: PropTypes.arrayOf(PropTypes.string),
  currentUser: PropTypes.objectOf(PropTypes.objectOf),
  addNewArticle: PropTypes.func,
  currentArticle: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.arrayOf(PropTypes.objectOf),
      PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
    ])
  ).isRequired,
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};
