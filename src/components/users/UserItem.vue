<template>
  <div class="user-container">
    <div class="user-item">
    <div class="user-item-main">
      <div class="user-avatar">
        <img :src="`http://localhost:3000/upload/${avatar}`" alt="">
      </div>
      <div class="user-information">
        <div class="user-title">{{name}}</div>
        <div class="user-email">{{login}}</div>
      </div>
    </div>
      <div class="users-btn">
        <button type="button" @click="addUser(id)" class="add-btn" v-show="!friendship" >Add friend</button>
        <button type="button" @click="addUser(id)" class="added-btn" v-show="friendship">Added</button>
        <button type="button" class="send-btn" @click="openModal">Send message</button>
      </div>
      <div class="modal" v-if="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
            </div>
            <div class="modal-body">
              <span>message to: <strong>{{name}}</strong></span>
              <textarea name=""></textarea>
              <button type="button" @click="sendMessage" class="btn-send">Send</button>
            </div>
            <div class="modal-footer">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { addFriend } from '../../services/api';
import { mapGetters } from 'vuex';

export default {
  props: {
    id: Number,
    name: String,
    login: String,
    avatar: String
  },
  "name": "user-item",
  data() {
    return {
      friendship: false,
      modal: false
    }
  },
   computed: {
    ...mapGetters("auth", ["userId"])
  },
  methods: {
    async addUser(id) {
      try {
        this.friendship = true;
        return await addFriend(this.userId, {userId: this.userId, friendId: id})
      }
      catch {
        console.log('error addUser')
      }
    },
    openModal() {
      this.modal = true
      console.log('ok')
    },
    sendMessage() {
      this.modal = false
    }
  },
}
</script>

<style scoped>
  .user-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    width: 500px;
    background: #fff;
    border-radius: 5px;
  }
  .user-item-main {
    display: flex;
    align-items: center;
    width: 70%;
  }
  .user-container {
    border-radius: 5px;
    box-shadow: 2px 1px 5px 0px rgba(34, 60, 80, 0.2);
    margin: 10px 0;
  }
  .user-title {
    font-size: 18px;
    font-weight: 600;
    color: #3b4a47;
  }
  .user-avatar {
    width: 100px;
    height: 100px;
    border-radius: 5px;
    box-shadow: 2px 1px 5px 0px rgba(34, 60, 80, 0.2);
    background-color: rgba(204, 204, 204, 0.32);
    text-align: center;
  }
  img{
    width: 100%;
    height: 100px;
  }
  .user-information {
    text-align: start;
    margin: 0 10px;
  }
  button {
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    box-shadow: 2px 1px 5px 0px rgba(34, 60, 80, 0.2);
    background-color: #5c75705f;
    cursor: pointer;
    opacity: .6;
    transition: 0.5s ease;
  }
  button.send-btn:hover {
    background-color: rgb(167, 213, 4);
    color: #fff;
    opacity: 0.8;
  }

  .btn-send:hover {
    background-color: #98b2d1;
    color: #fff;
    transition: all 0.5s ease;
  }
  strong {
    color: #fff;
    background-color: #98b2d1;
    padding: 5px 10px;
    border-radius: 5px;
  }
   /*Modal*/
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  .modal-container {
    width: 400px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
  .modal-header {
    font-size: 14px;
    color: #ccc;
    text-align: start;
    text-transform: uppercase;
  }
  .modal-header span {
    color: #000;
  }
  .modal-body {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
  }
   textarea {
    resize: none;
    min-height: 100px;
    margin: 10px 0;
    border: 2px solid #ccc;
    border-radius: 5px;
  }
   button.add-btn:hover {
    background-color: #feae51;
    color: #fff;
    opacity: 0.8;
  }
  button.added-btn {
    background-color: rgb(167, 213, 4);
    opacity: 0.8;
    color: #fff;
  }
  .users-btn button {
    width: 120px;
    margin: 5px 0;
  }
  .users-btn {
    width: 30%;
  }
</style>
