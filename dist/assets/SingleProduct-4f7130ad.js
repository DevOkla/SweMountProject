import{p as c}from"./productsinfo-3b352b4e.js";import{_ as d,o as i,c as e,a as l,t,F as o,b as u}from"./index-d5470f39.js";const g={props:{langIsSe:Boolean},data(){return{rootBrach:"/swemounttest",isingleProduct:c[this.$route.params.id]}},methods:{}},h={class:"product-head"},_=["src"],a={class:"second-head",style:{margin:"0"}},m={style:{"text-align":"left","margin-top":"0"}},P=l("hr",{style:{margin:"0",width:"20%"}},null,-1),p={class:"product-list"},k={class:"identifiering"},v=l("div",{class:"second-head"},[l("h1",null,"Ingående artiklar och identifiering"),l("hr")],-1),f=l("tr",null,[l("th",null,"Benämning"),l("th",null,"Vikt"),l("th",null,"Ytbehandling"),l("th",null,"Färg"),l("th",null,"Antal"),l("th",null,"Artikelnr.")],-1),y={class:"Prestanda"},B=l("h4",null,null,-1),F=l("div",{class:"second-head"},[l("h1",null,"Prestanda"),l("hr")],-1),b=l("tr",null,[l("th",null,"Typ av infästningsmaterial"),l("th",null,"Plåttjocklek"),l("th",null,"Kvalité (N/mm²)"),l("th",null,"Fx+"),l("th",null,"Fx-"),l("th",null,"Fy+")],-1);function S(A,j,L,N,n,V){return i(),e("main",null,[l("div",h,[l("img",{src:n.rootBrach+n.isingleProduct.pic,alt:"",class:"product-img img-back-box"},null,8,_),l("div",null,[l("div",a,[l("h2",m,t(n.isingleProduct.name),1),P]),l("ul",p,[l("li",null,"Artikelnr: "+t(n.isingleProduct.artNum),1),l("li",null,"Längd: "+t(n.isingleProduct.Längd),1),l("li",null,"Bredd: "+t(n.isingleProduct.Bredd),1),l("li",null,"Höjd: "+t(n.isingleProduct.Höjd),1),l("li",null,"Snözon: "+t(n.isingleProduct.Snözon),1)])])]),l("div",k,[v,l("table",null,[f,(i(!0),e(o,null,u(n.isingleProduct.Benämning,(r,s)=>(i(),e("tr",{key:s},[l("td",null,t(r),1),l("td",null,t(n.isingleProduct.Vikt[s]),1),l("td",null,t(n.isingleProduct.Ytbehandling[s]),1),l("td",null,t(n.isingleProduct.Färg[s]),1),l("td",null,t(n.isingleProduct.Antal[s]),1),l("td",null,t(n.isingleProduct.Artikelnr[s]),1)]))),128))])]),l("div",y,[B,F,l("table",null,[b,(i(!0),e(o,null,u(n.isingleProduct.Typavinfästningsmaterial,(r,s)=>(i(),e("tr",{key:s},[l("td",null,t(r),1),l("td",null,t(n.isingleProduct.Plåttjocklek[s]),1),l("td",null,t(n.isingleProduct.Kvalité[s]),1),l("td",null,t(n.isingleProduct.Fxp[s]),1),l("td",null,t(n.isingleProduct.Fxm[s]),1),l("td",null,t(n.isingleProduct.Fyp[s]),1)]))),128))])])])}const H=d(g,[["render",S]]);export{H as default};
