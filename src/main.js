import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueKonva from 'vue-konva';
import VueGoogleMaps from '@fawmi/vue-google-maps'

import './assets/main.css'





router.afterEach((to, from) => {
    window.scrollTo(0, 0)
  })
const app = createApp(App);

app.use(router);
app.use(VueKonva);


app.use(VueGoogleMaps, {
  load: {
      key: 'AIzaSyAiwsX0pst4lZq1uBA6h1x89yRDZ4tO7TM',
      libraries: "places",

  },
})


app.mount('#app')
