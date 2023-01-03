<script>
export default {
  data() {
    return {
      en: [
        "Swemount is a leading provider of high-quality solar cell materials for a wide range of applications. Our advanced materials are designed to maximize the efficiency and performance of solar cells, helping our customers to generate more electricity from their solar panels. ",
        "In addition to our core solar cell materials, we also offer a range of value-added services such as technical support and custom formulation, to help our customers achieve their specific goals. With a team of experienced scientists and engineers, we are well-equipped to support the needs of our diverse customer base.",
        "At Swemount, we are committed to sustainability and environmental responsibility. We work hard to minimize our impact on the planet, and our solar cell materials are designed to be as eco-friendly as possible. Whether you are looking to power your home, your business, or a larger scale project, we have the solar cell materials you need to succeed.",

      ],
      se: [
        "Swemount är en ledande leverantör av högkvalitativa solcellsmaterial för en mängd olika tillämpningar. Våra avancerade material är utformade för att maximera effektiviteten och prestandan hos solceller, vilket hjälper våra kunder att generera mer elektricitet från sina solpaneler. ",
        "Förutom våra kärnmaterial för solceller erbjuder vi även en mängd värdeskapande tjänster såsom teknisk support och anpassad formulering, för att hjälpa våra kunder att uppnå sina specifika mål. Med en grupp erfarna forskare och ingenjörer är vi väl rustade att stödja behoven hos vår mångsidiga kundbas.",
        "På Swemount är vi angelägna om hållbarhet och miljöansvar. Vi arbetar hårt för att minimera vår påverkan på planeten, och våra solcellsmaterial är utformade för att vara så miljövänliga som möjligt. Oavsett om du söker att driva ditt hem, ditt företag eller ett större projekt, har vi de solcellsmaterial du behöver för att lyckas."
      ],
      personal:[{title:"CEO",name:"Hussam Jaccob",phone:"0700000000",email:"hussam.jaccob@swemount.se",pic:"/per-placeholder.png"},{title:"CEO",name:"Tobias",phone:"0700000000",email:"tobias@swemount.se",pic:"/per-placeholder.png"},{title:"CEO",name:"Christofer",phone:"0700000000",email:"Christofer@swemount.se",pic:"/per-placeholder.png"}],
      selectedPersonal:0,
    }
  },
  methods:{
    selectPersonal(i){
      this.selectedPersonal=i;
    },
  },
};
</script>

<template>
  <main>  <h1 >About us</h1>
    
<div style="display:flex; align-items:center;"> <div style="width:60%; "><p class="p-text" >{{ se[0] }}</p><br> <p  class="p-text">{{ se[1] }}</p><br> <p class="p-text" >{{ se[2] }}</p> </div><img style="width:35%;" src="/img/swemount1.png" alt=""></div>

<div id="selected-person"> <img style="width:25%;" :src="personal[selectedPersonal].pic" alt=""> <div> <h3>{{ personal[selectedPersonal].title }}</h3> <p>{{ personal[selectedPersonal].name }}</p><p>{{ personal[selectedPersonal].phone }}</p><p>{{ personal[selectedPersonal].email }}</p> </div> </div>

<div class="all-personal">
  <div  v-for="(i,index) in personal" :key="index" @click="selectPersonal(index);" :class="['one-personal', index == selectedPersonal ? '  one-personal-selected' : '']"> <img style="width:100%;" :src="i.pic" alt=""> <h3  >{{i.title}}</h3> <p>{{ i.name }}</p>  </div>
</div>

</main>
</template>
<style scoped>

@media screen and (min-width: 414px) {




}








@media screen and (min-width: 1200px) {

#selected-person{
  display:flex; 
  align-items:center;
  margin-top: 96px;
  width:840px;
  margin-left: 0;
}
.one-personal{
  width: 10%;
  cursor: pointer;
  transition: 0.3s;
}
.all-personal{
  display: flex;
  margin-top: 48px;
  flex-wrap: wrap;
  padding: 5px;
}
.one-personal p{
  font-size: 15px;
}
.one-personal h3{
  font-size: 18px;
}
.one-personal:hover{
  border: 1px dotted #ccc;
}

.one-personal-selected{
  border: 5px double #000;
box-shadow: 1px 1px 10px 1px #ccc;
padding: 5px;
}
.one-personal-selected:hover{
  border: 5px double #000;

}



}
</style>>