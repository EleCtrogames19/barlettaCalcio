"use strict";(self.webpackChunkbarlettaCalcio=self.webpackChunkbarlettaCalcio||[]).push([[405],{2405:(M,l,i)=>{i.r(l),i.d(l,{NewsModule:()=>w});var c=i(6814),m=i(589),g=i(7010),s=i(553),t=i(4946),r=i(6019);let p=(()=>{class e{constructor(){this.firestore=(0,t.f3M)(r.gg);const n=(0,r.hJ)(this.firestore,"items");this.item$=(0,r.BS)(n)}static#t=this.\u0275fac=function(a){return new(a||e)};static#e=this.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var d=i(953);function f(e,N){if(1&e){const n=t.EpF();t.TgZ(0,"article",3),t.NdJ("click",function(){const h=t.CHM(n).$implicit,C=t.oxw();return t.KtG(C.navigaArticolo(h.titoloNews))}),t._UZ(1,"img",4),t.TgZ(2,"p",5),t._uU(3),t.qZA(),t.TgZ(4,"p",6),t._uU(5),t.qZA()()}if(2&e){const n=N.$implicit;t.xp6(1),t.Q6J("src",n.anteprima,t.LSH)("alt",n.alt),t.xp6(2),t.Oqu(n.data),t.xp6(2),t.Oqu(n.titoloNews)}}const u=[{path:"",component:(()=>{class e{constructor(n,a){this.router=n,this.fire=a,this.newsArray=[],this.fire.item$.subscribe(o=>console.log("fire",o)),console.log("prova db",s.db),(0,s.zg)(),(0,s.O6)(),(0,s.ig)(),(0,s.zV)(),(0,s.V1)(),(0,s.QV)()}ngOnInit(){this.newsArray=[{id:0,stagione:"2023-2024",img:"../../../assets/intro/1111.jpg",anteprima:"../../../assets/intro/1111.jpg",alt:"immagine barletta",data:"12 gennaio 2023",titoloNews:"18^ g.Barletta - Molfetta 1-1",descrizioneNews:'Finale al "Manzi-Chiapulin", 1-1 tra Barletta e Molfetta',linkNews:!0,urllinkNews:"/"},{id:1,stagione:"2023-2024",img:"../../../assets/intro/1111.jpg",anteprima:"../../../assets/intro/1111.jpg",alt:"immagine barletta",data:"12 gennaio 2023",titoloNews:"19^ g.Barletta - Molfetta 1-1",descrizioneNews:'Finale al "Manzi-Chiapulin", 1-1 tra Barletta e Molfetta',linkNews:!1,urllinkNews:"/"},{id:2,stagione:"2023-2024",img:"../../../assets/intro/1111.jpg",anteprima:"../../../assets/intro/1111.jpg",alt:"immagine barletta",data:"12 gennaio 2023",titoloNews:"12^ g.Barletta - Molfetta 1-1",descrizioneNews:'Finale al "Manzi-Chiapulin", 1-1 tra Barletta e Molfetta',linkNews:!0,urllinkNews:"/"}]}navigaArticolo(n){let a=this.newsArray.find(o=>o.titoloNews=n);console.log("articolo",a),a&&(localStorage.setItem("articolo",JSON.stringify(a)),this.router.navigate(["news/articolo/"+a.titoloNews]))}static#t=this.\u0275fac=function(a){return new(a||e)(t.Y36(g.F0),t.Y36(p))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-news"]],decls:4,vars:1,consts:[[1,"news"],[1,"flex","flex-wrap","gap-3"],["class","card",3,"click",4,"ngFor","ngForOf"],[1,"card",3,"click"],["aria-label","immagine",1,"immagini",3,"src","alt"],[1,"dataNews"],[1,"titoloNews"]],template:function(a,o){1&a&&(t.TgZ(0,"section",0),t._UZ(1,"app-navbar"),t.TgZ(2,"section",1),t.YNc(3,f,6,4,"article",2),t.qZA()()),2&a&&(t.xp6(3),t.Q6J("ngForOf",o.newsArray))},dependencies:[c.sg,d.S],styles:[".news[_ngcontent-%COMP%]{background-image:linear-gradient(to bottom,rgba(245,246,252,.407),rgba(87,87,87,.73)),url(sfondoNews.03b4f093751b7798.jpg);background-size:cover;height:100vh}.news[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{background-color:#fff;border-radius:10px}.news[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .immagini[_ngcontent-%COMP%]{border-top-left-radius:10px;border-top-right-radius:10px}.news[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .dataNews[_ngcontent-%COMP%]{margin-top:32px;text-align:center;font-size:30px}.news[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .titoloNews[_ngcontent-%COMP%]{margin-bottom:32px;text-align:center;font-size:30px}"]})}return e})()}];let w=(()=>{class e{static#t=this.\u0275fac=function(a){return new(a||e)};static#e=this.\u0275mod=t.oAB({type:e});static#n=this.\u0275inj=t.cJS({imports:[c.ez,m.W,g.Bz.forChild(u)]})}return e})()}}]);