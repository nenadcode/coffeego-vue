<template>
  <div id="app">
    <ul v-if="venues && venues.length">
      <div class="card" v-for="venue in venues">
        <div class="card__photo-container">
          <img :src="venue.imgSrcValue">
        </div>
        <div class="card__info-container">
          <div class="card__info-container__name-rating-container">
            <h1>{{ venue.name }}</h1>
            <div class="card__info-container__rating-container">
              <p v-if="!venue.rating">-</p>
              <p v-else>{{ venue.rating }}</p>
            </div>
          </div>
          <p class="card__info-container__address" v-if="venue.location.address">{{ venue.location.address }}, {{ venue.location.city }}</p>
          <p class="card__info-container__address" v-else>Address not available</p>
          <p class="card__info-container__coffee-cold"></p>
        </div>
      </div>
    </ul>

    <div v-if="error && error.length">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'app',
    data () {
      return {
        venues: '',
        place: '',
        error: ''
      }
    },
    created() {
      this.getPositionApproved()
    },
    methods: {
      getPosition() {
        return new Promise(function (resolve, reject) {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        })
      },
      getPositionApproved() {
        let vm = this
        this.getPosition()
          .then((position) => {
            let lat = position.coords.latitude,
              lng = position.coords.longitude
              axios.get('https://api.foursquare.com/v2/venues/search?categoryId=4bf58dd8d48988d1e0931735&v=20131016&ll=' + lat + ',' + lng + '&radius=1000&client_id=O4N5MBHQWS11LRWBBO15JTZWFC42WKSUKTQYMXJ1ZN1CIPXD&client_secret=X1043GY3LH0W4S54GT0RWL300R2144W5WUVJKQ30GI0O1F03&v=20120609')
                .then(res => {
                  vm.venues = res.data.response.venues.map(v => ({
                    ...v,
                    imgSrcValue: ''
                  }))

                  vm.venues.map(function(place) {

                    let venueID = place.id

                    axios.get('https://api.foursquare.com/v2/venues/' + venueID + '/?client_id=O4N5MBHQWS11LRWBBO15JTZWFC42WKSUKTQYMXJ1ZN1CIPXD&client_secret=X1043GY3LH0W4S54GT0RWL300R2144W5WUVJKQ30GI0O1F03&v=20120609')
                      .then(data => {
                        place.rating = data.data.response.venue.rating
                        let rating = place.rating,
                          venueHasPhoto = data.data.response.venue.hasOwnProperty('bestPhoto'),
                          photo = data.data.response.venue.bestPhoto

                          place.imgSrcValue = (venueHasPhoto) ? photo.prefix + '100x100' + photo.suffix : '/dist/no-image.jpg'
                      })
                  })

                })
                .catch(() => {
                  vm.error = 'Do you want to see where are closest Coffee Shops? Please allow Coffee Go to see your location.'
                })

          })
      }
    }
  }
</script>

<style lang="scss">
  #wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .card {
    display: flex;
    width: 30%;
    background-color: #efeff4;
    border-top: 1px solid #c7cdcf;
    margin: 10px auto;
    padding: 20px 20px 10px;

    &__photo-container {
      display: flex;
      width: 200px;
      height: 130px;
      margin-right: 20px;

      img {
        width: 100%;
      }
    }

    &__info-container {
      display: flex;
      flex-direction: column;
      width: 100%;

      &__name-rating-container {
        display: flex;
        justify-content: space-between;

        h1 {
          font-size: 35px;
          color: #2d5be3;
          vertical-align: top;
          margin: 0 10px 0 0;
        }
      }

      &__rating-container {
        display: flex;
        justify-content: center;
        width: 40px;
        height: 40px;
        background-color: green;
        border-radius: 50%;

        p {
          margin-top: 0px;
          margin-bottom: 0px;
          align-self: center;
          color: #fff;
          font-size: 20px;
        }
      }

      &__address {
        font-size: 20px;
        font-weight: bold;
        text-transform: capitalize;
        margin: 10px 0;
      }

      &__coffee-cold {
        margin: 5px 0 10px 0;
      }
    }

    .success {
      color: green;
    }

    .warning {
      color: red;
    }
  }

  .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 50px;
  }
</style>
