<template>
  <div class="profile-item">
    <h2>Hello, {{ user.name }}</h2>
    <div class="profile-container">
      <div class="profile-box">
        <div class="avatar">
          <form @submit.prevent="updateFile(user.id, avatar)" enctype="multipart/form-data" class="upload">
            <div class="picture item" v-if="user.avatar">
              <div class="avatar-active">
                <img :src="`http://localhost:3000/upload/${user.avatar}`">
                <span @click="removeAvatar(user.id, null)">X</span>
              </div>
            </div>
            <div class="upload-avatar" v-else>
              <input ref="file" @change="selectFile" type="file" class="upload-avatar"/>
              <button class="upload-btn">Upload photo</button>
            </div>
          </form>
        </div>
        <div class="title-friends">
          <p>Friends</p>
        </div>
        <div class="friends">
          <user-friends
            v-for="friend in friends" 
            :key="friend.id" 
            :friendId="friend.friendId"
          >
          </user-friends>
        </div>
      </div>
      <div class="profile-changes">
        <div class="profile-bio">
          <div class="profile-status">
            <span>Status</span>
            <input type="text">
          </div>
          <div class="profile-info">
            <span>Bio</span>
            <textarea name="bio" id="bio"></textarea>
          </div>
        </div>
        <div class="profile-settings">
          <p>Settings</p>
          <button @click="visibleDetails">{{ details ? "Hide" : "Change"}}</button>
          <div class="edit-user" v-show="details">
            <form action="">
              <div class="edit-name">
                <label for="name">Name: 
                  <span>{{user.name}}</span>
                </label>
                <input 
                  type="text" 
                  placeholder="New name" 
                  autocomplete="username"
                  v-model="newName"
                />
                <button 
                  class="edit" 
                  type="button" 
                  @click="updateName(user.id, newName)"
                >Change</button>
              </div>
              <div class="edit-email">
                <label for="name">Email: 
                  <span>{{user.login}}</span>
                </label>
                <input 
                  type="email" 
                  placeholder="New email" 
                  autocomplete="email"
                  v-model="newLogin"
                />
                <button 
                  class="edit" 
                  type="button" 
                  @click="updateEmail(user.id, newLogin)"
                >Change</button>
                <p>Warning! Your email is login</p>
              </div>
              <div class="edit-password">
                <label for="password">Password:</label>
                <input 
                  type="password" 
                  autocomplete="new-password"
                  placeholder="New password" 
                  v-model="newPassword"
                />
                <button 
                  class="edit" 
                  type="button" 
                  @click="updatedPassword(user.id, newPassword)"
                >Change</button>
              </div>
            </form>
          </div>
          <div class="delete-container">
            <button id="delete-btn" @click="removeVisible">Delete account</button>
            <div group-btn id="remove-btn" v-show="remove">
              <p>Do you want delete your account?</p>
              <p><strong>You cannot return it.</strong></p>
              <button id="delete-btn" @click="deleteAccount(user.id)">Yes</button>
           </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addAvatar, currentUser, updateUser, deleteUser, getFriends, updatePassword } from '../../services/api';
import { mapActions, mapGetters } from 'vuex';
import UserFriends from '../friends/UserFriends.vue'

export default {
  components:{
    UserFriends
  },
  data(){
    return {
      user: {},
      friends: [],
      newName: "",
      newLogin: "",
      newPassword: "",
      avatar: ""
    }
  },
  computed: {
    ...mapGetters("notes", ["details", "remove"]),
     ...mapGetters("auth", ["userId"])
  },
  mounted() {
    this.createProfile()
  },
  methods: {
    ...mapActions("notes", ["detailsVisible", "deleteVisible"]),
    ...mapActions("auth", ["logout"]),
    async createProfile(){
      try {
        const profile = await currentUser(this.userId);
        this.user = profile.data;
        const friends = await getFriends(this.userId);
        this.friends = friends.data;
      }
      catch {
        console.log('Not found info')
      }
    },
    async deleteAccount(id) {
      deleteUser(id);
      localStorage.clear();
      await this.logout();
      await this.$router.push('/login');
    },
    async updateName(id, data) {
      try{
        await updateUser(id, {name: data}); 
        this.newName = data;
        alert(`You changed name: ${data}`)
        this.newName = "";
        this.createProfile();
      } 
      catch {
        alert('This field is empty or less than 4 characters')
      }
    },
    async updateEmail(id, data) {
      try {
        this.newLogin = data;
        await updateUser(id, {login: data}); 
        alert(`You changed login: ${data}`)
        this.newLogin = "";
        this.createProfile();
      }
      catch {
        alert("This field must be a valid email")
      }
    }, 
    async updatedPassword(id, data) {
      try {
        await updatePassword(id, {password: data});
        alert(`You changed password`)
        this.newPassword = "";
        this.createProfile();
      }
      catch {
        alert("Invalid password! Field must be more than 4 characters ")
      }
    },
    async removeAvatar(id, data) {
      try {
        await updateUser(id, {avatar: data});
        alert(`You deleted avatar`);
        this.createProfile();
      }
      catch {
        alert("Error delete avatar")
      }
    },
    async updateFile(id, avatar) {
      const formData = new FormData();
      formData.append('avatar', avatar);
      try {
        await addAvatar(id, formData)
        this.createProfile()
      }
      catch{
        alert('error upload')
      }
    },
    selectFile() {
      this.avatar = this.$refs.file.files[0];
    },
    visibleDetails() {
      this.detailsVisible()
    },
    removeVisible() {
      this.deleteVisible()
    },
  }
}
</script>

