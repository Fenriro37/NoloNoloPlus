<template>
  <!-- v-for:articles/clients/reservations {html di uno }-->
  
  <div class="container-fluid p-5">
    <div  v-for="user in catalog" :key="user._id">
      <b-row>
        <b-col cols="2">
          <b-img thumbnail fluid src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"  alt="Image 1"></b-img>
        </b-col>
        <b-col cols="5">
          <h2>  <router-link :to="{name: 'client', params:{id: user._id}}" class="nav-link">{{user.userName + ' ' + user.userSurname}}</router-link></h2>
          <h2> Email: {{user.email}} </h2> 
          <h2> Telefono: {{user.phoneNumber}} </h2> 
        </b-col>
      </b-row>
    </div>
  </div>

</template>




<script>
import Functions from '../functions/function'
export default {
    data() {
      return {
        catalog: [],
        filter: "",              
      }
    },
    created(){
      this.filter = this.$route.params.filter
      let query = {
       filter: this.filter,
       sort: false
      }
      console.log(query)
      Functions.getAllUser(query)
        .then( (result) => {
        console.log(result)
        this.catalog = result.data.data
      }) 
    },
    methods: {    },
  }


</script>