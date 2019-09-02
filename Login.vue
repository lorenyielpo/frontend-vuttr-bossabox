<template>
  <div>
    <form @submit.prevent="signIn()" class="form">
      <h2>Login</h2>
      <label>E-mail</label>
      <input type="email" id="email" placeholder="E-mail" required />

      <label>Password</label>
      <input type="password" id="password" placeholder="Password" required />
      
      <div v-if="show" class="error">
      <font-awesome-icon icon="exclamation-triangle" size="lg" style="margin: auto 2%"/>
      <p>{{error}}</p>
      </div>

      <my-button styleBtn="default" content="Login" />
    </form>
  </div>
</template>

<script>
import MyButton from "./MyButton.vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default {
  components: {
    "my-button": MyButton,
    "font-awesome-icon": FontAwesomeIcon
  },
  data() {
    return {
      error: "",
      show: false
    };
  },
  methods: {
    signIn() {
      let email = document.querySelector("#email").value;
      let password = document.querySelector("#password").value;

      let logado = {
        email,
        password
      };

      this.$http
        .post("http://localhost:3000/v1/login", logado)
        .then(res => res.json())
        .then(
          auth => {
            localStorage.setItem("auth", auth.auth);
            localStorage.setItem("token", `Bearer ${auth.token}`);
            location.reload();
          },
          err => {
            if (err.status == 500) {
              this.error = "Oooops, something went wrong :(";
              this.show = true;
            }
          }
        );
    }
  }
};
</script>

<style scoped>
p {
  text-align: center;
  text-align: center;
  font: "Semibold" 20px/26px "Source Sans Pro";
  color: #ffffff;
}

.error{
  background: #FFBB43 0% 0% no-repeat padding-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}



</style>