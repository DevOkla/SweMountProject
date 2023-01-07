<script >
import html2pdf from "html2pdf.js";
import axios from "axios";
import taket from "./taken.vue";
import matrials from "../assets/matrials.json";

export default {
  components: {
    taket,
  },

  data() {
    return {
      //////////////////////////////////////////////////////////////// variables
      matrials: matrials,

      laglutandeCountMatrial: [
        {
          AntalPneler: 1,
          AntalRaderMedPaneler: 1,
          AntalAvDennaKonfigurationen: 1,
        },
      ],

      laglutandeCountMatrialsVChecker: [
        "LL1505",
        "LL1530",
        "KL3050",
        "TP3552",
        "GB0010",
        "VB1305",
        "VB1301",
        "MU1010",
        "MU1001",
        "MA1008",
        "MA5105",
      ],
      laglutandeCountMatrialsSChecker: [
        "LL1505",
        "LL1530",
        "SKL3050",
        "TP3552",
        "GB0010",
        "VB1305",
        "VB1301",
        "MU1010",
        "MU1001",
        "MA1008",
        "MA5105",
      ],

      finalResultArrObjects: [],
      finalResult: [],

      TotalFinalResult: [],

      finalCalc: [],
      totalFinalCalc: {},

      isLaglutand: false,
      AvstandMellanFasten: 1200,
      colorName: "black",
      sno: 0,
      vind: 0,
      offsetX: 0,
      offsetY: 0,
      Terrängtyp: 0,
      allTaken: 1,
    };
  },
  mounted() {
    //////////////////////////////////////////////////////////////////// import data

  },
  methods: {
    //////////////////////////////////////////////////////////////////// Functions

    getSnoAndVind() {
      let klimatlastX =
        Math.floor((118181.8182 + (200000 / 66) * this.offsetX) * 1000) / 1000;
      let klimatlastY =
        Math.floor((8021212.1212 - (200000 / 66) * this.offsetY) * 1000) / 1000;
      this.sno = 0;
      this.vind = 0;

      axios
        .get(
          `https://api.boverket.se/klimatlast/v1/snolast?x-koord=${klimatlastY}&y-koord=${klimatlastX}`
        )
        .then((response1) => {
          console.log(response1);

          this.sno = response1.data.värde.replace(",", ".");
        });

      axios
        .get(
          `https://api.boverket.se/klimatlast/v1/vindlast?x-koord=${klimatlastY}&y-koord=${klimatlastX}`
        )
        .then((response2) => {
          this.vind = response2.data.värde.replace(",", ".");
        });
    },

    goLaglutand() {
      this.isLaglutand = false;
      this.laglutandeCountMatrial = [
        {
          AntalPneler: 1,
          AntalRaderMedPaneler: 1,
          AntalAvDennaKonfigurationen: 1,
        },
      ];

      this.finalResultArrObjects = [];
      this.finalResult = [];

      this.TotalFinalResult = [];

      this.finalCalc = [];
      this.totalFinalCalc = {};
      this.colorName = "black";
    },
    goParallella() {
      this.isLaglutand = true;
    },

    cheker(checkerArr) {
      this.finalResultArrObjects = [];
      for (let i in checkerArr) {
        for (let j in this.matrials) {
          if (checkerArr[i] == this.matrials[j].ArtNr) {
            this.finalResultArrObjects.push(this.matrials[j]);
            break;
          }
        }
      }
    },
    selectCheap(largeArtNr, smallArtNr, c, largeCount, smallCount) {
      let VB5P = this.finalResultArrObjects.find(
        (element) => element.ArtNr == largeArtNr
      );

      let VB1P = this.finalResultArrObjects.find(
        (element) => element.ArtNr == smallArtNr
      );

      let MVB1 = Math.floor(VB5P.Pris / VB1P.Pris);
      let VB5C = Math.floor((2 * c) / largeCount);

      let VB1C = Math.ceil((2 * c - VB5C * largeCount) / smallCount);

      if (VB1C > MVB1) {
        VB5C++;
        VB1C = 0;
      }
      return [VB5C, VB1C];
    },
    calculateAntal(a, b, ant) {
      let ifAntal = 0;
      let c = (2 + a * 2) * ((b + 1) / 2);
      let assist = [];

      let VB13 = this.selectCheap("VB1305", "VB1301", c, 50, 10);

      let MU10 = this.selectCheap("MU1010", "MU1001", c, 100, 10);

      for (let frao in this.finalResultArrObjects) {
        switch (this.finalResultArrObjects[frao].ArtNr) {
          case "LL1505":
            ifAntal = (a + 1) * b;
            break;
          case "LL1530":
            ifAntal = (a + 1) * b;
            break;
          case "SKL3050":
            ifAntal = 4 * b;
            break;
          case "KL3050":
            ifAntal = 4 * b;
            break;
          case "TP3552":
            ifAntal = c;
            break;
          case "GB0010":
            ifAntal = 2 * c;
            break;
          case "VB1305":
            ifAntal = VB13[0];
            break;
          case "VB1301":
            ifAntal = VB13[1];
            break;
          case "MU1010":
            ifAntal = MU10[0];
            break;
          case "MU1001":
            ifAntal = MU10[1];
            break;
          case "MA1008":
            ifAntal = 1;
            break;
          case "MA5105":
            ifAntal = 1;
            break;
          default:
            ifAntal = 0;
            break;
        }

        assist.push({
          ArtNr: this.finalResultArrObjects[frao].ArtNr,
          Benämning: this.finalResultArrObjects[frao].Benämning,
          GS1: this.finalResultArrObjects[frao].GS1,
          Vikt: this.finalResultArrObjects[frao].Vikt,
          Pris: this.finalResultArrObjects[frao].Pris,
          Antal: ifAntal * ant,
        });
      }

      this.finalResult.push(assist);
    },
    calculateIt() {
      if (this.colorName == "black") {
        this.cheker(this.laglutandeCountMatrialsSChecker);
      } else {
        this.cheker(this.laglutandeCountMatrialsVChecker);
      }

      this.finalResult = [];
      this.finalCalc = [];
      this.TotalFinalResult = [];

      for (let lcm in this.laglutandeCountMatrial) {
        var a = this.laglutandeCountMatrial[lcm].AntalPneler;
        var b = this.laglutandeCountMatrial[lcm].AntalRaderMedPaneler;
        var ant = this.laglutandeCountMatrial[lcm].AntalAvDennaKonfigurationen;

        this.calculateAntal(a, b, ant);

        this.finalCalc.push({
          tAntal: a * b * ant,

          tPris:
            Math.round(
              100 *
                this.finalResult[lcm].reduce(
                  (acc, item) => acc + item.Pris * item.Antal,
                  0
                )
            ) / 100,

          tVikt:
            Math.round(
              100 *
                this.finalResult[lcm].reduce(
                  (acc, item) => acc + item.Vikt * item.Antal,
                  0
                )
            ) / 100,
        });
      }
      this.totalFinalCalc = {};
      this.totalFinalCalc = {
        tAntal: this.finalCalc.reduce((acc, item) => acc + item.tAntal, 0),
        tPris: this.finalCalc.reduce((acc, item) => acc + item.tPris, 0),
        tVikt: this.finalCalc.reduce((acc, item) => acc + item.tVikt, 0),
      };

      for (let fr0 in this.finalResult[0]) {
        let rowTotal = 0;

        for (let fr in this.finalResult) {
          rowTotal += this.finalResult[fr][fr0].Antal;
        }

        this.TotalFinalResult.push({
          ArtNr: this.finalResult[0][fr0].ArtNr,
          Benämning: this.finalResult[0][fr0].Benämning,
          GS1: this.finalResult[0][fr0].GS1,
          Vikt: this.finalResult[0][fr0].Vikt,
          Pris: this.finalResult[0][fr0].Pris,
          Antal: rowTotal,
        });
      }
    },

    exportToPDF() {
      html2pdf(document.getElementById("element-to-pdf"), {
        margin: 1,
        filename: "i-was-html.pdf",
      });
    },
    mapPointer(event) {
      this.offsetX = event.offsetX - 2;
      this.offsetY = event.offsetY - 2;
      this.getSnoAndVind();
    },
  },
};
</script>

