import axios from '../../util/axios';

const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: "LOADING_UI" });
  axios
    .post("/login", userData)
    .then((res) => {
      // get & store token
      console.log(res);
      const FBIdToken = `Bearer ${res.data.token}`;
      localStorage.setItem("FBIdToken", FBIdToken);
      axios.defaults.headers.common['Authorization'] = FBIdToken;
      dispatch(getUserData());
      dispatch({type: 'CLEAR_ERRORS'});
      history.push("/");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: 'SET_ERRORS',
        payload: err
      });
    });
}

const getUserData = () => (dispatch) => {
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

const userActions = {
  loginUser,
  getUserData
}

export default userActions;