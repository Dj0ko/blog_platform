import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import realWorldDbService from '../../services/services';

import TagsForm from '../../pages/tags-form/tags-form';

import classes from './new-article.module.scss';

const NewArticle = ({ itemId }) => {
  // Деструктурируем useForm()
  const { register, handleSubmit } = useForm({ mode: 'onSubmit' });
  const [tagList, setTag] = useState([]);

  // Добавляем тег
  const addTag = (label) => {
    setTag([label, ...tagList]);
  };

  const deleteTag = (id) => {
    setTag([...tagList.slice(0, id), ...tagList.slice(id + 1)]);
  };

  // Получаем доступ к объектам routeMatch и history
  const routeMatch = useRouteMatch();
  const history = useHistory();

  // Устанавливаем начальное состояние
  const [current, setCurrent] = useState({});

  // Получаем выбранную статью
  useEffect(() => {
    if (itemId) {
      realWorldDbService.getCurrentArticle(itemId).then((body) => setCurrent(body.article));
    }
  }, [itemId]);

  // Добавляем статью
  const onSubmit = (data) => {
    const newObj = { ...data, tagList };

    realWorldDbService.addNewArticle(newObj).then(() => {
      history.go('/');
    });
  };

  // Рендерим, если включен режим редактирования
  if (routeMatch.url === `/articles/${itemId}/edit`) {
    const { title, description, body, slug } = current;

    // Изменяе статью
    const onSubmitEdited = (data) => {
      const newObj = { ...data, tagList };
      realWorldDbService.updateArticle(newObj, slug);
    };

    return (
      <section className={classes['new-article']}>
        <h2 className={classes['new-article__title']}>Edit article</h2>
        <form
          onSubmit={handleSubmit(onSubmitEdited)}
          method="PUT"
          action={`https://cirosantilli-realworld-express.herokuapp.com/api/articles/${slug}`}
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
            <TagsForm addTag={addTag} deleteTag={deleteTag} tagList={tagList} />
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        action="https://cirosantilli-realworld-express.herokuapp.com/api/articles"
      >
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
          <TagsForm addTag={addTag} deleteTag={deleteTag} tagList={tagList} />
        </div>

        <button type="submit" className={`${classes.form__button} ${classes['form__button--new-article']}`}>
          Send
        </button>
      </form>
    </section>
  );
};

export default NewArticle;

NewArticle.defaultProps = {
  itemId: '',
};

NewArticle.propTypes = {
  itemId: PropTypes.string,
};
