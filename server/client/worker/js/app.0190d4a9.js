(function(t){function a(a){for(var o,l,n=a[0],r=a[1],c=a[2],u=0,p=[];u<n.length;u++)l=n[u],Object.prototype.hasOwnProperty.call(i,l)&&i[l]&&p.push(i[l][0]),i[l]=0;for(o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o]);d&&d(a);while(p.length)p.shift()();return s.push.apply(s,c||[]),e()}function e(){for(var t,a=0;a<s.length;a++){for(var e=s[a],o=!0,n=1;n<e.length;n++){var r=e[n];0!==i[r]&&(o=!1)}o&&(s.splice(a--,1),t=l(l.s=e[0]))}return t}var o={},i={app:0},s=[];function l(a){if(o[a])return o[a].exports;var e=o[a]={i:a,l:!1,exports:{}};return t[a].call(e.exports,e,e.exports,l),e.l=!0,e.exports}l.m=t,l.c=o,l.d=function(t,a,e){l.o(t,a)||Object.defineProperty(t,a,{enumerable:!0,get:e})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,a){if(1&a&&(t=l(t)),8&a)return t;if(4&a&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(l.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&a&&"string"!=typeof t)for(var o in t)l.d(e,o,function(a){return t[a]}.bind(null,o));return e},l.n=function(t){var a=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(a,"a",a),a},l.o=function(t,a){return Object.prototype.hasOwnProperty.call(t,a)},l.p="/";var n=window["webpackJsonp"]=window["webpackJsonp"]||[],r=n.push.bind(n);n.push=a,n=n.slice();for(var c=0;c<n.length;c++)a(n[c]);var d=r;s.push([0,"chunk-vendors"]),e()})({0:function(t,a,e){t.exports=e("56d7")},"034f":function(t,a,e){"use strict";e("85ec")},"56d7":function(t,a,e){"use strict";e.r(a);e("e260"),e("e6cf"),e("cca6"),e("a79d");var o=e("2b0e"),i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[t._m(0),e("div",{staticClass:"container-fluid p-5"},[e("div",{staticClass:"row mb-5"},[e("div",{staticClass:"col-6"},[e("img",{staticClass:"img-thumbnail",attrs:{src:t.image}})]),e("div",{staticClass:"col-6"},[e("div",{attrs:{id:"productidentifier"}},[t._v(" ID: "+t._s(t.identifier)+" ")]),e("div",[e("h1",[t._v(t._s(t.title+" "+t.brand))])]),e("div",{staticClass:"mb-2"},t._l(t.tags,(function(a){return e("span",{key:a,staticClass:"badge rounded-pill bg-primary"},[t._v(t._s(a))])})),0),e("div",[t._l(parseInt(t.quality),(function(t){return e("span",{key:t,staticClass:"fa fa-star checked big-size"})})),t._l(3-parseInt(t.quality),(function(t){return e("span",{key:t,staticClass:"fa fa-star big-size"})}))],2),e("div",{staticClass:"mt-3 mb-3"},[t.discount.onSale?e("span",{staticClass:"price"},[e("s",[t._v(t._s(t.price)+"€")]),t._v(" "),e("span",{attrs:{id:"onSalePrice"}},[t._v(t._s(t.getDiscountedPrice)+"€")])]):e("span",{staticClass:"price"},[t._v(t._s(t.price)+" €")])]),e("div",[e("button",{staticClass:"btn btn-lg btn-secondary",attrs:{type:"button",id:"rentProduct"}},[t._v("Affitta")]),e("button",{staticClass:"btn btn-lg btn-primary",attrs:{type:"button","data-bs-toggle":"modal","data-bs-target":"#myModal"},on:{click:t.getModalData}},[t._v("Modifica")]),e("div",{staticClass:"form-check form-switch big-size"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.available,expression:"available"}],staticClass:"form-check-input custom-switch",attrs:{type:"checkbox",id:"flexSwitchCheckDefault"},domProps:{checked:t.available,checked:Array.isArray(t.available)?t._i(t.available,null)>-1:t.available},on:{change:function(a){var e=t.available,o=a.target,i=!!o.checked;if(Array.isArray(e)){var s=null,l=t._i(e,s);o.checked?l<0&&(t.available=e.concat([s])):l>-1&&(t.available=e.slice(0,l).concat(e.slice(l+1)))}else t.available=i}}}),t.available?e("label",{staticClass:"form-check-label",attrs:{for:"flexSwitchCheckDefault"}},[t._v("Disattiva articolo")]):e("label",{staticClass:"form-check-label",attrs:{for:"flexSwitchCheckDefault"}},[t._v("Attiva articolo")])]),e("div",{staticClass:"modal",attrs:{id:"myModal"}},[e("div",{staticClass:"modal-dialog"},[e("div",{staticClass:"modal-content"},[t._m(1),e("div",{staticClass:"modal-body"},[e("form",[t._m(2),e("div",{staticClass:"row mb-3"},[e("div",{staticClass:"col-6"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.titleModal,expression:"titleModal"}],staticClass:"form-control",attrs:{type:"text",id:"productname",placeholder:t.titleModal},domProps:{value:t.titleModal},on:{input:function(a){a.target.composing||(t.titleModal=a.target.value)}}})]),e("div",{staticClass:"col-6"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.brandModal,expression:"brandModal"}],staticClass:"form-control",attrs:{type:"text",id:"productModel"},domProps:{value:t.brandModal},on:{input:function(a){a.target.composing||(t.brandModal=a.target.value)}}})])]),t._m(3),e("div",{staticClass:"row mb-3"},[e("div",{staticClass:"col"},[e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.tagsModal,expression:"tagsModal"}],staticClass:"form-control w-80",attrs:{id:"productTags",rows:"3"},domProps:{value:t.tagsModal},on:{input:function(a){a.target.composing||(t.tagsModal=a.target.value)}}})])]),e("div",{staticClass:"row mb-3 d-flex align-items-center justify-content-between"},[t._m(4),e("div",{staticClass:"col-8"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.imageModal,expression:"imageModal"}],staticClass:"form-control",attrs:{type:"text",id:"imageLink"},domProps:{value:t.imageModal},on:{input:function(a){a.target.composing||(t.imageModal=a.target.value)}}})])]),t._m(5),e("div",{staticClass:"row mb-3"},[e("div",{staticClass:"col-6"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.qualityModal,expression:"qualityModal"}],staticClass:"form-select",on:{change:function(a){var e=Array.prototype.filter.call(a.target.options,(function(t){return t.selected})).map((function(t){var a="_value"in t?t._value:t.value;return a}));t.qualityModal=a.target.multiple?e:e[0]}}},[e("option",{domProps:{value:1}},[t._v("1 - Condizioni accettabili")]),e("option",{attrs:{selected:""},domProps:{value:2}},[t._v("2 - Buone condizioni")]),e("option",{domProps:{value:3}},[t._v("3 - Come nuovo")])])]),e("div",{staticClass:"col-6"},[e("div",{staticClass:"input-group"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.priceModal,expression:"priceModal"}],staticClass:"form-control text-end",attrs:{type:"text",id:"productPrice"},domProps:{value:t.priceModal},on:{input:function(a){a.target.composing||(t.priceModal=a.target.value)}}}),e("span",{staticClass:"input-group-text justify-content-center"},[t._v("€")])])])]),e("hr"),e("div",{staticClass:"row mb-2 d-flex align-items-center justify-content-between"},[e("div",{staticClass:"col-6"},[e("div",{staticClass:"form-check"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.onSaleModal,expression:"onSaleModal"}],staticClass:"form-check-input",attrs:{type:"checkbox",id:"onSale"},domProps:{checked:t.onSaleModal,checked:Array.isArray(t.onSaleModal)?t._i(t.onSaleModal,null)>-1:t.onSaleModal},on:{change:function(a){var e=t.onSaleModal,o=a.target,i=!!o.checked;if(Array.isArray(e)){var s=null,l=t._i(e,s);o.checked?l<0&&(t.onSaleModal=e.concat([s])):l>-1&&(t.onSaleModal=e.slice(0,l).concat(e.slice(l+1)))}else t.onSaleModal=i}}}),e("label",{staticClass:"form-check-label",attrs:{for:"onSale"}},[t._v("Sconto")])])]),e("div",{staticClass:"col-3"},[e("div",{staticClass:"form-check"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.onSaleTypeModal,expression:"onSaleTypeModal"}],staticClass:"form-check-input",attrs:{type:"radio",name:"discount",id:"discountPercentage",disabled:!t.onSaleModal},domProps:{value:!0,checked:t._q(t.onSaleTypeModal,!0)},on:{change:function(a){t.onSaleTypeModal=!0}}}),e("label",{staticClass:"form-check-label",attrs:{for:"discountPercentage"}},[t._v("Percentuale")])])]),e("div",{staticClass:"col-3"},[e("div",{staticClass:"form-check"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.onSaleTypeModal,expression:"onSaleTypeModal"}],staticClass:"form-check-input",attrs:{id:"discountAmount",type:"radio",name:"discount",disabled:!t.onSaleModal},domProps:{value:!1,checked:t._q(t.onSaleTypeModal,!1)},on:{change:function(a){t.onSaleTypeModal=!1}}}),e("label",{staticClass:"form-check-label",attrs:{for:"discountAmount"}},[t._v("Fisso")])])])]),e("div",{staticClass:"row mb-2 d-flex justify-content-end"},[e("div",{staticClass:"col-6 d-flex align-items-center"},[t._v(" Sconto applicato ")]),e("div",{staticClass:"col-6"},[e("div",{staticClass:"input-group"},[e("span",{staticClass:"input-group-text justify-content-center"},[t._v("-")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.onSaleValueModal,expression:"onSaleValueModal"}],staticClass:"form-control text-end",attrs:{type:"text",disabled:!t.onSaleModal},domProps:{value:t.onSaleValueModal},on:{input:function(a){a.target.composing||(t.onSaleValueModal=a.target.value)}}}),t.discount.onSaleType?e("span",{staticClass:"input-group-text justify-content-center",attrs:{id:"pd"}},[t._v("%")]):e("span",{staticClass:"input-group-text justify-content-center",attrs:{id:"pd"}},[t._v("€")])])])]),e("div",{staticClass:"row mb-3"},[e("div",{staticClass:"col-6 d-flex align-items-center"},[t._v(" Prezzo scontato ")]),e("div",{staticClass:"col-6"},[e("div",{staticClass:"input-group"},[e("input",{staticClass:"form-control text-end",attrs:{type:"text",disabled:"",placeholder:t.getDiscountedPriceModal}}),e("span",{staticClass:"input-group-text justify-content-center"},[t._v("€")])])])]),e("hr"),t._m(6),e("div",{staticClass:"row mb-3"},[e("div",{staticClass:"col"},[e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.descriptionModal,expression:"descriptionModal"}],staticClass:"form-control w-80",attrs:{id:"productDescription",rows:"3"},domProps:{value:t.descriptionModal},on:{input:function(a){a.target.composing||(t.descriptionModal=a.target.value)}}})])]),t._m(7),e("div",{staticClass:"row mb-3"},[e("div",{staticClass:"col"},[e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.noteModal,expression:"noteModal"}],staticClass:"form-control w-80",attrs:{id:"productNote",rows:"3"},domProps:{value:t.noteModal},on:{input:function(a){a.target.composing||(t.noteModal=a.target.value)}}})])])])]),t._m(8)])])])])])]),t._m(9),e("div",{staticClass:"row mb-3 p-3 border border-secondary border-3 bg-white"},[t._v(" "+t._s(t.description)+" ")]),t._m(10),e("div",{staticClass:"row mb-3 p-3 border border-secondary border-3 bg-white"},[t._v(" "+t._s(t.note)+" ")]),t._m(11)]),e("button",{on:{click:function(a){return t.productButton("61790b14c9f1f2e35c109866")}}},[t._v("GetCar")]),e("button",{on:{click:function(a){return t.productButton("616fe38696d1e399a0d12244")}}},[t._v("GetBike")]),e("button",{on:{click:function(a){return t.productButton("6179508e9013db333732f9eb")}}},[t._v("GetMotorcycle")])])},s=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"input-group w-75 mt-2 mb-2 mr-auto ml-auto"},[e("button",{staticClass:"btn dropdown-toggle",attrs:{id:"myDDButton",type:"button","data-bs-toggle":"dropdown"}},[t._v("Clienti")]),e("div",{staticClass:"dropdown-menu p-0"},[e("a",{staticClass:"dropdown-item",attrs:{href:"#"}},[t._v("Clienti")]),e("a",{staticClass:"dropdown-item",attrs:{href:"#"}},[t._v("Articoli")]),e("a",{staticClass:"dropdown-item",attrs:{href:"#"}},[t._v("Prenotazioni")])]),e("input",{staticClass:"form-control",attrs:{type:"text",placeholder:"cerca"}}),e("button",{staticClass:"btn btn-success",attrs:{type:"submit"}},[e("img",{attrs:{src:"https://cdn.discordapp.com/attachments/888778821262790686/898238385783705610/lente-d-ingradimento.png",height:"22.5em"}})])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"modal-header"},[e("h4",{staticClass:"modal-title"},[t._v("Modifica prodotto")]),e("button",{staticClass:"btn-close",attrs:{type:"button","data-bs-dismiss":"modal"}})])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-6"},[e("label",{staticClass:"form-label",attrs:{for:"productName"}},[t._v("Nome")])]),e("div",{staticClass:"col-6"},[e("label",{staticClass:"form-label",attrs:{for:"productModel"}},[t._v("Marca")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("label",{staticClass:"form-label",attrs:{for:"productTags"}},[t._v("Etichette (separare con uno spazio)")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"col-4"},[e("label",{staticClass:"form-label",attrs:{for:"imageLink"}},[t._v("Immagine (link)")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-6"},[e("label",{staticClass:"form-label",attrs:{for:"productQuality"}},[t._v("Qualità")])]),e("div",{staticClass:"col-6"},[e("label",{attrs:{for:"productPrice"}},[t._v("Prezzo di listino")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("label",{staticClass:"form-label",attrs:{for:"productDescription"}},[t._v("Descrizione")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("label",{staticClass:"form-label",attrs:{for:"productNote"}},[t._v("Note (non sono visibli al cliente)")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"modal-footer d-flex justify-content-between"},[e("button",{staticClass:"btn btn-primary float-left",attrs:{type:"button",id:"saveData","data-bs-dismiss":"modal"}},[t._v("Salva")]),e("button",{staticClass:"btn btn-danger float-right",attrs:{type:"button","data-bs-dismiss":"modal"}},[t._v("Chiudi")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"row"},[e("h3",[t._v("Descrizione")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"row"},[e("h3",[t._v("Note")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"row"},[e("h3",[t._v("Lista prenotazioni")]),e("input",{staticClass:"form-control",attrs:{id:"myInput",type:"text",placeholder:"Search.."}}),e("br")])}],l=e("2909"),n=e("1da1"),r=(e("96cf"),e("a4d3"),e("e01a"),e("b680"),e("a434"),e("ac1f"),e("5319"),e("d3b7"),e("6062"),e("3ca3"),e("ddb0"),e("1276"),e("ab8b"),e("7b17"),e("1157")),c=e.n(r),d=e("d4ec"),u=e("bee2"),p=e("bc3a"),v=e.n(p),m=v.a.create({baseURL:"http://localhost:8081/",headers:{"Content-type":"application/json","Access-Control-Allow-Origin":"*",dataType:"jsonp"}}),f=function(){function t(){Object(d["a"])(this,t)}return Object(u["a"])(t,[{key:"getProduct",value:function(t){return m.get("/api/product?id="+t)}}]),t}(),b=new f,h={data:function(){return{identifier:"",title:"",brand:"",image:"",tags:[],quality:0,price:0,discount:{onSale:!1,onSaleType:!1,onSaleValue:0},available:!1,description:"",bookings:[],note:"",titleModal:"",brandModal:"",imageModal:"",tagsModal:[],qualityModal:0,priceModal:0,onSaleModal:!1,onSaleTypeModal:!1,onSaleValueModal:0,descriptionModal:"",noteModal:""}},methods:{productButton:function(t){var a=this,e={};b.getProduct(t).then((function(t){e=t.data,a.identifier=e._id,a.title=e.title,a.brand=e.brand,a.image=e.image,a.tags=e.tags,a.quality=e.quality,a.price=e.price,a.discount=e.discount,a.available=e.available,a.description=e.description,a.note=e.note,a.bookings=e.bookings}),(function(t){console.log(t)}))},getModalData:function(){this.titleModal=this.title,this.brandModal=this.brand,this.imageModal=this.image,this.tagsModal=this.tags,this.qualityModal=this.quality,this.priceModal=this.price,this.onSaleModal=this.discount.onSale,this.onSaleTypeModal=this.discount.onSaleType,this.onSaleValueModal=this.discount.onSaleValue,this.descriptionModal=this.description,this.noteModal=this.note}},computed:{getTagsModal:function(){var t="",a=0;for(a in this.tagsModal)t+=this.tagsModal[a]+"\n";return t},getDiscountedPrice:function(){return this.discount.onSaleType?(this.price-this.price*this.discount.onSaleValue/100).toFixed(2):(this.price-this.discount.onSaleValue).toFixed(2)},getDiscountedPriceModal:function(){return this.onSaleTypeModal?(this.priceModal-this.priceModal*this.onSaleValueModal/100).toFixed(2):(this.priceModal-this.onSaleValueModal).toFixed(2)}},mounted:function(){}};window.addEventListener("load",(function(){c()("#saveData").click((function(t){return t.preventDefault()})),c()("#saveData").click(Object(n["a"])(regeneratorRuntime.mark((function t(){var a,e,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:a=[],c()(".modal-body * input").each((function(){a.push(c()(this).val())})),c()(".modal-body * select").each((function(){a.push(c()(this).val())})),c()(".modal-body * textarea").each((function(){a.push(c()(this).val())})),a[4]=c()("#onSale").is(":checked"),a[5]=c()("#discountPercentage").is(":checked"),a[6]=c()("#discountAmount").is(":checked"),a.splice(8,1),a[9]=a[9].replace(/,/g," "),e=Object(l["a"])(new Set(a[9].split(/\s+/))),""==e[e.length-1]&&e.pop(),o=c()("#productidentifier").text().split(" ")[2],console.log(a),console.log(o),c.a.ajax({url:"http://localhost:8081/api/update/product",method:"POST",headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*",dataType:"jsonp"},data:JSON.stringify({id:o,title:a[0],brand:a[1],image:a[2],tags:e,discount:{onSale:a[4],onSaleType:a[5],onSaleValue:a[7]},price:a[3],descriptions:a[10],note:a[11],quality:a[8]}),success:function(){location.reload()},error:function(t){console.log("Error"),alert("Errore. "+t.responseText)}});case 15:case"end":return t.stop()}}),t)}))))}));var g=h,C=(e("034f"),e("2877")),_=Object(C["a"])(g,i,s,!1,null,null,null),y=_.exports;o["a"].config.productionTip=!1,new o["a"]({render:function(t){return t(y)}}).$mount("#app")},"85ec":function(t,a,e){}});
//# sourceMappingURL=app.0190d4a9.js.map