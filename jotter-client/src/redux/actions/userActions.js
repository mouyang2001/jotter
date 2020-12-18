import axios from '../../util/axios';

const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: "LOADING_UI" });
  axios
    .post("/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({type: 'CLEAR_ERRORS'});
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: "SET_ERRORS",
        payload: err.response.data,
      });
    });
}

const getUserData = () => (dispatch) => {
  dispatch({type: 'LOADING_USER'});
  axios.get('/user')
    .then(res => {
      console.log(res);
      dispatch({
        type: 'SET_USER',
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err)
    });
}

const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: "LOADING_UI" });
  axios
    .post("/signup", newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: "CLEAR_ERRORS" });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: "SET_ERRORS",
        payload: err.response.data,
      });
    });
};

const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: "SET_UNAUTHENTICATED" });
}

const uploadImage = (formData) => (dispatch) => {
  dispatch({type: 'LOADING_USER'});
  axios.post('/user/image', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
}

// helper functions
const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
}

const userActions = {
  loginUser,
  getUserData,
  signupUser,
  logoutUser,
  uploadImage
}

export default userActions;