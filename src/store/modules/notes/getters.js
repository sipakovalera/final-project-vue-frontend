export default {
  notesList: state => {
    return state.allNotes;
  },
  details: state => {
    return state.detailsAreVisible
  },
  remove: state => {
    return state.delete
  }
};
