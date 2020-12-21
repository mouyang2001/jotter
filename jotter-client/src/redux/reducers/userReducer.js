const initialState = {
  authenticated: false,
  credentials: {},
  loading: false,
  likes: [],
  notifications: [],
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_AUTHENTICATED':
      return {
        ...state,
        authenticated: true
      }
    case 'SET_UNAUTHENTICATED':
      return initialState;
    case 'SET_USER':
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case 'LOADING_USER':
      return {
        ...state,
        loading: true
      }
    case 'LIKE_NOTE':
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            useHandle: state.credentials.handle,
            noteId: action.payload.noteId
          }
        ]
      }
    case 'UNLIKE_NOTE':
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.noteId === action.payload.noteId
        )
      };
    default:
      return state;
  }
}

export default userReducer;