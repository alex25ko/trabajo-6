import { createApp } from 'vue'
import App from './App.vue'

function mountApp() {
  try {
    const app = createApp(App)
    app.mount('#app')
    console.log('Vue montado en #app')
  } catch (err) {
    console.error('Error al montar Vue:', err)
    const root = document.getElementById('app')
    if (root) {
      root.innerHTML = `
        <div style="padding:1rem">
          <h2 style="color:#c44">Error al iniciar la aplicación</h2>
          <p style="color:#666">Revisa la consola para más detalles.</p>
        </div>
      `
    }
  }
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', mountApp)
} else {
  mountApp()
}