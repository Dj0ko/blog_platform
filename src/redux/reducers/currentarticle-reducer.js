const currentArticleReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_ARTICLE':
      return action.payload;

    default:
      return state;
  }
};

export default currentArticleReducer;
