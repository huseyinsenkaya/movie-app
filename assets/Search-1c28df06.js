import{r,m as v,o as c,c as d,d as h,w as f,v as _,u as i,n as w,a as x,F as y}from"./index-4bc45738.js";import{_ as j}from"./MovieList-6d4257b8.js";const I={method:"GET",headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDVjZWVjMzVjMDE3Zjk0NDQxNzQ4ZjNjY2YwNDEwZSIsInN1YiI6IjY1MTMwYzRkOGUyYmE2MDBjN2NkMWIxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hk_-QMN0OB204_2OfksnyubxC8dR-3Svj0_wdqzwdYw"}};function N(){const o=r(""),e=r([]),t=r(!1),l=(a,s)=>{let n;return(...m)=>{const p=()=>{a(...m)};clearTimeout(n),n=setTimeout(p,s)}},u=async()=>{t.value=!0;const a=`https://api.themoviedb.org/3/search/movie?query=${o.value}&include_adult=false&language=en-US&page=1`;if(!o.value){e.value=[],t.value=!1;return}try{const n=await(await fetch(a,I)).json();e.value=n.results}catch(s){console.error(s)}finally{t.value=!1}};return v(o,l(()=>u(),500)),{search:o,movies:e,loading:t}}const k={class:"mb-10"},M={key:0,class:"mb-4 p-4 text-white text-2xl"},B={__name:"Search",setup(o){const{search:e,movies:t,loading:l}=N();return(u,a)=>(c(),d(y,null,[h("div",k,[f(h("input",{class:"w-full h-14 rounded p-4 text-2xl outline-none bg-slate-800 text-white",placeholder:"Search by title",type:"text","onUpdate:modelValue":a[0]||(a[0]=s=>w(e)?e.value=s:null),autofocus:""},null,512),[[_,i(e)]])]),i(l)?(c(),d("div",M,"Loading...")):(c(),x(j,{key:1,movies:i(t)},null,8,["movies"]))],64))}};export{B as default};
