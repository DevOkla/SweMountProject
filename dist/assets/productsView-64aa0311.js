import{p as i}from"./productsinfo-3b352b4e.js";import{_ as u,r as d,o,c as n,a as t,t as e,F as p,b as _,d as m,w as h}from"./index-d5470f39.js";const g="/swemounttest/img/swemount14.jpg",w={props:{langIsSe:Boolean},data(){return{rootBrach:"/swemounttest",products:i}},mount(){},methods:{}},f=t("img",{class:"head-imgs",src:g,alt:""},null,-1),x={class:"all-products",style:{"max-width":"1920px"}},k={class:"artnmr"},y={style:{"text-decoration":"none",color:"white"}},B=["src"],v={class:"product-caption"},L={class:"yellow",style:{"text-align":"center","text-decoration":"none"}},S=t("p",{class:"white"},"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, saepe voluptatem.",-1),C=t("i",{class:"fa-regular fa-circle-right yellow"},null,-1);function F(I,N,a,P,c,R){const l=d("RouterLink");return o(),n("main",null,[f,t("h1",null,e(a.langIsSe?"Produkter":"Products"),1),t("div",x,[(o(!0),n(p,null,_(c.products,(s,r)=>(o(),m(l,{key:r,to:`/products/${r}`,class:"single-product"},{default:h(()=>[t("div",k,[t("p",y,e(s.artNum),1)]),t("img",{src:c.rootBrach+s.pic,alt:""},null,8,B),t("div",v,[t("h3",L,e(s.name),1),S,C])]),_:2},1032,["to"]))),128))])])}const b=u(w,[["render",F]]);export{b as default};
