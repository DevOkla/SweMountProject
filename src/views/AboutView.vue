<script>
var rootBrach = "/swemounttest";

export default {
  data() {
    return {
      en: [
        "Swemount is a Swedish company that specializes in manufacturing high-quality mounting systems for solar panels. Our products are suitable for both large and small solar panel installations and have many different options to choose from, so customers can find the mounting system that best meets their needs.",
        "Swemount strives to always be at the cutting edge of technology and offer the most innovative and sustainable mounting systems on the market. The company is also very environmentally conscious and uses only sustainable materials in its production.",
      ],
      se: [
        "Swemount är ett svenskt företag som har specialiserat sig på att tillverka högkvalitativa montagesystem för solceller. Våra produkter är användbara för både stora och små solcellsanläggningar och de har många olika alternativ att välja mellan, så att kunden kan hitta det montagesystem som passar deras behov bäst. ",
        "Swemount strävar efter att alltid vara på den tekniska framkanten och att erbjuda de mest innovativa och hållbara montagesystemen på marknaden. Företaget är också mycket miljömedvetet och använder endast hållbara material i sin produktion.",
      ],
      personal: [
        {
          title: "Ekonomi",
          name: "Lena Phung ",
          phone: "0700000000",
          email: "lena@swemount.se",
          pic: `${rootBrach}/personal/Lena1.jpg`,
        },
        {
          title: "Order",
          name: "Henrik Lidhamn",
          phone: "0700000000",
          email: "Henke@swemount.se",
          pic: `${rootBrach}/personal/Henke1.jpg`,
        },
        {
          title: "Marknad",
          name: "Ulf Thorwalls ",
          phone: "0700000000",
          email: "Ulf@swemount.se",
          pic: `${rootBrach}/personal/Ulf1.jpg`,
        },{
          title: "Försäljning",
          name: "Tobias Axelsson ",
          phone: "0700000000",
          email: "Tobias@swemount.se",
          pic: `${rootBrach}/per-placeholder.png`,
        },
      ],
      selectedPersonal: 0,
    };
  },
  methods: {
    selectPersonal(i) {
      this.selectedPersonal = i;
    },
  },
};
</script>

<template>
  <main>
    <h1>Om oss</h1>

    <div style="display: flex; align-items: center">
      <div style="width: 60%">
        <p class="p-text">{{ se[0] }}</p>
        <br />
        <p class="p-text">{{ se[1] }}</p>
      </div>
      <img style="width: 35%;" src="/img/swemount1.png" alt="" />
    </div>
    <div class="team">
      <h2>Vårt team</h2>

     <!-- <div id="selected-person">
        <img style="width: 35%" :src="personal[selectedPersonal].pic" alt="" />
        <div style="text-align: left; margin-left: 0">
          <h3>{{ personal[selectedPersonal].title }}</h3>
          <p>{{ personal[selectedPersonal].name }}</p>
          <p>{{ personal[selectedPersonal].phone }}</p>
          <p>{{ personal[selectedPersonal].email }}</p>
        </div>
      </div>
-->
      <div class="all-personal">
        <div
          v-for="(i, index) in personal"
          :key="index"
          @click="selectPersonal(index)"
          class="one-personal"
        >
          <img  :src="i.pic" alt="" />
          <div >

          <h3>{{ i.title }}</h3>
          <p>{{ i.name }}</p>
          <p>{{ i.phone }}</p>
          <p>{{ i.email }}</p>
        </div>

        </div>
      </div>
    </div>
    <div class="map-location">
      <h2>Location</h2>
      <img src="/img/map.png" alt="" />
    </div>
  </main>
</template>
<style scoped>
@media screen and (min-width: 414px) {
}

@media screen and (min-width: 1200px) {
}
</style>>