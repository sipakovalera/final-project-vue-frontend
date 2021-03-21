<template>
  <Form @submit.prevent="loginUser" v-slot="{ errors }">
    <div class="card-content">
      <span class="card-title">Sign in</span>
      <div class="input-field">
        <Field 
          id="login" 
          type="text" 
          name="fieldLogin"
          autocomplete="username"
          v-model="currentLogin" 
          :rules="validateLogin"
        />
        <label for="email">Email</label>
        <p class="errors">{{errors.fieldLogin}}</p>
      </div>
      <div class="input-field">
        <Field
          id="password" 
          type="password"
          autocomplete="current-password"
          name="fieldPassword"
          v-model="currentPassword" 
          :rules="validatePassword"
        />
        <label for="password">Password</label>
        <p class="errors">{{errors.fieldPassword}}</p>
      </div>
    </div>
    <p v-if="!signIn">Error! Not valid login or password</p>
    <div class="card-action">
      <div>
        <button 
          @click="loginUser(currentLogin, currentPassword)"
        >Login</button>
      </div>
      <p class="center">
        <router-link to="/register">
          Need an account? Sign up now!
        </router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import { Form, Field } from 'vee-validate';

export default {
   components: {
        Form,
        Field,
    },
  data(){
      return {
        currentLogin : "",
        currentPassword : "",
        signIn: true
      }
    },
    name: "login",
    methods: {
      ...mapActions("auth", ["login"]),
      loginUser() {
        this.login({
          login: this.currentLogin,
          password: this.currentPassword
          })
        try {
          this.$router.push("/profile")
        }
        catch {
          this.signIn = false
        }
      },
      validatePassword(value) {
        if(!value){
          return "Type your password"
        }
        if(value.length < 4){
          return "This password too short"
        } else return true
      },
      validateLogin(value) {
        if (!value) {
          return 'Type your email';
      }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          return 'This field must be a valid email';
        }
      return true;
    }
  }
}
</script>

<style scoped>
  form {
    background-color: #fff;
    padding: 50px;
    border-radius: 5px;
    color: #000;
    font-weight: 400;
    margin: 100px 0 150px 0;
    box-shadow: 2px 1px 5px 0px rgba(34, 60, 80, 0.2);
  }
  .card-title {
    font-weight: 600;
    display: block;
    padding: 20px 0;
  }
  button {
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin: 15px 0 0 5px;
    padding: 0.5rem 1.2rem;
    border: none;
    color: #fff;
    box-shadow: 2px 1px 5px 0px rgba(34, 60, 80, 0.2);
    background-color: #feae51;
    transition: 0.5s ease;
    opacity: 0.6;
  }
  button:hover,
  button:active {
    color: #384744;
    background-color: #98b2d1;
    opacity: 0.6;
    border-radius: 5px;
    color: #fff;
    opacity: 0.6;
    transition: all 0.5s ease;
  }
  a {
    color: #384744;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  label {
    padding: 20px;
    font-weight: 600;
    color: #092a3682;
    font-size: 14px;
  }
  input {
    margin: 5px;
    padding: 3px;
    width: 170px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.605);
  }
  p {
    font-size: 12px;
    padding: 0 10px;
    color: rgb(169, 12, 12);
  }
</style>
