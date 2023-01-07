<script>
import { RouterLink, RouterView } from 'vue-router'
//git subtree push --prefix dist origin gh-pages
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
    <div class="header-content" style="max-width: 1920px;">
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
    </div>

  </header>

  <RouterView :langIsSe="langIsSe"/>
  <footer>

<div class="footer-content">
  <h2> {{ langIsSe? "Kontakta oss": "Contact us" }} </h2>

<div class="footer-child">
 <div style="display:flex; align-items: center;"> <i class="fa-solid fa-phone"></i> <div><p> 07xxxxxxxx </p><p> <a href="mailto:info@swemount.se" >info@swemount.se</a></p></div> </div>
 <div style="display:flex; align-items: center;"><i class="fa-solid fa-location-dot"></i> <div><p>Fabriksgatan 15 </p> <p>571 78 Forserum</p></div></div>
 <div style="display:flex; align-items: center;"><i class="fa-solid fa-clock"></i> <div><p>MÅN-FRE 09:00 - 19:00</p><p>LÖR-SÖN stängt</p></div></div>
  
  </div>

                            

<div style="margin-bottom:1vw;"> <p style="display: flex; justify-content: space-between;"> <a href="https://www.facebook.com/swemount"><i class="fa-brands fa-facebook"></i></a><a href="https://www.linkedin.com/company/swemount"><i class="fa-brands fa-linkedin"></i></a><a href="https://www.Instagram.com/swemount"><i class="fa-brands fa-instagram"></i></a></p></div>

</div>

<div class="copy-right"  > Copyright Swemount AB © 2023 </div>

</footer>



</template>

<style>


</style>
