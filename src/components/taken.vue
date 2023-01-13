<script >
import canvasD from "../components/canvas.vue";
var rootBrach = "/swemounttest";
import matrials from "../assets/matrials.json";

export default {
  components: {
    canvasD,
  },
  props: {
    takNum: Number,
  },

  data() {
    return {
      matrials: matrials,

      BetongpannorFotplatta: [
        "BF1400",
        "FP1400",
        "BU1200",
        "IS2450",
        "PL5050",
        "KL1000",
        "KL2000",
        "SS6190",
        "SS6191",
        "TS6310",
        "MA5111",
        "MA5102",
        "TS6301",
        "BU1201",
      ],
      BetongpannorLäktfäste: [
        "BF1400",
        "LF1400",
        "BU1200",
        "IS2450",
        "PL5050",
        "KL1000",
        "KL2000",
        "SS6190",
        "TS6310",
        "TS6301",
        "MA5111",
        "MA5104",
        "BU1201",
        "SS6191",
      ],
      TegelpannorFotplatta: [
        "TF1400",
        "FP1400",
        "BU1200",
        "BU1201",
        "IS2450",
        "PL5050",
        "KL1000",
        "KL2000",
        "SS6190",
        "TS6310",
        "TS6301",
        "MA5111",
        "MA5102",
        "SS6191",
      ],
      TegelpannorLäktfäste: [
        "TF1400",
        "LF1400",
        "BU1200",
        "BU1201",
        "IS2450",
        "PL5050",
        "KL1000",
        "KL2000",
        "SS6190",
        "TS6310",
        "TS6301",
        "MA5111",
        "MA5104",
        "SS6191",
      ],
      FalsatPlåttakKlicktakFalsfäste: [
        "FF1400",
        "IS2450",
        "PL5050",
        "KL1000",
        "KL2000",
        "SS6190",
        "MA5111",
        "MA5101",
        "SS6191",
      ],
      ProfileratPlåttakLångSkena: [
        "IS2450",
        "PL5050",
        "KL1000",
        "KL2000",
        "SS6190",
        "SS6191",
        "MA5111",
        "MA5101",
      ],
      TegelprofileratPlåttakLångSkena: [
        "IS2450",
        "PL5050",
        "KL1000",
        "KL2000",
        "SS6190",
        "SS6191",
        "MA5111",
        "MA5101",
      ],

      SlätaTakTätplåtSlät: [
        "CP1400",
        "IS2450",
        "PL5050",
        "KL1000",
        "KL2000",
        "TP3552",
        "VB1305",
        "MU1010",
        "GB0010",
        "SS6190",
        "SS6191",
        "MA5111",
        "MA1008",
        "MA5103",
        "MU1001",
      ],

      InfästningArr: [
        [
          {
            name: "Fotplatta",
            pic: `${rootBrach}/products/Fotplatta.jpg`,
          },

          {
            name: "Läktfäste",
            pic: `${rootBrach}/products/Läktfäste.jpg`,
          },
        ],
        [
          {
            name: "Fotplatta",
            pic: `${rootBrach}/products/Fotplatta.jpg`,
          },

          {
            name: "Läktfäste",
            pic: `${rootBrach}/products/Läktfäste.jpg`,
          },
        ],
        [
          {
            name: "Falsfäste",
            pic: `${rootBrach}/products/swemount15product.jpg`,
          },
        ],
        [
          {
            name: "Lång skena",
            pic: `${rootBrach}/products/swemount11product.jpg`,
          },
        ],
        [
          {
            name: "Lång skena",
            pic: `${rootBrach}/products/swemount11product.jpg`,
          },
        ],
        [
          {
            name: "Tätplåt slät",
            pic: `${rootBrach}/products/swemount13product.jpg`,
          },
        ],
      ],

      Bredd: 300,
      Höjd: 330,
      AvståndFalser: 0,
      AvståndToppar: 0,
      Material: "Stålplåt",
      colorName: "black",
      taktTyp: 0,
      Infästning: 0,
      TypAvTak: 0,
      nockhöjd: 0,
      Taklutning: 0,
      Takform: 0,
      Amatt: 5,
      Bmatt: 3,
      Cmatt: 2,
      PanelBredd: [1000],
      PanelHöjd: [1400],
      PanelVikt: [0],
      panelarCount: 0,
      showResult: false,
      finalResultArrObjects:[],
    };
  },

  computed:{
    selectedTak(){

console.log();


      if (this.taktTyp==0&&this.Infästning==0) {return this.BetongpannorFotplatta}
      if (this.taktTyp==0&&this.Infästning==1) {return this.BetongpannorLäktfäste}
      if (this.taktTyp==1&&this.Infästning==0) {return this.TegelpannorFotplatta}
      if (this.taktTyp==1&&this.Infästning==1) {return this.TegelpannorLäktfäste}
      if (this.taktTyp==2) {return this.FalsatPlåttakKlicktakFalsfäste}
      if (this.taktTyp==3) {return this.ProfileratPlåttakLångSkena}
      if (this.taktTyp==4) {return this.TegelprofileratPlåttakLångSkena}
      if (this.taktTyp==5) {return this.SlätaTakTätplåtSlät}
    }
  },

  methods: {
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
    deleteThisGroup(v) {
      this.PanelBredd.splice(v, 1);
      this.PanelHöjd.splice(v, 1);
      this.PanelVikt.splice(v, 1);
    },
    addNewGroup(v) {
      this.PanelBredd.push(1000);
      this.PanelHöjd.push(1400);
      this.PanelVikt.push(0);
    },

    passValues(v) {
      console.log(v[0]);
      console.log(v[0].length);
      let finTotal = 0;
      for (let i = 0; i < v[0].length; i++) {
        finTotal += v[0][i].length;
      }

this.cheker(this.selectedTak);

      this.showResult = true;
      this.panelarCount = finTotal;
    },
  },
};
</script>

