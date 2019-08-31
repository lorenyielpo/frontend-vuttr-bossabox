<template>
  <div>
    <form @submit.prevent="cadastrar()">
      <label>Title</label>
      <input type="title" id="title" placeholder="Title" />

      <label>Link</label>
      <input type="text" id="link" placeholder="Link" />

      <label>Description</label>
      <input type="text" id="description" placeholder="Description" />

      <label>Tags</label>
      <input type="text" id="tags" placeholder="Tags" />

      <input type="submit" value="Send" />
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    cadastrar() {
      let title = document.querySelector("#title").value;
      let link = document.querySelector("#link").value;
      let description = document.querySelector("#description").value;
      let tags = document.querySelector("#tags").value.trim();

      tags = tags.split(", ");

      let tool = {
        title,
        description,
        link,
        tags
      };

      let token = localStorage.getItem("token");

      this.$http
        .post("http://localhost:7000/v1/tools", tool, {
          headers: {
            authorization: token,
            "content-type": "application/json"
          }
        })
        .then(res => res.json())
        .then(res => location.reload());
    }
  }
};
</script>

<style scoped>
</style>