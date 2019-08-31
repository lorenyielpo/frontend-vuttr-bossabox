<template>
    <div :class="estiloModal">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props:{
        estiloModal:{
            required: true,
            type: String
        }
    }    
}
</script>

<style scoped>

</style>