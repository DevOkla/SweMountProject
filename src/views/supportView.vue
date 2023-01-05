<script >
export default {
  props:{
    langIsSe:Boolean,
  },

  data() {
    return {
      en:[
        `Swemount is a company that helps property owners become more sustainable by installing solar panels on their roofs. Our team of experts carefully assess the suitability of solar panel installation on each building and work with property owners to design a custom solar panel system that meets their energy needs and budget.

When the solar panel system is installed, property owners can begin producing their own renewable energy, which not only helps the environment but also saves them money on their energy bills. In addition, property owners can take advantage of various government incentives and tax reductions for switching to solar energy.

At Swemount, we are proud to offer high-quality solar panel products and excellent customer service. We are committed to helping property owners reduce their carbon dioxide emissions and achieve energy independence.`
],
      se:[
      `Swemount är en företag som hjälper fastighetsägare att bli mer hållbara genom att installera solceller på deras tak. Vårt team av experter bedömer noggrant lämpligheten för solpanelinstallation på varje byggnad och samarbetar med fastighetsägare för att designa en skräddarsydd solpanelanläggning som möter deras energibehov och budget. 

När solpanelanläggningen är installerad kan fastighetsägarna börja producera sin egen förnybar energi, vilket inte bara hjälper miljön utan också sparar dem pengar på deras energiräkningar. Dessutom kan fastighetsägare ta del av olika regeringsstöd och skattereduktioner för att gå över till solenergi. 

På Swemount är vi stolta över att erbjuda högkvalitativa solpanelprodukter och utmärkt kundservice. Vi är angelägna om att hjälpa fastighetsägare att minska sina koldioxidutsläpp och uppnå energisjälvständighet.`

      ],
      QA: [
        {
          Q: "Vad är det för typ av montagesystem som ni erbjuder?",
          A: "Vi använder oss av magnelis behandlat stål, för att förbättra plåtens motståndskraft mot korrosion. Magnelis är en speciell blandning av zinkplåt och 3,5% aluminium, samt 3% magnesium. Dessa tillsatser ger plåten mycket bra korrosionsskydd.",
          active: false,
        },
        {
          Q: "Finns det några begränsningar på vilken sorts solceller som kan användas med ert montagesystem?",
          A: "Vi använder oss av magnelis behandlat stål, för att förbättra plåtens motståndskraft mot korrosion. Magnelis är en speciell blandning av zinkplåt och 3,5% aluminium, samt 3% magnesium. Dessa tillsatser ger plåten mycket bra korrosionsskydd.",
          active: false,
        },
        {
          Q: "Hur lång livslängd har eran montagesystem och finns det några garantier?",
          A: "Vårt montagesystem kommer med 30 års garantimot korrision. Erbjuder ni teknisk support under installationen och/eller efteråt? Vid frågor är du mer än välkommen att kontakta oss för support och frågor, alternativt ladda ner någon av våra montage guider.",
          active: false,
        },
        {
          Q: "Erbjuder ni teknisk support under installationen och/eller efteråt?",
          A: "Vid frågor är du mer än välkommen att kontakta oss för support och frågor, alternativt ladda ner någon av våra montage guider.",
          active: false,
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
    <h1>Support</h1>
<p class="start-text lines-included">{{ langIsSe? se[0]: en[0] }} </p>
    <h2>F&Q</h2>
    <ul>
      <li v-for="(i, index) in QA" :key="index">
        <div @click="i.active = !i.active">
          <p :class="[
            'q',
            i.active ? '  q-active' : '',
          ]">{{ i.Q }}</p>
           <br v-if="i.active" /> 

          <Transition>
            <p v-if="i.active">{{ i.A }}</p>
          </Transition>
        </div>
      </li>
    </ul>

    <h2>{{ langIsSe? "Kontakta oss": "Contact us" }} </h2>

    <form action="mailto:info@swemount.se" method="POST" enctype="text/plain" >
      <label for="email"><p>Eamil:</p><input type="email" name="email" placeholder="anders.andersson@gmail.com" required></label>
      <label for="name"><p>{{ langIsSe? "Namn": "Name" }}:</p><input type="text" name="name" placeholder="Anders Andersson" required></label>
      <label for="subject"><p>Subject:</p><input type="text" name="subject" placeholder="subject" required></label>

      <label for="message"><p>{{ langIsSe? "Fråga": "Question" }}:</p>  <textarea name="message"  required ></textarea>
</label>

<button><b>{{ langIsSe? "Skicka": "Send" }}</b></button>

    </form>

  </main>
</template>