<template>
  <div>
    <div class="first-login" v-if="registration">
      <p>Hey, Welcome to our team!</p>
      <p>You are registered successfully</p>
      <button @click="firstLogin()">Login</button>
    </div>
    <Form  @submit.prevent="signup" v-slot="{ errors }" v-if="!registration">
      <div class="card-content">
        <span class="card-title">Sign up</span>
        <div class="input-field">
          <Field 
            id="name" 
            type="text" 
            name="fieldName" 
            autocomplete="username"
            v-model="newName"
            :rules="isRequired" 
          />
          <label for="name">Name</label>
          <p>{{ errors.fieldName }}</p> 
        </div>
        <div class="input-field">
          <Field 
            id="login" 
            type="email" 
            autocomplete="email"
            name="fieldLogin" 
            v-model="newLogin"
            :rules="isLogin" 
          />
          <label for="login">Email</label>
          <p>{{ errors.fieldLogin }}</p> 
        </div>
        <div class="input-field">
          <Field 
            id="password" 
            type="password" 
            autocomplete="new-password"
            name="fieldPassword" 
            v-model="newPassword"
            :rules="isRequired" 
          />
          <label for="password">Password</label>
          <p>{{ errors.fieldPassword }}</p>
        </div>
        <div class="input-field">
          <Field 
            id="password-confirm" 
            type="password" 
            autocomplete="new-repeat-password"
            name="fieldRConfirm" 
            v-model="password_confirmation"
            :rules="isCorrect" 
          />
          <label for="password-confirm">Confirm Password</label>
          <p>{{ errors.fieldRConfirm }}</p>
        </div>
      </div>
      <div class="card-action">
        <div>
          <button type="submit" @click="signup(newName, newLogin, newPassword)">
            Sign up!
          </button>
        </div>
        <p class="center">
          <router-link to="/login">
            If you're already a member, Login
          </router-link>
        </p>
      </div>
    </Form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Form, Field } from 'vee-validate';

export default {
  components: {
    Form,
    Field,
  },
  data(){
    return {
      newName : "",
      newLogin : "",
      newPassword : "",
      password_confirmation : "",
      registration: false
    }
  },
  methods: {
    ...mapActions("auth", ["register"]),
    signup() {
      this.register({
        name: this.newName,
        login: this.newLogin,
        password: this.newPassword
      })
      .then(() => this.registration = true)
      .catch(err => console.log(err));
    },
    firstLogin() {
      this.$router.push("/login")
    },
    isRequired(value) {
      if(!value){
        return "This field is required"
      }
      if(value.length < 4) {
        return "This field is too short, add more than 4 symbols"
      } else return true
    },
    isLogin(value) {
      if (!value) {
        return 'This field is required';
      }
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'This field must be a valid email';
      }
      return true;
    },
    isCorrect(value) {
      if(!value) {
        return "This field is required"
      }
      if(value !== this.newPassword) {
        return "Invalid password"
      } 
      if(value.length < 8) {
        return "This field is too short, add more than 8 symbols"
      }else return true
    },
  }
}
</script>

<style scoped>
  form {
    background-color: #fff;
    padding: 40px;
    border-radius: 5px;
    color: #000;
    font-weight: 400;
    margin: 100px 0;
    box-shadow: 2px 1px 5px 0px rgba(34, 60, 80, 0.2);
  }
  .card-title {
    font-weight: 600;
    display: block;
    padding: 20px 0;
    text-align: center;
    text-transform: uppercase;
    color: #000;
  }
  button {
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin: 15px 0 0 5px;
    padding: 0.5rem 1.2rem;
    border: none;
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
  .first-login p:first-child{
    font-size: 40px;
    color: #000;  
  }
  .first-login p:nth-child(2){
    color: #000;
    font-weight: 400;
    font-size: 20px;
  }
  .first-login{
    margin: 150px 0 260px 0;
  }
  .first-login button{
    display: block;
    margin: 40px auto;
    padding: 10px 30px;
  }
</style>
