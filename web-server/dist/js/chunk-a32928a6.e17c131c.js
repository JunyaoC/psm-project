(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a32928a6"],{"43bd":function(e,t,n){},6232:function(e,t,n){"use strict";n("43bd")},b2d2:function(e,t,n){"use strict";n.r(t);n("b0c0");var c=n("7a23"),s=Object(c["Y"])("data-v-14082c68");Object(c["C"])("data-v-14082c68");var o={class:"page-wrapper"},i={style:{display:"flex","justify-content":"space-between","align-items":"center"}},u=Object(c["j"])("div",{style:{display:"flex","align-items":"center"}},[Object(c["j"])("h1",{style:{"margin-right":"2rem"}},"Program")],-1),l=Object(c["i"])(" import "),a={style:{display:"flex","justify-content":"space-between","align-items":"center"}},d=Object(c["j"])("h3",null,"Academic Session",-1),j=Object(c["i"])(" Add Academic Session "),b={style:{width:"100%","text-align":"left"}},r=Object(c["j"])("tr",null,[Object(c["j"])("th",null,"Academic Session"),Object(c["j"])("th",null,"No. of Students"),Object(c["j"])("th",null,"No. of Proposal"),Object(c["j"])("th",{style:{"text-align":"center"}},"Action")],-1),f=Object(c["j"])("td",null,"0",-1),O=Object(c["j"])("td",null,"0",-1),m={style:{"text-align":"center",display:"flex","justify-content":"space-around"}},p=Object(c["i"])("edit"),h=Object(c["i"])("delete"),M={class:"signupmodal"},y={style:{display:"flex",width:"100%","justify-content":"space-between","align-items":"center"}},S=Object(c["i"])("Cancel"),g={style:{padding:"1rem 0"}},k=Object(c["i"])(" Academic Year will be deleted permanently, please confirm "),C=Object(c["i"])("Cancel"),T=Object(c["i"])("Delete"),_={style:{display:"flex","justify-content":"space-between","align-items":"center"}},w=Object(c["j"])("h3",null,"Subject",-1),A=Object(c["i"])(" Add Subject "),v={style:{width:"100%","text-align":"left"}},E=Object(c["j"])("tr",null,[Object(c["j"])("th",null,"Subject"),Object(c["j"])("th",null,"Code"),Object(c["j"])("th",null,"Lecturers"),Object(c["j"])("th",null,"Students"),Object(c["j"])("th",{style:{"text-align":"center"}},"Action")],-1),I={style:{"text-align":"center",display:"flex","justify-content":"space-around"}},x=Object(c["i"])("edit"),N=Object(c["i"])("delete"),V={class:"signupmodal"},U={style:{display:"flex",width:"100%","justify-content":"space-between","align-items":"center"}},$=Object(c["i"])("Cancel"),z={style:{padding:"1rem 0"}},R=Object(c["i"])("Cancel"),P=Object(c["i"])("Delete");Object(c["A"])();var H=s((function(e,t,n,H,B,D){var F=Object(c["H"])("it-button"),L=Object(c["H"])("it-input"),J=Object(c["H"])("it-modal"),Y=Object(c["H"])("it-tab"),q=Object(c["H"])("it-tabs");return Object(c["z"])(),Object(c["f"])("div",o,[Object(c["j"])("div",i,[u,Object(c["j"])(F,{text:""},{default:s((function(){return[l]})),_:1})]),Object(c["j"])(q,{style:{flex:"1"}},{default:s((function(){return[Object(c["j"])(Y,{title:"Academic Session",style:{padding:"1rem"}},{default:s((function(){return[Object(c["j"])("div",a,[d,Object(c["j"])(F,{round:"",onClick:t[1]||(t[1]=function(e){return D.openForm("academic","create",!1)})},{default:s((function(){return[j]})),_:1})]),Object(c["j"])("table",b,[r,(Object(c["z"])(!0),Object(c["f"])(c["a"],null,Object(c["F"])(B.sessions,(function(e){return Object(c["z"])(),Object(c["f"])("tr",{class:"dataRow",key:e.uid},[Object(c["j"])("td",null,Object(c["M"])(e.name),1),f,O,Object(c["j"])("td",m,[Object(c["j"])(F,{onClick:function(t){return D.openForm("academic","edit",e)},size:"small"},{default:s((function(){return[p]})),_:2},1032,["onClick"]),Object(c["j"])(F,{onClick:function(t){return D.openForm("academic","delete",e)},size:"small"},{default:s((function(){return[h]})),_:2},1032,["onClick"])])])})),128))]),"delete"!=B.operation?(Object(c["z"])(),Object(c["f"])(J,{key:0,modelValue:B.sessionModal,"onUpdate:modelValue":t[5]||(t[5]=function(e){return B.sessionModal=e})},{body:s((function(){return[Object(c["j"])("div",M,[Object(c["j"])("div",y,[Object(c["j"])("h2",null,Object(c["M"])(B.sessionModalTitle),1),Object(c["j"])(F,{type:"danger",onClick:t[2]||(t[2]=function(e){return B.sessionModal=!1})},{default:s((function(){return[S]})),_:1})]),Object(c["j"])("div",g,[Object(c["j"])(L,{modelValue:B.sessionInput,"onUpdate:modelValue":t[3]||(t[3]=function(e){return B.sessionInput=e}),labelTop:"Title of Academic Session"},null,8,["modelValue"])]),Object(c["j"])(F,{block:"",size:"big",type:"primary",onClick:t[4]||(t[4]=function(e){return D.submitSessionModal()})},{default:s((function(){return[Object(c["i"])(Object(c["M"])(B.sessionModalButton),1)]})),_:1})])]})),_:1},8,["modelValue"])):Object(c["g"])("",!0),"delete"==B.operation?(Object(c["z"])(),Object(c["f"])(J,{key:1,modelValue:B.sessionModal,"onUpdate:modelValue":t[8]||(t[8]=function(e){return B.sessionModal=e})},{header:s((function(){return[Object(c["j"])("h3",null,"Delete "+Object(c["M"])(B.modalPayload.title)+" ?",1)]})),body:s((function(){return[k]})),actions:s((function(){return[Object(c["j"])(F,{onClick:t[6]||(t[6]=function(e){return B.sessionModal=!1})},{default:s((function(){return[C]})),_:1}),Object(c["j"])(F,{type:"danger",onClick:t[7]||(t[7]=function(e){return D.submitSessionModal()})},{default:s((function(){return[T]})),_:1})]})),_:1},8,["modelValue"])):Object(c["g"])("",!0)]})),_:1}),Object(c["j"])(Y,{title:"Subjects",style:{padding:"1rem"}},{default:s((function(){return[Object(c["j"])("div",_,[w,Object(c["j"])(F,{round:"",onClick:t[9]||(t[9]=function(e){return D.openForm("subject","create",!1)})},{default:s((function(){return[A]})),_:1})]),Object(c["j"])("table",v,[E,(Object(c["z"])(!0),Object(c["f"])(c["a"],null,Object(c["F"])(B.subjects,(function(e){return Object(c["z"])(),Object(c["f"])("tr",{class:"dataRow",key:e.uid},[Object(c["j"])("td",null,Object(c["M"])(e.name),1),Object(c["j"])("td",null,Object(c["M"])(e.code),1),Object(c["j"])("td",null,Object(c["M"])(e.lect_count),1),Object(c["j"])("td",null,Object(c["M"])(e.student_count),1),Object(c["j"])("td",I,[Object(c["j"])(F,{onClick:function(t){return D.openForm("subject","edit",e)},size:"small"},{default:s((function(){return[x]})),_:2},1032,["onClick"]),Object(c["j"])(F,{onClick:function(t){return D.openForm("subject","delete",e)},size:"small"},{default:s((function(){return[N]})),_:2},1032,["onClick"])])])})),128))]),"delete"!=B.operation?(Object(c["z"])(),Object(c["f"])(J,{key:0,modelValue:B.subjectModal,"onUpdate:modelValue":t[14]||(t[14]=function(e){return B.subjectModal=e})},{body:s((function(){return[Object(c["j"])("div",V,[Object(c["j"])("div",U,[Object(c["j"])("h2",null,Object(c["M"])(B.subjectModalTitle),1),Object(c["j"])(F,{type:"danger",onClick:t[10]||(t[10]=function(e){return B.subjectModal=!1})},{default:s((function(){return[$]})),_:1})]),Object(c["j"])("div",z,[Object(c["j"])(L,{modelValue:B.subjectInput.name,"onUpdate:modelValue":t[11]||(t[11]=function(e){return B.subjectInput.name=e}),labelTop:"Subject Name"},null,8,["modelValue"]),Object(c["j"])(L,{modelValue:B.subjectInput.code,"onUpdate:modelValue":t[12]||(t[12]=function(e){return B.subjectInput.code=e}),labelTop:"Subject Code"},null,8,["modelValue"])]),Object(c["j"])(F,{block:"",size:"big",type:"primary",onClick:t[13]||(t[13]=function(e){return D.submitSubjectModal()})},{default:s((function(){return[Object(c["i"])(Object(c["M"])(B.subjectModalButton),1)]})),_:1})])]})),_:1},8,["modelValue"])):Object(c["g"])("",!0),"delete"==B.operation?(Object(c["z"])(),Object(c["f"])(J,{key:1,modelValue:B.subjectModal,"onUpdate:modelValue":t[17]||(t[17]=function(e){return B.subjectModal=e})},{header:s((function(){return[Object(c["j"])("h3",null,"Delete "+Object(c["M"])(B.modalPayload.name)+" ?",1)]})),body:s((function(){return[Object(c["i"])(Object(c["M"])(B.modalPayload.name)+" will be deleted permanently, please confirm ",1)]})),actions:s((function(){return[Object(c["j"])(F,{onClick:t[15]||(t[15]=function(e){return B.subjectModal=!1})},{default:s((function(){return[R]})),_:1}),Object(c["j"])(F,{type:"danger",onClick:t[16]||(t[16]=function(e){return D.submitSubjectModal()})},{default:s((function(){return[P]})),_:1})]})),_:1},8,["modelValue"])):Object(c["g"])("",!0)]})),_:1})]})),_:1})])})),B=n("5530"),D=(n("bc3a"),n("8bdb")),F=n("8a77"),L={name:"Program",mounted:function(){this.fetchSessions(),this.fetchSubjects()},data:function(){return{sessions:[],subjects:[],viewTab:"academic",sessionModal:!1,sessionInput:"",sessionModalTitle:"",sessionModalButton:"",subjectModal:!1,subjectModalTitle:"",subjectModalButton:"",operation:!1,modalPayload:!1,addButton:"Academic Year",subjectInput:{name:"",code:""}}},methods:{openForm:function(e,t,n){switch(console.log(e),this.modalPayload=n,this.operation=t,this.viewTab=e,this.viewTab){case"academic":switch(this.sessionModal=!0,this.operation){case"create":this.sessionModalTitle="Add Academic Session",this.sessionModalButton="Add";break;case"edit":this.sessionModalTitle="Edit Academic Session",this.sessionInput=n.title,this.sessionModalButton="Edit";break;case"delete":break}break;case"subject":switch(this.subjectModal=!0,this.operation){case"create":this.subjectModalTitle="Add Subject",this.subjectModalButton="Add Subject",console.log(this.subjectModalButton);break;case"edit":this.subjectModalTitle="Edit Subject",this.subjectInput=Object(B["a"])({},n),this.subjectModalButton="Edit";break}break}},fetchSessions:function(){var e=this,t=D["a"].session();this.sessions=[],t.run("MATCH (s:Session) return s").subscribe({onNext:function(t){e.sessions.push(t.get("s").properties)},onCompleted:function(){t.close()},onError:function(e){console.log(e)}})},fetchSubjects:function(){var e=this,t=D["a"].session();this.subjects=[],t.run("MATCH (s:Subject) RETURN s, size((s)<-[:MAJOR_IN]-()) as STUDENT_COUNT, size((s)<-[:LECTURER_OF]-()) as LECT_COUNT").subscribe({onNext:function(t){e.subjects.push(Object(B["a"])(Object(B["a"])({},t.get("s").properties),{},{lect_count:t.get("LECT_COUNT"),student_count:t.get("STUDENT_COUNT")}))},onCompleted:function(){t.close()},onError:function(e){console.log(e)}})},submitSessionModal:function(){var e=this,t=D["a"].session();switch(this.operation){case"create":t.run("CREATE (s:Session {name:$title, uid:$uid})",{title:this.sessionInput,uid:Object(F["a"])()}).then((function(n){e.fetchSessions(),e.sessionModal=!1,e.sessionInput="",e.$Notification({title:"Success 🎊",text:"Added new academic session ".concat(e.sessionInput,".")}),t.close()}));break;case"edit":t.run("MATCH (s:Session {uid:$uid}) SET s.title = $input RETURN s",{uid:this.modalPayload.uid,input:this.sessionInput}).then((function(n){console.log(e.result),e.fetchSessions(),e.sessionModal=!1,e.$Notification({title:"Success 🎊",text:"Added new academic session ".concat(e.sessionInput,".")}),t.close()}));break;case"delete":t.run("MATCH (s:Session {uid:$uid}) DELETE s",{uid:this.modalPayload.uid}).then((function(n){console.log(e.result),e.fetchSessions(),e.sessionModal=!1,e.$Notification({title:"Removed 🗑️",text:"Deleted academic session ".concat(e.sessionInput,".")}),t.close()}));break}},submitSubjectModal:function(){var e=this,t=D["a"].session();switch(this.operation){case"create":t.run("CREATE (s:Subject {name:$name,code:$code, uid:$uid})",{name:this.subjectInput.name,code:this.subjectInput.code,uid:Object(F["a"])()}).then((function(n){e.fetchSubjects(),e.$Notification({title:"Success 🎊",text:"Added new subject ".concat(e.subjectInput.name,".")}),e.subjectModal=!1,e.subjectInput={name:"",code:""},t.close()}));break;case"edit":t.run("MATCH (s:Subject {uid:$uid}) SET s.name = $name, s.code = $code RETURN s",{name:this.subjectInput.name,code:this.subjectInput.code,uid:this.modalPayload.uid}).then((function(n){e.fetchSubjects(),e.$Notification({title:"Success 🎊",text:"Updated Subject ".concat(e.subjectInput.name,".")}),e.subjectModal=!1,e.subjectInput={name:"",code:""},t.close()}));break;case"delete":t.run("MATCH (s:Subject {uid:$uid}) DELETE s",{uid:this.modalPayload.uid}).then((function(n){console.log(e.result),e.fetchSubjects(),e.subjectModal=!1,e.$Notification({title:"Removed 🗑️",text:"Deleted subject ".concat(e.modalPayload.name,".")}),t.close()}));break}}}};n("6232");L.render=H,L.__scopeId="data-v-14082c68";t["default"]=L}}]);
//# sourceMappingURL=chunk-a32928a6.e17c131c.js.map