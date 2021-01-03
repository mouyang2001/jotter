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
  axios.get(`/note/${noteId}/like`)
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

const deleteNote = (noteId) => (dispatch) => {
  axios.delete(`/note/${noteId}`)
    .then(() => {
      dispatch({type: 'DELETE_NOTE', payload: noteId})
    })
    .catch(err => console.log(err));
}

const postNote = (newNote) => (dispatch) => {
  dispatch({type: 'LOADING_UI'});
  axios.post('/note', newNote)
    .then(res => {
      dispatch({
        type: 'POST_NOTE',
        payload: res.data
      });
      dispatch({type: 'CLEAR_ERRORS'});
    })
    .catch(err => {
      dispatch({
        type: 'SET_ERRORS',
        payload: err.response.data
      })
    });
}

const dataActions = {
  getNotes,
  likeNote,
  unlikeNote,
  deleteNote,
  postNote
}

export default dataActions;