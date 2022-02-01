<template>

<div class="container-fluid p-2">
  <div  v-for="user in catalog" :key="user._id">
    <div class="d-flex justify-content-center align-items-center">
      <div class="card mb-1" style="height: 10em; width:60%; ">
        <div class="card-body h-100">
          <div class="row h-100">
            <div class="col-4 align-items-center h-100"> <img class="myImg " src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" tabindex="0" alt="Immagine utente generica"></div>
            <div class="col-8 text-truncate" style="height:100%;"> <h2>  <router-link  tabindex="0" :aria-label="'link a cliente' + user.email" :to="{name: 'client', params:{email: user.email}}" >{{user.userName + ' ' + user.userSurname}}</router-link></h2>
              <h4 tabindex="0">Email: {{user.email}}</h4>
              <h4 tabindex="0" :aria-label="'numero di telefono: '+ user.phoneNumber">Telefono: {{user.phoneNumber}}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>


<script>
import Functions from '../functions/function'
export default {
    data() {
      return {
        catalog: [],              
      }
    },
    mounted(){
      let filter = (this.$route.params.filter !== undefined) ? this.$route.params.filter : ''
      let query = {
       filter: filter,
       sort: false
      }
      console.log(query)
      Functions.getAllUser(query)
        .then( (result) => {
        console.log(result)
        this.catalog = result.data.data
      })
      .catch( (error) => {
          alert('Problema nel caricamento dei dati');
          this.$router.push({ name: 'home' , params: { filter: ''}})
      }) 
    },
  }


</script>