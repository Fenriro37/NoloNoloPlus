(this.webpackJsonpuser=this.webpackJsonpuser||[]).push([[0],{144:function(e,t){e.exports={site202131Url:"http://localhost:8081"}},177:function(e,t,a){},178:function(e,t,a){},208:function(e,t,a){"use strict";a.r(t);var s=a(0),i=a.n(s),r=a(47),n=a.n(r),c=(a(177),a(178),a(133),a(19)),o=a(20),l=a(25),d=a(23),h=a(22),u=a(74),j=a.n(u),b=a(143),p=a.n(b),m=a(144),v=a.n(m),O=p.a.create({baseURL:v.a.site202131Url,headers:{"Content-type":"application/json",dataType:"jsonp",withCredentials:!0}}),x=new(function(){function e(){Object(c.a)(this,e)}return Object(o.a)(e,[{key:"test",value:function(){return O.get("/test")}},{key:"login",value:function(e,t){var a={email:e,plainTextPassword:t};return O.post("/api/public/login",a)}},{key:"getUser",value:function(e){var t=e?"?id="+e:"";return O.get("/api/user/"+t)}},{key:"postUser",value:function(e,t){return null!=e?O.post("/api/user?id="+e,t):O.post("/api/user",t)}},{key:"getProduct",value:function(e){return O.get("/api/product/?id="+e)}},{key:"getAllProduct",value:function(e,t){return O.get("/api/product/all?filter="+e+"&&sort="+t)}},{key:"postProduct",value:function(e,t){return O.post("/api/product/?id="+e,t)}},{key:"getAllReservation",value:function(e,t){return O.get("/api/reservation/all?filter="+e+"&&sort="+t)}},{key:"postReservation",value:function(e){return O.post("/api/reservation",e)}}]),e}()),y=a(267),f=a(149),g=a(3),k=a(261),N=a(274),S=a(248),C=a(262),w=a(264),D=a(1);function P(e){return{day:e.getDate().toString(),month:(e.getMonth()+1).toString(),year:e.getFullYear().toString()}}function A(e,t){return Math.round((t-e)/864e5)+1}function R(e,t){return!!e.find((function(e){return new Date(e).getTime()==t.getTime()}))}Date.prototype.addDays=function(e){var t=new Date(this.valueOf());return t.setDate(t.getDate()+e),t};var I=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;Object(c.a)(this,a),s=t.call(this,e);var i=function(e){var t=0,a=[];for(t in e)for(var s=new Date(parseInt(e[t].startDate.year),parseInt(e[t].startDate.month)-1,parseInt(e[t].startDate.day)),i=new Date(parseInt(e[t].endDate.year),parseInt(e[t].endDate.month)-1,parseInt(e[t].endDate.day)),r=s;r<=i;)a.push(new Date(r)),r=r.addDays(1);return a}(e.bookings).map((function(e){return e.getTime()}));return s.state={value:[null,null],dates:i,bookings:e.bookings,price:e.finalPrice,product:e.product,isAuthenticated:e.isAuthenticated},s.disabledDays=s.disabledDays.bind(Object(l.a)(s)),s.checkDateRange=s.checkDateRange.bind(Object(l.a)(s)),s.bookReservation=s.bookReservation.bind(Object(l.a)(s)),s}return Object(o.a)(a,[{key:"disabledDays",value:function(e){return null==this.state.dates?null:this.state.dates.includes(e.getTime())}},{key:"checkDateRange",value:function(e){if(2==e.length&&null!=this.state.dates&&e[0]&&e[1]){for(var t=e[0],a=e[1];t<=a;){if(1==R(this.state.dates,t))return!1;t=t.addDays(1)}return!0}return!1}},{key:"bookReservation",value:function(){var e=this;if(!this.state.value[0]||!this.state.value[1])return alert("Data prenotazione non valida");x.getUser().then((function(t){var a={clientEmail:t.data.data.email,clientName:t.data.data.userName,clientSurname:t.data.data.userSurname,productId:e.state.product._id,prodcutTitle:e.state.product.title,productBrand:e.state.product.brand,productImage:e.state.product.image,bookingDate:P(new Date),startDate:P(e.state.value[0]),endDate:P(e.state.value[1]),isTaken:!1,isReturned:!1,price:(A(e.state.value[0],e.state.value[1])*e.state.price).toFixed(2),description:"",note:""};x.postReservation(a).then((function(a){var s={productId:e.state.product._id,clientId:t.data.data.email,reservationId:a.data.data._id,startDate:P(e.state.value[0]),endDate:P(e.state.value[1])},i=e.state.bookings;i.push(s),x.postProduct(e.state.product._id,{bookings:i}).then((function(){alert("Prenotazione effettuata con successo"),window.location.reload(!1)}))}))}))}},{key:"componentWillReceiveProps",value:function(e){this.setState({isAuthenticated:e.isAuthenticated})}},{key:"render",value:function(){var e=this;return Object(D.jsxs)("div",{className:"pb-0 mt-2",children:[Object(D.jsx)(N.a,{className:"d-flex justify-content-center mb-2",children:Object(D.jsx)(S.b,{dateAdapter:k.a,children:Object(D.jsx)(C.a,{disablePast:!0,shouldDisableDate:this.disabledDays,startText:"Data di inizio",endText:"Data di fine",value:this.state.value,onChange:function(t){e.setState({value:t})},renderInput:function(e,t){return Object(D.jsxs)(i.a.Fragment,{children:[Object(D.jsx)(w.a,Object(g.a)({},e)),Object(D.jsx)(N.a,{sx:{mx:1},children:"a"}),Object(D.jsx)(w.a,Object(g.a)({},t))]})},inputFormat:"dd/MM/yyyy"})})}),Object(D.jsxs)("div",{children:["Giorni di noleggio: ",this.state.value[0]&&this.state.value[1]?A(this.state.value[0],this.state.value[1]):0]}),Object(D.jsxs)("div",{children:["Prezzo totale: ",this.state.value[0]&&this.state.value[1]?(A(this.state.value[0],this.state.value[1])*this.state.price).toFixed(2):"0.00"," \u20ac"]}),this.state.isAuthenticated?Object(D.jsx)(f.a,{disabled:!this.checkDateRange(this.state.value),className:"mt-3 w-100",onClick:function(t){t.preventDefault(),e.bookReservation()},children:this.checkDateRange(this.state.value)?Object(D.jsx)("span",{children:"Prenota ora"}):Object(D.jsx)("span",{children:"Seleziona una data valida"})}):Object(D.jsx)(f.a,{className:"mt-2 w-100",href:"/public/login.html",children:"Accedi per prenotare"})]})}}]),a}(i.a.Component),M=a(271),T=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){return Object(c.a)(this,a),t.call(this,e)}return Object(o.a)(a,[{key:"render",value:function(){var e=parseInt(this.props.quality);return Object(D.jsxs)("div",{className:"d-flex align-items-center",children:[Object(D.jsx)("b",{children:"Qualit\xe0:"}),Object(D.jsx)(M.a,{name:"read-only",value:e,max:3,readOnly:!0})]})}}]),a}(i.a.Component),z=a(258),L=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){return Object(c.a)(this,a),t.call(this,e)}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props.tags.map((function(e){return Object(D.jsx)(z.a,{pill:!0,bg:"primary",className:"m-1",children:e},e)}));return Object(D.jsxs)("div",{children:[Object(D.jsx)("b",{children:"Categoria:"}),Object(D.jsx)("div",{className:"d-flex justify-content-center flex-wrap",children:e})]})}}]),a}(i.a.Component),F=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={originalPrice:parseFloat(s.props.originalPrice),discountedPrice:parseFloat(s.props.discountedPrice)},s}return Object(o.a)(a,[{key:"render",value:function(){return this.state.originalPrice!=this.state.discountedPrice?Object(D.jsxs)("div",{children:[Object(D.jsxs)("span",{style:{textDecorationLine:"line-through"},children:[Object(D.jsx)("b",{children:"Prezzo: "})," ",this.state.originalPrice," \u20ac ",Object(D.jsx)("span",{style:{fontSize:"0.75em"},children:"al giorno"})]}),Object(D.jsx)("br",{}),Object(D.jsxs)("span",{style:{color:"red"},children:[Object(D.jsx)("b",{children:"Prezzo scontato: "})," ",this.state.discountedPrice," \u20ac ",Object(D.jsx)("span",{style:{fontSize:"0.75em"},children:"al giorno"})]})]}):Object(D.jsxs)("div",{children:[Object(D.jsx)("b",{children:"Prezzo: "})," ",this.state.originalPrice," \u20ac ",Object(D.jsx)("span",{style:{fontSize:"0.75em"},children:"al giorno"})]})}}]),a}(i.a.Component),U=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={product:e.product,isAuthenticated:e.isAuthenticated,discountedPrice:e.product.discount.onSaleType?(e.product.price*(100-e.product.discount.onSaleValue)/100).toFixed(2):(e.product.price-e.product.discount.onSaleValue).toFixed(2)},s}return Object(o.a)(a,[{key:"componentWillReceiveProps",value:function(e){this.setState({isAuthenticated:e.isAuthenticated})}},{key:"render",value:function(){return Object(D.jsx)(y.a,{className:"m-2 bg-light rounded-3 border border-dark",children:Object(D.jsxs)(y.a.Item,{eventKey:"0",children:[Object(D.jsx)(y.a.Header,{children:Object(D.jsxs)("div",{className:"row",style:{width:"95%",height:"12.5vh"},children:[Object(D.jsx)("div",{className:"col-6 h-100 d-flex align-items-center",children:Object(D.jsx)("img",{className:"img-fluid img-responsive mx-auto d-block",style:{maxHeight:"100%",maxWidth:"100%"},src:this.state.product.image,alt:"Immagine"})}),Object(D.jsx)("div",{className:"col-6 d-flex align-items-center",children:Object(D.jsxs)("div",{children:[Object(D.jsx)("b",{children:this.state.product.title}),Object(D.jsx)("br",{}),this.state.product.brand]})})]})}),Object(D.jsxs)(y.a.Body,{children:[Object(D.jsx)(L,{tags:this.state.product.tags}),Object(D.jsxs)("div",{style:{textAlign:"justify"},children:[Object(D.jsx)("b",{children:"Descrizione:"}),Object(D.jsx)("br",{}),this.state.product.description]}),Object(D.jsx)(T,{quality:this.state.product.quality}),Object(D.jsx)(F,{discountedPrice:this.state.discountedPrice,originalPrice:this.state.product.price}),Object(D.jsx)("hr",{}),Object(D.jsx)("div",{className:"mb-2",children:Object(D.jsx)("b",{children:"Prenotazione:"})}),this.state.product.available?Object(D.jsx)(I,{bookings:this.state.product.bookings,finalPrice:this.state.product.discount.onSale?this.state.discountedPrice:this.state.product.price,isAuthenticated:this.state.isAuthenticated,product:this.state.product}):Object(D.jsx)(f.a,{disabled:!0,className:"w-100",children:"Prodotto non disponibile"})]})]})})}}]),a}(i.a.Component),E=a(268),B=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={show:!1},s.handleClose=s.handleClose.bind(Object(l.a)(s)),s.handleShow=s.handleShow.bind(Object(l.a)(s)),s}return Object(o.a)(a,[{key:"handleClose",value:function(){this.setState({show:!1})}},{key:"handleShow",value:function(){this.setState({show:!0})}},{key:"render",value:function(){return Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)(f.a,{className:"w-100",variant:"primary",onClick:this.handleShow,children:"Modifica prenotazione"}),Object(D.jsxs)(E.a,{show:this.state.show,onHide:this.handleClose,backdrop:"static",keyboard:!1,children:[Object(D.jsx)(E.a.Header,{closeButton:!0,children:Object(D.jsx)(E.a.Title,{children:"Modifica prenotazione"})}),Object(D.jsx)(E.a.Body,{children:"ciao"}),Object(D.jsxs)(E.a.Footer,{children:[Object(D.jsx)(f.a,{variant:"secondary",onClick:this.handleClose,children:"Close"}),Object(D.jsx)(f.a,{variant:"primary",children:"Understood"})]})]})]})}}]),a}(i.a.Component),G=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={reservation:e.reservation,isAuthenticated:e.isAuthenticated,show:!1},s}return Object(o.a)(a,[{key:"componentWillReceiveProps",value:function(e){this.setState({isAuthenticated:e.isAuthenticated})}},{key:"render",value:function(){return Object(D.jsx)(y.a,{className:"m-2 bg-light rounded-3 border border-dark",children:Object(D.jsxs)(y.a.Item,{eventKey:"0",children:[Object(D.jsx)(y.a.Header,{children:Object(D.jsxs)("div",{className:"row",style:{width:"95%",height:"12.5vh"},children:[Object(D.jsx)("div",{className:"col-6 h-100 d-flex align-items-center",children:Object(D.jsx)("img",{className:"img-fluid img-responsive mx-auto d-block",style:{maxHeight:"100%",maxWidth:"100%"},src:this.state.reservation.productImage,alt:"Immagine"})}),Object(D.jsx)("div",{className:"col-6 d-flex align-items-center",children:Object(D.jsxs)("div",{children:[Object(D.jsx)("b",{children:this.state.reservation.productTitle}),Object(D.jsx)("br",{}),this.state.reservation.productBrand,Object(D.jsx)("br",{}),Object(D.jsxs)("b",{children:[this.state.reservation.bookingDate.day,"/",this.state.reservation.bookingDate.month,"/",this.state.reservation.bookingDate.year]})]})})]})}),Object(D.jsxs)(y.a.Body,{children:[Object(D.jsxs)("div",{children:["Identificativo della prenotazione:",Object(D.jsx)("br",{}),Object(D.jsx)("b",{children:this.state.reservation._id})]}),Object(D.jsx)("hr",{}),Object(D.jsxs)("div",{children:[Object(D.jsxs)("div",{className:"row d-flex justify-content-between",children:[Object(D.jsx)("div",{className:"col-8",children:"Data prenotazione:"}),Object(D.jsxs)("div",{className:"col-4",children:[this.state.reservation.bookingDate.day,"/",this.state.reservation.bookingDate.month,"/",this.state.reservation.bookingDate.year]})]}),Object(D.jsxs)("div",{className:"row",children:[Object(D.jsx)("div",{className:"col-8",children:"Data di inizio noleggio:"}),Object(D.jsxs)("div",{className:"col-4",children:[this.state.reservation.startDate.day,"/",this.state.reservation.startDate.month,"/",this.state.reservation.startDate.year]})]}),Object(D.jsxs)("div",{className:"row",children:[Object(D.jsx)("div",{className:"col-8",children:"Data di fine noleggio:"}),Object(D.jsxs)("div",{className:"col-4",children:[this.state.reservation.endDate.day,"/",this.state.reservation.endDate.month,"/",this.state.reservation.endDate.year]})]}),Object(D.jsxs)("div",{className:"row",children:[Object(D.jsx)("div",{className:"col-8",children:"Prezzo totale:"}),Object(D.jsxs)("div",{className:"col-4",children:[this.state.reservation.price," \u20ac"]})]}),Object(D.jsx)("div",{className:"row",children:Object(D.jsx)("div",{className:"col-12",children:"Dettagli:"})}),Object(D.jsx)("div",{className:"row",children:Object(D.jsx)("div",{className:"col-12",children:this.state.reservation.description})})]}),Object(D.jsx)("hr",{}),1==this.state.reservation.isTaken?Object(D.jsx)(f.a,{className:"w-100",disabled:!0,children:"Prenotazione attiva"}):Object(D.jsx)(B,{})]})]})})}}]),a}(i.a.Component),V=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={isAuthenticated:e.isAuthenticated},s}return Object(o.a)(a,[{key:"componentWillReceiveProps",value:function(e){this.setState({isAuthenticated:e.isAuthenticated})}},{key:"render",value:function(){var e=this;if(0==this.props.elements.length)return Object(D.jsx)("div",{style:{height:"75vh"},className:"d-flex justify-content-center align-items-center",children:"Non ci sono contenuti"});if("product"==this.props.type){var t=this.props.elements.map((function(t){return Object(D.jsx)(U,{product:t,isAuthenticated:e.state.isAuthenticated},t._id)}));return Object(D.jsx)("div",{id:"body",children:t})}if("reservation"==this.props.type){var a=this.props.elements.map((function(t){return Object(D.jsx)(G,{reservation:t,isAuthenticated:e.state.isAuthenticated},t._id)}));return Object(D.jsx)("div",{id:"body",children:a})}}}]),a}(i.a.Component),W=a(266),_=a(259),H=a(265),Y=a(151),q=a(269),J=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={isAuthenticated:e.isAuthenticated},s.logout=s.logout.bind(Object(l.a)(s)),s}return Object(o.a)(a,[{key:"logout",value:function(){j.a.remove("jwt"),window.location.href="/user/index.html"}},{key:"componentWillReceiveProps",value:function(e){this.setState({isAuthenticated:e.isAuthenticated})}},{key:"render",value:function(){var e=this;return 1==this.state.isAuthenticated?Object(D.jsxs)(q.a,{className:"text-center d-flex align-items-center",navbarScroll:!0,children:[Object(D.jsx)(q.a.Link,{children:Object(D.jsx)(H.a,{className:"element-to-hide-over-350",onSubmit:function(t){t.preventDefault(),e.props.search(t.target.searchInput.value)},children:Object(D.jsx)(Y.a,{type:"search",placeholder:"Cerca",name:"searchInput",className:"me-2","aria-label":"Cerca"})})}),Object(D.jsx)(q.a.Link,{href:"./page",children:"Pagina utente"}),Object(D.jsx)(q.a.Link,{href:"./reservation",children:"Prenotazioni"}),Object(D.jsx)(q.a.Link,{onClick:this.logout,children:"Logout"})]}):Object(D.jsxs)(q.a,{className:"me-auto my-2 my-lg-0 text-center  align-items-center",navbarScroll:!0,children:[Object(D.jsx)(q.a.Link,{className:"w-100",children:"user"==this.props.type?null:Object(D.jsx)(H.a,{className:"element-to-hide-over-350",onSubmit:function(t){t.preventDefault(),e.props.search(t.target.searchInput.value)},children:Object(D.jsx)(Y.a,{type:"search",placeholder:"Cerca",name:"searchInput",className:"me-2","aria-label":"Cerca"})})}),Object(D.jsx)(q.a.Link,{href:"/public/login.html",children:"login"})]})}}]),a}(i.a.Component),K=a(263),Q=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),s=t.call(this,e),"product"==e.type?s.state={filter1:["Disponibilit\xe0","Tutti","Disponibili","Non dispobili"],choise1:1,filter2:["Ordina per","Prezzo crescente","Prezzo descrescente"],choise2:1}:"reservation"==e.type&&(s.state={filter1:["Disponibilit\xe0","Tutte","Attive","Concluse"],choise1:1,filter2:["Ordina per","Data crescente","Data descrescente"],choise2:1}),s}return Object(o.a)(a,[{key:"render",value:function(){var e=this;return"user"==this.props.type?Object(D.jsx)(D.Fragment,{}):Object(D.jsxs)("div",{className:"row p-2",children:[Object(D.jsx)("div",{className:"col-6 d-flex flex-row align-items-center",style:{overflowX:"visible !important"},children:Object(D.jsxs)(K.a,{children:[Object(D.jsx)(K.a.Toggle,{children:this.state.filter1[0]}),Object(D.jsxs)(K.a.Menu,{renderOnMount:!0,children:[Object(D.jsx)(K.a.Item,{active:1==this.state.choise1,onClick:function(){e.setState({choise1:1}),e.props.show(1)},children:this.state.filter1[1]}),Object(D.jsx)(K.a.Item,{active:2==this.state.choise1,onClick:function(){e.setState({choise1:2}),e.props.show(2)},children:this.state.filter1[2]}),Object(D.jsx)(K.a.Item,{active:3==this.state.choise1,onClick:function(){e.setState({choise1:3}),e.props.show(3)},children:this.state.filter1[3]})]})]})}),Object(D.jsx)("div",{className:"col-6 d-flex flex-row-reverse align-items-center",children:Object(D.jsxs)(K.a,{children:[Object(D.jsx)(K.a.Toggle,{children:this.state.filter2[0]}),Object(D.jsxs)(K.a.Menu,{children:[Object(D.jsx)(K.a.Item,{active:1==this.state.choise2,onClick:function(t){e.setState({choise2:1}),e.props.sort(!0)},children:this.state.filter2[1]}),Object(D.jsx)(K.a.Item,{active:2==this.state.choise2,onClick:function(){e.setState({choise2:2}),e.props.sort(!1)},children:this.state.filter2[2]})]})]})})]})}}]),a}(i.a.Component),X=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={isAuthenticated:e.isAuthenticated},s}return Object(o.a)(a,[{key:"componentWillReceiveProps",value:function(e){this.setState({isAuthenticated:e.isAuthenticated})}},{key:"render",value:function(){var e=this;return Object(D.jsxs)("div",{children:[Object(D.jsx)(W.a,{className:"bg-light w-100",expand:"false",children:Object(D.jsxs)(_.a,{fluid:!0,children:[Object(D.jsx)(W.a.Brand,{href:"/user/index.html",className:"p-0 m-0",children:Object(D.jsx)("img",{src:"https://cdn.discordapp.com/attachments/888778821262790686/926860373775249469/nolonoloplus.png",alt:"logo NoloNoloPlus",height:"45px"})}),"user"==this.props.type?"Pagina utente":Object(D.jsx)(H.a,{className:"element-to-hide-under-350",style:{width:"60%"},onSubmit:function(t){t.preventDefault(),e.props.search(t.target.searchInput.value)},children:Object(D.jsx)(Y.a,{type:"search",placeholder:"Cerca... ",name:"searchInput",className:"me-2","aria-label":"Cerca prodotti"})}),Object(D.jsx)(W.a.Toggle,{style:{height:"45px",width:"45px",padding:"0px"},"aria-controls":"navbarScroll"}),Object(D.jsx)(W.a.Collapse,{id:"navbarScroll",children:Object(D.jsx)(J,{isAuthenticated:this.state.isAuthenticated,type:this.props.type})})]})}),Object(D.jsx)(Q,{show:this.props.show,sort:this.props.sort,type:this.props.type})]})}}]),a}(i.a.Component),Z=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={products:[],filteredProducts:[],isAuthenticated:!1},s.searchProducts=s.searchProducts.bind(Object(l.a)(s)),s.showProducts=s.showProducts.bind(Object(l.a)(s)),s.sortProducts=s.sortProducts.bind(Object(l.a)(s)),s}return Object(o.a)(a,[{key:"searchProducts",value:function(e){var t=this;console.log("searchProducts("+e+")"),x.getAllProduct(e,!0).then((function(e){t.setState({products:e.data.data,filteredProducts:e.data.data})}))}},{key:"showProducts",value:function(e){console.log("showProducts("+e+")");var t=[];if(e>1){var a=2==e;for(var s in this.state.products)this.state.products[s].available==a&&t.push(this.state.products[s])}else t=this.state.products;this.setState({filteredProducts:t})}},{key:"sortProducts",value:function(e){console.log("sortProducts("+e+")");var t=this.state.products;t.sort((function(e,t){return e.price-t.price})),0==e&&t.reverse(),this.setState({products:t,filteredProducts:t})}},{key:"componentDidMount",value:function(){var e=this;this.searchProducts(""),j.a.get("jwt")&&x.getUser().then((function(){e.setState({isAuthenticated:!0})})).catch((function(){e.setState({isAuthenticated:!1})}))}},{key:"render",value:function(){return Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)(X,{type:"product",search:this.searchProducts,show:this.showProducts,sort:this.sortProducts,isAuthenticated:this.state.isAuthenticated}),Object(D.jsx)(V,{type:"product",elements:this.state.filteredProducts,isAuthenticated:this.state.isAuthenticated})]})}}]),a}(i.a.Component);a(207);Date.prototype.addDays=function(e){var t=new Date(this.valueOf());return t.setDate(t.getDate()+e),t};var $=a(152),ee=a(260),te=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).switchModifying=function(){var e=!s.state.boolModifying;s.setState({boolModifying:e})},s.handleSubmit=function(e){e.preventDefault(),console.log("inizio save: "+s.state.boolModifying),console.log("event target-------"),console.log(e.target),console.log(e.target.querySelectorAll("input"));var t=e.target.querySelectorAll("input");for(var a in t)console.log(t[a].value);console.log(),s.state.boolModifying,s.switchModifying(),console.log("switch: "+s.state.boolModifying)},s.textInput=i.a.createRef(),s.state={userId:"",userName:"",userSurname:"",userBirthday:{day:"",month:"",year:""},userPhoneNumber:"",userEmail:"",userAddress:{street:"",number:"",city:""},userPayment:{cardType:"",cardName:"",cardSurname:"",cardExpireYear:"",cardExpireMonth:"",cardCCV:""},userSex:"",boolModifying:!1,yearList:[{key:1,year:"2022"},{key:2,year:"2023"},{key:3,year:"2024"},{key:4,year:"2025"},{key:5,year:"2026"}],monthList:[{key:1,month:"Gennaio"},{key:2,month:"Febbraio"},{key:3,month:"Marzo"},{key:4,month:"Aprile"},{key:5,month:"Maggio"},{key:6,month:"Giugno"},{key:7,month:"Luglio"},{key:8,month:"Agosto"},{key:9,month:"Settembre"},{key:10,month:"Ottobre"},{key:11,month:"Novembre"},{key:12,month:"Dicembre"}]},s.switchModifying=s.switchModifying.bind(Object(l.a)(s)),s.handleSubmit=s.handleSubmit.bind(Object(l.a)(s)),s.handleChange=s.handleChange.bind(Object(l.a)(s)),s}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this;x.getUser().then((function(t){e.setState({userId:t.data.data._id,userName:t.data.data.userName,userSurname:t.data.data.userSurname,userBirthday:{day:t.data.data.birthday.day,month:t.data.data.birthday.month,year:t.data.data.birthday.year},userPhoneNumber:t.data.data.phoneNumber,userEmail:t.data.data.email,userAddress:{street:t.data.data.address.addressStreet,number:t.data.data.address.addressNumber,city:t.data.data.address.addressCity},userPayment:{cardName:t.data.data.payment.cardName,cardSurname:t.data.data.payment.cardSurname,cardType:t.data.data.payment.cardType,cardExpireYear:t.data.data.payment.cardExpireMonth,cardExpireMonth:t.data.data.payment.cardExpireYear,cardCCV:t.data.data.payment.cardCCV},userSex:t.data.data.sex,newCardType:t.data.data.payment.cardType,isAuth:!0}),console.log(e.state.boolModifying)}))}},{key:"handleChange",value:function(e){this.setState({value:e.target.value})}},{key:"render",value:function(){var e=this;return Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)(X,{type:"user",isAuthenticated:this.state.isAuth}),Object(D.jsx)(_.a,{className:"mb-2",children:Object(D.jsxs)("form",{onSubmit:this.handleSubmit,children:[Object(D.jsxs)("fieldset",{disabled:!this.state.boolModifying,children:[Object(D.jsxs)(H.a.Group,{className:"mb-2",children:[Object(D.jsx)(H.a.Label,{children:"User Name:"}),Object(D.jsx)(H.a.Control,{type:"text",name:"name",placeholder:this.state.userName,"aria-label":"Username","aria-describedby":"basic-addon1"})]}),Object(D.jsxs)(H.a.Group,{className:"mb-2",children:[Object(D.jsx)(H.a.Label,{children:"User Surname:"}),Object(D.jsx)(H.a.Control,{type:"text",name:"surName",placeholder:this.state.userSurname})]}),Object(D.jsxs)(H.a.Group,{className:"mb-2",children:[Object(D.jsx)(H.a.Label,{children:"User Password:"}),Object(D.jsx)(H.a.Control,{type:"password",placeholder:"password"})]}),Object(D.jsx)(H.a.Label,{children:"User Sex:"}),Object(D.jsxs)(H.a.Select,{className:"mb-2",value:this.state.userSex,onChange:function(t){console.log(t),e.setState({sex:t.target.value})},"aria-label":"Form Select Sex",children:[Object(D.jsx)("option",{value:"male",children:"Male"}),Object(D.jsx)("option",{value:"female",children:"Female"}),Object(D.jsx)("option",{value:"other",children:"Other"})]}),Object(D.jsxs)(H.a.Group,{as:$.a,className:"mb-2",children:[Object(D.jsx)(H.a.Label,{children:"User Birthday:"}),Object(D.jsx)(H.a.Control,{type:"date",placeholder:new Date(this.state.userBirthday.year,this.state.userBirthday.month,this.state.userBirthday.day)})]}),Object(D.jsxs)(H.a.Group,{as:$.a,className:"mb-2",children:[Object(D.jsx)(H.a.Label,{children:"Address City:"}),Object(D.jsx)(H.a.Control,{type:"text",placeholder:this.state.userAddress.city})]}),Object(D.jsxs)(ee.a,{children:[Object(D.jsxs)(H.a.Group,{as:$.a,xs:8,className:"mb-2",children:[Object(D.jsx)(H.a.Label,{children:"Address Street:"}),Object(D.jsx)(H.a.Control,{type:"text",placeholder:this.state.userAddress.street})]}),Object(D.jsxs)(H.a.Group,{as:$.a,xs:4,className:"mb-2",children:[Object(D.jsx)(H.a.Label,{children:"Number:"}),Object(D.jsx)(H.a.Control,{type:"text",placeholder:this.state.userAddress.number})]})]}),Object(D.jsxs)(H.a.Group,{className:"mb-2",children:[Object(D.jsx)(H.a.Label,{children:"User Phone Number:"}),Object(D.jsx)(H.a.Control,{type:"text",placeholder:this.state.userPhoneNumber})]}),Object(D.jsxs)(H.a.Group,{className:"mb-2",children:[Object(D.jsx)(H.a.Label,{children:"User Email:"}),Object(D.jsx)(H.a.Control,{type:"email",placeholder:this.state.userEmail})]}),Object(D.jsxs)(H.a.Group,{className:"mt-1 mb-2",children:[Object(D.jsx)(H.a.Label,{children:"Card Name:"}),Object(D.jsx)(H.a.Control,{type:"text",placeholder:this.state.userPayment.cardName})]}),Object(D.jsxs)(H.a.Group,{className:"mt-1 mb-2",children:[Object(D.jsx)(H.a.Label,{children:"Card Surname:"}),Object(D.jsx)(H.a.Control,{type:"text",placeholder:this.state.userPayment.cardSurname})]}),Object(D.jsx)(H.a.Label,{children:"Tipo di carta:"}),Object(D.jsxs)(H.a.Select,{className:"mb-2",value:this.state.newCardType,onChange:function(t){console.log(t),e.setState({newCardType:t.target.value})},"aria-label":"Form Select Card Type",children:[Object(D.jsx)("option",{value:"credit",children:"Carta di debito"}),Object(D.jsx)("option",{value:"debit",children:"Carta di credito"}),Object(D.jsx)("option",{value:"prepaid",children:"Carta prepagata"})]}),Object(D.jsxs)(ee.a,{children:[Object(D.jsx)(H.a.Label,{children:"Card Expiration:"}),Object(D.jsx)($.a,{xs:8,className:"mr-2",children:Object(D.jsx)(H.a.Select,{className:"mb-2 mr-0",onChange:function(t){console.log(t),e.setState({cardExpireMonth:t.target.value})},"aria-label":"Select Card Expiration Month",children:this.state.monthList.map((function(e){return Object(D.jsx)("option",{value:e.key,children:e.month},e.key)}))})}),Object(D.jsx)($.a,{xs:4,className:"ml-0",children:Object(D.jsx)(H.a.Select,{className:"mb-2",onChange:function(t){console.log(t),e.setState({cardExpireYear:t.target.value})},"aria-label":"Select Card Expiration Year",children:this.state.yearList.map((function(e){return Object(D.jsx)("option",{value:parseInt(e.key)+2021,children:e.year},e.key)}))})})]}),Object(D.jsxs)(H.a.Group,{className:"mb-2",children:[Object(D.jsx)(H.a.Label,{children:"Card CVV:"}),Object(D.jsx)(H.a.Control,{type:"text",placeholder:this.state.userPayment.cardCCV})]})]}),Object(D.jsx)(f.a,{type:"submit",value:"submit",variant:this.state.boolModifying?"success":"primary",children:this.state.boolModifying?"Salva":"Modifica"})]})})]})}}]),a}(s.Component),ae=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={reservations:[],filteredReservations:[],isAuthenticated:!1},s.searchReservations=s.searchReservations.bind(Object(l.a)(s)),s.showReservations=s.showReservations.bind(Object(l.a)(s)),s.sortReservations=s.sortReservations.bind(Object(l.a)(s)),s}return Object(o.a)(a,[{key:"searchReservations",value:function(e){var t=this;console.log("searchReservations("+e+")"),x.getAllReservation(e,!0).then((function(e){t.setState({reservations:e.data.obj,filteredReservations:e.data.obj})}))}},{key:"showReservations",value:function(e){console.log("showReservations("+e+")");var t=[];if(e>1)for(var a in this.state.reservations)switch(e){case 2:0==this.state.reservations[a].isTaken&&0==this.state.reservations[a].isReturned&&t.push(this.state.reservations[a]);break;case 3:1==this.state.reservations[a].isTaken&&0==this.state.reservations[a].isReturned&&t.push(this.state.reservations[a]);break;case 4:1==this.state.reservations[a].isTaken&&1==this.state.reservations[a].isReturned&&t.push(this.state.reservations[a]);break;default:return}else t=this.state.reservations;this.setState({filteredReservationss:t})}},{key:"sortReservations",value:function(e){console.log("sortReservations("+e+")");var t=this.state.reservations;t.sort((function(e,t){return new Date(e.bookingDate.year,e.bookingDate.month,e.bookingDate.day)-new Date(t.bookingDate.year,t.bookingDate.month,t.bookingDate.day)})),0==e&&t.reverse(),this.setState({reservations:t,filteredReservation:t})}},{key:"componentDidMount",value:function(){var e=this;this.searchReservations(""),j.a.get("jwt")&&x.getUser().then((function(){e.setState({isAuthenticated:!0})})).catch((function(){e.setState({isAuthenticated:!1})}))}},{key:"render",value:function(){return Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)(X,{type:"reservation",search:this.searchReservations,show:this.showReservations,sort:this.sortReservations,isAuthenticated:this.state.isAuthenticated}),Object(D.jsx)(V,{type:"reservation",elements:this.state.filteredReservations,isAuthenticated:this.state.isAuthenticated})]})}}]),a}(i.a.Component),se=a(18);var ie=function(){return Object(D.jsx)("div",{className:"App",children:Object(D.jsxs)(se.c,{children:[Object(D.jsx)(se.a,{path:"/user/index.html",element:Object(D.jsx)(Z,{})}),Object(D.jsx)(se.a,{path:"/user/page",element:Object(D.jsx)(te,{})}),Object(D.jsx)(se.a,{path:"/user/reservation",element:Object(D.jsx)(ae,{})})]})})},re=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,276)).then((function(t){var a=t.getCLS,s=t.getFID,i=t.getFCP,r=t.getLCP,n=t.getTTFB;a(e),s(e),i(e),r(e),n(e)}))},ne=a(125);n.a.render(Object(D.jsx)(ne.a,{children:Object(D.jsx)(ie,{})}),document.getElementById("root")),re()}},[[208,1,2]]]);
//# sourceMappingURL=main.6dc6890f.chunk.js.map