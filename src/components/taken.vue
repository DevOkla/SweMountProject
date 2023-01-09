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
      kon:[
      {
  "ArtNr": "LL1505",
  "Benämning": "Fäste låg 15gr låglutande system zm",
  "GS1": " -",
  "Vikt": 1.01,
  "Pris": 246,
  "Antal": 3
 },
 {
  "ArtNr": "LL1530",
  "Benämning": "Fäste hög 15gr låglutande system zm",
  "GS1": " - ",
  "Vikt": 1.6,
  "Pris": 360,
  "Antal": 4
 },
 {
  "ArtNr": "KL3050",
  "Benämning": "Ändklämma solsystem zm",
  "GS1": " -",
  "Vikt": 0.06,
  "Pris": 14,
  "Antal": 2
 },
 {
  "ArtNr": "TP3552",
  "Benämning": "Tätplåt slät 350x520mm zm",
  "GS1": 7340044703677,
  "Vikt": 2.5,
  "Pris": 284,
  "Antal": 1
 },
 {
  "ArtNr": "GB0010",
  "Benämning": "Gummibricka M10",
  "GS1": 7340044700348,
  "Vikt": 0.0025,
  "Pris": 6,
  "Antal": 5
 },
 {
  "ArtNr": "VB1305",
  "Benämning": "Bultsats 50st vagnsbult M10x30 vfz",
  "GS1": 7340044703905,
  "Vikt": 1.25,
  "Pris": 269,
  "Antal": 2
 },
 {
  "ArtNr": "VB1301",
  "Benämning": "Bultsats 10st vagnsbult M10x30 vfz",
  "GS1": 7340044703882,
  "Vikt": 0.25,
  "Pris": 66,
  "Antal": 1
 },
 {
  "ArtNr": "MU1010",
  "Benämning": "Muttersats 100st M10 vfz",
  "GS1": 7340044700874,
  "Vikt": 1.3,
  "Pris": 261,
  "Antal": 1
 },
 {
  "ArtNr": "MU1001",
  "Benämning": "Muttersats 10st M10 vfz",
  "GS1": 7340044700867,
  "Vikt": 0.13,
  "Pris": 30,
  "Antal": 4
 },
 {
  "ArtNr": "MA1008",
  "Benämning": "Monteringsanvisning Tätplåt 2 sidor",
  "GS1": " -",
  "Vikt": 0,
  "Pris": 0,
  "Antal": 2
 },
      ],




      InfästningArr: [
        [
          {
            name: "Fotplatta",
            pic: "/products/Fotplatta.jpg",
          },

          {
            name: "Läktfäste",
            pic: "/products/Läktfäste.jpg",
          },
        ],
        [
          {
            name: "Fotplatta",
            pic: "/products/Fotplatta.jpg",
          },

          {
            name: "Läktfäste",
            pic: "/products/Läktfäste.jpg",
          },
        ],
        [
          {
            name: "Falsfäste",
            pic: "/products/swemount15product.jpg",
          },
        ],
        [
          {
            name: "Lång skena",
            pic: "/products/swemount11product.jpg",
          },

        ],
        [
          {
            name: "Lång skena",
            pic: "/products/swemount11product.jpg",
          },
        ],
        [
          {
            name: "Tätplåt slät",
            pic: "/products/swemount13product.jpg",
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
      showResult:false,

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
      this.showResult=true;
      this.panelarCount = finTotal;
    },
  },
};
</script>

<!------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
<template>

