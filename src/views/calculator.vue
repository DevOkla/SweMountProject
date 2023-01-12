<script>
import calcBody from "../components/calcBody.vue";
export default {
  props:{
    langIsSe:Boolean,
  },

  components: {
    calcBody,
  },

  data(){
    return{
    loggedIn:false,
    showPassword:false,
    en:[
      "Thank you for your interest in our company. To sign up and create an account, please contact us. Once you have completed the sign up process and received your login credentials, you can log in to access our services. We look forward to working with you",
      "We apologize, but this page is not optimized for small screens with a width less than 768 pixels. For the best experience, please visit this page on a device with a larger screen or adjust your screen resolution to at least 768 pixels wide",
  
  ],
  se:[
      "Tack för ditt intresse för vårt företag. För att registrera dig och skapa ett konto, vänligen kontakta oss. När du har slutfört registreringsprocessen och mottagit dina inloggningsuppgifter kan du logga in och få tillgång till våra tjänster. Vi ser fram emot att få arbeta med dig",
      "Vi beklagar, men denna sida är inte anpassad för skärmar med en bredd mindre än 768 pixlar. För bästa upplevelse, vänligen besök denna sida på en enhet med större skärm eller justera skärmens upplösning till minst 768 pixlar bred.",

  ]

  }
  },
}
</script>

<template>
  <main>
    <img class="head-imgs " src="/img/swemount15.jpg" alt="">

    <h1 >{{ langIsSe? "Kalkylator": "Calculator" }}</h1>  

    <div class="less768">
      <div class="signup-msg">{{ langIsSe? se[1]: en[1] }}</div>


    </div>

    <div class="over768">

<div v-if="!loggedIn" >
  <div class="second-head margin-bottoms"> 
        <h1>{{langIsSe? "Logga in": "Log in"}}</h1>
   <hr>
  </div>

  <form action="">
    <label for="email"><p>Eamil:</p><input type="email" name="email" placeholder="anders.andersson@gmail.com" required></label>
      <label for="password" style="position:relative;"><p>{{ langIsSe? "Lösenord": "Password" }}:</p><input :type="[showPassword?'text':'password']" name="password" placeholder="***********" required> <div class="show-buttons" @click="showPassword=!showPassword"><i class="fa-regular fa-eye" v-if="showPassword"></i><i class="fa-regular fa-eye-slash" v-if="!showPassword"></i></div></label>

      <button @click="loggedIn=true">{{ langIsSe? "Logga in": "Log in" }}</button>

  </form>
  <div class="signup-msg">{{ langIsSe? se[0]: en[0] }}</div>
</div>

<div v-if="loggedIn">

<calcBody />

</div>
</div>
    </main>
</template>
<style scoped>
@media screen and (min-width: 414px) {
.margin-bottoms{
  margin-bottom: 4vw;
}




}

@media screen and (min-width: 1200px) {
  .margin-bottoms{
  margin-bottom: 48px;
}


}

</style>