<template>
  <div class="CardMainElevation4">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.CardMainElevation4 {
  top: 641px;
  left: 540px;
  width: 60%;
  margin: 3% auto;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 20px 25px #0000001a;
  border: 1px solid #ebeaed;
  border-radius: 5px;
  opacity: 1;
  padding: 3%;
}

.CardMainElevation4:hover{
  margin-left: 10%;
  margin-top: 1.5%;
  box-shadow: 0px 20px 25px #0000005d;
}

</style>