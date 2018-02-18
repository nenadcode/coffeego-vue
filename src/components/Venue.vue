<template>
  <div>
    <ul v-if="venues && venues.length">
      <div class="card" v-for="venue in venues">
        <app-venue-img :venue="venue"></app-venue-img>
        <app-venue-info :venue="venue"></app-venue-info>
      </div>
    </ul>

    <div v-if="error && error.length">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import VenueImg from './VenueImg.vue'
  import VenueInfo from './VenueInfo.vue'

  export default {
    name: 'Venue',
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
              axios.get('search?categoryId=4bf58dd8d48988d1e0931735&v=20131016&ll=' + lat + ',' + lng + '&radius=1000&client_id=O4N5MBHQWS11LRWBBO15JTZWFC42WKSUKTQYMXJ1ZN1CIPXD&client_secret=X1043GY3LH0W4S54GT0RWL300R2144W5WUVJKQ30GI0O1F03&v=20120609')
                .then(res => {
                  vm.venues = res.data.response.venues.map(v => ({
                    ...v,
                    imgSrcValue: ''
                  }))

                  vm.venues.map(function(place) {

                    let venueID = place.id

                    axios.get(venueID + '/?client_id=O4N5MBHQWS11LRWBBO15JTZWFC42WKSUKTQYMXJ1ZN1CIPXD&client_secret=X1043GY3LH0W4S54GT0RWL300R2144W5WUVJKQ30GI0O1F03&v=20120609')
                      .then(data => {
                        place.rating = data.data.response.venue.rating
                        let rating = place.rating,
                          venueHasPhoto = data.data.response.venue.hasOwnProperty('bestPhoto'),
                          photo = data.data.response.venue.bestPhoto

                          place.imgSrcValue = (venueHasPhoto) ? photo.prefix + '100x100' + photo.suffix : 'src/assets/no-image.jpg'
                      })
                  })

                })
                .catch(() => {
                  vm.error = 'Do you want to see where are closest Coffee Shops? Please allow Coffee Go to see your location.'
                })

          })
      }
    },
    components: {
      appVenueImg: VenueImg,
      appVenueInfo: VenueInfo
    }
  }
</script>

<style lang="scss">
  .card {
    display: flex;
    width: 30%;
    background-color: #efeff4;
    border-top: 1px solid #c7cdcf;
    margin: 10px auto;
    padding: 20px 20px 10px;
  }

  .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 50px;
  }
</style>