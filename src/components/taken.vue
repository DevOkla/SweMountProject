<script >
import canvasD from "../components/canvas.vue";

export default {
  components: {
    canvasD,
  },
  props: {
    takNum: Number,
  },

  data() {
    return {
      InfästningArr: [
        [
          {
            name: "Fotplatta",
            pic: "betong_fotplatta-be00003111-small.jpg",
          },

          {
            name: "Läktfäste",
            pic: "159_pim.jpg",
          },
        ],
        [
          {
            name: "Fotplatta",
            pic: "tegel_fotplatta-be00003118-small.jpg",
          },

          {
            name: "Läktfäste",
            pic: "tegel_laektfaeste-be00003119-small.jpg",
          },
        ],
        [
          {
            name: "Falsfäste",
            pic: "falsfaeste-be00003739-small.jpg",
          },
        ],
        [
          {
            name: "Lång skena",
            pic: "laang_skena-be00003117-small.jpg",
          },

          {
            name: "Kort skena",
            pic: "kort_skena-be00003116-small.jpg",
          },
        ],
        [
          {
            name: "Lång skena",
            pic: "laang_skena-be00003117-small.jpg",
          },
        ],
        [
          {
            name: "Tätplåt förhöjd",
            pic: "taetplaat_foerhoejd-be00003120-small.jpg",
          },
          {
            name: "Tätplåt slät",
            pic: "taetplaat_foerhoejd-be00003120-small.jpg",
          },
          {
            name: "Tätplåt perforerad",
            pic: "tatplat_perforerad_TP3924-be00003198-small.jpg",
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
    };
  },

  methods: {
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

      this.panelarCount = finTotal;
    },
  },
};
</script>


<template>
  <h2>Taktäckning {{ takNum + 1 }}</h2>

  <div class="Visual-select">
    <div
      :class="['selection', taktTyp == 0 ? '  selection-pre' : '']"
      @click="
        taktTyp = '0';
        Infästning = 0;
      "
    >
      <img src="takskydd_betong.jpg" alt="" />
      <input
        type="radio"
        :name="'Takt' + takNum"
        value="0"
        v-model="taktTyp"
        checked
      />

      Betongpannor
      <div class="measurement">
        <label for="">
          <p>Bredd</p>
          <div class="measurement">
            <input type="number" v-model="Bredd" /><span class="unit">mm</span>
          </div></label
        >
        <label for=""
          ><p>Höjd</p>
          <div class="measurement">
            <input type="number" v-model="Höjd" /><span class="unit">mm</span>
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
      <img src="takskydd_tegel.jpg" alt="" />

      <input type="radio" :name="'Takt' + takNum" value="1" v-model="taktTyp" />

      Tegelpannor
      <div class="measurement">
        <label for=""
          ><p>Bredd</p>
          <div class="measurement">
            <input type="number" v-model="Bredd" /><span class="unit">mm</span>
          </div></label
        >
        <label for=""
          ><p>Höjd</p>
          <div class="measurement">
            <input type="number" v-model="Höjd" /><span class="unit">mm</span>
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
      <img src="takskydd_falsat.jpg" alt="" />

      <input type="radio" :name="'Takt' + takNum" value="2" v-model="taktTyp" />
      Falsat plåttak/Klicktak
      <div class="measurement">
        <label for=""
          >Avstånd falser
          <div class="measurement">
            <input type="number" v-model="AvståndFalser" /><span class="unit"
              >mm</span
            >
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
      <img src="takskydd_profilerad_plat.jpg" alt="" />

      <input type="radio" :name="'Takt' + takNum" value="3" v-model="taktTyp" />

      Profilerat plåttak

      <div class="measurement">
        <label for="">
          <p>C-C Avstånd toppar</p>
          <div class="measurement">
            <input type="number" v-model="AvståndToppar" /><span class="unit"
              >mm</span
            >
          </div></label
        >
        <label for=""
          ><p>Material</p>
          <select v-model="Material">
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
      <img src="takskydd_tegelprofilerad_plat.jpg" alt="" />

      <input type="radio" :name="'Takt' + takNum" value="4" v-model="taktTyp" />
      Tegelprofilerat plåttak
      <div class="measurement">
        <label for=""
          ><p>C-C Avstånd toppar</p>
          <div class="measurement">
            <input type="number" v-model="AvståndToppar" /><span class="unit"
              >mm</span
            >
          </div></label
        >

        <label for=""
          ><p>Material</p>
          <select v-model="Material">
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
      <img src="takskydd_slat.jpg" alt="" />
      <input type="radio" :name="'Takt' + takNum" value="5" v-model="taktTyp" />
      Släta tak
    </div>
  </div>
  <h2>Infästning</h2>

  <div class="Visual-select">
    <div
      v-for="(i, index) in InfästningArr[taktTyp]"
      v-bind:key="index"
      :class="['selection', Infästning == index ? '  selection-pre' : '']"
      @click="Infästning = index"
    >
      <img :src="`${i.pic}`" alt="" />

      <input
        type="radio"
        :name="'Infästning' + takNum"
        :value="index"
        v-model="Infästning"
      />

      {{ i.name }}
    </div>
  </div>
  <h2>Typ av klammer</h2>

  <div class="Visual-select">
    <div class="selection selection-pre">
      <img src="156_pim.jpg" alt="" />

      <input type="radio" :name="'klammer' + takNum" value="" checked />
      Komplett
    </div>
  </div>
  <h2>Inställningar</h2>
  <div class="Visual-select">
    Ytbehandling <br />

    <label for="" class="color-selector" @click="colorName = 'gray'"
      >Varmförzinkat
      <div class="color-box varmforzinkat"></div>

      <input
        type="radio"
        :name="'color' + takNum"
        value="gray"
        v-model="colorName"
      />
    </label>
    <label for="" class="color-selector" @click="colorName = 'black'"
      >Svartlackerat
      <div class="color-box svartlackerat"></div>

      <input
        type="radio"
        :name="'color' + takNum"
        value="black"
        v-model="colorName"
        checked
      />
    </label>
  </div>

  <div>
    <h2>Egenskaper för tak</h2>
    Typ av tak

    <div class="Terrangtyp smaller-pic">
      <div
        @click="TypAvTak = 0"
        :class="['selection', TypAvTak == 0 ? '  selection-pre' : '']"
      >
        <img src="pulpet.png" alt="" />Pulpet
      </div>
      <div
        @click="TypAvTak = 1"
        :class="['selection', TypAvTak == 1 ? '  selection-pre' : '']"
      >
        <img src="sadel.png" alt="" />Sadel
      </div>
      <div
        @click="TypAvTak = 2"
        :class="['selection', TypAvTak == 2 ? '  selection-pre' : '']"
      >
        <img src="motfals.png" alt="" />Motfalls
      </div>
    </div>

    <div class="p3">
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
    Takform på tilltänkt taksida

    <div class="Terrangtyp">
      <div
        @click="Takform = 0"
        :class="['selection', Takform == 0 ? '  selection-pre' : '']"
      >
        <img src="Rektangel.png" alt="" />Rektangel
      </div>
      <div
        @click="Takform = 1"
        :class="['selection', Takform == 1 ? '  selection-pre' : '']"
      >
        <img src="Vinkel_1.png" alt="" />Vinkel 1
      </div>
      <div
        @click="Takform = 2"
        :class="['selection', Takform == 2 ? '  selection-pre' : '']"
      >
        <img src="Vinkel_2.png" alt="" />Vinkel 2
      </div>
      <div
        @click="Takform = 3"
        :class="['selection', Takform == 3 ? '  selection-pre' : '']"
      >
        <img src="Romb_1.png" alt="" />Romb 1
      </div>
      <div
        @click="Takform = 4"
        :class="['selection', Takform == 4 ? '  selection-pre' : '']"
      >
        <img src="Romb_2.png" alt="" />Romb 2
      </div>
      <div
        @click="Takform = 5"
        :class="['selection', Takform == 5 ? '  selection-pre' : '']"
      >
        <img src="Trapets_1.png" alt="" />Trapets 1
      </div>
      <div
        @click="Takform = 6"
        :class="['selection', Takform == 6 ? '  selection-pre' : '']"
      >
        <img src="Trapets_2.png" alt="" />Trapets 2
      </div>
    </div>

    <div>
      <div>
        <img
          v-bind:src="'mått/' + (Takform + 1) + '.png'"
          alt=""
          style="margin: 0 auto; display: block"
        />
        <div class="p3">
          <label for=""
            >A <br />
            <div class="measurement">
              <input type="number" v-model="Amatt" /><span class="unit">m</span>
            </div></label
          >
          <label for=""
            >B<br />
            <div class="measurement">
              <input type="number" v-model="Bmatt" /><span class="unit">m</span>
            </div></label
          >
          <label for="" v-if="!Takform == 0"
            >C <br />
            <div class="measurement">
              <input type="number" v-model="Cmatt" /><span class="unit">m</span>
            </div></label
          >
        </div>
      </div>
      <div v-for="(i, index) in PanelBredd" v-bind:key="index">
        <br />
        <br />

        <p>
          <b>Panelstorlek {{ index + 1 }}</b>
        </p>
        <div class="p3">
          <label for=""
            >Bredd <br />
            <div class="measurement">
              <input type="number" v-model="PanelBredd[index]" /><span
                class="unit"
                >mm</span
              >
            </div></label
          >
          <label for=""
            >Höjd<br />
            <div class="measurement">
              <input type="number" v-model="PanelHöjd[index]" /><span
                class="unit"
                >mm</span
              >
            </div></label
          >
          <label for=""
            >Vikt per panel <br />
            <div class="measurement">
              <input type="number" v-model="PanelVikt[index]" /><span
                class="unit"
                >kg</span
              >
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

  <div>{{ panelarCount }}</div>
</template>

<style scoped>
.divElem {
  max-width: 1140px;
  margin: auto;
}
</style>