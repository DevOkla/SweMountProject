<script>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <a href="/"><img src="/swemount_logo.png" alt="swemount"></a>
      <nav>
        <RouterLink class="nav-children" to="/">Hem</RouterLink><span style="color:#ABABAB;">|</span> 
        <RouterLink class="nav-children" to="/products">Produkter</RouterLink><span style="color:#ABABAB;">|</span>
        <RouterLink class="nav-children" to="/claculator">Kalkylator</RouterLink><span style="color:#ABABAB;">|</span>
        <RouterLink class="nav-children" to="/partners">Distributörer & Partners</RouterLink><span style="color:#ABABAB;">|</span>
        <RouterLink class="nav-children" to="/about">Om oss</RouterLink><span style="color:#ABABAB;">|</span>
        <RouterLink class="nav-children" to="/contact">Support</RouterLink>


      </nav>
   
  </header>

  <RouterView />

</template>

<style>


</style>
