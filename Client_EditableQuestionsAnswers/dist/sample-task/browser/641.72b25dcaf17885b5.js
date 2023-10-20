"use strict";(self.webpackChunksample_task=self.webpackChunksample_task||[]).push([[641],{8641:(S,m,l)=>{l.r(m),l.d(m,{AdminPanelModule:()=>M});var d=l(6362),c=l(2816),e=l(3184),g=l(4267),f=l(5441),h=l(9087),v=l(4873);let p=(()=>{class n{constructor(t,s,r,a,u){this.questionAnswerService=t,this.router=s,this.loaderService=r,this.highlightService=u,this.platformId=a}ngOnInit(){this.platformId&&"true"==localStorage.getItem("loggedIn")?(this.questionAnswerService.currentData.subscribe(t=>{t&&t.result&&(this.questionAnswerList=t.result,this.loaderService.display(!1),this.highlightService.hightLightAgain())}),this.questionAnswerService.getQuestionAnswerListServerSide()):this.router.navigateByUrl("/admin-panel")}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(g.t),e.Y36(c.F0),e.Y36(f.D),e.Y36(e.Lbi),e.Y36(h.u))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-interview-questions-panel"]],decls:1,vars:2,consts:[[3,"questionAnswerList","adminMode"]],template:function(t,s){1&t&&e._UZ(0,"app-question-answer-panel",0),2&t&&e.Q6J("questionAnswerList",s.questionAnswerList)("adminMode",!0)},directives:[v.P],styles:[""]}),n})();var o=l(587);function w(n,i){1&n&&(e.TgZ(0,"div"),e._uU(1," Passwords do not match. "),e.qZA())}function b(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"div")(1,"div",4)(2,"label",13),e._uU(3,"Confirm Password"),e.qZA(),e.TgZ(4,"div",6)(5,"input",14),e.NdJ("blur",function(r){return e.CHM(t),e.oxw().blurEventHandler(r)}),e.qZA(),e.YNc(6,w,2,0,"div",10),e.qZA()()()}if(2&n){const t=e.oxw();e.xp6(6),e.Q6J("ngIf",t.userForm.get("password").hasError("passwordMismatch")&&t.userForm.get("confirmPassword").touched)}}function P(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"button",15),e.NdJ("click",function(){return e.CHM(t),e.oxw().toggleRegistrationFields()}),e._uU(1,"Login"),e.qZA()}}function _(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"button",15),e.NdJ("click",function(){return e.CHM(t),e.oxw().toggleRegistrationFields()}),e._uU(1,"Register"),e.qZA()}}const C=[{path:"updateInterviewQuestions",component:p},{path:"admin-panel/updateInterviewQuestions",component:p},{path:"",component:(()=>{class n{constructor(t,s,r,a){this.questionAnswerService=t,this.router=s,this.fb=r,this.showRegistrationFields=!1,this.isUserRegistered=!1,this.users=[],this.login={username:"",password:""},this.platformId=a,this.userForm=this.fb.group({username:["",[o.kI.required,o.kI.minLength(3)]],password:["",[o.kI.required]],confirmPassword:[""]},{validator:this.passwordMatchValidator})}ngOnInit(){this.platformId&&"true"==localStorage.getItem("loggedIn")&&this.questionAnswerService.setIsAdmin(!0)}toggleRegistrationFields(){this.showRegistrationFields=!this.showRegistrationFields,this.userForm.get("confirmPassword").setValue("")}submitForm(){if(this.showRegistrationFields){if(this.userForm.get("confirmPassword").hasError("passwordMismatch"))return void alert("Password and Confirm Password should match!");if(this.userForm.get("username").hasError("minlength")||this.userForm.get("username").hasError("required")||this.userForm.get("password").hasError("required")||this.userForm.get("username").value.length<3||this.userForm.get("password").value.length<3)return void alert("Minimum 3 alphabets or numbers required!");if(this.userForm.valid){const t=this.userForm.get("username").value,s=this.userForm.get("password").value;this.questionAnswerService.signUp({username:t,password:s,isAdmin:!1}).subscribe(r=>{r?(alert("Registration successful!"),this.isUserRegistered=!0,this.userForm.reset()):alert("Registration failed: "+r.message)},r=>{alert("Registration failed: "+r.message)})}else alert("Please fill in all required fields and ensure passwords match.")}else if(this.userForm.get("username").valid&&this.userForm.get("password").valid){const t=this.userForm.get("username").value,s=this.userForm.get("password").value;this.questionAnswerService.getloginDetails().subscribe(r=>{if(r){const a=r.find(u=>u.username===t&&u.password===s);a?(console.log("isAdmin:",a.isAdmin),this.questionAnswerService.setIsAdmin(a.isAdmin),localStorage.setItem("loggedIn","true"),a.isAdmin?this.router.navigateByUrl("/admin-panel/updateInterviewQuestions"):this.router.navigate(["/userPost"]),this.questionAnswerService.setIsAdmin(!1),localStorage.setItem("loggedIn","true")):alert("Login failed: Invalid username or password.")}else alert("Login failed: "+r.message)},r=>{alert("Login failed: "+r.message)})}else alert("Please fill in valid username and password.")}getUsers(){this.questionAnswerService.getloginDetails().subscribe(t=>{t.success?this.users=t.data:alert("Failed to retrieve users: "+t.message)},t=>{alert("Failed to retrieve users: "+t.message)})}deleteUser(t){this.questionAnswerService.deleteloginDetails(t).subscribe(s=>{s.success?alert("User deleted successfully."):alert("Failed to delete user: "+s.message)},s=>{alert("Failed to delete user: "+s.message)})}updatePassword(t,s){this.questionAnswerService.updateloginDetails({username:t,password:s}).subscribe(r=>{r.success?alert("Password updated successfully."):alert("Failed to update password: "+r.message)},r=>{alert("Failed to update password: "+r.message)})}blurEventHandler(t){t.target.classList.remove("invalid-input"),t.target.value.length<3&&t.target.classList.add("invalid-input")}passwordMatchValidator(t){if(t.get("password").value===t.get("confirmPassword").value)return t.get("confirmPassword").setErrors(null),null;t.get("confirmPassword").setErrors({passwordMismatch:!0})}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(g.t),e.Y36(c.F0),e.Y36(o.qu),e.Y36(e.Lbi))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-login"]],decls:24,vars:5,consts:[[1,"container","loginPannel-maincontainer"],[1,"loginPannel-container"],[1,"login-register"],[3,"formGroup","ngSubmit"],[1,"Sign-upContainer"],["for","username",1,"col-4","col-form-label"],[1,"col-8"],["id","username","name","username","formControlName","username","placeholder","Enter your Username","type","text","required","",1,"form-control",3,"blur"],["for","password",1,"col-4","col-form-label"],["id","password","name","password","formControlName","password","placeholder","Enter your Password","type","password","required","",1,"form-control",3,"blur"],[4,"ngIf"],["type","submit",1,"Submit-btn","btn"],["class","btn login-btn",3,"click",4,"ngIf"],["for","confirmPassword",1,"col-4","col-form-label"],["id","confirmPassword","name","confirmPassword","formControlName","confirmPassword","placeholder","Confirm Password","type","password","required","",1,"form-control",3,"blur"],[1,"btn","login-btn",3,"click"]],template:function(t,s){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"fieldset")(3,"legend",2),e._uU(4),e.qZA(),e.TgZ(5,"form",3),e.NdJ("ngSubmit",function(){return s.submitForm()}),e.TgZ(6,"div",4)(7,"label",5),e._uU(8,"Username"),e.qZA(),e.TgZ(9,"div",6)(10,"input",7),e.NdJ("blur",function(a){return s.blurEventHandler(a)}),e.qZA()()(),e.TgZ(11,"div",4)(12,"label",8),e._uU(13,"Password"),e.qZA(),e.TgZ(14,"div",6)(15,"input",9),e.NdJ("blur",function(a){return s.blurEventHandler(a)}),e.qZA()()(),e.YNc(16,b,7,1,"div",10),e.TgZ(17,"div",4),e._UZ(18,"label",5),e.TgZ(19,"div",6)(20,"button",11),e._uU(21,"Submit"),e.qZA(),e.YNc(22,P,2,0,"button",12),e.YNc(23,_,2,0,"button",12),e.qZA()()()()()()),2&t&&(e.xp6(4),e.hij("",s.showRegistrationFields?"Register":"Login",":"),e.xp6(1),e.Q6J("formGroup",s.userForm),e.xp6(11),e.Q6J("ngIf",s.showRegistrationFields),e.xp6(6),e.Q6J("ngIf",s.showRegistrationFields),e.xp6(1),e.Q6J("ngIf",!s.showRegistrationFields))},directives:[o._Y,o.JL,o.sg,o.Fj,o.JJ,o.u,o.Q7,d.O5],styles:[".invalid-input[_ngcontent-%COMP%]{border:2px solid red}.Sign-upContainer[_ngcontent-%COMP%]{display:flex;flex-direction:row;padding:10px}.loginPannel-maincontainer[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:65vh}.loginPannel-container[_ngcontent-%COMP%]{width:60%;border:1px solid #333;border-radius:10px;background-color:#dcdcdc94}.login-register[_ngcontent-%COMP%]{background-color:#333;color:#fff;border-top-right-radius:6px;border-top-left-radius:6px;padding:5px 0 5px 24px}.btn[_ngcontent-%COMP%]{margin-right:10px}.login-btn[_ngcontent-%COMP%]{border-radius:10px;border:1px solid #333!important;padding:7px 18px;color:#333;border:none;cursor:pointer;transition:background-color .3s,transform .3s}.login-btn[_ngcontent-%COMP%]:active, .login-btn[_ngcontent-%COMP%]:focus, .login-btn[_ngcontent-%COMP%]:hover{transform:scale(.95)}.Submit-btn[_ngcontent-%COMP%]{border-radius:10px;background-color:#333;padding:7px 18px;color:#fff;border:none;cursor:pointer;transition:background-color .3s,transform .3s}.Submit-btn[_ngcontent-%COMP%]:active, .Submit-btn[_ngcontent-%COMP%]:focus, .Submit-btn[_ngcontent-%COMP%]:hover{background-color:#333;transform:scale(.95)}@media screen and (max-width: 768px){.loginPannel-container[_ngcontent-%COMP%]{width:100%}.Submit-btn[_ngcontent-%COMP%], .login-btn[_ngcontent-%COMP%]{padding:5px 13px}}"]}),n})()}];let A=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[d.ez,c.Bz.forChild(C)]]}),n})();var F=l(7622),x=l(6327);let M=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[d.ez,o.u5,A,F.uH,x.InterviewQuestionsModule,o.UX]]}),n})()}}]);
//# sourceMappingURL=641.72b25dcaf17885b5.js.map