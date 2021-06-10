const articlesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ARTICLES_FETCH_DATA_SUCCESS':
      return { ...state, ...action.articles };

    default:
      return state;
  }
};

export default articlesReducer;
