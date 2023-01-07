<script>
export default {
  props:{
    langIsSe:Boolean,
  },

  data() {
    return {
      screenwidthHere:window.innerWidth,
      en: [
        "Welcome to Swemount! We are a company specializing in the sale and installation of solar cell systems and parts. Our team of trained professionals is dedicated to providing top-quality products and services to help our customers save energy and reduce their carbon footprint. Whether you are a homeowner looking to switch to solar power or a business owner interested in incorporating renewable energy into your operations, we have the expertise and resources to help you reach your goals. Contact us today to learn more about how we can support your transition to solar energy!",
        `Solar cells are devices that convert light energy into electricity. They are an important part of many clean energy systems because they provide a reliable and renewable source of power.

One of the main advantages of solar cells is that they generate electricity from an abundant and free source of energy: sunlight. Solar cells do not produce any air pollution or greenhouse gases, and they can be used in a variety of applications, from powering small electronic devices to providing electricity for entire communities.

Solar cells are made of semiconductor materials, such as silicon, that absorb photons of light and release electrons. When these electrons are captured, they create a flow of electricity. Solar cells are typically connected together in a panel or array, which can be mounted on a roof, a wall, or the ground.

There are several different types of solar cells, including monocrystalline, polycrystalline, and thin-film. Monocrystalline solar cells are made from a single crystal of silicon and are typically the most efficient at converting sunlight into electricity. Polycrystalline solar cells are made from multiple crystals of silicon and are slightly less efficient. Thin-film solar cells are made from a thin layer of photovoltaic material and are the least efficient, but also the least expensive to manufacture.

The efficiency of a solar cell refers to how much of the sunlight that it absorbs is converted into electricity. Currently, the average efficiency of a solar cell is around 20%, but some experimental cells have achieved efficiencies as high as 50%.

Overall, solar cells are a promising technology for generating clean, renewable energy. While there are still some challenges to overcome, such as finding cost-effective ways to store excess energy and improving the efficiency of solar cells, they have the potential to play a significant role in the transition to a low-carbon future.`,
      ],
      se: [
        "Välkommen till Swemount! Vi är ett företag som specialiserar oss på försäljning och installation av solcellssystem och delar. Vårt team av utbildade professionella är dedikerade att erbjuda högkvalitativa produkter och tjänster för att hjälpa våra kunder att spara energi och minska sin koldioxidutsläpp. Oavsett om du är en hushållsegare som vill byta till solenergi eller en företagare som är intresserad av att inkludera förnybar energi i dina verksamheter, har vi kompetensen och resurserna för att hjälpa dig att uppnå dina mål. Kontakta oss idag för att lära dig mer om hur vi kan stödja din övergång till solenergi!",
        `Solceller är enheter som omvandlar ljusenergi till el. De är en viktig del av många ren energi system eftersom de ger en pålitlig och förnybar källa till ström.
        
En av de främsta fördelarna med solceller är att de genererar el från en riklig och gratis källa till energi: solljus. Solceller släpper inte ut någon luftföroreningar eller växthusgaser, och de kan användas i en mängd olika tillämpningar, från att driva små elektroniska enheter till att tillhandahålla el för hela samhällen.

Solceller tillverkas av halvledarmaterial, såsom silicium, som absorberar foton av ljus och släpper ut elektroner. När dessa elektroner fångas in, skapar de en ström av el. Solceller är oftast anslutna till varandra i en panel eller array, som kan monteras på ett tak, en vägg eller marken.

Det finns flera olika typer av solceller, inklusive monokristallina, polykristallina och tunnfilms solceller. Monokristallina solceller tillverkas av en enda kristall av silicium och är oftast mest effektiva vid omvandling av solljus till el. Polykristallina solceller tillverkas av flera kristaller av silicium och är något mindre effektiva. Tunnfilms solceller tillverkas av en tunn skikt av fotovoltaiskt material och är minst effektiva, men också minst kostnadseffektiva att tillverka.

Effektiviteten hos en solcell avser hur mycket av det solljus som den absorberar som omvandlas till el. För närvarande är genomsnittseffektiviteten hos en solcell runt 20%, men vissa experimentella celler har uppnått effektiviteter på så mycket som 50%.

Sammanfattningsvis är solceller en lovande teknik för att generera ren, förnybar energi. Även om det fortfarande finns vissa utmaningar att övervinna, såsom att hitta kostnadseffektiva sätt att lagra överskott av energi och förbättra effektiviteten hos solceller, har de potential att spela en viktig roll i övergången till en lågkarbon framtid.`,

      ],
    };
  },
  methods: {

  },
};
</script>

<template>
  <main>

    <div class="video-container">
      <div class="head-text" style="max-width: 1920px;"><h1 class="" >Swemount</h1>
<p class="white"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum odit ex recusandae consequatur eveniet qui modi commodi pariatur, alias, voluptatibus ut, voluptas expedita minima id deserunt. Impedit enim itaque libero?</p>
<button>{{ langIsSe? "Kontakta oss": "Contact us" }}</button>
</div>
      <iframe :style="{'transform':'scale(' + screenwidthHere*0.00078125 + ');'}"  src="https://www.youtube.com/embed/a2PPSjazcs8?&loop=1&controls=0&autoplay=1&mute=1&playsinline=1&loop=1&showinfo=0&autohide=1&playlist=a2PPSjazcs8"  title="YouTube video player" frameborder="0"  allowfullscreen></iframe>
   
  
  </div>


  <div class="home-article1">
      <div style="display: flex; align-items: center;max-width: 1920px;" >
        <div class="p-text">
          <h2 class="yellow h2-home" >{{ langIsSe? "Swemount, vem är vi?": "Swemount, who are we?" }}</h2>

          <p  class=" lines-included white" >{{ langIsSe? se[0]: en[0] }}</p>
        </div>
        <img class="img-home" src="/img/swemount9.png" alt="" />
      </div>
    </div>

<div class="home-article2" style="max-width: 1920px;">
  <h2 class="yellow h2-home" style="text-align:center;">{{ langIsSe? "Våra Funktioner": "Our Functions" }}</h2>
<div style="display: flex; align-items: center; justify-content: space-between;">
  <div> <img src="/img/swemount10.png" alt=""><h3>Funktion 1</h3> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, saepe voluptatem.</p></div>
  <div><img src="/img/swemount11.png" alt=""><h3>Funktion 2</h3><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, saepe voluptatem.</p></div>
  <div><img src="/img/swemount12.png" alt=""><h3>Funktion 3</h3><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, saepe voluptatem.</p></div>
</div>
</div>

    <div class="home-article3">
      <div style="display: flex; align-items: center; max-width: 1920px;">
        <img class="img-home" src="/img/swemount3.png" alt="" />

        <div class="p-text">
          <h2 class="white h2-home">{{ langIsSe? "Varför Solceller?": "Why Solar cells?" }}</h2>

          <p  class=" lines-included" >{{ langIsSe? se[1]: en[1] }}</p>
        </div>
      </div>
    </div>

  </main>
</template>
<style>
</style>