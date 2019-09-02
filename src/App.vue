<template>
  <div id="app">
    <div class="nav-bar">
      <!-- Login -->
      <my-button
        typeBtn="button"
        styleBtn="nav-item"
        content="Login"
        @btnActive="loged(), showNewLogin=true"
        v-if="!auth"
      />
      <my-button
        typeBtn="button"
        styleBtn="nav-item"
        content="LogOut"
        @btnActive="logout()"
        v-if="auth"
      />
      <modal v-if="showNewLogin" styleModal="ModalPrimary">
        <my-button typeBtn="button" content="X" @btnActive="showNewLogin=false" styleBtn="close" />
        <new-login />
      </modal>

      <!-- Cadastro de usuário-->
      <my-button
        typeBtn="button"
        content="New user"
        styleBtn="nav-item"
        @btnActive="showNewUser=true"
        v-if="!auth"
      />
      <modal v-if="showNewUser" styleModal="ModalPrimary">
        <my-button typeBtn="button" content="X" @btnActive="showNewUser=false" styleBtn="close" />
        <new-user />
      </modal>
    </div>

    <h1>VUTTR</h1>
    <h2>Very Useful Tools to Remember</h2>
    <h3 id="info" v-if="!auth">To add or remove, please sign in or sign up!</h3>

    <div class="top">
      <!-- filtred ferramentas -->
      <div class="inputs-search">
        <font-awesome-icon icon="search" size="lg" style="margin: auto 0.5%" />
        <input
          type="search"
          class="search"
          @input="filter=$event.target.value, filtred()"
          placeholder="Search..."
        />
        <input type="checkbox" class="search-tag" @click="filtred()" />Search only tags
      </div>

      <!-- Cadastro de ferramenta -->
      <my-button
        typeBtn="button"
        content="+ Add"
        @btnActive="showNewTool=true"
        styleBtn="neutral"
        v-if="auth"
      />
      <modal v-if="showNewTool" styleModal="ModalPrimary">
        <my-button typeBtn="button" content="X" @btnActive="showNewTool=false" styleBtn="close" />
        <new-tool />
      </modal>
    </div>

    <!-- Modal confirmar DELETE -->
    <modal v-if="removeTool" styleModal="ModalPrimary">
      <h2>Remove tool</h2>
      <p>Are you sure you want to remove {{this.toolName}}</p>
      <div class="modal-buttons">
        <my-button
          typeBtn="button"
          content="Cancel"
          @btnActive="removeTool=false"
          styleBtn="danger"
        />
        <my-button
          typeBtn="button"
          content="Accept"
          @btnActive="remove()"
          styleBtn="neutral"
        />
      </div>
    </modal>

    <!-- Lista de ferramentas -->
    <div v-for="tool in allTools" :key="tool._id">
      <!-- Card de ferramenta -->
      <card>
        <my-button
          typeBtn="button"
          content="Remove"
          @btnActive="catchId(tool._id, tool.title), removeTool=true"
          styleBtn="remove"
          v-if="auth"
        />
        <h3>
          <a :href="tool.link">{{ tool.title }}</a>
        </h3>
        <p>{{ tool.description }}</p>
        <span>
          <p v-for="tag in tool.tags" class="tags">
            <strong>#{{ tag }}</strong>
          </p>
        </span>
        <h5>Author: {{ tool.author }}</h5>
      </card>
    </div>
  </div>
</template>

<script>
import Card from "./components/Card.vue";
import MyButton from "./components/MyButton.vue";
import Modal from "./components/Modal.vue";
import NewUser from "./components/NewUser.vue";
import NewTool from "./components/NewTool.vue";
import Login from "./components/Login.vue";

export default {
  name: "app",
  components: {
    "card": Card,
    "my-button": MyButton,
    "modal": Modal,
    "new-user": NewUser,
    "new-tool": NewTool,
    "new-login": Login
  },
  data() {
    return {
      tools: [],
      filter: "",
      toolsFiltered: [],
      toolName: "",
      idTool: "",
      showNewTool: false,
      showNewUser: false,
      showNewLogin: false,
      auth: { type: Boolean },
      removeTool: false
    };
  },

  methods: {
    filtred() {
      //filtrar por tag
      let checked = document.querySelector(".search-tag").checked;
      if (checked && this.filter.length >= 2) {
        this.$http
          .get(`http://localhost:3000/v1/tools?tag=${this.filter}`)
          .then(res => res.json())
          .then(tools => (this.toolsFiltered = tools));
      } else if (checked == false && this.filter) {
        //filtrar Global
        let exp = new RegExp(this.filter.trim(), "i");
        let filtered = [];

        filtered = filtered.concat(
          this.tools.filter(tool => exp.test(tool.title)),
          this.tools.filter(tool => exp.test(tool.description)),
          this.tools.filter(tool => exp.test(tool.tags)),
          this.tools.filter(tool => exp.test(tool.author))
        );

        let uniqueValues = [...new Set(filtered)];
        this.toolsFiltered = uniqueValues;
      } else {
        this.toolsFiltered = this.tools;
      }
    },

    catchId(tool, name) {
      this.toolName = name;
      return this.idTool = tool;
    },

    remove() {
      //Remove por ID
      let token = localStorage.getItem("token");
      this.$http.delete(`http://localhost:3000/v1/tools/${this.idTool}`, {
        headers: {
          authorization: token
        }
      });
      location.reload();
    },

    //Verificação de login
    loged() {
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
      if (this.filter) {
        return this.toolsFiltered;
      } else {
        return this.tools;
      }
    }
  },

  created() {
    this.$http
      .get("http://localhost:3000/v1/tools")
      .then(res => res.json())
      .then(tools => {
        this.auth = localStorage.getItem("auth");
        this.tools = tools;
      });
  }
};
</script>

<style>
.nav-bar {
  top: 0;
  left: 0;
  width: 100%;
  height: 4rem;
  background: #ffffff 0% 0% no-repeat padding-box;
  opacity: 1;
  display: flex;
  justify-content: space-around;
  z-index: 2;
  position: fixed;
}

#info {
  text-align: center;
  color: #f95e5a;
}

.top {
  width: 80%;
  margin: 2% auto;
  display: flex;
  justify-content: space-around;
}

span {
  display: flex;
  flex-wrap: wrap;
}

.inputs-search {
  width: 50%;
  padding: 0%;
}

.tags {
  margin-right: 2%;
}

.search {
  width: 40%;
  background: #f5f4f6 0% 0% no-repeat padding-box;
  border: 1px solid #ebeaed;
}

.search-tag {
  width: 20px;
  margin: 0% 2%;
  border: none;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
}
</style>
