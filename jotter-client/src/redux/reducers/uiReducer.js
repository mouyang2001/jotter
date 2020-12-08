const initialState = {
  loading: false,
  errors: {}
};

const uiReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_ERRORS':
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        loading: false,
        errors: {}
      };
    case 'LOADING_UI':
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

export default uiReducer;