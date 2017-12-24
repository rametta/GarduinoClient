<template>

  <v-container grid-list-md>

    <v-layout v-if="garden" row>

      <v-flex xs12>
        <h1>{{garden.name}}</h1>
        <span>{{garden.description}}</span>
      </v-flex>

    </v-layout>

    <v-progress-circular v-if="readings.length === 0" indeterminate color="primary"></v-progress-circular>

    <v-layout v-if="readings[0]" row wrap>

      <v-flex md3>
        <v-card dark color="primary">
          <v-card-text>
            Temperature {{readings[0].temperature}}
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex md3>
        <v-card dark color="primary">
          <v-card-text>
            Humidity {{readings[0].humidity}}%
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex md3>
        <v-card dark color="primary">
          <v-card-text>
            Light {{readings[0].light}}
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex md3>
        <v-card dark color="primary">
          <v-card-text>
            Soil Moisture {{readings[0].moisture}}
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <small>Last update: {{formatDate(readings[0].date)}}</small>
      </v-flex>
      
    </v-layout>

  </v-container>
</template>

<script>
import * as moment from 'moment';
import gardenService from './../services/garden.service';
import readingService from './../services/reading.service';

export default {
  data() {
    return {
      garden: null,
      readings: [],
      error: false,
      readingsInterval: null,
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format('MMM Do, YYYY h:mmA');
    },
  },
  created() {
    // Get garden
    gardenService.queryGardens({ id: this.$route.params.garden })
      .then(({ data }) => {
        this.garden = data.results[0];
      })
      .catch(() => {
        this.error = true;
      });

    // Get readings every 3 seconds
    this.readingsInterval = setInterval(() => {
      readingService.queryReadings({
        gardenId: this.$route.params.garden,
        orderByDesc: 'id',
      })
      .then(({ data }) => {
        this.readings = data.results;
      })
      .catch(() => {
        this.error = true;
      });
    }, 3000);
  },
  destroyed() {
    clearInterval(this.readingsInterval);
  },
};
</script>


<style scoped>

</style>
