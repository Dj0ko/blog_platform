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
