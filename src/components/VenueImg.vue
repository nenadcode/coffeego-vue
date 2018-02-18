<template>
  <div class="card__photo-container">
    <img :src="venue.imgSrcValue">
  </div>
</template>

<script>
  export default {
    name: 'VenueImg',
    props: ['venue']
  }
</script>

<style lang="scss">
  .card {

    &__photo-container {
      display: flex;
      width: 200px;
      height: 130px;
      margin-right: 20px;

      img {
        width: 100%;
      }
    }
  }
</style>