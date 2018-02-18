<template>
  <div id="app">
    <app-venue></app-venue>
  </div>
</template>

<script>
  import axios from 'axios'
  import Venue from './components/Venue.vue'

  export default {
    name: 'app',
    components: {
      appVenue: Venue
    }
  }
</script>

<style lang="scss">
  #wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
