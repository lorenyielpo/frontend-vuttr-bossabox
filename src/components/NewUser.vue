<template>
  <div>
    <form @submit.prevent="signUp()" class="form">
      <h2>Sign Up</h2>
      <label>E-mail</label>
      <input type="email" id="email" placeholder="E-mail" required />

      <label>Password</label>
      <input type="password" id="password" placeholder="Password" required />

      <label>Username</label>
      <input type="text" id="username" placeholder="Username" required />

      <my-button styleBtn="default" content="Sign in" />
    </form>
  </div>
</template>

<script>
import MyButton from "./MyButton.vue";
export default {
  components: {
    "my-button": MyButton
  },
  methods: {
    signUp() {
      let email = document.querySelector("#email").value;
      let password = document.querySelector("#password").value;
      let username = document.querySelector("#username").value;

      let user = {
        email,
        password,
        username
      };

      this.$http
        .post("http://localhost:3000/v1/user", user)
        .then(res => res.json())
        .then(user => {
          let loged = {
            email,
            password
          };

          this.$http
            .post("http://localhost:3000/v1/login", loged)
            .then(res => res.json())
            .then(auth => {
              localStorage.setItem("auth", auth.auth);
              localStorage.setItem("token", `Bearer ${auth.token}`);
              location.reload();
            });
        });
    }
  }
};
</script>

<style scoped>
</style>