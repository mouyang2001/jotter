import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, TEST} from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: []
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      }
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authneticated: true,
        ...action.payload
      };
    case TEST:
      return {
        foo: 'HELLO WORLD'
      }
    default:
      return state;
  }
}

export default userReducer;