<div class="second-head"> 
        <h1>{{ langIsSe? "Taktäckning ": "Taktäckning " }} {{ takNum + 1 }}</h1>
   <hr>
  </div>


  <div class="Visual-select">
    <div
      :class="['selection', taktTyp == 0 ? '  selection-pre' : '']"
      @click="
        taktTyp = '0';
        Infästning = 0;
      "
    >
      <img :class="['imgs-selects ', taktTyp == 0 ? ' imgs-selects-active' : '']" src="/calc/Betongtakpannor.jpg" alt="" />

      <p>Betongpannor</p>
      <div :class="['p3', taktTyp != 0? 'hidden-div' : '' ]" >
        <label for="">
          Bredd
          <div class="measurement">
            <input type="number" v-model="Bredd" class="input-short" /><span class="unit">mm</span>
          </div></label
        >
        <label for=""
          >Höjd
          <div class="measurement">
            <input type="number" v-model="Höjd" class="input-short"/><span class="unit">mm</span>
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
      <img :class="['imgs-selects ', taktTyp == 1 ? ' imgs-selects-active' : '']"  src="/calc/Tegeltakpannor.jpg" alt="" />

      <!--<input type="radio" :name="'Takt' + takNum" value="1" v-model="taktTyp" />-->

      <p>Tegelpannor</p>
      <div :class="['p3', taktTyp != 1? 'hidden-div' : '' ]">
        <label for=""
          >Bredd
          <div class="measurement">
            <input type="number" v-model="Bredd" class="input-short"/><span class="unit">mm</span>
          </div></label
        >
        <label for=""
          >Höjd
          <div class="measurement">
            <input type="number" v-model="Höjd" class="input-short"/><span class="unit">mm</span>
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
      <img :class="['imgs-selects ', taktTyp == 2 ? ' imgs-selects-active' : '']" src="/calc/plåttak.jpg" alt="" />

    <p>Falsat plåttak/Klicktak</p>
      <div :class="['p3', taktTyp != 2? 'hidden-div' : '' ]">
        <label for=""
          >Avstånd falser
          <div class="measurement">
            <input type="number" v-model="AvståndFalser" class="input-short"/><span class="unit"
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
      <img :class="['imgs-selects ', taktTyp == 3 ? ' imgs-selects-active' : '']" src="/calc/Profilerat.jpg" alt="" />


    <p> Profilerat plåttak</p>

      <div :class="['p3', taktTyp != 3? 'hidden-div' : '' ]">
        <label for="">
          C-C Avstånd toppar
          <div>
            <input type="number" v-model="AvståndToppar" class="input-short"/><span class="unit"
              >mm</span
            ></div>
         </label
        >
        <label for=""
          >Material
          <select class="q" v-model="Material">
            <option >Stålplåt</option>
            <option >Aluminiumplåt</option>
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
      <img :class="['imgs-selects ', taktTyp == 4 ? ' imgs-selects-active' : '']" src="/calc/TegelprofileratPlåttak.jpg" alt="" />

      <p>Tegelprofilerat plåttak</p>
      <div :class="['p3', taktTyp != 4? 'hidden-div' : '' ]">
        <label for=""
          >C-C Avstånd toppar
          <div>
            <input type="number" v-model="AvståndToppar" class="input-short"/><span class="unit"
              >mm</span
            ></div>
          </label
        >

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
      <img :class="['imgs-selects ', taktTyp == 5 ? ' imgs-selects-active' : '']" src="/calc/SlätaTak.jpg" alt="" />
      <p>Släta tak</p>
    </div>
  </div>
  <div class="second-head"> 
        <h1>{{ langIsSe? "Infästning ": "Infästning " }} {{ takNum + 1 }}</h1>
   <hr>
  </div>


  <div class="Visual-select">
    <div
      v-for="(i, index) in InfästningArr[taktTyp]"
      v-bind:key="index"
      :class="['selection', Infästning == index ? '  selection-pre' : '']"
      @click="Infästning = index"
    >
      <img :src="`${i.pic}`" alt="" :class="['imgs-selects ', Infästning == index ? ' imgs-selects-active' : '']"/>

      <!--<input
        type="radio"
        :name="'Infästning' + takNum"
        :value="index"
        v-model="Infästning"
      />-->

      <p>{{ i.name }}</p>
    </div>
  </div>

  <div class="second-head"> 
        <h1>{{ langIsSe? "Typ av klammer ": "Typ av klammer " }} {{ takNum + 1 }}</h1>
   <hr>
  </div>

  <div class="Visual-select">
    <div class="selection selection-pre">
      <img src="/products/swemount9product.jpg" alt="" :class="['imgs-selects ', 1 ? ' imgs-selects-active' : '']"/>

      <!--<input type="radio" :name="'klammer' + takNum" value="" checked />-->
      <p>Komplett</p>
    </div>
  </div>

  <div class="second-head"> 
        <h1>{{ langIsSe? "Inställningar ": "Inställningar " }} {{ takNum + 1 }}</h1>
   <hr>
  </div>

  <div class="Visual-select">

    <div :class="['selection', colorName == 'gray' ? '  selection-pre' : '']" @click="colorName = 'gray'"
      >
      <div  :class="['imgs-selects color-box varmforzinkat', colorName == 'gray' ? ' imgs-selects-active' : '']"></div>
      <p>Varmförzinkat</p>
      <!--<input
        type="radio"
        :name="'color' + takNum"
        value="gray"
        v-model="colorName"
      />-->
      </div>
    <div :class="['selection', colorName == 'black' ? '  selection-pre' : '']"  @click="colorName = 'black'"
      >
      <div  :class="['imgs-selects color-box svartlackerat', colorName == 'black' ? ' imgs-selects-active' : '']"></div>
     <p> Svartlackerat</p>
     <!-- <input
        type="radio"
        :name="'color' + takNum"
        value="black"
        v-model="colorName"
        checked
      />-->
     </div>
  </div>

  <div style="max-width:1920px;">
    <div class="second-head"> 
        <h1>{{ langIsSe? "Egenskaper för tak ": "Egenskaper för tak " }} {{ takNum + 1 }}</h1>
   <hr>
  </div>

   <h2>Typ av tak</h2>

    <div class="Visual-select" style="justify-content:center;">
      <div
        @click="TypAvTak = 0"
        :class="['selection', TypAvTak == 0 ? '  selection-pre' : '']"
      >
        <img src="/calc/Pulpet.jpg" alt="" :class="['imgs-selects ', TypAvTak == 0 ? ' imgs-selects-active' : '']"/> <p>Pulpet</p>
      </div>
      <div
        @click="TypAvTak = 1"
        :class="['selection', TypAvTak == 1 ? '  selection-pre' : '']"
      >
        <img src="/calc/Sadel.jpg" alt="" :class="['imgs-selects ', TypAvTak == 1 ? ' imgs-selects-active' : '']"/> <p>Sadel</p>
      </div>
      <div
        @click="TypAvTak = 2"
        :class="['selection', TypAvTak == 2 ? '  selection-pre' : '']"
      >
        <img src="/calc/Motfalls.jpg" alt="" :class="['imgs-selects ', TypAvTak == 2 ? ' imgs-selects-active' : '']"/> <p>Motfalls</p>
      </div>
    </div>

    <div class="p3 middle-inputs " >
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
        <h1>{{ langIsSe? "Takform på tilltänkt taksida ": "Takform på tilltänkt taksida " }} {{ takNum + 1 }}</h1>
   <hr>
  </div>



    <div class="Visual-select shapes-style" >
      <div
        @click="Takform = 0"
        :class="['selection', Takform == 0 ? '  selection-pre' : '']"
      >
        <img src="/shapes/Rektangel.png" alt="" :class="['imgs-selects ', Takform == 0 ? ' imgs-selects-active' : '']" /><p>Rektangel</p>
      </div>
      <div
        @click="Takform = 1"
        :class="['selection', Takform == 1 ? '  selection-pre' : '']"
      >
        <img src="/shapes/Vinkel_1.png" alt="" :class="['imgs-selects ', Takform == 1 ? ' imgs-selects-active' : '']" /><p>Vinkel 1
