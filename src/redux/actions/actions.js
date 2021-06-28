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

export const changeUserdata = (type, payload) => ({
  type,
  payload,
});

export const clearData = () => ({ type: 'CLEAR_DATA' });

export const signUp = (payload) => ({
  type: 'SIGN_UP',
  payload,
});

export const signIn = (payload) => ({
  type: 'SIGN_IN',
  payload,
});
