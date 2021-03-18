<template>
  <div>
    <item-friend
      v-for="friend in friends"
      :key="friend"
      :id="friend.id"
      :avatar="friend.avatar"
      :name="friend.name"
      :login="friend.login"
    >
    </item-friend>
  </div>
</template>

<script>
import { getFriend } from '../../services/api';
import ItemFriend from './ItemFriend.vue';

export default {
  components: {
    ItemFriend
  },
  props: {
    friendId: Number
  },
  data() {
    return {
      friends: []
    }
  },
  "name": "user-friends",
  mounted() {
    getFriend({friendId: this.friendId})
    .then(response => {this.friends = response.data})
      .catch(() => {
        console.log('Not found user')
    });
  }
}
</script>

<style scoped>
  p{
    color: black;
  }
</style>

