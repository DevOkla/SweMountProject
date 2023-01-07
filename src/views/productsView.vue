<script >

import picsrc from "../assets/productsinfo.json";

export default {
  props:{
    langIsSe:Boolean,
  },

  data() {
    return {
      rootBrach:"/swemounttest",
      products:picsrc,
    };
  },
  mount(){
  },
  methods: {},
};
</script>

<template>
  <main>
    <h1>{{ langIsSe? "Produkter": "Products" }}</h1>

    <div class="all-products">
      <RouterLink
        v-for="(i, index) in products" 
          :key="index"
          :to="`/products/${index}`"
          class="single-product"
        >
        <div class="artnmr"> <p   style="text-decoration:none; color: white;">{{ i.artNum }}</p></div>

        <img :src="rootBrach+i.pic" alt="" />
        <div class="product-caption">
        <h3 class="yellow" style="text-align: center;text-decoration:none;">{{ i.name }}</h3>
        <p class="white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, saepe voluptatem.</p>
        <i class="fa-regular fa-circle-right yellow"></i></div>
         </RouterLink> </div>  

  </main>
</template>