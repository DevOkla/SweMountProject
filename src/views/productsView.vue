<script>
var rootBrach = "/swemounttest";

export default {
  data() {
    return {
      products: [
        {
          name: "Ändklämma - komplett",
          pic: `${rootBrach}/products/Ändklämma - komplett KL1000-SKL1000.png`,
          artNum: "SKL1000",
          Längd: "50 mm",
          Bredd: "30 mm",
          Snözon: "1-5,5",
          Höjd: "60 mm",
        },
        {
          name: "Infästning med c-profil",
          pic: `${rootBrach}/products/Infästning med c-profil CP1400-BU1020-MU1000-GB0010.png`,
          artNum: "CP1400",
          Längd: "180 mm",
          Bredd: "50 mm",
          Snözon: "1-5,5",
          Höjd: "50 mm",
        },
        {
          name: "Infästning med falsfäste",
          pic: `${rootBrach}/products/Infästning med falsfäste FF1300.png`,
          artNum: "FF1300",
          Längd: "180 mm",
          Bredd: "15 mm",
          Snözon: "1-5,5",
          Höjd: "60 mm",
        },
        {
          name: "Infästning med fotplatta",
          pic: `${rootBrach}/products/Infästning med fotplatta FP1400-TF1400-BU1020-TS0630.png`,
          artNum: "TF1400",
          Längd: "180 mm",
          Bredd: "60 mm",
          Snözon: "1-5,5",
          Höjd: "140-185 mm",
        },
        {
          name: "Infästning med läktfäste",
          pic: `${rootBrach}/products/Infästning med läktfäste LF1400-TF1400-BU1020.png`,
          artNum: "LF1400",
          Längd: "470 mm",
          Bredd: "60 mm",
          Snözon: "1-5,5",
          Höjd: "105-127 mm",
        },
        {
          name: "Infästning med stockskruv",
          pic: `${rootBrach}/products/Infästning med stockskruv SS1025.png`,
          artNum: "SS1025",
          Längd: "80 mm",
          Bredd: "45 mm",
          Snözon: "1-5,5",
          Höjd: "205 mm",
        },
        {
          name: "Infästning med tätplåt",
          pic: `${rootBrach}/products/Infästning med tätplåt TP3552-BV1030.png`,
          artNum: "TP3552",
          Längd: "520 mm",
          Bredd: "350 mm",
          Snözon: "1-5,5",
          Höjd: "Tjocklek 2 mm",
        },
        {
          name: "Infästning träskruv",
          pic: `${rootBrach}/products/Infästning träskruv TS0630.png`,
          artNum: "TS6310",
          Längd: "30 mm",
          Bredd: "6,3 mm",
          Snözon: "1 - 5,5",
          Höjd: "",
        },
        {
          name: "Infästningsskena",
          pic: `${rootBrach}/products/Infästningsskena IS2450-SS6319.png`,
          artNum: "IS2450",
          Längd: "2400 mm",
          Bredd: "50 mm",
          Snözon: "1-5,5",
          Höjd: "50 mm",
        },
        {
          name: "Plåtskruv",
          pic: `${rootBrach}/products/Plåtskruv SS6319.png`,
          artNum: "SS6190",
          Längd: "19 mm",
          Bredd: "6.3 mm",
          Snözon: "1-5,5",
          Höjd: "",
        },
        {
          name: "Gummibricka M10",
          pic: `${rootBrach}/products/Gummibricka M10 GB0010.jpg`,
          artNum: "GB0010",
          Längd: "",
          Bredd: "",
          Snözon: "",
          Höjd: "",
        },
      ],
    };
  },
  methods: {},
};
</script>

<template>
  <main>
    <h1>Produkter</h1>

    <div class="all-products">
      <div class="single-product" v-for="(i, index) in products" :key="index">
        <img :src="i.pic" alt="" />
        <h3 style="text-align: center">{{ i.name }}</h3>
        <ul>
          <li>Artikelnr: {{ i.artNum }}</li>
          <li>Längd: {{ i.Längd }}</li>
          <li>Bredd: {{ i.Bredd }}</li>
          <li>Höjd: {{ i.Höjd }}</li>
          <li>Snözon: {{ i.Snözon }}</li>

        </ul>
      </div>
    </div>
  </main>
</template>