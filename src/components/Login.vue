<template>
  <div>
    <form @submit.prevent="logar()">
      <label>E-mail</label>
      <input type="email" id="email" placeholder="E-mail" />

      <label>Password</label>
      <input type="password" id="password" placeholder="Password" />

      <input type="submit" value="Send" />
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    logar() {
      let email = document.querySelector("#email").value;
      let password = document.querySelector("#password").value;

      let logado = {
        email,
        password
      };

      this.$http
        .post("http://localhost:7000/v1/login", logado)
        .then(res => res.json())
        .then(auth => {
          localStorage.setItem("auth", auth.auth);
          localStorage.setItem("token", `Bearer ${auth.token}`);
          location.reload();
        });
    }
  }
};
</script>

<style scoped>
</style>