<style scoped>
  input,
  textarea {
    width: 200px;
    padding: 5px 10px;
    border-radius: 5px;
    margin: 0 10px;
    border: none;
    background: transparent;
    box-shadow: 2px 1px 5px 0px rgba(34, 60, 80, 0.2);
  }
  textarea {
    resize: none;
    margin: 0 35px;
  }
  textarea, input
  :focus-visible,
  :focus, 
  :active {
    outline: none;

  }
  label {
    font-weight: 600;
    color:rgb(110, 117, 117);
    font-size: 16px;
    display: block;
    margin: 10px 0;
  }
  label span {
    color:#333a44;
    font-size: 18px;
    padding: 0 10px;
  }
  .profile-info {
   margin: 20px 0; 
  }
  button {
    padding: 7px 70px;
    border-radius: 5px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    margin: 5px 0; 
    transition: 0.5s ease;
    background: #fff;
    box-shadow: 2px 1px 5px 0px rgba(34, 60, 80, 0.2);
  }
  form {
    text-align: center;
  }
  button.upload-btn {
    border-radius: 5px;
    widows: 100px;
    padding: 5px 10px;
    margin: 10px 0;
  }
  button.edit {
    width: 100px;
    background: #feae51;
    padding: 4px;
    color: #fff;
    opacity: 0.6;
  }
  button.edit:hover {
    opacity: 1;
    color: #fff;
    background: #98b2d1;
  }
  input:focus,
  textarea:focus,
  input:active,
  textarea:active {
    transition: all 0.5s ease;
  }
  .edit-email p {
    font-size: 12px;
    color: #a92525;
    font-weight: 400;
    text-align: center;
  }
  .title-friends {
    width: 100%;
    padding: 10px 0;
    margin: 10px 0;
  }
  .title-friends p {
    margin: 0;
  }
  .friends {
    display: flex;
    margin: 10px;
    width: 250px;
    flex-wrap: wrap;
  }
  img {
    width: 100%;
  }
  .item {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .picture {
    width: 250px;
    height: 250px;
  }
  h2 {
    text-align: center;
    color: rgb(19, 46, 37);
  }
  .edit-email {
    margin: 25px 0;
  }
  .profile-item {
    width: 100%;
  }
  .profile-container {
    display: flex;
    justify-content: center;
    padding: 15px 0 65px 0;
  }
  .edit-user {
    margin: 20px 0;
  }
  .avatar {
    width: 250px;
    height: 250px;
    display: flex;
  }
  .profile-box,
  .profile-changes, 
  .profile-bio,
  .profile-settings {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .profile-settings {
    display: flex;
    align-items: normal;
  }
  .profile-changes {
    margin: 0 20px;
    width: 30%;
  }
  .profile-bio,
  .profile-settings,
  .profile-friends {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 2px 1px 5px 0px rgba(34, 60, 80, 0.2);
    width: 100%;
  }
  .profile-settings,
  .profile-friends {
    margin: 30px 0;
  }
  .profile-bio p {
    font-size: 14px;
    color: rgb(59, 58, 58);
  }
  .delete-container {
    display: grid;
  }
  .delete-container p {
    font-weight: 600;
    color:rgb(57, 52, 52);
    font-size: 16px;
  }
  button:hover {
    color: #fff;
    background: #98b2d172;
  }
  #remove-btn button {
    display: block;
    margin: 0 auto;
  }
  #remove-btn strong {
    color: #a92525;
  }
  #remove-btn button:hover {
    background: #eca4a4;
    color: rgb(61, 47, 47);
    transition: all 0.5s ease;
  }
  #delete-btn:hover {
    color: #a92525;
    transition: all 0.5s ease;
  }
  .upload-avatar {
    border-radius: 5px;
    border: 2px solid #ccc;
    padding: 47px 14px;
    background-color: #fff;
  }
  input.upload-avatar {
    border: none;
  }
  .avatar-active span {
    position: absolute;
    margin: 10px -25px;
    opacity: 0;
    cursor: pointer;
    color: #fff;
    font-weight: 700;
  }
  .avatar-active {
    width: 250px;
    height: 250px;
  }
  .avatar-active:hover span {
    opacity: 1;
  }
</style>