<template>
  <main>
    <div class="multi_elements">
      <div
        :class="['selection', isLaglutand ? ' selection-pre' : '']"
        @click="goParallella"
      >
        <img src="" alt="" /> Låglutande system
      </div>
      <div
        :class="['selection', !isLaglutand ? '  selection-pre' : '']"
        @click="goLaglutand"
      >
        <img src="" alt="" /> Parallella system
      </div>
    </div>

    <div v-if="isLaglutand" id="Laglutande">
      <h2>Inställningar</h2>

      <div class="p1">
        <div class="p2">
          labelAvstånd mellan fästen <br />

          <div class="measurement">
            <input type="number" v-model="AvstandMellanFasten" /><span
              class="unit"
              >mm</span
            >
          </div>
        </div>
        <div class="p2">
          Ytbehandling <br />

          <label for="" class="color-selector" @click="colorName = 'gray'"
            >Varmförzinkat
            <div class="color-box varmforzinkat"></div>

            <input type="radio" name="color" value="gray" v-model="colorName" />
          </label>
          <label for="" class="color-selector" @click="colorName = 'black'"
            >Svartlackerat
            <div class="color-box svartlackerat"></div>

            <input
              type="radio"
              name="color"
              value="black"
              v-model="colorName"
              checked
            />
          </label>
        </div>
      </div>
      <hr />
      <br />

      <div v-for="(item, index) in laglutandeCountMatrial" v-bind:key="index">
        <h3>Konfiguration {{ index + 1 }}</h3>

        <div class="p1">
          <div class="p2">
            Antal paneler/rad <br />

            <div class="measurement">
              <input type="number" min="1" v-model="item.AntalPneler" /><span
                class="unit"
                >st</span
              >
            </div>
          </div>
          <div class="p2">
            Antal rader med paneler <br />

            <div class="measurement">
              <input
                type="number"
                min="1"
                v-model="item.AntalRaderMedPaneler"
              /><span class="unit"> st</span>
            </div>
          </div>
          <div class="p2">
            Antal av denna konfigurationen <br />

            <div class="measurement">
              <input
                type="number"
                min="1"
                v-model="item.AntalAvDennaKonfigurationen"
              /><span class="unit"> st</span>
            </div>
          </div>
          <div class="p-buttons">
            <button
              v-if="index + 1 == laglutandeCountMatrial.length"
              @click="
                laglutandeCountMatrial.push({
                  AntalPneler: 1,
                  AntalRaderMedPaneler: 1,
                  AntalAvDennaKonfigurationen: 1,
                })
              "
            >
              Lägg till ny konfiguration <span>+</span>
            </button>
            <button
              v-if="
                laglutandeCountMatrial.length == index + 1 &&
                laglutandeCountMatrial.length > 1
              "
              @click="
                laglutandeCountMatrial.pop();
                finalResult.pop();
                finalCalc.pop();
              "
            >
              Ta bort konfiguration <span>-</span>
            </button>
          </div>
        </div>
        <br />
        <hr />
      </div>

      <div class="calculate-button" @click="calculateIt">
        Visa konfiguration
      </div>

      <div v-if="finalResult.length > 0" class="results">
        <div v-for="(kon, indexKon) in finalResult" v-bind:key="indexKon">
          <div
            style="text-align: left; font-size: 2vw; margin: 3vw auto 0 auto"
          >
            <b> Konfiguration </b>{{ indexKon + 1 }}
          </div>
          <br />

          <b>Antal:</b>
          {{ laglutandeCountMatrial[indexKon].AntalAvDennaKonfigurationen }}
          <br />

          <b> Antal paneler:</b>
          {{
            laglutandeCountMatrial[indexKon].AntalPneler *
            laglutandeCountMatrial[indexKon].AntalRaderMedPaneler
          }}
          <br />

          <b>Vikt:</b> {{ finalCalc[indexKon].tVikt }} kg <br />
          <b>Pris:</b> {{ finalCalc[indexKon].tPris }} SEK <br />

          <table>
            <tr>
              <th>Antal</th>
              <th>ArtNr</th>
              <th>Benämning</th>
              <th>GS1</th>
              <th>Vikt/st</th>
              <th>Tot.vikt</th>
              <th>Pris/st</th>
              <th>Rabatt</th>
              <th>Totalt (exkl. moms)</th>
            </tr>
            <template v-for="(ii, indexii) in kon" v-bind:key="indexii">
              <tr v-if="ii.Antal > 0">
                <td>{{ ii.Antal }}</td>
                <td>{{ ii.ArtNr }}</td>
                <td>{{ ii.Benämning }}</td>
                <td>{{ ii.GS1 }}</td>
                <td>{{ ii.Vikt }} kg</td>
                <td>{{ Math.round(ii.Vikt * ii.Antal * 100) / 100 }} kg</td>
                <td>{{ ii.Pris }} SEK</td>
                <td>0</td>
                <td>{{ ii.Pris * ii.Antal }} SEK</td>
              </tr>
            </template>
          </table>
          <hr />
        </div>
        <hr />

        <div class="total-calc" id="element-to-pdf">
          <div style="text-align: center; font-size: 2vw; margin: 2vw auto">
            <b>Total</b>
          </div>

          <b>Antal paneler:</b> {{ totalFinalCalc.tAntal }} <br />

          <b>Vikt:</b> {{ Math.floor(totalFinalCalc.tVikt * 100) / 100 }} kg
          <br />
          <b>Pris:</b> {{ totalFinalCalc.tPris }} SEK <br />

          <table>
            <tr>
              <th>Antal</th>
              <th>ArtNr</th>
              <th>Benämning</th>
              <th>GS1</th>
              <th>Vikt/st</th>
              <th>Tot.vikt</th>
              <th>Pris/st</th>
              <th>Rabatt</th>
              <th>Totalt (exkl. moms)</th>
            </tr>
            <template
              v-for="(iii, indexiii) in TotalFinalResult"
              v-bind:key="indexiii"
            >
              <tr v-if="iii.Antal > 0">
                <td>{{ iii.Antal }}</td>
                <td>{{ iii.ArtNr }}</td>
                <td>{{ iii.Benämning }}</td>
                <td>{{ iii.GS1 }}</td>
                <td>{{ iii.Vikt }} kg</td>
                <td>{{ Math.round(iii.Vikt * iii.Antal * 100) / 100 }} kg</td>
                <td>{{ iii.Pris }} SEK</td>
                <td>0</td>
                <td>{{ iii.Pris * iii.Antal }} SEK</td>
              </tr>
            </template>
          </table>
        </div>
      </div>
      <button v-if="finalResult.length > 0" @click="exportToPDF">
        Ladda ner PDF
      </button>
    </div>

    <div v-if="!isLaglutand" id="Parallella">
      <div>
        <h2>Position</h2>

        Ange adress för att starta konfiguratorn
        <label for=""><input type="text" /></label>
        <div>
          <img
            src=""
            alt=""
            style="cursor: crosshair"
            @click="mapPointer($event)"
          />
          <div
            class="childpointer"
            :style="{ top: offsetY + 'px', left: offsetX + 'px' }"
          ></div>
        </div>

        <div class="p3">
          <label for=""
            >Snö <br />
            <div class="measurement">
              <input type="number" v-model="sno" /><span class="unit"
                >kN/m²</span
              >
            </div></label
          >
          <label for=""
            >Vind <br />
            <div class="measurement">
              <input type="number" v-model="vind" /><span class="unit"
                >m/s</span
              >
            </div></label
          >
        </div>
        <br />
        <br />
      </div>
      <div>
        <h2>Terräng och förutsättningar</h2>
        Terrängtyp Håll muspekaren över alternativen för att läsa mer om varje
        terrängtyp.
        <div class="Terrangtyp">
          <div
            @click="Terrängtyp = 0"
            :class="['selection', Terrängtyp == 0 ? '  selection-pre' : '']"
          >
            <img src="" alt="" />Havs- eller kustområde
            exponerat för öppet hav.
          </div>
          <div
            @click="Terrängtyp = 1"
            :class="['selection', Terrängtyp == 1 ? '  selection-pre' : '']"
          >
            <img src="" alt="" />Sjö eller plant och
            horisontellt område med försumbar vegetation och utan hinder.
          </div>
          <div
            @click="Terrängtyp = 2"
            :class="['selection', Terrängtyp == 2 ? '  selection-pre' : '']"
          >
            <img src="" alt="" />Område med låg vegetation som
            gräs och enstaka hinder (träd, byggnader) med minsta inbördes
            avstånd lika med 20 gånger hindrets höjd.
          </div>
          <div
            @click="Terrängtyp = 3"
            :class="['selection', Terrängtyp == 3 ? '  selection-pre' : '']"
          >
            <img src="" alt="" />Område täckt med vegetation
            eller byggnader eller med enstaka hinder med största inbördes
            avstånd lika med 20 gånger hindrets höjd (till exempel byar,
            förorter, skogsmark).
          </div>
          <div
            @click="Terrängtyp = 4"
            :class="['selection', Terrängtyp == 4 ? '  selection-pre' : '']"
          >
            <img src="" alt="" />Område där minst 15 % av arean
            är bebyggd och där byggnadernas medelhöjd är > 15 m.
          </div>
        </div>
        Förutsättningar Säkerhetsklass: 2 <br />

        Dimensionerande livslängd: 30 år
      </div>
      <div v-for="(i, index) in allTaken" v-bind:key="index">
        <taket :takNum="index" />
      </div>
      <div class="p-buttons">
        <button @click="allTaken++">Lägg till nytt tak <span>+</span></button>
        <button v-if="allTaken > 1" @click="allTaken--">
          Ta bort tak <span>-</span>
        </button>
      </div>
    </div>
  </main>
</template>

<style>
</style>
