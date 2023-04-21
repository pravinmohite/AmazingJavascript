"use strict";(self.webpackChunksample_task=self.webpackChunksample_task||[]).push([[867],{8867:(J,p,a)=>{a.r(p),a.d(p,{NotesFeatureModule:()=>Z});var l=a(9808),c=a(4182),m=a(6949),_=a(2542),t=a(6435);let C=(()=>{class o{constructor(e){this.dataService=e,this.sortByTitle="default"}ngOnInit(){}sortByParams(){this.dataService.sortData(this.sortByTitle)}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(m.D))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-sort-by-title"]],decls:5,vars:1,consts:[[1,"hand-cursor",3,"ngModel","ngModelChange","change"],["value","default"],["value","title"]],template:function(e,n){1&e&&(t.TgZ(0,"select",0),t.NdJ("ngModelChange",function(r){return n.sortByTitle=r})("change",function(){return n.sortByParams()}),t.TgZ(1,"option",1),t._uU(2,"Default"),t.qZA(),t.TgZ(3,"option",2),t._uU(4,"Title"),t.qZA()()),2&e&&t.Q6J("ngModel",n.sortByTitle)},directives:[c.EJ,c.JJ,c.On,c.YN,c.Kr],styles:[""]}),o})(),v=(()=>{class o{constructor(){this.itemToBeEdited={note:""},this.onSaveEditedItem=new t.vpe}ngOnInit(){this.editedItemDetails&&(this.itemToBeEdited=Object.assign({},this.editedItemDetails.list[this.editedItemDetails.index]))}saveEditedItem(){this.editedItemDetails.list[this.editedItemDetails.index]=this.itemToBeEdited,this.onSaveEditedItem.emit()}}return o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-edit-notes-component"]],inputs:{editedItemDetails:"editedItemDetails"},outputs:{onSaveEditedItem:"onSaveEditedItem"},decls:6,vars:1,consts:[[1,"modal"],[1,"modal-content"],[1,"edit-notes",3,"ngModel","ngModelChange"],[1,"save-btn-container"],[1,"save-btn",3,"click"]],template:function(e,n){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"textarea",2),t.NdJ("ngModelChange",function(r){return n.itemToBeEdited.note=r}),t.qZA(),t.TgZ(3,"div",3)(4,"button",4),t.NdJ("click",function(){return n.saveEditedItem()}),t._uU(5,"Save"),t.qZA()()()()),2&e&&(t.xp6(2),t.Q6J("ngModel",n.itemToBeEdited.note))},directives:[c.Fj,c.JJ,c.On],styles:[""]}),o})();function g(o,s){if(1&o){const e=t.EpF();t.TgZ(0,"div",8)(1,"div"),t._uU(2),t.qZA(),t.TgZ(3,"div",9)(4,"button",10),t.NdJ("click",function(){const r=t.CHM(e).index,d=t.oxw().$implicit;return t.oxw().voteItem(d.notesList,r)}),t._uU(5),t.qZA(),t.TgZ(6,"button",11),t.NdJ("click",function(){const r=t.CHM(e).index,d=t.oxw().$implicit;return t.oxw().removeItem(d.notesList,r)}),t._uU(7,"x"),t.qZA(),t.TgZ(8,"button",12),t.NdJ("click",function(){const r=t.CHM(e).index,d=t.oxw().$implicit;return t.oxw().editItem(d.notesList,r)}),t._uU(9,"Edit"),t.qZA()()()}if(2&o){const e=s.$implicit;t.xp6(2),t.Oqu(e.note),t.xp6(3),t.hij("Vote ",e.vote,"")}}function h(o,s){if(1&o){const e=t.EpF();t.TgZ(0,"textarea",13,14),t.NdJ("ngModelChange",function(i){return t.CHM(e),t.oxw(2).currentNote.note=i})("keydown",function(i){t.CHM(e);const r=t.oxw().$implicit;return t.oxw().saveContent(r.notesList,i)}),t.qZA()}if(2&o){const e=t.oxw(2);t.Q6J("ngModel",e.currentNote.note)}}function f(o,s){if(1&o){const e=t.EpF();t.TgZ(0,"div",3)(1,"h2"),t._uU(2),t.qZA(),t.TgZ(3,"button",4),t.NdJ("click",function(){const r=t.CHM(e).index;return t.oxw().addItem(r)}),t._uU(4,"+"),t.qZA(),t.TgZ(5,"div",5),t.YNc(6,g,10,2,"div",6),t.YNc(7,h,2,1,"textarea",7),t.qZA()()}if(2&o){const e=s.$implicit,n=s.index,i=t.oxw();t.xp6(2),t.Oqu(e.title),t.xp6(4),t.Q6J("ngForOf",e.notesList),t.xp6(1),t.Q6J("ngIf",i.newNote&&n==i.currentNote.index)}}function T(o,s){if(1&o){const e=t.EpF();t.TgZ(0,"app-edit-notes-component",15),t.NdJ("onSaveEditedItem",function(i){return t.CHM(e),t.oxw().saveEditedItem(i)}),t.qZA()}if(2&o){const e=t.oxw();t.Q6J("editedItemDetails",e.currentItemToBeEdited)}}let N=(()=>{class o{constructor(){this.currentNote={note:""},this.showModal=!1,this.newNote=!1}ngOnInit(){}saveContent(e,n){"Enter"==n.key&&(e.push({id:Math.random(),note:this.currentNote.note}),this.newNote=!1,this.currentNote.note="")}editItem(e,n){this.showModal=!0,this.currentItemToBeEdited={list:e,index:n}}addItem(e){this.newNote=!0,this.currentNote.index=e}removeItem(e,n){e.splice(n,1)}voteItem(e,n){e[n].vote++}saveEditedItem(e){this.showModal=!1}}return o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-notes-component"]],inputs:{noteTypes:"noteTypes"},decls:3,vars:2,consts:[[1,"note-type-container"],["class","what-wentwell-container items",4,"ngFor","ngForOf"],[3,"editedItemDetails","onSaveEditedItem",4,"ngIf"],[1,"what-wentwell-container","items"],[1,"hand-cursor",3,"click"],[1,"list-container"],["class","notes-container","class","notes-container",4,"ngFor","ngForOf"],["class","notes-container",3,"ngModel","ngModelChange","keydown",4,"ngIf"],[1,"notes-container"],[1,"action-btns"],[1,"vote-btn",3,"click"],[1,"delete-btn",3,"click"],[1,"edit-btn",3,"click"],[1,"notes-container",3,"ngModel","ngModelChange","keydown"],["whatWentWellElem",""],[3,"editedItemDetails","onSaveEditedItem"]],template:function(e,n){1&e&&(t.TgZ(0,"div",0),t.YNc(1,f,8,3,"div",1),t.YNc(2,T,1,1,"app-edit-notes-component",2),t.qZA()),2&e&&(t.xp6(1),t.Q6J("ngForOf",n.noteTypes),t.xp6(1),t.Q6J("ngIf",n.showModal))},directives:[l.sg,l.O5,c.Fj,c.JJ,c.On,v],styles:[""]}),o})();const x=["whatWentWellElem"],y=["whatCanBeImprovedElem"],I=["startDoingElem"],w=["actionItemsElem"],E=[{path:"",component:(()=>{class o{constructor(e){this.dataService=e,this.title="sample-task",this.editedItem={},this.showModal=!1}ngOnInit(){this.dataService.currentData.subscribe(e=>{this.noteTypes=e})}ngDoCheck(){}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(m.D))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-notes-root"]],viewQuery:function(e,n){if(1&e&&(t.Gf(x,5),t.Gf(y,5),t.Gf(I,5),t.Gf(w,5)),2&e){let i;t.iGM(i=t.CRH())&&(n.whatWentWellElem=i),t.iGM(i=t.CRH())&&(n.whatCanBeImprovedElem=i),t.iGM(i=t.CRH())&&(n.startDoingElem=i),t.iGM(i=t.CRH())&&(n.actionItemsElem=i)}},decls:5,vars:1,consts:[[1,"heading"],[1,"main-container"],[3,"noteTypes"]],template:function(e,n){1&e&&(t.TgZ(0,"h1",0),t._uU(1,"Retrospective"),t.qZA(),t.TgZ(2,"div",1),t._UZ(3,"app-sort-by-title")(4,"app-notes-component",2),t.qZA()),2&e&&(t.xp6(4),t.Q6J("noteTypes",n.noteTypes))},directives:[C,N],styles:[""]}),o})()}];let M=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[l.ez,_.Bz.forChild(E)],_.Bz]}),o})(),Z=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({providers:[m.D],imports:[[l.ez,c.u5,M]]}),o})()}}]);