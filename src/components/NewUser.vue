<template>
  <div>
    <form @submit.prevent="cadastrar()">
      <label>E-mail</label>
      <input type="email" id="email" placeholder="E-mail" />

      <label>Password</label>
      <input type="password" id="password" placeholder="Password" />

      <label>Username</label>
      <input type="text" id="username" placeholder="Username" />

      <input type="submit" value="Send"/>
    </form>
  </div>
</template>

<script>
export default {
    methods: {
      cadastrar(){
          let email = document.querySelector("#email").value;
          let password = document.querySelector("#password").value;
          let username = document.querySelector("#username").value;

          let user = {
              email,
              password,
              username
          }

          this.$http.post("http://localhost:7000/v1/user", user)
          .then(res => res.json())
          .then(login => {
              let logado = {
                  email,
                  password
              }

              this.$http.post("http://localhost:7000/v1/login", logado)
              .then(res => res.json())
              .then(auth => {
                  localStorage.setItem("auth", auth.auth);
                  localStorage.setItem("token", `Bearer ${auth.token}`);
              }) 
          })
      }
  }
};
</script>

<style scoped>
</style>