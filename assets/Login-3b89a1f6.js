import{b as f,r as n,i as h,o as c,c as u,d as t,e as i,w as d,v as m,j as w,k as v,t as b,l as g,f as k,g as V,s as y}from"./index-4bc45738.js";const C={class:"flex justify-center mt-12"},N=["onSubmit"],S={class:"text-sm flex flex-col w-full gap-2 mb-6"},B={class:"text-sm flex flex-col w-full gap-2 mb-6"},E=t("span",{class:"text-xs text-blue-100 mb-2"},"Create an account",-1),M=t("button",{class:"button"},"Log in",-1),U={key:0,class:"text-red-400 text-center mt-2"},A={__name:"Login",setup(j){const p=f(),s=n(""),o=n(""),a=n(),x=()=>{const r=V();y(r,s.value,o.value).then(e=>{p.push("/")}).catch(e=>{console.log(e.code),a.value="Something went wrong!"})};return(r,e)=>{const _=h("router-link");return c(),u("div",C,[t("form",{class:"text-white flex flex-col max-w-md w-96",onSubmit:k(x,["prevent"])},[t("label",S,[i(" Email "),d(t("input",{class:"w-full h-10 rounded text-black p-2",type:"email","onUpdate:modelValue":e[0]||(e[0]=l=>s.value=l),reqired:""},null,512),[[m,s.value]])]),t("label",B,[i(" Password "),d(t("input",{class:"w-full h-10 rounded text-black p-2",type:"password","onUpdate:modelValue":e[1]||(e[1]=l=>o.value=l),required:""},null,512),[[m,o.value]])]),w(_,{to:"/register",class:"mb-2"},{default:v(()=>[E]),_:1}),M,a.value?(c(),u("p",U,b(a.value),1)):g("",!0)],40,N)])}}};export{A as default};