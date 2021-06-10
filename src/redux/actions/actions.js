export const articlesFetchDataSuccess = (articles) => ({
  type: 'ARTICLES_FETCH_DATA_SUCCESS',
  articles,
});

export const changePage = (page) => ({
  type: 'CHANGE_PAGE',
  page,
});
