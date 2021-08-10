export const articlesFetchDataSuccess = (articles) => ({
  type: 'ARTICLES_FETCH_DATA_SUCCESS',
  articles,
});

export const addNewArticle = (payload) => ({
  type: 'ADD_NEW_ARTICLE',
  payload,
});

export const hasError = () => ({ type: 'HAS_ERROR' });

export const signUp = (payload) => ({
  type: 'SIGN_UP',
  payload,
});

export const signIn = (payload) => ({
  type: 'SIGN_IN',
  payload,
});

export const setCurrentUser = (payload) => ({
  type: 'SET_CURRENT_USER',
  payload,
});

export const getServerErrors = (payload) => ({
  type: 'GET_SERVER_ERROR',
  payload,
});

export const addTag = (payload) => ({
  type: 'ADD_TAG',
  payload,
});

export const removeTag = (payload) => ({
  type: 'REMOVE_TAG',
  payload,
});

export const setCurrentArticle = (payload) => ({
  type: 'SET_CURRENT_ARTICLE',
  payload,
});

export const showModal = (payload) => ({
  type: 'SHOW_MODAL',
  payload,
});

export const noArticles = () => ({ type: 'NO_ARTICLES' });
