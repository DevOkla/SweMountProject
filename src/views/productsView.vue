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
        <p style="text-decoration:none;">{{ i.artNum }}</p>

        <img :src="rootBrach+i.pic" alt="" />
        <h3 style="text-align: center;text-decoration:none;">{{ i.name }}</h3>

         </RouterLink> </div>  

  </main>
</template>