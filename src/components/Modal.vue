<template >
  <div>
    <div class="background-modal">
      <div :class="styleModal">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    styleModal: {
      required: true,
      type: String
    }
  }
};
</script>

<style scoped>
.ModalPrimary {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 20px 25px #0000001a;
  opacity: 1;
  position: fixed;
  z-index: 5;
  width: 30%;
  left: 35%;
  top: 10%;
  padding: 2%;
}

.background-modal {
  position: fixed;
  z-index: 4;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(23, 12, 58, 0.411);
}
</style>