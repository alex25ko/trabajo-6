<template>
  <section>
    <p>Contador: {{ count }}</p>
    <button @click="count++">Incrementar</button>
    <button @click="count = 0">Reiniciar</button>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<style scoped>
section { display: flex; gap: 0.5rem; align-items: center; }
button { padding: 0.4rem 0.8rem; border: 1px solid #ccc; background: #fff; cursor: pointer; }
</style>
