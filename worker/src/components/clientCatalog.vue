<template>
  <!-- v-for:articles/clients/reservations {html di uno }-->
  
  <div class="container-fluid p-5">
    <b-row>
      <b-col cols="2">
        <b-img thumbnail fluid src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"  alt="Image 1"></b-img>
      </b-col>
      <b-col cols="5">
        <h2>  <router-link to="/client" class="nav-link">{{clients.name + ' ' + clients.surname}}</router-link></h2>
        <h2> Email: {{clients.email}} </h2> 
        <h2> Telefono: {{clients.phoneNumber}} </h2> 
      </b-col>
    </b-row>
  </div>

</template>




<script>
import Functions from '../functions/function'
export default {
    data() {
      return {
        catalog: [],
        clients: 
        {
            name: 'Mario',
            surname: 'Cazzi',
            phoneNumber: '3506451389',
            email: 'mariocazzi@gmail.com',
        }                
      }
    },
    created(){
      let query = {}
      query.filter = ''
      query.sort = true 
      Functions.getAllUser(x)
        .then( (result) => {
        console.log(result)
        this.catalog = result.data.data
      }) 
    },
    methods: {    },
    computed: {    },
  }


</script>