(this.webpackJsonpuser=this.webpackJsonpuser||[]).push([[0],{144:function(e,t){e.exports={site202131Url:"http://site202131.tw.cs.unibo.it"}},180:function(e,t,a){},181:function(e,t,a){},211:function(e,t,a){"use strict";a.r(t);var s=a(0),i=a.n(s),r=a(47),n=a.n(r),c=(a(180),a(181),a(182),a(18)),o=a(19),l=a(24),d=a(23),h=a(22),u=a(74),j=a.n(u),b=a(143),v=a.n(b),p=a(144),x=a.n(p),O=v.a.create({baseURL:x.a.site202131Url,headers:{"Content-type":"application/json",dataType:"jsonp",withCredentials:!0}}),m=new(function(){function e(){Object(c.a)(this,e)}return Object(o.a)(e,[{key:"test",value:function(){return O.get("/test")}},{key:"login",value:function(e,t){var a={email:e,plainTextPassword:t};return O.post("/api/public/login",a)}},{key:"getUser",value:function(e){var t=e?"?id="+e:"";return O.get("/api/user/"+t)}},{key:"postUser",value:function(e,t){return null!=e?O.post("/api/user?id="+e,t):O.post("/api/user",t)}},{key:"getProduct",value:function(e){return O.get("/api/product/?id="+e)}},{key:"getAllProduct",value:function(e,t){return O.get("/api/product/all?filter="+e+"&&sort="+t)}},{key:"postProduct",value:function(e,t){return O.post("/api/product/?id="+e,t)}},{key:"getAllReservation",value:function(e,t){return O.get("/api/reservation/all?filter="+e+"&&sort="+t)}},{key:"postReservation",value:function(e,t){return null==e?O.post("/api/reservation",t):O.post("/api/reservation?id="+e,t)}},{key:"deleteReservation",value:function(e){return O.delete("/api/reservation?id="+e)}}]),e}()),f=a(269),g=a(149),y=a(3),D=a(262),k=a(275),P=a(247),S=a(263),w=a(265),N=a(268),F=a(257);function C(e){return{day:e.getDate().toString(),month:(e.getMonth()+1).toString(),year:e.getFullYear().toString()}}function R(e,t){return Math.round((t-e)/864e5)+1}function A(e,t){return!!e.find((function(e){return new Date(e).getTime()==t.getTime()}))}function z(e){var t=0,a=[];for(t in e)for(var s=new Date(parseInt(e[t].startDate.year),parseInt(e[t].startDate.month)-1,parseInt(e[t].startDate.day)),i=new Date(parseInt(e[t].endDate.year),parseInt(e[t].endDate.month)-1,parseInt(e[t].endDate.day)),r=s;r<=i;)a.push(new Date(r)),r=r.addDays(1);return a}Date.prototype.addDays=function(e){var t=new Date(this.valueOf());return t.setDate(t.getDate()+e),t};var I=a(1),T=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;Object(c.a)(this,a),s=t.call(this,e);var i=z(e.bookings).map((function(e){return e.getTime()}));return s.state={value:[null,null],dates:i,bookings:e.bookings,fixedPrice:e.finalFixedPrice,variablePrice:e.originalVariablePrice,variableDiscount:e.variableDiscount,product:e.product,isAuthenticated:e.isAuthenticated,show:!1,loading:!0,done:!1},s.priceCalculator=s.priceCalculator.bind(Object(l.a)(s)),s.handleClose=s.handleClose.bind(Object(l.a)(s)),s.handleShow=s.handleShow.bind(Object(l.a)(s)),s.disabledDays=s.disabledDays.bind(Object(l.a)(s)),s.checkDateRange=s.checkDateRange.bind(Object(l.a)(s)),s.makeReservation=s.makeReservation.bind(Object(l.a)(s)),s}return Object(o.a)(a,[{key:"priceCalculator",value:function(){var e;return this.state.value[0]&&this.state.value[1]?1==this.state.variableDiscount.onSale&&R(this.state.value[0],this.state.value[1])>this.state.variableDiscount.days?(e=1==this.state.variableDiscount.onSaleType?R(this.state.value[0],this.state.value[1])*this.state.variablePrice*(100-this.state.variableDiscount.onSaleValue)/100:R(this.state.value[0],this.state.value[1])*this.state.variablePrice-this.state.variableDiscount.onSaleValue,(parseFloat(this.state.fixedPrice)+e).toFixed(2)):(parseFloat(this.state.fixedPrice)+R(this.state.value[0],this.state.value[1])*this.state.variablePrice).toFixed(2):"0.00"}},{key:"handleClose",value:function(){this.setState({show:!1}),window.location.reload(!1)}},{key:"handleShow",value:function(){this.setState({show:!0})}},{key:"disabledDays",value:function(e){return null==this.state.dates?null:this.state.dates.includes(e.getTime())}},{key:"checkDateRange",value:function(e){if(2==e.length&&null!=this.state.dates&&e[0]&&e[1]){for(var t=e[0],a=e[1];t<=a;){if(1==A(this.state.dates,t))return!1;t=t.addDays(1)}return!0}return!1}},{key:"makeReservation",value:function(){var e=this;this.setState({loading:!0}),this.handleShow(),m.getUser().then((function(t){var a={clientEmail:t.data.data.email,clientName:t.data.data.userName,clientSurname:t.data.data.userSurname,productId:e.state.product._id,prodcutTitle:e.state.product.title,productBrand:e.state.product.brand,productImage:e.state.product.image,bookingDate:C(new Date),startDate:C(e.state.value[0]),endDate:C(e.state.value[1]),isTaken:!1,isReturned:!1,totalPrice:e.priceCalculator(),fixedPrice:e.state.product.fixedPrice,variablePrice:e.state.product.price,fixedDiscount:e.state.product.discount,variableDiscount:e.state.product.overDays,description:"",note:""};m.postReservation(null,a).then((function(a){var s={productId:e.state.product._id,clientId:t.data.data.email,reservationId:a.data.data._id,startDate:C(e.state.value[0]),endDate:C(e.state.value[1])},i=e.state.bookings;i.push(s),m.postProduct(e.state.product._id,{bookings:i}).then((function(){e.setState({loading:!1,done:!0})})).catch((function(){e.setState({loading:!1,done:!1})}))}))}))}},{key:"componentWillReceiveProps",value:function(e){this.setState({isAuthenticated:e.isAuthenticated})}},{key:"render",value:function(){var e=this;return Object(I.jsxs)("div",{className:"pb-0 mt-2",children:[Object(I.jsx)(k.a,{className:"d-flex justify-content-center mb-2",children:Object(I.jsx)(P.b,{dateAdapter:D.a,children:Object(I.jsx)(S.a,{disablePast:!0,shouldDisableDate:this.disabledDays,startText:"Data di inizio",endText:"Data di fine",value:this.state.value,onChange:function(t){e.setState({value:t})},renderInput:function(e,t){return Object(I.jsxs)(i.a.Fragment,{children:[Object(I.jsx)(w.a,Object(y.a)({},e)),Object(I.jsx)(k.a,{sx:{mx:1},children:"a"}),Object(I.jsx)(w.a,Object(y.a)({},t))]})},inputFormat:"dd/MM/yyyy"})})}),Object(I.jsxs)("div",{className:"row",children:[Object(I.jsx)("div",{className:"col-8",children:"Giorni di noleggio:"}),Object(I.jsx)("div",{className:"col-4 text-end",children:this.state.value[0]&&this.state.value[1]?R(this.state.value[0],this.state.value[1]):0})]}),Object(I.jsxs)("div",{className:"row mb-2",children:[Object(I.jsx)("div",{className:"col-8",children:"Prezzo totale:"}),Object(I.jsxs)("div",{className:"col-4 text-end",children:[this.priceCalculator()," \u20ac"]})]}),this.state.isAuthenticated?Object(I.jsx)(g.a,{disabled:!this.checkDateRange(this.state.value),className:"mt-3 w-100",onClick:function(t){t.preventDefault(),e.makeReservation()},children:this.checkDateRange(this.state.value)?Object(I.jsx)("span",{children:"Prenota ora"}):Object(I.jsx)("span",{children:"Seleziona una data valida"})}):Object(I.jsx)(g.a,{className:"mt-2 w-100",href:"/public/login.html",children:"Accedi per prenotare"}),Object(I.jsxs)(N.a,{show:this.state.show,onHide:this.handleClose,backdrop:"static",keyboard:!1,centered:!0,children:[Object(I.jsx)(N.a.Body,{children:this.state.loading?Object(I.jsxs)("div",{className:"d-flex align-items-center",children:["Effetuo la prenotazione\xa0",Object(I.jsx)(F.a,{variant:"primary",animation:"border",role:"status",children:Object(I.jsx)("span",{className:"visually-hidden",children:"Caricamento..."})})]}):this.state.done?Object(I.jsx)(I.Fragment,{children:"Prenotazione effettuata."}):Object(I.jsx)(I.Fragment,{children:"Errore durante la prenotazione."})}),Object(I.jsx)(N.a.Footer,{children:Object(I.jsx)(g.a,{variant:"secondary",onClick:this.handleClose,disabled:!this.state.done,children:"Chiudi"})})]})]})}}]),a}(i.a.Component),M=a(272),V=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){return Object(c.a)(this,a),t.call(this,e)}return Object(o.a)(a,[{key:"render",value:function(){var e=parseInt(this.props.quality);return Object(I.jsxs)("div",{className:"d-flex align-items-center",children:[Object(I.jsx)("b",{children:"Qualit\xe0:"}),Object(I.jsx)(M.a,{name:"read-only",value:e,max:3,readOnly:!0})]})}}]),a}(i.a.Component),E=a(258),B=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){return Object(c.a)(this,a),t.call(this,e)}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props.tags.map((function(e){return Object(I.jsx)(E.a,{pill:!0,bg:"primary",className:"m-1",children:e},e)}));return Object(I.jsxs)("div",{children:[Object(I.jsx)("b",{children:"Categoria:"}),Object(I.jsx)("div",{className:"d-flex justify-content-center flex-wrap",children:e})]})}}]),a}(i.a.Component),L=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={originalFixedPrice:s.props.originalFixedPrice,discountedFixedPrice:s.props.discountedFixdedPrice,originalVariablePrice:s.props.originalVariablePrice,variableDiscount:s.props.variableDiscount},s}return Object(o.a)(a,[{key:"render",value:function(){return this.state.originalFixedPrice!=this.state.discountedFixedPrice?Object(I.jsxs)(I.Fragment,{children:[Object(I.jsxs)("div",{children:[Object(I.jsxs)("span",{style:{textDecorationLine:"line-through"},children:[Object(I.jsx)("b",{children:"Prezzo fisso: "})," ",this.state.originalFixedPrice," \u20ac"]}),Object(I.jsx)("br",{}),Object(I.jsxs)("span",{style:{color:"red"},children:[Object(I.jsx)("b",{children:"Prezzo fisso scontato: "})," ",this.state.discountedFixedPrice," \u20ac"]})]}),Object(I.jsxs)("div",{children:[Object(I.jsxs)("span",{children:[Object(I.jsx)("b",{children:"Prezzo giornaliero: "})," ",this.state.originalVariablePrice," \u20ac"]}),Object(I.jsx)("br",{}),this.state.variableDiscount.onSale?Object(I.jsxs)("span",{style:{color:"red"},children:["Sconto ",this.state.variableDiscount.onSaleType?"del ":"di ",parseFloat(this.state.variableDiscount.onSaleValue).toFixed(2),this.state.variableDiscount.onSaleType?"% ":"\u20ac ","sul costo giornaliero se superi ",this.state.variableDiscount.days," ",parseInt(this.state.variableDiscount.days)>1?"giorni ":"giorno ","di noleggio."]}):Object(I.jsx)(I.Fragment,{})]})]}):Object(I.jsxs)("div",{children:[Object(I.jsx)("b",{children:"Prezzo fisso: "})," ",parseFloat(this.state.originalFixedPrice).toFixed(2)," \u20ac",Object(I.jsx)("br",{}),Object(I.jsx)("b",{children:"Prezzo giornaliero: "})," ",parseFloat(this.state.originalVariablePrice).toFixed(2)," \u20ac",Object(I.jsx)("br",{}),this.state.variableDiscount.onSale?Object(I.jsxs)("span",{style:{color:"red"},children:["Sconto ",this.state.variableDiscount.onSaleType?"del ":"di ",parseFloat(this.state.variableDiscount.onSaleValue).toFixed(2),this.state.variableDiscount.onSaleType?"% ":"\u20ac ","sul prezzo giornaliero se superi ",this.state.variableDiscount.days," ",parseFloat(this.state.variableDiscount.days)>1?"giorni ":"giorno "]}):Object(I.jsx)(I.Fragment,{})]})}}]),a}(i.a.Component),_=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={product:e.product,isAuthenticated:e.isAuthenticated,discountedFixedPrice:e.product.discount.onSale?e.product.discount.onSaleType?(e.product.fixedPrice*parseFloat(100-e.product.discount.onSaleValue)/100).toFixed(2):(e.product.fixedPrice-e.product.discount.onSaleValue).toFixed(2):e.product.fixedPrice},s}return Object(o.a)(a,[{key:"componentWillReceiveProps",value:function(e){this.setState({isAuthenticated:e.isAuthenticated})}},{key:"render",value:function(){return Object(I.jsx)(f.a,{className:"m-2 bg-light rounded-3 border border-dark",children:Object(I.jsxs)(f.a.Item,{eventKey:"0",children:[Object(I.jsx)(f.a.Header,{children:Object(I.jsxs)("div",{className:"row",style:{width:"95%",height:"12.5vh"},children:[Object(I.jsx)("div",{className:"col-6 h-100 d-flex align-items-center",children:Object(I.jsx)("img",{className:"img-fluid img-responsive mx-auto d-block",style:{maxHeight:"100%",maxWidth:"100%"},src:this.state.product.image,alt:"Immagine"})}),Object(I.jsx)("div",{className:"col-6 d-flex align-items-center",children:Object(I.jsxs)("div",{children:[Object(I.jsx)("b",{children:this.state.product.title}),Object(I.jsx)("br",{}),this.state.product.brand]})})]})}),Object(I.jsxs)(f.a.Body,{children:[Object(I.jsx)(B,{tags:this.state.product.tags}),Object(I.jsxs)("div",{style:{textAlign:"justify"},children:[Object(I.jsx)("b",{children:"Descrizione:"}),Object(I.jsx)("br",{}),this.state.product.description]}),Object(I.jsx)(V,{quality:this.state.product.quality}),Object(I.jsx)(L,{originalFixedPrice:parseFloat(this.state.product.fixedPrice).toFixed(2),discountedFixdedPrice:parseFloat(this.state.discountedFixedPrice).toFixed(2),originalVariablePrice:parseFloat(this.state.product.price).toFixed(2),variableDiscount:this.state.product.overDays}),Object(I.jsx)("hr",{}),Object(I.jsx)("div",{className:"mb-2",children:Object(I.jsx)("b",{children:"Prenotazione:"})}),this.state.product.available?Object(I.jsx)(T,{bookings:this.state.product.bookings,finalFixedPrice:this.state.product.discount.onSale?this.state.discountedFixedPrice:this.state.product.fixedPrice,originalVariablePrice:this.state.product.price,variableDiscount:this.state.product.overDays,isAuthenticated:this.state.isAuthenticated,product:this.state.product}):Object(I.jsx)(g.a,{disabled:!0,className:"w-100",children:"Prodotto non disponibile"})]})]})})}}]),a}(i.a.Component),U=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){return Object(c.a)(this,a),t.call(this,e)}return Object(o.a)(a,[{key:"render",value:function(){return Object(I.jsx)(g.a,{className:"w-100",disabled:!0,children:"Richiedi fattura"})}}]),a}(i.a.Component),H=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={value:[null,null],dates:[],bookings:[],reservation:e.reservation,variableDiscount:e.reservation.variableDiscount,showEditModal:!1,showLoadingModal:!1,loading:!1,error:!1,isEditing:!0},s.priceCalculator=s.priceCalculator.bind(Object(l.a)(s)),s.handleClose=s.handleClose.bind(Object(l.a)(s)),s.handleShow=s.handleShow.bind(Object(l.a)(s)),s.disabledDays=s.disabledDays.bind(Object(l.a)(s)),s.checkDateRange=s.checkDateRange.bind(Object(l.a)(s)),s.updateReservation=s.updateReservation.bind(Object(l.a)(s)),s.deleteReservation=s.deleteReservation.bind(Object(l.a)(s)),s}return Object(o.a)(a,[{key:"priceCalculator",value:function(){var e;if(e=1==this.state.reservation.fixedDiscount.onSale?1==this.state.reservation.fixedDiscount.onSaleType?parseFloat(this.state.reservation.fixedPrice)*(100-parseFloat(this.state.reservation.fixedDiscount.onSaleValue))/100:parseFloat(this.state.reservation.fixedPrice)-parseFloat(this.state.reservation.fixedDiscount.onSaleValue):parseFloat(this.state.reservation.fixedPrice),this.state.value[0]&&this.state.value[1]){var t=R(this.state.value[0],this.state.value[1]);return 1==this.state.variableDiscount.onSale&&t>parseInt(this.state.variableDiscount.days)?(e+(1==this.state.variableDiscount.onSaleType?t*parseFloat(this.state.reservation.variablePrice)*(100-parseFloat(this.state.variableDiscount.onSaleValue))/100:t*parseFloat(this.state.reservation.variablePrice)-parseFloat(this.state.variableDiscount.onSaleValue))).toFixed(2):(e+t*parseFloat(this.state.reservation.variablePrice)).toFixed(2)}return"0.00"}},{key:"handleClose",value:function(){this.setState({showEditModal:!1})}},{key:"handleShow",value:function(){this.setState({showEditModal:!0})}},{key:"disabledDays",value:function(e){return null==this.state.dates?null:this.state.dates.includes(e.getTime())}},{key:"checkDateRange",value:function(e){if(2==e.length&&null!=this.state.dates&&e[0]&&e[1]){for(var t=e[0],a=e[1];t<=a;){if(1==A(this.state.dates,t))return!1;t=t.addDays(1)}return!0}return!1}},{key:"updateReservation",value:function(){var e=this;this.setState({loading:!0,showLoadingModal:!0}),this.handleClose(),m.postReservation(this.state.reservation._id,{bookingDate:C(new Date),startDate:C(this.state.value[0]),endDate:C(this.state.value[1]),price:this.priceCalculator()}).then((function(){var t=e.state.bookings;t=t.filter((function(t){return t.reservationId==e.state.reservation._id&&(t.startDate=C(e.state.value[0]),t.endDate=C(e.state.value[1])),!0})),m.postProduct(e.state.reservation.productId,{bookings:t}).then((function(){e.setState({loading:!1})})).catch((function(){e.setState({error:!0,loading:!1})}))}))}},{key:"deleteReservation",value:function(){var e=this;this.setState({isEditing:!1,loading:!0,showLoadingModal:!0}),this.handleClose(),m.deleteReservation(String(this.state.reservation._id)).then((function(){var t=e.state.bookings;t=t.filter((function(t){return t.reservationId!=e.state.reservation._id})),m.postProduct(e.state.reservation.productId,{bookings:t}).then((function(){e.setState({loading:!1})})).catch((function(){e.setState({error:!0,loading:!1})}))}))}},{key:"componentWillReceiveProps",value:function(e){var t=z(e.bookings).map((function(e){return e.getTime()})),a=z([this.state.reservation]).map((function(e){return e.getTime()})),s=t.filter((function(e){for(var t in a)if(e==a[t])return!1;return!0}));this.setState({dates:s,bookings:e.bookings})}},{key:"render",value:function(){var e,t=this;return e=1==this.state.reservation.fixedDiscount.onSale?1==this.state.reservation.fixedDiscount.onSaleType?parseFloat(this.state.reservation.fixedPrice)*(100-parseFloat(this.state.reservation.fixedDiscount.onSaleValue))/100:parseFloat(this.state.reservation.fixedPrice)-parseFloat(this.state.reservation.fixedDiscount.onSaleValue):parseFloat(this.state.reservation.fixedPrice),Object(I.jsxs)(I.Fragment,{children:[Object(I.jsx)(g.a,{className:"w-100",variant:"primary",onClick:this.handleShow,children:"Modifica prenotazione"}),Object(I.jsxs)(N.a,{show:this.state.showEditModal,onHide:this.handleClose,keyboard:!1,centered:!0,children:[Object(I.jsx)(N.a.Header,{closeButton:!0,children:Object(I.jsx)(N.a.Title,{children:"Modifica prenotazione"})}),Object(I.jsxs)(N.a.Body,{className:"pb-0 mt-2",children:[Object(I.jsx)(k.a,{className:"d-flex justify-content-center mb-2",children:Object(I.jsx)(P.b,{dateAdapter:D.a,children:Object(I.jsx)(S.a,{disablePast:!0,shouldDisableDate:this.disabledDays,startText:"Data di inizio",endText:"Data di fine",value:this.state.value,onChange:function(e){t.setState({value:e})},renderInput:function(e,t){return Object(I.jsxs)(i.a.Fragment,{children:[Object(I.jsx)(w.a,Object(y.a)({},e)),Object(I.jsx)(k.a,{sx:{mx:1},children:"a"}),Object(I.jsx)(w.a,Object(y.a)({},t))]})},inputFormat:"dd/MM/yyyy"})})}),Object(I.jsxs)("div",{className:"row",children:[Object(I.jsx)("div",{className:"col-8",children:"Prezzo fisso:"}),Object(I.jsxs)("div",{className:"col-4 text-end",children:[e.toFixed(2)," \u20ac"]})]}),Object(I.jsxs)("div",{className:"row",children:[Object(I.jsx)("div",{className:"col-8",children:"Prezzo giornaliero:"}),Object(I.jsxs)("div",{className:"col-4 text-end",children:[parseFloat(this.state.reservation.variablePrice).toFixed(2)," \u20ac"]})]}),Object(I.jsxs)("div",{className:"row",children:[Object(I.jsx)("div",{className:"col-8",children:"Giorni di noleggio:"}),Object(I.jsx)("div",{className:"col-4 text-end",children:this.state.value[0]&&this.state.value[1]?R(this.state.value[0],this.state.value[1]):0})]}),Object(I.jsxs)("div",{className:"row mb-2",children:[Object(I.jsx)("div",{className:"col-8",children:"Prezzo totale:"}),Object(I.jsxs)("div",{className:"col-4 text-end",children:[this.priceCalculator()," \u20ac"]})]})]}),Object(I.jsxs)(N.a.Footer,{className:"d-flex justify-content-between",children:[Object(I.jsx)(g.a,{disabled:!this.checkDateRange(this.state.value),className:"mt-3 w-100",variant:"success",onClick:function(e){e.preventDefault(),t.updateReservation()},children:this.checkDateRange(this.state.value)?Object(I.jsx)("span",{children:"Modifica ora"}):Object(I.jsx)("span",{children:"Seleziona una data valida"})}),Object(I.jsx)(g.a,{className:"w-100",variant:"danger",onClick:this.deleteReservation,children:"Cancella prenotazione"})]})]}),Object(I.jsxs)(N.a,{show:this.state.showLoadingModal,onHide:this.handleClose,backdrop:"static",keyboard:!1,centered:!0,children:[Object(I.jsx)(N.a.Body,{children:this.state.loading?Object(I.jsxs)("div",{className:"d-flex align-items-center",children:["Effetuo la ",this.state.isEditing?"prenotazione.":"cancellazione.","\xa0",Object(I.jsx)(F.a,{variant:"primary",animation:"border",role:"status",children:Object(I.jsx)("span",{className:"visually-hidden",children:"Caricamento..."})})]}):this.state.error?Object(I.jsxs)(I.Fragment,{children:["Errore durante la ",this.state.isEditing?"prenotazione.":"cancellazione."]}):Object(I.jsx)(I.Fragment,{children:this.state.isEditing?"Prenotazione modificata.":"Cancellazione effettuata."})}),Object(I.jsx)(N.a.Footer,{children:Object(I.jsx)(g.a,{variant:"secondary",onClick:function(){t.setState({showLoadingModal:!1}),window.location.reload(!1)},disabled:this.state.loading,children:"Chiudi"})})]})]})}}]),a}(i.a.Component),W=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={reservation:e.reservation,bookings:[],show:!1,status:""},s.handleClose=s.handleClose.bind(Object(l.a)(s)),s.handleShow=s.handleShow.bind(Object(l.a)(s)),s}return Object(o.a)(a,[{key:"handleClose",value:function(){this.setState({show:!1})}},{key:"handleShow",value:function(){this.setState({show:!0})}},{key:"componentDidMount",value:function(){var e=this,t="";0==this.state.reservation.isTaken&&0==this.state.reservation.isReturned?t="Prenotato":1==this.state.reservation.isTaken&&0==this.state.reservation.isReturned?t="Attivo":1==this.state.reservation.isTaken&&1==this.state.reservation.isReturned&&(t="Concluso"),this.setState({status:t}),m.getProduct(this.state.reservation.productId).then((function(t){e.setState({bookings:t.data.data.obj.bookings})}))}},{key:"render",value:function(){var e,t;e=1==this.state.reservation.fixedDiscount.onSale?1==this.state.reservation.fixedDiscount.onSaleType?parseFloat(this.state.reservation.fixedPrice)*(100-parseFloat(this.state.reservation.fixedDiscount.onSaleValue))/100:parseFloat(this.state.reservation.fixedPrice)-parseFloat(this.state.reservation.fixedDiscount.onSaleValue):parseFloat(this.state.reservation.fixedPrice);var a=R(new Date(this.state.reservation.startDate.year,this.state.reservation.startDate.month,this.state.reservation.startDate.day),new Date(this.state.reservation.endDate.year,this.state.reservation.endDate.month,this.state.reservation.endDate.day));return t=1==this.state.reservation.variableDiscount.onSale&&a>parseInt(this.state.reservation.variableDiscount.days)?1==this.state.reservation.variableDiscount.onSaleType?a*parseFloat(this.state.reservation.variablePrice)*(100-parseFloat(this.state.reservation.variableDiscount.onSaleValue))/100:a*parseFloat(this.state.reservation.variablePrice)-parseFloat(this.state.reservation.variableDiscount.onSaleValue):a*parseFloat(this.state.reservation.variablePrice),Object(I.jsx)(f.a,{className:"m-2 bg-light rounded-3 border border-dark",children:Object(I.jsxs)(f.a.Item,{eventKey:"0",children:[Object(I.jsx)(f.a.Header,{children:Object(I.jsxs)("div",{className:"row",style:{width:"95%",height:"12.5vh"},children:[Object(I.jsx)("div",{className:"col-6 h-100 d-flex align-items-center",children:Object(I.jsx)("img",{className:"img-fluid img-responsive mx-auto d-block",style:{maxHeight:"100%",maxWidth:"100%"},src:this.state.reservation.productImage,alt:"Immagine"})}),Object(I.jsx)("div",{className:"col-6 d-flex align-items-center",children:Object(I.jsxs)("div",{children:[Object(I.jsx)("b",{children:this.state.reservation.productTitle}),Object(I.jsx)("br",{}),this.state.reservation.productBrand,Object(I.jsx)("br",{}),Object(I.jsxs)("b",{children:[this.state.reservation.bookingDate.day,"/",this.state.reservation.bookingDate.month,"/",this.state.reservation.bookingDate.year]})]})})]})}),Object(I.jsxs)(f.a.Body,{children:[Object(I.jsxs)("div",{children:["Identificativo della prenotazione:",Object(I.jsx)("br",{}),Object(I.jsx)("b",{children:this.state.reservation._id})]}),Object(I.jsx)("hr",{}),Object(I.jsxs)("div",{children:[Object(I.jsxs)("div",{className:"row d-flex justify-content-between",children:[Object(I.jsx)("div",{className:"col-8",children:Object(I.jsx)("b",{children:"Data prenotazione:"})}),Object(I.jsxs)("div",{className:"col-4 text-end",children:[this.state.reservation.bookingDate.day,"/",this.state.reservation.bookingDate.month,"/",this.state.reservation.bookingDate.year]})]}),Object(I.jsxs)("div",{className:"row",children:[Object(I.jsx)("div",{className:"col-8",children:Object(I.jsx)("b",{children:"Status:"})}),Object(I.jsx)("div",{className:"col-4 text-end",children:Object(I.jsx)("b",{children:this.state.status})})]}),Object(I.jsxs)("div",{className:"row",children:[Object(I.jsx)("div",{className:"col-8",children:Object(I.jsx)("b",{children:"Data di inizio noleggio:"})}),Object(I.jsxs)("div",{className:"col-4 text-end",children:[this.state.reservation.startDate.day,"/",this.state.reservation.startDate.month,"/",this.state.reservation.startDate.year]})]}),Object(I.jsxs)("div",{className:"row",children:[Object(I.jsx)("div",{className:"col-8",children:Object(I.jsx)("b",{children:"Data di fine noleggio:"})}),Object(I.jsxs)("div",{className:"col-4 text-end",children:[this.state.reservation.endDate.day,"/",this.state.reservation.endDate.month,"/",this.state.reservation.endDate.year]})]}),Object(I.jsxs)("div",{className:"row",children:[Object(I.jsx)("div",{className:"col-8",children:Object(I.jsx)("b",{children:"Prezzo fisso:"})}),Object(I.jsxs)("div",{className:"col-4 text-end",children:[parseFloat(e).toFixed(2)," \u20ac"]})]}),Object(I.jsxs)("div",{className:"row",children:[Object(I.jsx)("div",{className:"col-8",children:Object(I.jsx)("b",{children:"Prezzo variabile:"})}),Object(I.jsxs)("div",{className:"col-4 text-end",children:[parseFloat(t).toFixed(2)," \u20ac"]})]}),Object(I.jsxs)("div",{className:"row",children:[Object(I.jsx)("div",{className:"col-8",children:Object(I.jsx)("b",{children:"Prezzo totale:"})}),Object(I.jsxs)("div",{className:"col-4 text-end",children:[parseFloat(this.state.reservation.totalPrice).toFixed(2)," \u20ac"]})]}),Object(I.jsx)("div",{className:"row",children:Object(I.jsx)("div",{className:"col-12",children:Object(I.jsx)("b",{children:"Dettagli:"})})}),Object(I.jsx)("div",{className:"row",children:Object(I.jsx)("div",{className:"col-12",children:this.state.reservation.description})})]}),Object(I.jsx)("hr",{}),"Prenotato"==this.state.status?Object(I.jsx)(H,{reservation:this.state.reservation,bookings:this.state.bookings}):"Attivo"==this.state.status?Object(I.jsx)(g.a,{className:"w-100",disabled:!0,children:"Prenotazione attiva"}):Object(I.jsx)(U,{})]})]})})}}]),a}(i.a.Component),q=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={isAuthenticated:e.isAuthenticated},s}return Object(o.a)(a,[{key:"componentWillReceiveProps",value:function(e){this.setState({isAuthenticated:e.isAuthenticated})}},{key:"render",value:function(){var e=this;if(0==this.props.elements.length)return Object(I.jsx)("div",{style:{height:"75vh"},className:"d-flex justify-content-center align-items-center",children:"Non ci sono contenuti"});if("product"==this.props.type){var t=this.props.elements.map((function(t){return Object(I.jsx)(_,{product:t,isAuthenticated:e.state.isAuthenticated},t._id)}));return Object(I.jsx)("div",{id:"body",children:t})}if("reservation"==this.props.type){var a=this.props.elements.map((function(e){return Object(I.jsx)(W,{reservation:e},e._id)}));return Object(I.jsx)("div",{id:"body",children:a})}}}]),a}(i.a.Component),G=a(267),J=a(259),K=a(266),Y=a(151),Q=a(270),X=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={isAuthenticated:e.isAuthenticated},s.logout=s.logout.bind(Object(l.a)(s)),s}return Object(o.a)(a,[{key:"logout",value:function(){j.a.remove("jwt"),window.location.href="/user/index.html"}},{key:"componentWillReceiveProps",value:function(e){this.setState({isAuthenticated:e.isAuthenticated})}},{key:"render",value:function(){var e=this;return 1==this.state.isAuthenticated?Object(I.jsxs)(Q.a,{className:"text-center d-flex align-items-center",navbarScroll:!0,children:[Object(I.jsx)(Q.a.Link,{children:Object(I.jsx)(K.a,{className:"element-to-hide-over-350",onSubmit:function(t){t.preventDefault(),e.props.search(t.target.searchInput.value)},children:Object(I.jsx)(Y.a,{type:"search",placeholder:"Cerca",name:"searchInput",className:"me-2","aria-label":"Cerca"})})}),Object(I.jsx)(Q.a.Link,{href:"./page",children:"Personal page"}),Object(I.jsx)(Q.a.Link,{href:"./reservation",children:"Reservation"}),Object(I.jsx)(Q.a.Link,{onClick:this.logout,children:"Logout"})]}):Object(I.jsxs)(Q.a,{className:"me-auto my-2 my-lg-0 text-center  align-items-center",navbarScroll:!0,children:[Object(I.jsx)(Q.a.Link,{className:"w-100",children:Object(I.jsx)(K.a,{className:"element-to-hide-over-350",onSubmit:function(t){t.preventDefault(),e.props.search(t.target.searchInput.value)},children:Object(I.jsx)(Y.a,{type:"search",placeholder:"Cerca",name:"searchInput",className:"me-2","aria-label":"Cerca"})})}),Object(I.jsx)(Q.a.Link,{href:"/public/login.html",children:"login"})]})}}]),a}(i.a.Component),Z=a(264),$=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),s=t.call(this,e),"product"==e.type?s.state={filter1:["Disponibilit\xe0","Tutti","Disponibili","Non dispobili"],choise1:1,filter2:["Ordina per","Prezzo crescente","Prezzo descrescente"],choise2:1}:"reservation"==e.type&&(s.state={filter1:["Disponibilit\xe0","Tutte","Prenotate","Attive","Concluse"],choise1:1,filter2:["Ordina per","Data crescente","Data descrescente"],choise2:1}),s}return Object(o.a)(a,[{key:"render",value:function(){var e=this;return"user"==this.props.type?Object(I.jsx)(I.Fragment,{}):Object(I.jsxs)("div",{className:"row p-2",children:[Object(I.jsx)("div",{className:"col-6 d-flex flex-row align-items-center",style:{overflowX:"visible !important"},children:Object(I.jsxs)(Z.a,{children:[Object(I.jsx)(Z.a.Toggle,{children:this.state.filter1[0]}),Object(I.jsxs)(Z.a.Menu,{renderOnMount:!0,children:[Object(I.jsx)(Z.a.Item,{active:1==this.state.choise1,onClick:function(){e.setState({choise1:1}),e.props.show(1)},children:this.state.filter1[1]}),Object(I.jsx)(Z.a.Item,{active:2==this.state.choise1,onClick:function(){e.setState({choise1:2}),e.props.show(2)},children:this.state.filter1[2]}),Object(I.jsx)(Z.a.Item,{active:3==this.state.choise1,onClick:function(){e.setState({choise1:3}),e.props.show(3)},children:this.state.filter1[3]}),"reservation"==this.props.type?Object(I.jsx)(Z.a.Item,{active:4==this.state.choise1,onClick:function(){e.setState({choise1:4}),e.props.show(4)},children:this.state.filter1[4]}):Object(I.jsx)(I.Fragment,{})]})]})}),Object(I.jsx)("div",{className:"col-6 d-flex flex-row-reverse align-items-center",children:Object(I.jsxs)(Z.a,{children:[Object(I.jsx)(Z.a.Toggle,{children:this.state.filter2[0]}),Object(I.jsxs)(Z.a.Menu,{children:[Object(I.jsx)(Z.a.Item,{active:1==this.state.choise2,onClick:function(t){e.setState({choise2:1}),e.props.sort(!0)},children:this.state.filter2[1]}),Object(I.jsx)(Z.a.Item,{active:2==this.state.choise2,onClick:function(){e.setState({choise2:2}),e.props.sort(!1)},children:this.state.filter2[2]})]})]})})]})}}]),a}(i.a.Component),ee=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={isAuthenticated:e.isAuthenticated},s}return Object(o.a)(a,[{key:"componentWillReceiveProps",value:function(e){this.setState({isAuthenticated:e.isAuthenticated})}},{key:"render",value:function(){var e=this;return Object(I.jsxs)("div",{children:[Object(I.jsx)(G.a,{className:"bg-light w-100",expand:"false",children:Object(I.jsxs)(J.a,{fluid:!0,children:[Object(I.jsx)(G.a.Brand,{href:"/user/index.html",className:"p-0 m-0",children:Object(I.jsx)("img",{src:"https://cdn.discordapp.com/attachments/888778821262790686/926860373775249469/nolonoloplus.png",alt:"logo NoloNoloPlus",height:"45px"})}),Object(I.jsx)(K.a,{className:"element-to-hide-under-350",style:{width:"60%"},onSubmit:function(t){t.preventDefault(),e.props.search(t.target.searchInput.value)},children:Object(I.jsx)(Y.a,{type:"search",placeholder:"Cerca... ",name:"searchInput",className:"me-2","aria-label":"product"==this.props.type?"Cerca prodotti":"Cerca prenotazioni"})}),Object(I.jsx)(G.a.Toggle,{style:{height:"45px",width:"45px",padding:"0px"},"aria-controls":"navbarScroll"}),Object(I.jsx)(G.a.Collapse,{id:"navbarScroll",children:Object(I.jsx)(X,{isAuthenticated:this.state.isAuthenticated})})]})}),Object(I.jsx)($,{show:this.props.show,sort:this.props.sort,type:this.props.type})]})}}]),a}(i.a.Component),te=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={products:[],filteredProducts:[],isAuthenticated:!1},s.searchProducts=s.searchProducts.bind(Object(l.a)(s)),s.showProducts=s.showProducts.bind(Object(l.a)(s)),s.sortProducts=s.sortProducts.bind(Object(l.a)(s)),s}return Object(o.a)(a,[{key:"searchProducts",value:function(e){var t=this;console.log("searchProducts("+e+")"),m.getAllProduct(e,!0).then((function(e){t.setState({products:e.data.data,filteredProducts:e.data.data})}))}},{key:"showProducts",value:function(e){console.log("showProducts("+e+")");var t=[];if(e>1){var a=2==e;for(var s in this.state.products)this.state.products[s].available==a&&t.push(this.state.products[s])}else t=this.state.products;this.setState({filteredProducts:t})}},{key:"sortProducts",value:function(e){console.log("sortProducts("+e+")");var t=this.state.products;t.sort((function(e,t){return e.price-t.price})),0==e&&t.reverse(),this.setState({products:t,filteredProducts:t})}},{key:"componentDidMount",value:function(){var e=this;this.searchProducts(""),j.a.get("jwt")&&m.getUser().then((function(){e.setState({isAuthenticated:!0})})).catch((function(){e.setState({isAuthenticated:!1})}))}},{key:"render",value:function(){return Object(I.jsxs)(I.Fragment,{children:[Object(I.jsx)(ee,{type:"product",search:this.searchProducts,show:this.showProducts,sort:this.sortProducts,isAuthenticated:this.state.isAuthenticated}),Object(I.jsx)(q,{type:"product",elements:this.state.filteredProducts,isAuthenticated:this.state.isAuthenticated})]})}}]),a}(i.a.Component),ae=a(260),se=a(152),ie=a(261),re=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={userId:"",userName:"",userSurname:"",userBirthday:{day:"",month:"",year:""},userPhoneNumber:"",userEmail:"",userAddress:{street:"",number:"",city:""},userPayment:{cardType:"",cardName:"",cardSurname:"",cardExpireYear:"",cardExpireMonth:"",cardCCV:""},userSex:""},s}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this;m.getUser().then((function(t){console.log(t),e.setState({userId:t.data.data._id,userName:t.data.data.userName,userSurname:t.data.data.userName,userBirthday:t.data.data.birthday,userPhoneNumber:t.data.data.phoneNumber,userEmail:t.data.data.email,userAddress:t.data.data.address,userPayment:t.data.data.payment,userSex:t.data.data.sex})})).catch((function(e){console.log(e),alert("Errore")}))}},{key:"render",value:function(){return Object(I.jsx)(J.a,{className:"pt-2",children:Object(I.jsxs)(ae.a,{children:[Object(I.jsx)(se.a,{xs:"2",children:Object(I.jsx)("i",{className:"bi bi-person-circle",alt:"Bootstrap",role:"img","aria-label":"userIcon"})}),Object(I.jsx)(se.a,{xs:"9",children:Object(I.jsx)(ie.a,{bordered:!0,hover:!0,children:Object(I.jsxs)("tbody",{children:[Object(I.jsxs)("tr",{children:[Object(I.jsx)("td",{children:"User Id:"}),Object(I.jsx)("td",{children:this.state.userId})]}),Object(I.jsxs)("tr",{children:[Object(I.jsx)("td",{children:"User:"}),Object(I.jsxs)("td",{children:[this.state.userName," ",this.state.userSurname]})]}),Object(I.jsxs)("tr",{children:[Object(I.jsx)("td",{children:"Birthday:"}),Object(I.jsxs)("td",{children:[this.state.userBirthday.year,"-",this.state.userBirthday.month,"-",this.state.userBirthday.day]})]}),Object(I.jsxs)("tr",{children:[Object(I.jsx)("td",{children:"Phone Number:"}),Object(I.jsx)("td",{children:this.state.userPhoneNumber})]})]})})})]})})}}]),a}(s.Component),ne=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={reservations:[],filteredReservations:[],isAuthenticated:!1},s.searchReservations=s.searchReservations.bind(Object(l.a)(s)),s.showReservations=s.showReservations.bind(Object(l.a)(s)),s.sortReservations=s.sortReservations.bind(Object(l.a)(s)),s}return Object(o.a)(a,[{key:"searchReservations",value:function(e){var t=this;console.log("searchReservations("+e+")"),m.getAllReservation(e,!0).then((function(e){t.setState({reservations:e.data.obj,filteredReservations:e.data.obj})}))}},{key:"showReservations",value:function(e){console.log("showReservations("+e+")");var t=[];if(parseInt(e)>1)for(var a in this.state.reservations)switch(parseInt(e)){case 2:0==this.state.reservations[a].isTaken&&0==this.state.reservations[a].isReturned&&t.push(this.state.reservations[a]);break;case 3:1==this.state.reservations[a].isTaken&&0==this.state.reservations[a].isReturned&&t.push(this.state.reservations[a]);break;case 4:1==this.state.reservations[a].isTaken&&1==this.state.reservations[a].isReturned&&t.push(this.state.reservations[a]);break;default:return}else t=this.state.reservations;this.setState({filteredReservations:t})}},{key:"sortReservations",value:function(e){console.log("sortReservations("+e+")");var t=this.state.reservations;t.sort((function(e,t){return new Date(e.bookingDate.year,e.bookingDate.month,e.bookingDate.day)-new Date(t.bookingDate.year,t.bookingDate.month,t.bookingDate.day)})),0==e&&t.reverse(),this.setState({reservations:t,filteredReservation:t})}},{key:"componentDidMount",value:function(){var e=this;this.searchReservations(""),j.a.get("jwt")&&m.getUser().then((function(){e.setState({isAuthenticated:!0})})).catch((function(){e.setState({isAuthenticated:!1})}))}},{key:"render",value:function(){return Object(I.jsxs)(I.Fragment,{children:[Object(I.jsx)(ee,{type:"reservation",search:this.searchReservations,show:this.showReservations,sort:this.sortReservations,isAuthenticated:this.state.isAuthenticated}),Object(I.jsx)(q,{type:"reservation",elements:this.state.filteredReservations,isAuthenticated:this.state.isAuthenticated})]})}}]),a}(i.a.Component),ce=a(20);var oe=function(){return Object(I.jsx)("div",{className:"App",children:Object(I.jsxs)(ce.c,{children:[Object(I.jsx)(ce.a,{path:"/user/index.html",element:Object(I.jsx)(te,{})}),Object(I.jsx)(ce.a,{path:"/user/page",element:Object(I.jsx)(re,{})}),Object(I.jsx)(ce.a,{path:"/user/reservation",element:Object(I.jsx)(ne,{})})]})})},le=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,277)).then((function(t){var a=t.getCLS,s=t.getFID,i=t.getFCP,r=t.getLCP,n=t.getTTFB;a(e),s(e),i(e),r(e),n(e)}))},de=a(125);n.a.render(Object(I.jsx)(de.a,{children:Object(I.jsx)(oe,{})}),document.getElementById("root")),le()}},[[211,1,2]]]);
//# sourceMappingURL=main.7e479d89.chunk.js.map