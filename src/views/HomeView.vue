<script>
export default {
  data() {
    return {
      en: [
        "Welcome to Swemount! We are a company specializing in the sale and installation of solar cell systems and parts. Our team of trained professionals is dedicated to providing top-quality products and services to help our customers save energy and reduce their carbon footprint. Whether you are a homeowner looking to switch to solar power or a business owner interested in incorporating renewable energy into your operations, we have the expertise and resources to help you reach your goals. Contact us today to learn more about how we can support your transition to solar energy!",
      ],
      se: [
        "Välkommen till Swemount! Vi är ett företag som specialiserar oss på försäljning och installation av solcellssystem och delar. Vårt team av utbildade professionella är dedikerade att erbjuda högkvalitativa produkter och tjänster för att hjälpa våra kunder att spara energi och minska sin koldioxidutsläpp. Oavsett om du är en hushållsegare som vill byta till solenergi eller en företagare som är intresserad av att inkludera förnybar energi i dina verksamheter, har vi kompetensen och resurserna för att hjälpa dig att uppnå dina mål. Kontakta oss idag för att lära dig mer om hur vi kan stödja din övergång till solenergi!",
      ],
    };
  },
  methods: {
  },
};
</script>

<template>
  <main>
    <div>
      <h1>Swemount</h1>
      <div style="display: flex; align-items: center">
        <div style="width: 60%">
          <p class="p-text">{{ se[0] }}</p>
        </div>
        <img style="width: 25%" src="/img/swemount9.jpeg" alt="" />
      </div>
    </div>
  </main>
</template>
