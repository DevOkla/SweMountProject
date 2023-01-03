<script>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img src="/swemount_logo.png" alt="swemount">
      <nav>
        <RouterLink class="nav-children" to="/">Home</RouterLink><span style="color:#ABABAB;">|</span> 
        <RouterLink class="nav-children" to="/products">Products</RouterLink><span style="color:#ABABAB;">|</span>
        <RouterLink class="nav-children" to="/claculator">Calculator</RouterLink><span style="color:#ABABAB;">|</span>
        <RouterLink class="nav-children" to="/partners">Distributors & Partners</RouterLink><span style="color:#ABABAB;">|</span>
        <RouterLink class="nav-children" to="/about">About us</RouterLink><span style="color:#ABABAB;">|</span>
        <RouterLink class="nav-children" to="/contact">Support</RouterLink>


      </nav>
   
  </header>

  <RouterView />

</template>

<style>


</style>
