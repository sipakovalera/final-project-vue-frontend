<template>
  <div class="note-create">
    <form @submit.prevent="addNote(noteTitle, noteDescribe, noteRole)">
      <div>
        <input type="text" v-model="noteTitle" />
        <label>Title</label>
      </div>
      <div>
        <input type="text" v-model="noteDescribe" />
        <label>Description</label>
      </div>
      <div>
        <select name="role" v-model="noteRole">
          <option disabled value="">Choose correct category</option>
          <option value="Important">Important</option>
          <option value="Irrelevant">Irrelevant</option>
        </select>
        <label>Category</label>
      </div>
      <button type="submit" class="add-btn">
        Add
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "user-create",
  data() {
    return {
      noteTitle: "",
      noteDescribe: "",
      noteRole: ["Important", "Irrelevant"]
    };
  },
  methods: {
    ...mapActions("notes", ["noteCreate"]),
    addNote() {
      this.noteCreate({
        title: this.noteTitle,
        describe: this.noteDescribe,
        role: this.noteRole
      });
      this.resetForm();
    },
    resetForm() {
      this.noteTitle = "";
      this.noteDescribe = "";
      this.noteRole = "";
    }
  }
};
</script>

<style scoped>
  .note-create {
    margin: 100px 0;
  }
  form {
    padding: 80px;
    box-shadow: 2px 1px 5px 0px rgba(34, 60, 80, 0.2);
    border-radius: 5px;
    background-color: #fff;
  }
  input,
  select {
    margin: 5px;
    padding: 3px;
    max-width: 250px;
    border-radius: 5px;
    box-shadow: 2px 1px 5px 0px rgba(34, 60, 80, 0.2);
    border: none;
  }
  button {
    padding: 4px 20px;
    width: 175px;
    border-radius: 5px;
    box-shadow: 2px 1px 5px 0px rgba(34, 60, 80, 0.2);
    background-color: #fead516c;
    margin: 10px 5px;
    border: none;
    color: #fff;
    cursor: pointer;
    transition: 0.5s ease;
  }
  button:hover{
    background: #feae51;
    transition: all 0.5s ease;
  }
  .add-btn{
    text-transform: uppercase;
  }
</style>
