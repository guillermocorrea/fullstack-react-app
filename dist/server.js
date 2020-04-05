!function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="/",t(t.s=8)}([function(e,n){e.exports=require("md5")},function(e,n){e.exports=require("express")},function(e,n){e.exports=require("body-parser")},function(e,n){e.exports=require("path")},function(e,n){e.exports=require("cors")},function(e,n){e.exports=require("mongodb")},function(e,n){e.exports=require("morgan")},function(e,n){e.exports=require("uuid")},function(e,n,t){"use strict";t.r(n),t.d(n,"addNewTask",(function(){return k})),t.d(n,"updateTask",(function(){return C}));var o=t(1),r=t.n(o),s=t(4),i=t.n(s),a=t(2),u=t.n(a),c=t(5);const d=process.env.MONGODB_URI||"mongodb://localhost:27017/myorganizer";let l=null;async function p(){if(l)return l;let e=await c.MongoClient.connect(d,{useNewUrlParser:!0,useUnifiedTopology:!0});return l=e.db(),l}var f=t(6),m=t.n(f),w=t(0),y=t.n(w);const g={users:[{id:"U1",name:"Dev",passwordHash:y()("TUPLES"),friends:["U2"]},{id:"U2",name:"C. Eeyo",passwordHash:y()("PROFITING"),friends:[]}],groups:[{name:"To Do",id:"G1",owner:"U1"},{name:"Doing",id:"G2",owner:"U1"},{name:"Done",id:"G3",owner:"U1"}],tasks:[{name:"Refactor tests",id:"T1",group:"G1",owner:"U1",isComplete:!1},{name:"Meet with CTO",id:"T2",group:"G1",owner:"U1",isComplete:!0},{name:"Compile ES6",id:"T3",group:"G2",owner:"U2",isComplete:!1},{name:"Update component snapshots",id:"T4",group:"G2",owner:"U1",isComplete:!0},{name:"Production optimizations",id:"T5",group:"G3",owner:"U1",isComplete:!1}],comments:[{owner:"U1",id:"C1",task:"T1",content:"Great work!"}]};!async function(){const e=await p();if(!await e.collection("users").findOne({id:"U1"}))for(let n in g){let t=e.collection(n);await t.insertMany(g[n])}}();var b=t(7);const U=[];var v=t(3),O=t.n(v);const T=process.env.PORT||3e3;let x=r()();x.use(i()(),u.a.urlencoded({extended:!1}),u.a.json(),m()("combined")),x.post("/authenticate",async(e,n)=>{const{username:t,password:o}=e.body,r=(await p()).collection("users"),s=await r.findOne({name:t});if(!s)return n.status(500).send("User not found");if(y()(o)!==s.passwordHash)return n.status(500).send("User not found");const i=Object(b.v4)();U.push({token:i,userId:s.id});const a=await async function(e){const n=await p();return{tasks:await n.collection("tasks").find({owner:e.id}).toArray(),groups:await n.collection("groups").find({owner:e.id}).toArray(),session:{authenticated:"AUTHENTICATED",id:e.id}}}(s);n.send({token:i,state:a})}),x.use(r.a.static(O.a.resolve(__dirname,"public"))),x.get("/*",(e,n)=>{n.sendFile(O.a.resolve("index.html"))}),x.listen(T,console.info("Server running, listening on port ",T));const k=async e=>{const n=(await p()).collection("tasks");await n.insertOne(e)},C=async e=>{const{id:n,group:t,isComplete:o,name:r}=e,s=(await p()).collection("tasks");t&&await s.updateOne({id:n},{$set:{group:t}}),r&&await s.updateOne({id:n},{$set:{name:r}}),void 0!==o&&await s.updateOne({id:n},{$set:{isComplete:o}})};x.get("/",(e,n)=>{n.send("Hello world")}),x.post("/task/new",async(e,n)=>{const t=e.body.task;return await k(t),n.status(200).send()}),x.post("/task/update",async(e,n)=>{const t=e.body.task;return await C(t),n.status(200).send()})}]);