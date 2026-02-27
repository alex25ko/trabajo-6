<template>
  <main>
    <h1>Mini lista de tareas</h1>
    <section class="new">
      <input v-model="text" @keyup.enter="add" placeholder="Añade una tarea..." />
      <button @click="add">Añadir</button>
    </section>

    <section v-if="todos.length" class="list">
      <ul>
        <li v-for="(t, i) in todos" :key="t.id" :class="{ done: t.done }">
          <label>
            <input type="checkbox" v-model="t.done" />
            <span>{{ t.text }}</span>
          </label>
          <button class="del" @click="remove(i)">Eliminar</button>
        </li>
      </ul>
      <p class="meta">{{ remaining }} pendiente(s) — {{ todos.length }} total</p>
    </section>

    <p v-else class="empty">No hay tareas. Añade la primera tarea arriba.</p>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const STORAGE_KEY = 'mini-todos-vue'
const text = ref('')
const todos = ref([])

onMounted(() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) todos.value = JSON.parse(raw)
  } catch { /* ignore */ }
})

watch(todos, (v) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(v)) } catch {}
}, { deep: true })

function add() {
  const t = text.value && text.value.trim()
  if (!t) return
  todos.value.unshift({ id: Date.now(), text: t, done: false })
  text.value = ''
}

function remove(index) {
  todos.value.splice(index, 1)
}

const remaining = computed(() => todos.value.filter(t => !t.done).length)
</script>

<style>
main { font-family: Arial, sans-serif; padding: 2rem; max-width: 600px; margin: auto; }
h1 { color: #42b883; margin-bottom: 1rem; }

.new { display:flex; gap:0.5rem; margin-bottom:1rem; }
.new input { flex:1; padding:0.5rem; border:1px solid #ccc; border-radius:4px; }
.new button { padding:0.5rem 0.8rem; background:#42b883; color:#fff; border:none; border-radius:4px; cursor:pointer; }

.list ul { list-style:none; padding:0; margin:0; }
.list li { display:flex; justify-content:space-between; align-items:center; padding:0.5rem 0; border-bottom:1px solid #eee; }
.list li.done span { text-decoration:line-through; color:#999; }
.del { background:transparent; border:none; color:#c44; cursor:pointer; }

.empty { color:#666; }

.meta { margin-top:0.75rem; color:#555; font-size:0.9rem; }
</style>
