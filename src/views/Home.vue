<template>
  <div class="home">
    <p>Social network</p>
    <span class="title-home">You, friends, family</span>
    <div class="join">
      <router-link :to="{ name: 'register'}">Join us!</router-link>
    </div>
  </div>
</template>

<style scoped>
.title-home {
  font-weight: 600;
  font-size: 40px;
}
.home {
  text-align: center;
  padding: 130px 0 320px 0;
}
.join a {
  text-decoration: none;
  color: #384744;
  transition: 0.5s ease;
}
.join {
  margin: 10px 0;
}
a:hover {
  transition: all 0.5s ease;
  color: #feae51;
}
</style>
