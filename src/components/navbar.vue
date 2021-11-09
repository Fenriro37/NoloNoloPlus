<template>
    <nav class="navbar  navbar-dark bg-dark">

        <!-- Aggiungere padding e togliere angolo smussato da bottone dell'input group-->

          <b-input-group id="input">
            <template #prepend>
              <b-dropdown text="Dropdown">
                <b-dropdown-item>Action A</b-dropdown-item>
                <b-dropdown-item>Action B</b-dropdown-item>
                <b-dropdown-item>Action C</b-dropdown-item>
              </b-dropdown>
            </template>

            <b-form-input></b-form-input>

            <template #append>
              <b-input-group-append>
                <b-button variant="info">cerca</b-button>
              </b-input-group-append>
            </template>
          </b-input-group>

            <b-button-group>
              <b-button>Button 1</b-button>
              <b-button>Button 2</b-button>
            </b-button-group>

    </nav>
</template>

<script>
//export default {
//  name: "app"
//};
</script>

<style>
#input{
  width: 60%;
}


</style>