<!------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
<template>
  <div class="second-head">
    <h1>{{ langIsSe ? "Taktäckning " : "Taktäckning " }} {{ takNum + 1 }}</h1>
    <hr />
  </div>

  <div class="Visual-select">
    <div
      :class="['selection', taktTyp == 0 ? '  selection-pre' : '']"
      @click="
        taktTyp = '0';
        Infästning = 0;
      "
    >
      <img
        :class="['imgs-selects ', taktTyp == 0 ? ' imgs-selects-active' : '']"
        src="/calc/Betongtakpannor.jpg"
        alt=""
      />

      <p>Betongpannor <span v-if="taktTyp == 0">&nbsp;&nbsp;&nbsp;&nbsp;<i  class="fa-solid fa-square-check white"></i> </span></p>
      <div :class="['p3', taktTyp != 0 ? 'hidden-div' : '']">
        <label for="">
          Bredd
          <div class="measurement">
            <input type="number" v-model="Bredd" class="input-short" /><span
              class="unit"
              >mm</span
            >
          </div></label
        >
        <label for=""
          >Höjd
          <div class="measurement">
            <input type="number" v-model="Höjd" class="input-short" /><span
              class="unit"
              >mm</span
            >
          </div></label
        >
      </div>
    </div>

    <div
      :class="['selection', taktTyp == 1 ? '  selection-pre' : '']"
      @click="
        taktTyp = '1';
        Infästning = 0;
      "
    >
      <img
        :class="['imgs-selects ', taktTyp == 1 ? ' imgs-selects-active' : '']"
        src="/calc/Tegeltakpannor.jpg"
        alt=""
      />

      <p>Tegelpannor <span v-if="taktTyp == 1">&nbsp;&nbsp;&nbsp;&nbsp;<i  class="fa-solid fa-square-check white"></i> </span></p>
      <div :class="['p3', taktTyp != 1 ? 'hidden-div' : '']">
        <label for=""
          >Bredd
          <div class="measurement">
            <input type="number" v-model="Bredd" class="input-short" /><span
              class="unit"
              >mm</span
            >
          </div></label
        >
        <label for=""
          >Höjd
          <div class="measurement">
            <input type="number" v-model="Höjd" class="input-short" /><span
              class="unit"
              >mm</span
            >
          </div></label
        >
      </div>
    </div>
    <div
      :class="['selection', taktTyp == 2 ? '  selection-pre' : '']"
      @click="
        taktTyp = '2';
        Infästning = 0;
      "
    >
      <img
        :class="['imgs-selects ', taktTyp == 2 ? ' imgs-selects-active' : '']"
        src="/calc/plåttak.jpg"
        alt=""
      />

      <p>Falsat plåttak/Klicktak <span v-if="taktTyp == 2">&nbsp;&nbsp;&nbsp;&nbsp;<i  class="fa-solid fa-square-check white"></i> </span></p>
      <div :class="['p3', taktTyp != 2 ? 'hidden-div' : '']">
        <label for=""
          >Avstånd falser
          <div class="measurement">
            <input
              type="number"
              v-model="AvståndFalser"
              class="input-short"
            /><span class="unit">mm</span>
          </div></label
        >
      </div>
    </div>
    <div
      :class="['selection', taktTyp == 3 ? ' selection-pre' : '']"
      @click="
        taktTyp = '3';
        Infästning = 0;
      "
    >
      <img
        :class="['imgs-selects ', taktTyp == 3 ? ' imgs-selects-active' : '']"
        src="/calc/Profilerat.jpg"
        alt=""
      />

      <p>Profilerat plåttak <span v-if="taktTyp == 3">&nbsp;&nbsp;&nbsp;&nbsp;<i  class="fa-solid fa-square-check white"></i> </span></p>

      <div :class="['p3', taktTyp != 3 ? 'hidden-div' : '']">
        <label for="">
          C-C Avstånd toppar
          <div>
            <input
              type="number"
              v-model="AvståndToppar"
              class="input-short"
            /><span class="unit">mm</span>
          </div>
        </label>
        <label for=""
          >Material
          <select class="q" v-model="Material">
            <option>Stålplåt</option>
            <option>Aluminiumplåt</option>
          </select></label
        >
      </div>
    </div>

    <div
      :class="['selection', taktTyp == 4 ? '  selection-pre' : '']"
      @click="
        taktTyp = '4';
        Infästning = 0;
      "
    >
      <img
        :class="['imgs-selects ', taktTyp == 4 ? ' imgs-selects-active' : '']"
        src="/calc/TegelprofileratPlåttak.jpg"
        alt=""
      />

      <p>Tegelprofilerat plåttak <span v-if="taktTyp == 4">&nbsp;&nbsp;&nbsp;&nbsp;<i  class="fa-solid fa-square-check white"></i> </span></p>
      <div :class="['p3', taktTyp != 4 ? 'hidden-div' : '']">
        <label for=""
          >C-C Avstånd toppar
          <div>
            <input
              type="number"
              v-model="AvståndToppar"
              class="input-short"
            /><span class="unit">mm</span>
          </div>
        </label>

        <label for=""
          >Material
          <select class="q" v-model="Material">
            <option>Stålplåt</option>
            <option>Aluminiumplåt</option>
          </select></label
        >
      </div>
    </div>
    <div
      :class="['selection', taktTyp == 5 ? '  selection-pre' : '']"
      @click="
        taktTyp = '5';
        Infästning = 0;
      "
    >
      <img
        :class="['imgs-selects ', taktTyp == 5 ? ' imgs-selects-active' : '']"
        src="/calc/SlätaTak.jpg"
        alt=""
      />
      <p>Släta tak <span v-if="taktTyp == 5">&nbsp;&nbsp;&nbsp;&nbsp;<i  class="fa-solid fa-square-check white"></i> </span></p>
    </div>
  </div>
  <div class="second-head">
    <h1>{{ langIsSe ? "Infästning " : "Infästning " }} {{ takNum + 1 }}</h1>
    <hr />
  </div>

  <div class="Visual-select">
    <div
      v-for="(i, index) in InfästningArr[taktTyp]"
      v-bind:key="index"
      :class="['selection', Infästning == index ? '  selection-pre' : '']"
      @click="Infästning = index"
    >
      <img
        :src="`${i.pic}`"
        alt=""
        :class="[
          'imgs-selects ',
          Infästning == index ? ' imgs-selects-active' : '',
        ]"
      />

      <!--<input
        type="radio"
        :name="'Infästning' + takNum"
        :value="index"
        v-model="Infästning"
      />-->

      <p>{{ i.name }} <span v-if="Infästning == index">&nbsp;&nbsp;&nbsp;&nbsp;<i  class="fa-solid fa-square-check white"></i> </span></p>
    </div>
  </div>

  <div class="second-head">
    <h1>
      {{ langIsSe ? "Typ av klammer " : "Typ av klammer " }} {{ takNum + 1 }}
    </h1>
    <hr />
  </div>

  <div class="Visual-select">
    <div class="selection selection-pre">
      <img
        src="/products/swemount9product.jpg"
        alt=""
        :class="['imgs-selects ', 1 ? ' imgs-selects-active' : '']"
      />

      <!--<input type="radio" :name="'klammer' + takNum" value="" checked />-->
      <p>Komplett <span >&nbsp;&nbsp;&nbsp;&nbsp;<i  class="fa-solid fa-square-check white"></i> </span></p>
    </div>
  </div>

  <div class="second-head">
    <h1>
      {{ langIsSe ? "Inställningar " : "Inställningar " }} {{ takNum + 1 }}
    </h1>
    <hr />
  </div>

  <div class="Visual-select">
    <div
      :class="['selection', colorName == 'gray' ? '  selection-pre' : '']"
      @click="colorName = 'gray'"
    >
      <div
        :class="[
          'imgs-selects color-box varmforzinkat',
          colorName == 'gray' ? ' imgs-selects-active' : '',
        ]"
      ></div>
      <p>Varmförzinkat <span v-if="colorName == 'gray'">&nbsp;&nbsp;&nbsp;&nbsp;<i  class="fa-solid fa-square-check white"></i> </span></p>
      <!--<input
        type="radio"
        :name="'color' + takNum"
        value="gray"
        v-model="colorName"
      />-->
    </div>
    <div
      :class="['selection', colorName == 'black' ? '  selection-pre' : '']"
      @click="colorName = 'black'"
    >
      <div
        :class="[
          'imgs-selects color-box svartlackerat',
          colorName == 'black' ? ' imgs-selects-active' : '',
        ]"
      ></div>
      <p>Svartlackerat <span v-if="colorName == 'black'">&nbsp;&nbsp;&nbsp;&nbsp;<i  class="fa-solid fa-square-check white"></i> </span></p>
      <!-- <input
        type="radio"
        :name="'color' + takNum"
        value="black"
        v-model="colorName"
        checked
      />-->
    </div>
  </div>

  <div style="max-width: 1920px">
    <div class="second-head">
      <h1>
        {{ langIsSe ? "Egenskaper för tak " : "Egenskaper för tak " }}
        {{ takNum + 1 }}
      </h1>
      <hr />
    </div>

    <h2>Typ av tak</h2>

    <div class="Visual-select" style="justify-content: center">
      <div
        @click="TypAvTak = 0"
        :class="['selection', TypAvTak == 0 ? '  selection-pre' : '']"
      >
        <img
          src="/calc/Pulpet.jpg"
          alt=""
          :class="[
            'imgs-selects ',
            TypAvTak == 0 ? ' imgs-selects-active' : '',
          ]"
        />
        <p>Pulpet <span v-if="TypAvTak == 0">&nbsp;&nbsp;&nbsp;&nbsp;<i  class="fa-solid fa-square-check white"></i> </span></p>
      </div>
      <div
        @click="TypAvTak = 1"
        :class="['selection', TypAvTak == 1 ? '  selection-pre' : '']"
      >
        <img
          src="/calc/Sadel.jpg"
          alt=""
          :class="[
            'imgs-selects ',
            TypAvTak == 1 ? ' imgs-selects-active' : '',
          ]"
        />
        <p>Sadel <span v-if="TypAvTak == 1">&nbsp;&nbsp;&nbsp;&nbsp;<i  class="fa-solid fa-square-check white"></i> </span></p>
      </div>
      <div
        @click="TypAvTak = 2"
        :class="['selection', TypAvTak == 2 ? '  selection-pre' : '']"
      >
        <img
          src="/calc/Motfalls.jpg"
          alt=""
          :class="[
            'imgs-selects ',
            TypAvTak == 2 ? ' imgs-selects-active' : '',
          ]"
        />
        <p>Motfalls <span v-if="TypAvTak == 2">&nbsp;&nbsp;&nbsp;&nbsp;<i  class="fa-solid fa-square-check white"></i> </span></p>
      </div>
    </div>

    <div class="p3 middle-inputs">
      <label for=""
        >Byggnadens nockhöjd <br />
        <div class="measurement">
          <input type="number" v-model="nockhöjd" /><span class="unit">m</span>
        </div></label
      >
      <label for=""
        >Taklutning (1-75° endast heltal) <br />
        <div class="measurement">
          <input type="number" v-model="Taklutning" /><span class="unit"
            >grader</span
          >
        </div></label
      >
    </div>
    <div class="second-head">
      <h1>
        {{
          langIsSe
            ? "Takform på tilltänkt taksida "
            : "Takform på tilltänkt taksida "
        }}
        {{ takNum + 1 }}
      </h1>
      <hr />
    </div>

    <div class="Visual-select shapes-style">
      <div
        @click="Takform = 0"
        :class="['selection', Takform == 0 ? '  selection-pre' : '']"
      >
        <img
          src="/shapes/Rektangel.png"
          alt=""
          :class="['imgs-selects ', Takform == 0 ? ' imgs-selects-active' : '']"
        />
        <p>Rektangel <span v-if="Takform == 0">&nbsp;&nbsp;&nbsp;&nbsp;<i  class="fa-solid fa-square-check white"></i> </span></p>
      </div>
      <div
        @click="Takform = 1"
        :class="['selection', Takform == 1 ? '  selection-pre' : '']"
      >
        <img
          src="/shapes/Vinkel_1.png"
          alt=""
          :class="['imgs-selects ', Takform == 1 ? ' imgs-selects-active' : '']"
        />
        <p>Vinkel 1 <span v-if="Takform == 1">&nbsp;&nbsp;&nbsp;&nbsp;<i  class="fa-solid fa-square-check white"></i> </span></p>
      </div>
      <div
        @click="Takform = 2"
        :class="['selection', Takform == 2 ? '  selection-pre' : '']"
      >
        <img
          src="/shapes/Vinkel_2.png"
          alt=""
          :class="['imgs-selects ', Takform == 2 ? ' imgs-selects-active' : '']"
        />
        <p>Vinkel 2 <span v-if="Takform == 2">&nbsp;&nbsp;&nbsp;&nbsp;<i  class="fa-solid fa-square-check white"></i> </span></p>
      </div>
      <div
        @click="Takform = 3"
        :class="['selection', Takform == 3 ? '  selection-pre' : '']"
      >
        <img
          src="/shapes/Romb_1.png"
          alt=""
          :class="['imgs-selects ', Takform == 3 ? ' imgs-selects-active' : '']"
        />
        <p>Romb 1 <span v-if="Takform == 3">&nbsp;&nbsp;&nbsp;&nbsp;<i  class="fa-solid fa-square-check white"></i> </span></p>
      </div>
      <div
        @click="Takform = 4"
        :class="['selection', Takform == 4 ? '  selection-pre' : '']"
      >
        <img
          src="/shapes/Romb_2.png"
          alt=""
          :class="['imgs-selects ', Takform == 4 ? ' imgs-selects-active' : '']"
        />
        <p>Romb 2 <span v-if="Takform == 4">&nbsp;&nbsp;&nbsp;&nbsp;<i  class="fa-solid fa-square-check white"></i> </span></p>
      </div>
      <div
        @click="Takform = 5"
        :class="['selection', Takform == 5 ? '  selection-pre' : '']"
      >
        <img
          src="/shapes/Trapets_1.png"
          alt=""
          :class="['imgs-selects ', Takform == 5 ? ' imgs-selects-active' : '']"
        />
        <p>Trapets 1 <span v-if="Takform == 5">&nbsp;&nbsp;&nbsp;&nbsp;<i  class="fa-solid fa-square-check white"></i> </span></p>
      </div>
      <div
        @click="Takform = 6"
        :class="['selection', Takform == 6 ? '  selection-pre' : '']"
      >
        <img
          src="/shapes/Trapets_2.png"
          alt=""
          :class="['imgs-selects ', Takform == 6 ? ' imgs-selects-active' : '']"
        />
        <p>Trapets 2 <span v-if="Takform == 6">&nbsp;&nbsp;&nbsp;&nbsp;<i  class="fa-solid fa-square-check white"></i> </span></p>
      </div>
    </div>

    <div>
      <div>
        <div class="second-head">
          <h1>
            {{ langIsSe ? "Ange mått för taksida " : "Ange mått för taksida " }}
            {{ takNum + 1 }}
          </h1>
          <hr />
        </div>

        <img
          v-bind:src="'/swemounttest/shapes/' + (Takform + 1) + '.png'"
          alt=""
          class="shape-big-photo"
        />
        <div class="p3 middle-inputs-wider" style="display: flex">
          <label for=""
            >A <br />
            <div class="measurement">
              <input class="input-short" type="number" v-model="Amatt" /><span
                class="unit"
                >m</span
              >
            </div></label
          >
          <label for=""
            >B<br />
            <div class="measurement">
              <input class="input-short" type="number" v-model="Bmatt" /><span
                class="unit"
                >m</span
              >
            </div></label
          >
          <label for="" v-if="!Takform == 0"
            >C <br />
            <div class="measurement">
              <input class="input-short" type="number" v-model="Cmatt" /><span
                class="unit"
                >m</span
              >
            </div></label
          >
        </div>
      </div>
      <div
        class="panel-storlek"
        v-for="(i, index) in PanelBredd"
        v-bind:key="index"
      >
        <div class="second-head" style="margin: 0">
          <h2 style="text-align: left">Panelstorlek {{ index + 1 }}</h2>
          <hr style="margin: 0; width: 10%" />
        </div>

        <p></p>
        <div class="p3 middle-inputs-wider" style="display: flex">
          <label for=""
            >Bredd <br />
            <div class="measurement">
              <input
                class="input-short"
                type="number"
                v-model="PanelBredd[index]"
              /><span class="unit">mm</span>
            </div></label
          >
          <label for=""
            >Höjd<br />
            <div class="measurement">
              <input
                class="input-short"
                type="number"
                v-model="PanelHöjd[index]"
              /><span class="unit">mm</span>
            </div></label
          >
          <label for=""
            >Vikt per panel <br />
            <div class="measurement">
              <input
                class="input-short"
                type="number"
                v-model="PanelVikt[index]"
              /><span class="unit">kg</span>
            </div></label
          >
        </div>
      </div>
    </div>
  </div>

  <div class="divElem">
    <canvasD
      :A="Amatt * 100"
      :B="Bmatt * 100"
      :C="Cmatt * 100"
      :shape="Takform"
      :bredd="PanelBredd"
      :hojd="PanelHöjd"
      :vikt="PanelVikt"
      :nockhojd="nockhöjd"
      :typTak="TypAvTak"
      :canvasNum="takNum"
      @values="passValues"
      @newGroup="addNewGroup"
      @deleteGroup="deleteThisGroup"
    />
  </div>

  <div v-if="showResult" class="konfiguration-info"> 
  <div style="display:flex;">
  <div class="second-head" style="margin: 0; "> 
        <h2 style="text-align: left; margin-top: 0;"> Konfiguration  {{ takNum +1 }}</h2>
   <hr style="margin:0; ">
  </div>

  <div>
    <ul><li>Antal: 1</li>
    <li>Antal paneler: {{ panelarCount }}</li>
    <li>Vikt: 708.88 kg</li>
    <li>Pris: 84962 SEK</li></ul>
  





