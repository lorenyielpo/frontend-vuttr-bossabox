<template>
  <button @click="disparaAcao()" :class="estiloBtn" :type="tipo">{{ rotulo }}</button>
</template>

<script>
export default {
  props: {
      tipo: { 
          required: true,
          type: String
      },
      rotulo: {
          required: true,
          type: String
      },
      estilo: String
    },
  

  methods: {
    disparaAcao() {
      this.$emit('btnAtivado');}
  },

  computed: {
      estiloBtn(){
          if(this.estilo == 'padrao' || '') return 'padrao';
          if(this.estilo == 'perigo') return 'btn-pink';
      }
  }
}
</script>

<style scoped>
button {
  color: gray;
  width: 10%;
  font-size: 8px;
}

.padrao {
  background-color: red;
}
</style>