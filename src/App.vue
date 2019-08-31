<template>
  <div id="app">
    <h1>VUTTR</h1>
    <h2>Very Useful Tools to Remember</h2>

    <!-- Login -->
    <btn tipo="button" rotulo="Login" @btnAtivado="logado(), showNewLogin=true" v-if="!auth" />
    <btn tipo="button" rotulo="LogOut" @btnAtivado="logout()" v-if="auth" />
    <modal v-if="showNewLogin" estiloModal="padrao">
      <btn tipo="button" rotulo="Fechar" @btnAtivado="showNewLogin=false" />
      <newLogin />
    </modal>

    <!-- Cadastro de usuário-->
    <btn tipo="button" rotulo="New user" @btnAtivado="showNewUser=true" v-if="!auth" />
    <modal v-if="showNewUser" estiloModal="padrao">
      <btn tipo="button" rotulo="Fechar" @btnAtivado="showNewUser=false" />
      <newUser />
    </modal>

    <!-- Filtrar ferramentas -->
    <input type="search" @input="filtro=$event.target.value, filtrar()" />
    <input type="checkbox" class="searchTag" @click="filtrar()" />Search only tags
    
    <!-- Cadastro de ferramenta -->
    <btn tipo="button" rotulo="Add" @btnAtivado="showNewTool=true" />
    <modal v-if="showNewTool" estiloModal="padrao">
      <btn tipo="button" rotulo="Fechar" @btnAtivado="showNewTool=false" />
      <newTool />
    </modal>
    
    <!-- Grid de ferramentas -->
    <div v-for="tool in allTools" :key="tool._id">

      <!-- Modal confirmar DELETE -->
      <modal v-if="removeTool" estiloModal="padrao">
        <h2>Remove tool</h2>
        <p>Are you sure you want to remove {{ tool.title}}</p>
        <btn tipo="button" rotulo="Cancel" @btnAtivado="removeTool=false" />
        <btn tipo="button" rotulo="Accept" @btnAtivado="remove(tool._id)" />
      </modal>

      <!-- Card de ferramenta -->
      <grid>
        <btn
          tipo="button"
          rotulo="Remover"
          @btnAtivado="removeTool=true"
          :confirmacao="true"
          estilo="padrao"
        />
        <h3>
          <a :href="tool.link">{{ tool.title }}</a>
        </h3>
        <p>{{ tool.description }}</p>
        <span v-for="tag in tool.tags">
          <p>
            <strong>#{{ tag }}</strong>
          </p>
        </span>
        <h5>{{ tool.author }}</h5>
      </grid>


    </div>
  </div>
</template>

<script>
import Grid from "./components/Grid.vue";
import Btn from "./components/Btn.vue";
import Modal from "./components/Modal.vue";
import NewUser from "./components/NewUser.vue";
import NewTool from "./components/NewTool.vue";
import Login from "./components/Login.vue";

export default {
  name: "app",
  components: {
    grid: Grid,
    btn: Btn,
    modal: Modal,
    newUser: NewUser,
    newTool: NewTool,
    newLogin: Login
  },
  data() {
    return {
      tools: [],
      filtro: "",
      toolsFiltradas: [],
      showModal: false,
      showNewTool: false,
      showNewUser: false,
      showNewLogin: false,
      auth: { type: Boolean },
      nameTool: "",
      removeTool: false
    };
  },

  methods: {
    filtrar() {
      //Filtro por tag
      let checked = document.querySelector(".searchTag").checked;
      if (checked && this.filtro.length >= 2) {
        this.$http
          .get(`http://localhost:7000/v1/tools?tag=${this.filtro}`)
          .then(res => res.json())
          .then(tools => (this.toolsFiltradas = tools));
      } else if (checked == false && this.filtro) {
        //Filtro Global
        let exp = new RegExp(this.filtro.trim(), "i");
        let filtradas = [];

        filtradas = filtradas.concat(
          this.tools.filter(tool => exp.test(tool.title)),
          this.tools.filter(tool => exp.test(tool.description)),
          this.tools.filter(tool => exp.test(tool.tags)),
          this.tools.filter(tool => exp.test(tool.author))
        );

        let uniqueValues = [...new Set(filtradas)];
        this.toolsFiltradas = uniqueValues;

      } else {
        this.toolsFiltradas = this.tools;
      }
    },

    remove(id) {
      //Remove por ID
      let token = localStorage.getItem("token");
      this.$http.delete(`http://localhost:7000/v1/tools/${id}`, {
        headers: {
          authorization: token
        }
      });
      location.reload();
    },
    
    //Verificação de login
    logado() {
      if (localStorage.getItem("auth")) {
        this.auth = localStorage.getItem("auth");
        return this.auth;
      }
    },

    //Desloga VUTTR
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("auth");
      return (this.auth = localStorage.getItem("auth"));
    }
  },

  computed: {
    //Ferramentas
    allTools() {
      if (this.filtro) {
        return this.toolsFiltradas;
      } else {
        return this.tools;
      }
    }
  },

  created() {
    this.$http
      .get("http://localhost:7000/v1/tools")
      .then(res => res.json())
      .then(tools => {
        this.auth = localStorage.getItem("auth");
        this.tools = tools;
      });
  }
};
</script>

<style>
</style>
