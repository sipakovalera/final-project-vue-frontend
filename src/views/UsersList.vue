<template>
  <div class="users-container">
      <p>Search users</p>
      <div class="user-select">
        <div class="sort">
          <button @click="sort(sortName)">
            <i class="fas fa-sort-alpha-down fa-2x"></i>
          </button>
          <button class="select-btn" @click="sort(sortId)">new</button>
        </div>
        <div class="filter">
          <label for="avatar">with photo</label>
          <input type="checkbox" v-model="checked" @click="selectAvatar"/>
        </div>
      </div>
      <div class="user-row">
        <user-item
          v-for="user in users.users" 
          :key="user.id" 
          :id="user.id"
          :name="user.name"
          :login="user.login"
          :avatar="user.avatar"
          >
        </user-item>
      </div>
      <pagination 
        :totalPages="totalPages" 
        :limit="limit" 
        @change-page="getResults"
      ></pagination>
    </div>  
</template>

<script>
import UserItem from '../components/users/UserItem.vue';
import Pagination from '../components/users/Pagination.vue';
import { getUsers, sortUsers, selectAvatar } from '../services/api';

export default {
  components: { 
    UserItem,
    Pagination
  },
  data() {
    return { 
      users: [],
      limit: 4,
      currentPage: 1,
      totalPages: 0,
      sortName: 'name',
      sortId: 'last',
      filter: 'avatar',
      checked: false
    }
  },
  "name": "users-list",
  mounted() {
    this.getResults()
  },
  methods: {
    async getResults(pageNumber) {
      try {
        this.currentPage = pageNumber;
        const result = await getUsers(this.currentPage, this.limit)
        this.users = result.data
        this.totalPages = result.data.totalPages
      }
      catch {
        console.log('error allUsers')
      }
    },
    async sort(sortType) {
      try {
        const result = await sortUsers(this.currentPage, this.limit, sortType)
        this.users = result.data
        this.totalPages = result.data.totalPages
      }
      catch {
        console.log('error sortUsers') 
      }
    },
    async selectAvatar() {
      this.checked = !this.checked
      if(this.checked === true) {
        try {
          const result = await selectAvatar(this.currentPage, this.limit, this.filter)
          this.users = result.data
          this.totalPages = result.data.totalPages
        }
        catch {
          console.log('error sortUsers') 
        }
      } else {
        this.getResults()
      }
    } 
  }    
}
</script>

<style scoped>
.user-select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 2px 1px 5px 0px rgba(34, 60, 80, 0.2);
    border-radius: 5px;
    padding: 10px;
    background: #fff;
  }
  .select-btn {
    box-shadow: 2px 1px 5px 0px rgba(34, 60, 80, 0.2);
    border-radius: 5px;
    text-transform: uppercase;
    font-size: 10px;
    padding: 0 10px;
  }
  .sort {
    display: flex;
  }
  button.new-users {
    background: #5c7570;
    padding: 10px 5px;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
  }
  button {
    background: transparent;
    border: none;
    cursor: pointer;
    opacity: .7;
    transition: 0.5s ease;
    font-weight: 700;
  }
  button:hover {
    opacity: 1;
    transition: all 0.5s ease;
  }
  label {
    font-size: 12px;
    font-weight: 700;
    color: rgb(54, 54, 54);
    padding: 0 5px;
    text-transform: uppercase;
  }
  .filter {
    padding: 0 10px;
  }
  input {
    cursor: pointer;
  }
  button i {
    box-shadow: 2px 1px 5px 0px rgba(34, 60, 80, 0.2);
    padding: 5px 10px;
    border-radius: 5px;
    color: rgb(54, 54, 54);
  }
</style>
