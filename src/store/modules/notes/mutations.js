export default {
  addNote: (state, { title, describe, role }) => {
    state.allNotes.unshift({
      id: Date.now() + "",
      title: title,
      describe: describe,
      role: role
    });
  },

  editNote: (state, { title, describe }) => {
    if (title) {
      state.allNotes = state.allNotes.map(el => {
        if (el.id === title.id) {
          return { ...el, title: title };
        }
        return el;
      });
    }
    if (describe) {
      state.allNotes = state.allNotes.map(el => {
        if (el.id === describe.id) {
          return { ...el, describe: describe };
        }
        return el;
      });
    }
  },
  deleteNote: (state, id) => {
    state.allNotes = state.allNotes.filter(note => note.id !== id);
  },
  visibleDetails: (state) => {
    state.detailsAreVisible = !state.detailsAreVisible
  },
  deleteAccount: (state) => {
    state.delete = !state.delete
  }
};
