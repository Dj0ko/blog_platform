const articlesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ARTICLES_FETCH_DATA_SUCCESS':
      return { ...state, ...action.articles };

    case 'NO_ARTICLES':
      return {};

    default:
      return state;
  }
};

export default articlesReducer;
