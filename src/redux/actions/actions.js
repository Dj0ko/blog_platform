export const articlesFetchDataSuccess = (articles) => ({
  type: 'ARTICLES_FETCH_DATA_SUCCESS',
  articles,
});

export const changePage = (page) => ({
  type: 'CHANGE_PAGE',
  page,
});

export const hasSpinner = (payload) => ({
  type: 'HAS_SPINNER',
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
