<template>
  <div>
    <nav-link/>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import NavLink from "./components/navigation/NavLink";
export default {
  components: {
    NavLink
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  font-family: sans-serif;
}
body {
  margin: 0;
  background-color: rgba(241, 248, 247, 0.4);
}
#app {
  font-family: "Montserrat", sans-serif;
}
main {
  display: flex;
  justify-content: center;
  background-image: url(../static/img/background74.jpg);
  background-position: center;
  background-size: cover;
  padding: 30px 0;
}
button,
button:active,
button:focus {
  outline: none;
}
p{
  font-size: 18px;
  color: #000;
  font-weight: 700;
  text-align: center;
}
</style>
