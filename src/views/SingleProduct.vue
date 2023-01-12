<script >
import picsrc from "../assets/productsinfo.json";


export default {
  props:{
    langIsSe:Boolean,
  },

  data() {
    return {

      en:[
      "We apologize, but this information about this product is not optimized for small screens with a width less than 768 pixels. For the best experience, please visit this page on a device with a larger screen or adjust your screen resolution to at least 768 pixels wide",
  
  ],
  se:[
      "Vi beklagar, men denna produkt info är inte anpassad för skärmar med en bredd mindre än 768 pixlar. För bästa upplevelse, vänligen besök denna sida på en enhet med större skärm eller justera skärmens upplösning till minst 768 pixlar bred.",

  ],


      rootBrach:"/swemounttest",

      isingleProduct:picsrc[this.$route.params.id],
    };
  },
  methods: {
  },
};
</script>

<template>
    <main>
      

      <div class="product-head">
      <img :src="rootBrach+isingleProduct.pic" alt="" class="product-img img-back-box" />
      <div>
        <div class="second-head" style="margin: 0; "> 
        <h2 style="text-align: left; margin-top: 0;">{{ isingleProduct.name }}</h2>
   <hr style="margin:0; ">
  </div>


        <ul class="product-list">
          <li>Artikelnr: {{ isingleProduct.artNum }}</li>
          <li>Längd: {{ isingleProduct.Längd }}</li>
          <li>Bredd: {{ isingleProduct.Bredd }}</li>
          <li>Höjd: {{ isingleProduct.Höjd }}</li>
          <li>Snözon: {{ isingleProduct.Snözon }}</li>

        </ul>
      </div></div>
      <div class="less768">
      <div class="signup-msg">{{ langIsSe? se[0]: en[0] }}</div>


    </div>

  

<div class="over768">
      <div class="identifiering">
        <div class="second-head"> 
        <h1>Ingående artiklar och identifiering</h1>
   <hr>
  </div>

      <table>

      <tr>
        <th>Benämning</th>
        <th>Vikt</th>
        <th>Ytbehandling</th>
        <th>Färg</th>
        <th>Antal</th>
        <th>Artikelnr.</th>
      </tr>
      <tr v-for="(i,index) in isingleProduct.Benämning" :key="index">
        <td>{{i}}</td>
        <td>{{isingleProduct.Vikt[index]}}</td>
        <td>{{isingleProduct.Ytbehandling[index]}}</td>
        <td>{{isingleProduct.Färg[index]}}</td>
        <td>{{isingleProduct.Antal[index]}}</td>
        <td>{{isingleProduct.Artikelnr[index]}}</td>

      </tr>

    </table>

      </div>


      <div class="Prestanda"><h4></h4>

        <div class="second-head"> 
        <h1>Prestanda</h1>
   <hr>
  </div>

      <table>

      <tr>
        <th>Typ av infästningsmaterial</th>
        <th>Plåttjocklek</th>
        <th>Kvalité (N/mm²)</th>
        <th>Fx+</th>
        <th>Fx-</th>
        <th>Fy+</th>
      </tr>
      <tr v-for="(i,index) in isingleProduct.Typavinfästningsmaterial" :key="index">
        <td>{{i}}</td>
        <td>{{isingleProduct.Plåttjocklek[index]}}</td>
        <td>{{isingleProduct.Kvalité[index]}}</td>
        <td>{{isingleProduct.Fxp[index]}}</td>
        <td>{{isingleProduct.Fxm[index]}}</td>
        <td>{{isingleProduct.Fyp[index]}}</td>

      </tr>

    </table>

      </div>
    </div>
    </main>
  </template>
  <style>
@media screen and (min-width: 414px) {





}

@media screen and (min-width: 1200px) {



}


</style>