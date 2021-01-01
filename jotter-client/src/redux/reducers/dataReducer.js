const initialState = {
  notes: [],
  note: {},
  loading: false
}

const dataReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOADING_DATA':
      return {
        ...state,
        loading: true
      }
    case 'SET_NOTES':
      return {
        ...state,
        notes: action.payload,
        loading: false
      }
    case 'LIKE_NOTE':
    case 'UNLIKE_NOTE':
      let index = state.notes.findIndex((note) => note.noteId === action.payload.noteId);
      state.notes[index] = action.payload;
      return {
        ...state
      }
    case 'DELETE_NOTE':
      let deleteIndex = state.notes.findIndex((note) => note.noteId === action.payload);
      state.notes.splice(deleteIndex, 1);
      return {
        ...state
      }
    default: 
      return state;
  }
};

export default dataReducer;