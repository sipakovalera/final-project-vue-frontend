<template>
  <div class="friend-box">
    <div class="item-friend" @click="showModal">
    <img :src="`http://localhost:3000/upload/${avatar}`">
  </div>
  <div class="modal" v-if="modal">
    <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header">
                <slot name="header">
                  contact <span>{{ name }}</span>
                </slot>
              </div>
              <div class="modal-body">
                <slot name="body">
                  <div class="friend-info">
                    <span>email: {{login}}</span>
                  </div>
                  <div class="friend-btn">
                    <button>send message</button>
                    <button class="delete-friend" @click="removeFriend(id)">delete</button>
                  </div>
                </slot>
              </div>
              <div class="modal-footer">
                <slot name="footer">
                  <button class="modal-default-button" @click="closeModal">
                    <i class="far fa-times-circle fa-lg"></i>
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
  </div>
  </div>
</template>

<script>
import { deleteFriend } from '../../services/api';
export default {
  props:{
    avatar: String,
    name: String,
    login: String,
    id: Number
  },
  data(){
    return {
      modal: false
    }
  },
  methods: {
    async removeFriend(id){
      deleteFriend(id)
      this.closeModal()
      alert('You deleted friend!')
    },
    showModal(){
      this.modal = true
    },
    closeModal(){
      this.modal = false
    }
  },
}
</script>

<style scoped>
  .item-friend img{
    height: 100px;
    width: auto;
  }
  .item-friend{
    width: 70px;
    height: 70px;
    border-radius: 5px;
    box-shadow: 1px 1px 5px -1px rgba(34, 60, 80, 0.2);
    background-color: rgba(204, 204, 204, 0.32);
    overflow: hidden;
    margin: 5px 5px;
    cursor: pointer;
  }
  img:hover{
    opacity: 0.8;
    height: 120px;
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

  .modal-header{
    font-size: 14px;
    color: #ccc;
    text-align: start;
    text-transform: uppercase;
  }

  .modal-header span{
    color: #000;
  }
  .modal-body {
    margin: 20px 0 0 0;
  }

  .modal-body span{
    padding: 0 10px;
  }
  .modal-default-button {
    margin: right;
    border: none;
    background: transparent;
    cursor: pointer;
  }

  .modal-default-button i{
    color: #feae51;
    transition: 0.5s ease;
  }

  .modal-default-button i:hover{
    color: #98b2d1;
    transition: all 0.5s ease;
  }

  .modal-enter {
    opacity: 0;
  }

  .friend-btn button{
    border: none;
    box-shadow: 1px 1px 5px -1px rgba(34, 60, 80, 0.2);
    color: #fff;
    padding: 5px 10px;
    background: #98b2d1;
    margin: 10px 5px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.5s ease;
    width: 120px;
  }

  .friend-btn button:hover{
    transition: all 0.5s ease;
    background: rgb(167, 213, 4);
  }
  button.delete-friend:hover{
    background-color: tomato;
  }
  .modal-footer{
    display: block;
    text-align: right;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    transform: scale(1.1);
  }

</style>