</p>      </div>
      <div
        @click="Takform = 2"
        :class="['selection', Takform == 2 ? '  selection-pre' : '']"
      >
        <img src="/shapes/Vinkel_2.png" alt="" :class="['imgs-selects ', Takform == 2 ? ' imgs-selects-active' : '']" /><p>Vinkel 2
</p>      </div>
      <div
        @click="Takform = 3"
        :class="['selection', Takform == 3 ? '  selection-pre' : '']"
      >
        <img src="/shapes/Romb_1.png" alt="" :class="['imgs-selects ', Takform == 3 ? ' imgs-selects-active' : '']" /><p>Romb 1
  </p>    </div>
      <div
        @click="Takform = 4"
        :class="['selection', Takform == 4 ? '  selection-pre' : '']"
      >
        <img src="/shapes/Romb_2.png" alt="" :class="['imgs-selects ', Takform == 4 ? ' imgs-selects-active' : '']" /><p>Romb 2
  </p>    </div>
      <div
        @click="Takform = 5"
        :class="['selection', Takform == 5 ? '  selection-pre' : '']"
      >
        <img src="/shapes/Trapets_1.png" alt="" :class="['imgs-selects ', Takform == 5 ? ' imgs-selects-active' : '']" /><p>Trapets 1</p>
      </div>
      <div
        @click="Takform = 6"
        :class="['selection', Takform == 6 ? '  selection-pre' : '']"
      >
        <img src="/shapes/Trapets_2.png" alt="" :class="['imgs-selects ', Takform == 6 ? ' imgs-selects-active' : '']" /> <p>Trapets 2</p>
      </div>
    </div>

    <div>
      <div>
        <div class="second-head"> 
        <h1>{{ langIsSe? "Ange mått för taksida ": "Ange mått för taksida " }} {{ takNum + 1 }}</h1>
   <hr>
  </div>

        <img
          v-bind:src="'/shapes/' + (Takform + 1) + '.png'"
          alt=""
          class="shape-big-photo "
        />
        <div class="p3 middle-inputs-wider" style="display:flex;">
          <label for=""
            >A <br />
            <div class="measurement">
              <input class="input-short" type="number" v-model="Amatt" /><span class="unit">m</span>
            </div></label
          >
          <label for=""
            >B<br />
            <div class="measurement">
              <input class="input-short" type="number" v-model="Bmatt" /><span class="unit">m</span>
            </div></label
          >
          <label for="" v-if="!Takform == 0"
            >C <br />
            <div class="measurement">
              <input class="input-short" type="number" v-model="Cmatt" /><span class="unit">m</span>
            </div></label
          >
        </div>
      </div>
      <div class="panel-storlek"  v-for="(i, index) in PanelBredd" v-bind:key="index">
        <div class="second-head " style="margin: 0; "> 
        <h2 style="text-align: left; ">Panelstorlek {{ index + 1 }}</h2>
   <hr style="margin:0; width:10%;">
  </div>

        <p>
          
        </p>
        <div class="p3 middle-inputs-wider" style="display:flex;">
          <label for=""
            >Bredd <br />
            <div class="measurement">
              <input class="input-short" type="number" v-model="PanelBredd[index]" /><span
                class="unit"
                >mm</span
              >
            </div></label
          >
          <label for=""
            >Höjd<br />
            <div class="measurement">
              <input class="input-short" type="number" v-model="PanelHöjd[index]" /><span
                class="unit"
                >mm</span
              >
            </div></label
          >
          <label for=""
            >Vikt per panel <br />
            <div class="measurement">
              <input class="input-short" type="number" v-model="PanelVikt[index]" /><span
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

  <div v-if="showResult">{{ panelarCount }}</div>
  
  <table v-if="showResult">
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

