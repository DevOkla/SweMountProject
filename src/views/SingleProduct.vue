<script>
import picsrc from "../assets/productsinfo.json";


export default {
  props:{
    langIsSe:Boolean,
  },

  data() {
    return {
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
      
      <h2 style="text-align: center">{{ isingleProduct.name }}</h2>

      <div class="product-head">
      <img :src="rootBrach+isingleProduct.pic" alt="" class="product-img" />
      <div>
        <ul class="product-list">
          <li>Artikelnr: {{ isingleProduct.artNum }}</li>
          <li>Längd: {{ isingleProduct.Längd }}</li>
          <li>Bredd: {{ isingleProduct.Bredd }}</li>
          <li>Höjd: {{ isingleProduct.Höjd }}</li>
          <li>Snözon: {{ isingleProduct.Snözon }}</li>

        </ul>
      </div></div>


      <div class="identifiering"><h4>Ingående artiklar och identifiering</h4>
      
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
      <div class="Prestanda"><h4>Ingående artiklar och identifiering</h4>
      
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

    </main>
  </template>
  <style>
@media screen and (min-width: 414px) {





}

@media screen and (min-width: 1200px) {



}


</style>