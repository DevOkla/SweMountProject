<script >
import html2pdf from "html2pdf.js";
import axios from "axios";
import taket from "./taken.vue";
import matrials from "../assets/matrials.json";
import proj4 from 'proj4';

export default {
  components: {
    taket,
  },

  data() {
    return {
      //////////////////////////////////////////////////////////////// variables
      center: {lat: 62.218112, lng: 14.977494},
      markers: [
        {
          position: {
            lat: 57.69867104470487, lng: 14.46878589846311
          },
        }
        , // Along list of clusters
      ],





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
  computed:{
    convertCoordinates() {
      proj4.defs("EPSG:3006","+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");

      const wgs84 = [this.markers[0].position.lng, this.markers[0].position.lat];
      const sweref99tm = proj4('EPSG:4326', 'EPSG:3006', wgs84);

      return sweref99tm;
    }

  },
  watch:{
    convertCoordinates: function() {
console.log("done");
      this.getSnoAndVind();
    }
  },
  mounted() {
    this.getSnoAndVind();
    //////////////////////////////////////////////////////////////////// import data
  },
  methods: {
    //////////////////////////////////////////////////////////////////// Functions

 
    //sets the position of marker when dragged
    getLatLng(event) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      this.markers[0].position={lat: lat , lng:lng}

    },

    setPlace(e) {
      const lat = e.geometry.location.lat();
      const lng = e.geometry.location.lng();
this.markers[0].position={lat: lat , lng:lng}
      console.log(e);

    },


    getSnoAndVind() {
      /*let klimatlastX =
        Math.floor((118181.8182 + (200000 / 66) * this.offsetX) * 1000) / 1000;
      let klimatlastY =
        Math.floor((8021212.1212 - (200000 / 66) * this.offsetY) * 1000) / 1000;
*/


      let klimatlastX =
      this.convertCoordinates[0];
      let klimatlastY =
      this.convertCoordinates[1];
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
</script>
<template>
  <main>
    <div class="multi_elements">
      <div
        :class="['selection', isLaglutand ? ' selection-pre' : '']"
        @click="goParallella"
      >
        <img src="/img/swemount14.jpg" alt=""  :class="['img-back-box', isLaglutand ? ' img-back-box-active' : '']"/>
        <p>Låglutande system <span v-if="isLaglutand">&nbsp;&nbsp;&nbsp;&nbsp;<i  class="fa-solid fa-square-check white"></i> </span></p>
      </div>
      <div
        :class="['selection', !isLaglutand ? '  selection-pre' : '']"
        @click="goLaglutand"
      >
        <img src="/img/swemount13.jpg" alt="" :class="['img-back-box', !isLaglutand ? ' img-back-box-active' : '']" />
        <p>Parallella system <span v-if="!isLaglutand">&nbsp;&nbsp;&nbsp;&nbsp;<i  class="fa-solid fa-square-check white"></i> </span></p>
      </div>
    </div>
   <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-->
    <div v-if="isLaglutand" style="display:none;" id="Laglutande">
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
   <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-->

    <div v-if="!isLaglutand" id="Parallella">
      <div>

      <div class="second-head"> 
        <h1>{{ langIsSe? "Position": "Position" }}</h1>
   <hr>
  </div>

<div class="position-body">
  <div>
       <p class="bold-font" style="text-align:center;">Ange adress för att starta konfiguratorn</p> 
        <label for="">  
          <GMapAutocomplete
       placeholder="Select address"
       :component-restrictions="{
        country: 'se'}"
       @place_changed="setPlace"
    >
  </GMapAutocomplete>
<!--<input type="text" />--></label>

        <div class="p3">
          <label for=""
            >Snö 
            <div class="measurement">
              <input type="number" v-model="sno" class="input-short" /><span class="unit"
                >kN/m²</span
              >
            </div></label
          >
          <label for=""
            >Vind <br />
            <div class="measurement">
              <input type="number" v-model="vind" class="input-short"/><span class="unit"
                >m/s</span
              >
            </div></label
          >
        </div>
      </div>
        <div>
          <GMapMap
      :center="center"
      :zoom="4"
      @click="getLatLng"
      :options="{
   zoomControl: true,
   mapTypeControl: false,
   scaleControl: false,
   streetViewControl: false,
   rotateControl: false,
   fullscreenControl: false,
   disableDefaultUi: true
 }"

      map-type-id="terrain"
      class="google-map"
  >
      <GMapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @dragend="getLatLng"

          :icon= '{
          url: "/swemounttest/logomarker.png",
          scaledSize: {width: 40, height: 40},
          labelOrigin: {x: 16, y: -10}
      }'
          @drag="handleMarkerDrag"
      @click="panToMarker"

      />
  </GMapMap>
          <div
            class="childpointer"
            :style="{ top: offsetY + 'px', left: offsetX + 'px' }"
          ></div>
        </div>
      </div>



      </div>


      <div>
      
        <div class="second-head"> 
        <h1>{{ langIsSe? "Terräng och förutsättningar": "Terräng och förutsättningar" }}</h1>
   <hr>
  </div>

      
        <p class="paragraphs">Terrängtyp Håll muspekaren över alternativen för att läsa mer om varje
        terrängtyp.</p>

        <div class="Terrangtyp">
          <div
            @click="Terrängtyp = 0"
            :class="['selection', Terrängtyp == 0 ? '  selection-pre' : '']"
          >
            <img src="/calc/1.jpg" alt="" :class="['imgs-selects', Terrängtyp == 0 ? ' imgs-selects-active' : '']" />
            <p>A <span v-if="Terrängtyp == 0">&nbsp;&nbsp;&nbsp;&nbsp;<i  class="fa-solid fa-square-check white"></i> </span></p>
            <div class="discreption">Havs- eller kustområde exponerat för
            öppet hav.</div>
          </div>
          <div
            @click="Terrängtyp = 1"
            :class="['selection', Terrängtyp == 1 ? '  selection-pre' : '']"
          >
            <img src="/calc/2.jpg" alt="" :class="['imgs-selects ', Terrängtyp == 1 ? ' imgs-selects-active' : '']" />
            <p>B <span v-if="Terrängtyp == 1">&nbsp;&nbsp;&nbsp;&nbsp;<i  class="fa-solid fa-square-check white"></i> </span></p>
            <div class="discreption">Sjö eller plant och horisontellt
            område med försumbar vegetation och utan hinder.
          </div></div>
          <div
            @click="Terrängtyp = 2"
            :class="['selection', Terrängtyp == 2 ? '  selection-pre' : '']"
          >
            <img src="/calc/3.jpg" alt="" :class="['imgs-selects ', Terrängtyp == 2 ? ' imgs-selects-active' : '']" />
            <p>C <span v-if="Terrängtyp == 2">&nbsp;&nbsp;&nbsp;&nbsp;<i  class="fa-solid fa-square-check white"></i> </span></p>
            <div class="discreption">Område med låg vegetation som gräs
            och enstaka hinder (träd, byggnader) med minsta inbördes avstånd
            lika med 20 gånger hindrets höjd.</div>
          </div>
          <div
            @click="Terrängtyp = 3"
            :class="['selection', Terrängtyp == 3 ? '  selection-pre' : '']"
          >
            <img src="/calc/4.jpg" alt="" :class="['imgs-selects ', Terrängtyp == 3 ? ' imgs-selects-active' : '']" />
            <p>D <span v-if="Terrängtyp == 3">&nbsp;&nbsp;&nbsp;&nbsp;<i  class="fa-solid fa-square-check white"></i> </span></p>
            <div class="discreption">Område täckt med vegetation eller
            byggnader eller med enstaka hinder med största inbördes avstånd lika
            med 20 gånger hindrets höjd (till exempel byar, förorter,
            skogsmark).</div>
          </div>
          <div
            @click="Terrängtyp = 4"
            :class="['selection', Terrängtyp == 4 ? '  selection-pre' : '']"
          >
            <img src="/calc/5.jpg" alt="" :class="['imgs-selects ', Terrängtyp == 4 ? ' imgs-selects-active' : '']" />
            <p>E <span v-if="Terrängtyp == 4">&nbsp;&nbsp;&nbsp;&nbsp;<i  class="fa-solid fa-square-check white"></i> </span></p>
            <div class="discreption">Område där minst 15 % av arean är
            bebyggd och där byggnadernas medelhöjd är > 15 m.</div>
          </div>
        </div>
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

<style scoped>

:root {
  --mw: 12px;
}


@media screen and (min-width: 414px) {
  main {
    margin: 0;
  }
  .multi_elements {
    display: flex;
    width: 58.33333333vw;
    margin-top: 16.66666667vw;
  }
  .multi_elements > div {
    display: flex;
  }

  .multi_elements > div > img {
    width: 21.35416667vw;
  }

  .selection {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    position: relative;

  }

  .selection p {
    font-family: "Montserrat-bold";
    text-align: center;
    width: 90%;
    margin-top: 2vw;
    padding: 1vw;
    background-color: #fcb324;
    color: #22326c;
  }
  .selection:hover p {
    background-color: #8F7348;
    color: #fff;
  }

  .selection-pre p {
    background-color: #22326c;
    color: #fff;
  }

  .position-body{
display: flex;
margin-top: 5vw;
width: 65.625vw;
  }


  .google-map{
    width: 33.75vw;
    height: 33.75vw;

  }
input{
  width: 24.21875vw;
  padding: 0.5vw;
border-radius: 0.9vw;
margin-left: auto;
margin-right: auto;
}
.input-short{
  width: 4.583333333vw;

}
.unit{
background-color: #22326c;
color: #fcb324;
padding: 0.5vw 1vw;
border-radius: 1vw;
}
.p3{
  margin-top: 5vw;
}
.p3 label{
  font-family: "Montserrat-bold";
display: flex;
flex-direction:column ;
}

.p3 label>div{
  justify-content:flex-start;
  margin: 0;
}
.p3 label>div input{
  margin: 0.5vw 3vw 0.5vw 0;
}
.Terrangtyp{
display: flex;
margin-top: 5vw;
width: 70.3125vw;
}
.imgs-selects{
  width:11.97916667vw;
  height:11.97916667vw;

  box-shadow: 0.5vw -0.5vw 0px 0vw #fcb324;
border: 1px solid #707070;
}

.imgs-selects-active{
  box-shadow: 0.5vw -0.5vw 0px 0vw #22326c;

}

.discreption{
  display: none;
  background-color: #22326c;
  color: #fff;
  position: absolute;
  padding: 1vw;
  width:90%; 
  top: 110%;

}

.discreption:before {
    content:"";
    position: absolute;
    right: 85px; 
    top: -15px; 
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 0 15px 15px 15px;
    border-color: transparent transparent #22326c transparent;
}



.selection:hover   .discreption{

  display: block;
}
.paragraphs{
text-align: center;
margin-top: 4vw;

margin-bottom: 0;
}
.p-buttons{
  width: 60vw;
}

}

/***********************************************************************************************************************/
@media screen and (min-width: 1201px) {

  .multi_elements {
    width: 700px;
    margin-top: 200px;
  }
  .multi_elements > div {
    display: flex;
  }
  .second-head{
    margin-top: 80px;
  }
  .multi_elements > div > img {
    width: 256.25px;
  }

  .selection {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    position: relative;

  }

  .selection p {
    font-family: "Montserrat-bold";
    text-align: center;
    width: 90%;
    margin-top: 24px;
    padding: 12px;
    background-color: #fcb324;
    color: #22326c;
  }
  .selection:hover p {
    background-color: #8F7348;
    color: #fff;
  }

  .selection-pre p {
    background-color: #22326c;
    color: #fff;
  }

  .position-body{
display: flex;
margin-top: 60px;
width: 787.5px;
  }


  .google-map{
    width: 405px;
    height: 405px;

  }
input{
  width: 290.625px;
  padding: 6px;
border-radius: 10.8px;
margin-left: auto;
margin-right: auto;
}
.input-short{
  width: 55px;

}
.unit{
background-color: #22326c;
color: #fcb324;
padding: 6px 12px;
border-radius: 12px;
}
.p3{
  margin-top: 60px;
}
.p3 label{
  font-family: "Montserrat-bold";
display: flex;
flex-direction:column ;
}

.p3 label>div{
  justify-content:flex-start;
  margin: 0;
}
.p3 label>div input{
  margin: 6px 4px 6px 0;
}
.Terrangtyp{
display: flex;
margin-top: 60px;
width: 843.75px;
}
.imgs-selects{
  width:143.75px;
  height:143.75px;

  box-shadow: 6px -6px 0px 0px #fcb324;
border: 1px solid #707070;
}

.imgs-selects-active{
  box-shadow: 6px -6px 0px 0px #22326c;

}

.discreption{
  display: none;
  background-color: #22326c;
  color: #fff;
  position: absolute;
  padding: 12px;
  width:90%; 
  top: 110%;

}

.discreption:before {
    content:"";
    position: absolute;
    right: 85px; 
    top: -15px; 
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 0 15px 15px 15px;
    border-color: transparent transparent #22326c transparent;
}



.selection:hover   .discreption{

  display: block;
}
.paragraphs{
text-align: center;
margin-top: 48px;

margin-bottom: 0;
}
.p-buttons{
  width: 720px;
}


}
</style>
