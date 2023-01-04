<script>
export default {
  data() {
    return {
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

    <h2>Contact us</h2>

    <form >
      <label for=""><p>Eamil:</p><input type="email" placeholder="anders.andersson@gmail.com"></label>
      <label for=""><p>Name:</p><input type="text" placeholder="Anders Anderson"></label>
      <label for=""><p>Quastion:</p>  <textarea   ></textarea>
</label>
<button><b>Send</b></button>

    </form>

  </main>
</template>