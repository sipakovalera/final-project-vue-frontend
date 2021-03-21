<template>
  <li>
    <h2>
      <span>
        <input type="text" :value="title" @click="toggleInput" />
      </span>
      <span @click="editNote(title, id)" v-if="toggleAreVisible">
        <i class="far fa-check-circle"></i>
      </span>
      <span class="delete" @click="deleteNote(id)">
        <i class="far fa-trash-alt" id="delete"></i>
      </span>
    </h2>
    <div class="btn-group">
      <div class="role" :class="roleClass">{{ role }}</div>
      <button @click="toggleDetails" class="details">
        {{ detailsAreVisible ? "Hide" : "Show" }} Details
      </button>
    </div>
    <ul v-if="detailsAreVisible">
      <li>
        <strong>Description:</strong>
        <input 
          type="text" 
          :value="describe" 
          @click="toggleInput" 
        />
        <span @click="editNote(describe, id)" v-if="toggleAreVisible">
          <i class="far fa-check-circle"></i>
        </span>
      </li>
    </ul>
  </li>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    id: String,
    title: String,
    describe: String,
    role: String
  },
  name: "noteItem",
  data() {
    return {
      detailsAreVisible: false,
      toggleAreVisible: false
    };
  },
  computed: {
    roleClass() {
      if (this.role === "Important") {
        return "role--important";
      }
      if (this.role === "Irrelevant") {
        return "role--irrelevant";
      }
      return null;
    }
  },
  methods: {
    ...mapActions("notes",["noteEdit", "noteDelete"]),
    editNote(newTitle, newDescribe, id) {
      this.toggleAreVisible = !this.toggleAreVisible;
      if (newTitle) {
        this.noteEdit({ id: id, title: newTitle });
      }
      if (newDescribe) {
        this.noteEdit({ id: id, describe: newDescribe });
      }
    },
    deleteNote(id) {
      this.noteDelete(id);
    },
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },
    toggleInput() {
      this.toggleAreVisible = !this.toggleAreVisible;
    }
  }
};
</script>

<style scoped>
  li {
    margin: 1rem 0;
    box-shadow: 2px 1px 5px 0px rgba(34, 60, 80, 0.2);
    padding: 1rem;
    border-radius: 5px;
    max-width: 400px;
    list-style-type: none;
    background-color: #fff;
  }
  #delete {
    color: #4b514a;
    transition: 0.5s ease;
  }
  #delete:hover {
    transition: all 0.5s ease;
    color: #ba3333;
  }
  input {
    border-radius: 5px;
    box-shadow: 2px 1px 5px 0px rgba(34, 60, 80, 0.2);
    border: none;
    padding: 5px;
    width: 258px;
  }
  i {
    padding: 5px;
    vertical-align: middle;
    color: rgb(168, 208, 168);
    cursor: pointer;
  }
  h2 {
    display: flex;
    justify-content: space-between;
  }
  h3 {
    margin: 0.5rem 0;
  }
  .role,
  button {
    border-radius: 5px;
    color: #252525;
    padding: 0.25rem 1rem;
    display: inline-block;
    font-size: 16px;
    background-color: #68d89e;
    color: white;
    box-shadow: 2px 1px 5px 0px rgba(34, 60, 80, 0.2);
  }
  .role--important {
    background-color: #e26e95;
    box-shadow: 2px 1px 5px 0px rgba(34, 60, 80, 0.2);
    color: white;
  }
  .role--irrelevant {
    background-color: #68d89e;
    color: white;
    box-shadow: 2px 1px 5px 0px rgba(34, 60, 80, 0.2);
  }

  button.details {
    box-shadow: 2px 1px 5px 0px rgba(34, 60, 80, 0.2);
    border: none;
    background-color: #e4d7d7;
    margin-left: 20px;
    cursor: pointer;
    transition: 0.5s ease;
    opacity: 0.7;
  }
  button.details:hover {
    transition: all 0.5s ease;
    background: #98b2d1;
  }
  .btn-group {
    display: flex;
    justify-content: space-between;
  }
</style>
