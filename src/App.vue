<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  data(){
    return {
      langIsSe:true,
    }
  },
}
</script>

<template>
  <header>
    <a href="/"><img src="/swemount_logo.png" alt="swemount"></a>
      <nav>
        <RouterLink class="nav-children" to="/">{{ langIsSe? "Hem": "Home" }}</RouterLink><span style="color:#ABABAB;">|</span> 
        <RouterLink class="nav-children" to="/products">{{ langIsSe? "Produkter": "Products" }}</RouterLink><span style="color:#ABABAB;">|</span>
        <RouterLink class="nav-children" to="/claculator">{{ langIsSe? "Kalkylator": "Calculator" }}</RouterLink><span style="color:#ABABAB;">|</span>
        <RouterLink class="nav-children" to="/partners">{{ langIsSe? "Distributörer & Partners": "Distributors & Partners" }}</RouterLink><span style="color:#ABABAB;">|</span>
        <RouterLink class="nav-children" to="/about">{{ langIsSe? "Om oss": "About us" }}</RouterLink><span style="color:#ABABAB;">|</span>
        <RouterLink class="nav-children" to="/contact">Support</RouterLink><span style="color:#ABABAB;">|</span>
        <div style="cursor:pointer;" @click="langIsSe=!langIsSe"><i class="fa-solid fa-earth-americas"></i> {{langIsSe?"SV":"EN"}}</div>


      </nav>
   
  </header>

  <RouterView :langIsSe="langIsSe"/>

</template>

<style>


</style>
