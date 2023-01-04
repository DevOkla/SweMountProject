<script>
var rootBrach = "/swemounttest";

export default {
  data() {
    return {
      products: [
        {
          name:"Tätplåt slät",
          pic: `${rootBrach}/products/9e3d444f171f90481c2b0d703dbe7949.jpg`,
        },
        {
          name:"Tätplåt slät",
          pic: `${rootBrach}/products/a1a7f9ca5a1adebd9de8d0ea12a3bb0f.jpg`,
        },
        {
          name:"Ändklämma solsystem",
          pic: `${rootBrach}/products/a518ecde7f67ca9020b26ce1f801be8c.jpg`,
        },
        {
          name:"Tätplåt slät",
          pic: `${rootBrach}/products/d602957bb6e9fec419edb7beab4ba45d.jpg`,
        },
        {
          name:"Tätplåt slät",
          pic: `${rootBrach}/products/d7eeb76fb40a6225ea725878c9bf617d.jpg`,
        },
        {
          name:"Tätplåt slät",
          pic: `${rootBrach}/products/e9dfddc501073994ece00a7c77cf0dac.jpg`,
        },

      ],
    };
  },
  methods: {
  },
};

</script>

<template>
  <main>
    <h1>
    Products
  </h1>
  
  <div class="all-products">
    <div class="single-product" v-for="(i,index) in products" :key="index">
      <img :src="i.pic" alt="">
      <h3 style="text-align:center;">{{ i.name }}</h3>
    </div>
  </div>
  </main>
</template>