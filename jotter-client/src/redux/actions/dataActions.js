import axios from "../../util/axios";

// get all notes
const getNotes = () => (dispatch) => {
  dispatch({ type: "LOADING_DATA" });
  axios.get('/notes')
    .then(res => {
      dispatch({
        type: "SET_NOTES",
        payload: res.data,
      })
    })
    .catch(err => {
      dispatch({
        type: 'SET_NOTES',
        payload: [],
      })
    });
}

const likeNote = (noteId) => (dispatch) => {
  axios.get(`/notes/${noteId}/like`)
    .then(res => {
      dispatch({
        type: 'LIKE_NOTE',
        payload: res.data
      });
    })
    .catch(err => console.log(err));
}

const unlikeNote = (noteId) => (dispatch) => {
  axios.get(`/note/${noteId}/unlike`)
    .then(res => {
      dispatch({
        type: 'UNLIKE_NOTE',
        payload: res.data
      });
    })
    .catch(err => console.log(err));
}

const dataActions = {
  getNotes,
  likeNote,
  unlikeNote
}

export default dataActions;