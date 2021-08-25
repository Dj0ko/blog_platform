import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useRouteMatch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../../components/spinner/spinner';

import realWorldDbService from '../../services/services';

import TagsForm from '../../components/tags-form/tags-form';

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
  const [current, setCurrent] = useState();

  // Получаем выбранную статью
  useEffect(() => {
    if (itemId) {
      realWorldDbService.getCurrentArticle(itemId).then((body) => setCurrent(body.article));
    }
  }, [history, itemId]);

  if (!current && routeMatch.url === `/articles/${itemId}/edit`) {
    return <Spinner />;
  }

  // Добавляем статью
  const onSubmit = (data) => {
    const newObj = { ...data, tagList };

    realWorldDbService.addNewArticle(newObj).then(() => {
      history.go('/');
    });
  };

  // Изменяем статью
  const onSubmitEdited = (data) => {
    const { slug } = current;
    const newObj = { ...data, tagList };
    realWorldDbService.updateArticle(newObj, slug).then(() => history.push(`/articles/${itemId}`));
  };

  // Если имя автора статьи не совпадаем с имененем текущего пользователя, то возвращаем статью
  if (current && current.author.username !== JSON.parse(localStorage.getItem('user')).username) {
    return <Redirect to={`/articles/${itemId}`} />;
  }

  return (
    <section className={classes['new-article']}>
      <h2 className={classes['new-article__title']}>
        {routeMatch.url === `/articles/${itemId}/edit` ? 'Edit article' : 'Create new article'}
      </h2>
      <form
        onSubmit={routeMatch.url === `/articles/${itemId}/edit` ? handleSubmit(onSubmitEdited) : handleSubmit(onSubmit)}
        method="PUT"
        action={`https://cirosantilli-realworld-express.herokuapp.com/api/articles/${current ? current.slug : null}`}
      >
        <label className={classes.form__field}>
          <span>Title</span>
          <input
            className={classes.form__input}
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            defaultValue={current ? current.title : null}
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
            defaultValue={current ? current.description : null}
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
            defaultValue={current ? current.body : null}
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
};

export default NewArticle;

NewArticle.defaultProps = {
  itemId: '',
};

NewArticle.propTypes = {
  itemId: PropTypes.string,
};