</div>
</div>
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
    <template v-for="(ii, indexii) in finalResultArrObjects" v-bind:key="indexii">
      <tr v-if="ii.Antal > -1">
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
</div>
</template>

<style scoped>
.divElem {
  max-width: 1140px;
  margin: 0 auto;
}

@media screen and (min-width: 414px) {

  main {
    margin: 0 auto;
  }
  .multi_elements {
    display: flex;
    max-width: 1920px;
    margin-top: 8.072916667vw;
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
    margin: 0;
    margin-right: 2vw;
  }

  .selection p {
    font-family: "Montserrat-bold";
    text-align: center;
    width: 90%;
    margin-top: 2vw;
    padding: 0.5vw;
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

  .position-body {
    display: flex;
    margin-top: 5vw;
    width: 65.625vw;
  }

  .google-map {
    width: 33.75vw;
    height: 33.75vw;
  }
  input {
    width: 24.21875vw;
    padding: 0.5vw;
    border-radius: 0.9vw;
    margin-left: auto;
    margin-right: auto;
  }
  .input-short {
    width: 4.583333333vw;
  }
  .unit {
    background-color: #22326c;
    color: #fcb324;
    padding: 0.5vw 1vw;
    border-radius: 1vw;
  }

  .p3 {
    width: 105%;
    margin-top: 2vw;
    border-right: #707070 solid 1px;
    border-left: #707070 solid 1px;
    padding: 0 0.5vw;
  }
  .p3 label {
    font-family: "Montserrat-bold";
    display: flex;
    flex-direction: column;
  }

  .p3 label > div {
    justify-content: flex-start;
    margin: 0;
  }
  .p3 label > div input {
    margin: 0.5vw 3vw 0.5vw 0;
  }
  .Visual-select {
    display: flex;
    justify-content: flex-start;
    margin-top: 5vw;
    width: 85.15625vw;
  }
  .shapes-style {
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 2vw;
  }
  .shapes-style img {
    width: 14.0625vw;

    height: 7.083333333vw;
  }

  .imgs-selects {
    width: 11.97916667vw;
    height: 11.97916667vw;

    box-shadow: 0.5vw -0.5vw 0px 0vw #fcb324;
    border: 1px solid #707070;
  }

  .imgs-selects-active {
    box-shadow: 0.5vw -0.5vw 0px 0vw #22326c;
  }

  .discreption {
    display: none;
    background-color: #22326c;
    color: #fff;
    position: absolute;
    padding: 1vw;
    width: 90%;
    top: 110%;
  }

  .discreption:before {
    content: "";
    position: absolute;
    right: 85px;
    top: -15px;
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 0 15px 15px 15px;
    border-color: transparent transparent #22326c transparent;
  }

  .selection:hover .discreption {
    display: block;
  }

  .q {
    padding: 0.5vw;
    margin-top: 0.5vw;
    margin-left: 0;
  }
  .svartlackerat {
    background-color: #010204;
  }

  .varmforzinkat {
    background-color: #979ba4;
  }
  .color-box {
    width: 11.97916667vw;
    height: 11.97916667vw;
  }

  h2 {
    margin-top: 4vw;
  }
  .middle-inputs {
    width: 35vw;
    border: 0;
  }

  .middle-inputs-wider {
    width: 62.5vw;
    border: 0;
  }
  .shape-big-photo {
    width: 27.39583333vw;
    height: 17.08333333vw;
    margin: 0 auto;
    display: block;
  }
  .panel-storlek {
    width: 25vw;
    margin: 0 0 0 20vw;
  }

  .second-head {
    margin-top: 0vw;
  }

  .second-head h1 {
    color: #22326c;
    margin-top: 4.5vw;
  }

  .konfiguration-info{
    width:80vw;

  }
  .konfiguration-info>div{
    display: flex;
    align-items: center;
    justify-content: flex-end;
gap: 1vw;  

}
.konfiguration-info>div div{
margin: 0;
  width:50%;
}

.konfiguration-info>div li{
margin: 0;
  width:50%;
font-family: "Montserrat-bold";
}


}

/***********************************************************************************************************************/
@media screen and (min-width: 1201px) {
  main {
    margin: 0;
  }
  .multi_elements {

    display: flex;
    margin-top: 96.875px;
  }
  .multi_elements > div {
    display: flex;
  }

  .multi_elements > div > img {
    width: 256.25px;
  }

  .selection {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    position: relative;
    margin: 0;
    margin-right: 24px;
  }

  .selection p {
    font-family: "Montserrat-bold";
    text-align: center;
    width: 90%;
    margin-top: 24px;
    padding: 6px;
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

  .position-body {
    display: flex;
    margin-top: 60px;
    width: 787.5px;
  }

  .google-map {
    width: 405px;
    height: 405px;
  }
  input {
    width: 290.625px;
    padding: 6px;
    border-radius: 10.8px;
    margin-left: auto;
    margin-right: auto;
  }
  .input-short {
    width: 55px;
  }
  .unit {
    background-color: #22326c;
    color: #fcb324;
    padding: 6px 12px;
    border-radius: 12px;
  }

  .p3 {
    width: 105%;
    margin-top: 24px;
    border-right: #707070 solid 1px;
    border-left: #707070 solid 1px;
    padding: 0 6px;
  }
  .p3 label {
    font-family: "Montserrat-bold";
    display: flex;
    flex-direction: column;
  }

  .p3 label > div {
    justify-content: flex-start;
    margin: 0;
  }
  .p3 label > div input {
    margin: 6px 36px 6px 0;
  }
  .Visual-select {
    display: flex;
    justify-content: flex-start;
    margin-top: 60px;
    width: 1021.875px;
  }
  .shapes-style {
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 24px;
  }
  .shapes-style img {
    width: 168.75px;

    height: 85px;
  }

  .imgs-selects {
    width: 143.75px;
    height: 143.75px;

    box-shadow: 6px -6px 0px 0px #fcb324;
    border: 1px solid #707070;
  }

  .imgs-selects-active {
    box-shadow: 6px -6px 0px 0px #22326c;
  }

  .discreption {
    display: none;
    background-color: #22326c;
    color: #fff;
    position: absolute;
    padding: 12px;
    width: 90%;
    top: 110%;
  }

  .discreption:before {
    content: "";
    position: absolute;
    right: 85px;
    top: -15px;
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 0 15px 15px 15px;
    border-color: transparent transparent #22326c transparent;
  }

  .selection:hover .discreption {
    display: block;
  }

  .q {
    padding: 6px;
    margin-top: 6px;
    margin-left: 0;
  }
  .svartlackerat {
    background-color: #010204;
  }

  .varmforzinkat {
    background-color: #979ba4;
  }
  .color-box {
    width: 143.75px;
    height: 143.75px;
  }

  h2 {
    margin-top: 48px;
  }
  .middle-inputs {
    width: 420px;
    border: 0;
  }

  .middle-inputs-wider {
    width: 750px;
    border: 0;
  }
  .shape-big-photo {
    width: 328.75px;
    height: 205px;
    margin: 0 auto;
    display: block;
  }
  .panel-storlek {
    width: 300px;
    margin: 0 0 0 240px;
  }

  .second-head {
    margin-top: 0px;
  }

  .second-head h1 {
    color: #22326c;
    margin-top: 54px;
  }

  .konfiguration-info{
    width:960px;

  }
  .konfiguration-info>div{
    display: flex;
    align-items: center;
    justify-content: flex-end;
gap: 12px;  

}
.konfiguration-info>div div{
margin: 0;
  width:50%;
}

.konfiguration-info>div li{
margin: 0;
  width:50%;
font-family: "Montserrat-bold";
}


}
</style>