</template>

<style scoped>
.divElem {
  max-width: 1140px;
  margin: auto;
}

@media screen and (min-width: 414px) {
  main {
    margin: 0;
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
    background-color: #22326c;
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
  width:105%;
  margin-top: 2vw;
  border-right: #707070 solid 1px;
  border-left: #707070 solid 1px;
  padding: 0 0.5vw;
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
.Visual-select{
display: flex;
justify-content: flex-start;
margin-top: 5vw;
width: 85.15625vw;
}
.shapes-style{
flex-wrap:wrap ;
justify-content: center;
row-gap: 2vw;

}
.shapes-style img{
width:14.0625vw;

height: 7.083333333vw;
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

.q{
  padding: 0.5vw;
  margin-top: 0.5vw;
 margin-left: 0;

}
.svartlackerat{
background-color: #010204;
}


.varmforzinkat{
background-color: #979ba4;
}
.color-box{
  width:11.97916667vw;
  height:11.97916667vw;
}

h2{
  margin-top: 4vw;
}
.middle-inputs{
  width:35vw; 
  border:0;
}

.middle-inputs-wider{
  width:62.5vw; 
  border:0;

}
.shape-big-photo{
  width: 27.39583333vw;
  height: 17.08333333vw;
  margin: 0 auto; 
  display: block
}
.panel-storlek {
  width: 25vw;
  margin: 0 0 0 20vw ;
}
}

/***********************************************************************************************************************/
@media screen and (min-width: 1921px) {

  .multi_elements {
    margin-top: 155px;
  }

  .multi_elements > div > img {
    width: 410px;
  }
  .selection {
margin-right: 38.4px;

  }

  .selection p {
    margin-top: 38.4px;
    padding: 9.6px;
  }


  .position-body{
margin-top: 96px;
width: 1260px;
  }


  .google-map{
    width: 648px;
    height: 648px;

  }
input{
  width: 465px;
  padding: 9.6px;
border-radius: 17.28px;
}
.input-short{
  width: 88px;

}
.unit{
padding: 9.6px 19.2px;
border-radius: 19.2px;
}
.p3{
  width: 105%;
  margin-top: 38.4px;
  padding: 0 9.6px;
}



.p3 label>div input{
  margin: 9.6px 57.6px 9.6px 0;
}
.Visual-select{
margin-top: 96px;
width: 1635px;
}
.imgs-selects{
  width:230px;
  height:230px;

  box-shadow: 9.6px -9.6px 0px 0vw #fcb324;
border: 1px solid #707070;
}

.imgs-selects-active{
  box-shadow: 9.6px -9.6px 0px 0vw #22326c;

}

.discreption{
  padding: 19.2px;

}

.q{
  padding: 9.6px;
  margin-top: 9.6px;

}
.color-box{
  width:230px;
  height:230px;
}
h2{
  margin-top: 76.8px;
}
.middle-inputs{
  width:700px; 
}

.middle-inputs-wider{
  width:1200px; 

}
.shapes-style{
row-gap: 38.6px;

}
.shapes-style img{
  width:270px;
height: 136px;
}
.shape-big-photo{
  width: 526px;
  height: 328px;
}
.panel-storlek {
  width: 480px;
  margin: 0 0 0 384px ;
}

}
</style>