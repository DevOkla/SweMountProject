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
  
  ],
  se:[
      "Tack för ditt intresse för vårt företag. För att registrera dig och skapa ett konto, vänligen kontakta oss. När du har slutfört registreringsprocessen och mottagit dina inloggningsuppgifter kan du logga in och få tillgång till våra tjänster. Vi ser fram emot att få arbeta med dig",
  
  ]

  }
  },
}
</script>

<template>
  <main>
    <h1 >{{ langIsSe? "Kalkylator": "Calculator" }}</h1>  


<div v-if="!loggedIn">
  <h2>{{langIsSe? "Logga in": "Log in"}}</h2>
  <form action="">
    <label for="email"><p>Eamil:</p><input type="email" name="email" placeholder="anders.andersson@gmail.com" required></label>
      <label for="password" style="position:relative;"><p>{{ langIsSe? "Lösenord": "Password" }}:</p><input :type="[showPassword?'text':'password']" name="password" placeholder="***********" required> <div class="show-buttons" @click="showPassword=!showPassword"><i class="fa-regular fa-eye" v-if="showPassword"></i><i class="fa-regular fa-eye-slash" v-if="!showPassword"></i></div></label>

      <button @click="loggedIn=true"><b>{{ langIsSe? "Logga in": "Log in" }}</b></button>

  </form>

  <div class="signup-msg">{{ langIsSe? se[0]: en[0] }}</div>
</div>

<div v-if="loggedIn">

<calcBody />

</div>
    </main>
</template>
<style>
.divElem {
  width: 95vw;
  max-width: 1216px;
  margin: auto;
}

@media screen and (min-width: 414px) {

}

@media screen and (min-width: 1200px) {


}

</style>