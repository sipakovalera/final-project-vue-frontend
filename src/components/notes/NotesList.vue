<template>
  <div class="note-container">
    <note-create></note-create>
    <ul v-if="notesList.length > 0">
      <note-item
        v-for="note in notesList"
        :key="note.id"
        :id="note.id"
        :title="note.title"
        :describe="note.describe"
        :role="note.role"
      ></note-item>
    </ul>
    <ul v-else class="empty-list">
      Please, create a note!
    </ul>
  </div>
</template>

<script>
import NoteItem from "./NoteItem.vue";
import NoteCreate from "./NoteCreate.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    NoteItem,
    NoteCreate
  },
  computed: {
    ...mapGetters("notes", ["notesList"])
  }
};
</script>

<style scoped>
button {
  display: block;
  margin: auto;
}
ul {
  list-style: none;
  max-width: 100%;
  padding: 0;
  width: 40%;
}
.note-container {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  padding: 50px 0;
}
.empty-list {
  font-size: 20px;
  font-weight: 700;
  color: rgba(74, 44, 20, 0.667);
  margin: 150px 0;
}
</style>
