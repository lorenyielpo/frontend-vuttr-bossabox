<template>
  <div>
    <form @submit.prevent="add()"  class="form">
      <h2>Add new tool</h2>
      <label>Title</label>
      <input type="title" id="title" placeholder="Title" required/>

      <label>Link</label>
      <input type="text" id="link" placeholder="Link" required/>

      <label>Description</label>
      <input type="text" id="description" placeholder="Description" required/>

      <label>Tags</label>
      <input type="text" id="tags" placeholder="Tags" required/>

      <my-button styleBtn="default" content="Add tool" />
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
    add() {
      let title = document.querySelector("#title").value;
      let link = document.querySelector("#link").value;
      let description = document.querySelector("#description").value;
      let tags = document.querySelector("#tags").value;

      tags = tags.split(", ");

      let tool = {
        title,
        description,
        link,
        tags
      };
      let token = localStorage.getItem("token");

      this.$http
        .post("http://localhost:3000/v1/tools", tool, {
          headers: {
            authorization: token,
            "content-type": "application/json"
          }
        })
        .then(res => res.json())
        .then(() => location.reload());
    }
  }
  }
</script>

<style scoped>
</style>