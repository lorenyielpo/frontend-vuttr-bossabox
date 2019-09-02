<template>
  <button @click="trigger()" :class="styled" :type="typeBtn">{{ content }}</button>
</template>

<script>
export default {
  props: {
    typeBtn: {
      type: String
    },
    content: {
      required: true,
      type: String
    },
    styleBtn: String
  },

  methods: {
    trigger() {
      this.$emit("btnActive");
    }
  },

  computed: {
    styled() {
      if (this.styleBtn == "default" || "") return "ButtonPrimaryNeutral";
      if (this.styleBtn == "danger") return "ButtonTerciaryDanger";
      if (this.styleBtn == "nav-item") return "ButtonTransparent";
      if (this.styleBtn == "close") return "ButtonTransparent close"
      if (this.styleBtn == "neutral") return "ButtonTerciaryNeutral";
      if(this.styleBtn == "remove") return "ButtonTerciaryDanger close"
    }
  }
};
</script>

<style scoped>
button {
  opacity: 1;
  border: none;
  letter-spacing: 0.1rem;
  border-radius: 5px;
  text-align: center;
}
.ButtonTerciaryDanger {
  width: 20%;
  padding: 1% 2%;
  background: #feefee 0% 0% no-repeat padding-box;
  font: "Semibold" 18px/24px "Source Sans Pro";
  color: #f95e5a;
}

.ButtonTerciaryDanger:hover {
  background: #fcd7d6 0% 0% no-repeat padding-box;
}

.ButtonTerciaryDanger:active:focus {
  width: 23%;
  padding: 1.5% 2%;
}

.ButtonTerciaryDanger::before {
  content: "x";
  font-size: 1.3rem;
  margin: 1% 5%;
}

.ButtonPrimaryNeutral {
  padding: 2%;
  width: 30%;
  margin: 4% auto 0%;
  background: #365df0 0% 0% no-repeat padding-box;
  font: "Semibold" 18px/24px "Source Sans Pro";
  color: #ffffff;
}

.ButtonPrimaryNeutral:hover {
  background: #2f55cc 0% 0% no-repeat padding-box;
  font: "Semibold" 18px/24px "Source Sans Pro";
}

.ButtonPrimaryNeutral:focus:active {
  background: #244aa8 0% 0% no-repeat padding-box;
  font: "Semibold" 18px/24px "Source Sans Pro";
}

.ButtonTerciaryNeutral{
  width: 18%;
padding: 0% 2%;
background: #E1E7FD 0% 0% no-repeat padding-box;
font: "Semibold" 18px/24px "Source Sans Pro";
color: #365DF0;
}

.ButtonTransparent {
  background-color: transparent;
  text-align: left;
  font: "Semibold" 26px/32px "Source Sans Pro";
  color: #170c3a;
}

.ButtonTransparent:focus:active, .nav-item:hover{
  color: #f95e5a;
  font-weight: 700;
}

.close{
  margin-left: 80%;
}
</style>