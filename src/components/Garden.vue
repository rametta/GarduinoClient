<template>

  <v-container grid-list-md>

    <v-layout v-if="garden" row>

      <v-flex xs12>
        <h1 class="d-inline">{{garden.name}}</h1>
        <span class="mx-3 d-inline">{{garden.description}}</span>
        <small v-if="readings[0]">Last update: {{formatDate(readings[0].date)}}</small>
      </v-flex>

    </v-layout>

    <v-progress-linear v-if="firstLoad" indeterminate color="primary"></v-progress-linear>

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
            Light {{readings[0].light}}
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
            Soil Moisture {{readings[0].moisture}}
          </v-card-text>
        </v-card>
      </v-flex>
      
    </v-layout>

    <v-layout v-if="readings[0]" row wrap>
      <v-flex md6>
        <area-chart :chart-data="temperatureData" :options="temperatureOptions" :type="'line'" />
      </v-flex>
      <v-flex md6>
        <area-chart :chart-data="lightData" :options="lightOptions" :type="'line'" />
      </v-flex>
      <v-flex md6>
        <area-chart :chart-data="humidityData" :options="humidityOptions" :type="'line'" />
      </v-flex>
      <v-flex md6>
        <area-chart :chart-data="moistureData" :options="moistureOptions" :type="'line'" />
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import * as moment from 'moment';
import gardenService from './../services/garden.service';
import readingService from './../services/reading.service';
import AreaChart from './AreaChart';

export default {
  components: { AreaChart },
  data() {
    return {
      garden: null,
      readings: [],
      error: false,
      readingsInterval: null,
      firstLoad: false,

      temperatureData: {
        labels: [],
        datasets: [{
          label: 'Temperature',
          backgroundColor: '#f44141',
          data: [],
        }],
      },

      temperatureOptions: {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          display: true,
        },
      },

      lightData: {
        labels: [],
        datasets: [{
          label: 'Light Level',
          backgroundColor: '#f4b241',
          data: [],
        }],
      },

      lightOptions: {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          display: true,
        },
      },

      humidityData: {
        labels: [],
        datasets: [{
          label: 'Humidity',
          backgroundColor: '#1976D2',
          data: [],
        }],
      },

      humidityOptions: {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          display: true,
        },
      },

      moistureData: {
        labels: [],
        datasets: [{
          label: 'Moisture',
          backgroundColor: '#1976D2',
          data: [],
        }],
      },

      moistureOptions: {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          display: true,
        },
      },

    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format('MMM Do, YYYY h:mmA');
    },
  },
  created() {
    this.firstLoad = true;

    // Get garden
    gardenService.queryGardens({ id: this.$route.params.garden })
      .then(({ data }) => {
        this.garden = data.results[0];
      })
      .catch(() => {
        this.error = true;
      })
      .then(() => {
        this.firstLoad = false;
      });

    // Get readings every 3 seconds for past 2 minutes
    this.readingsInterval = setInterval(() => {
      readingService.queryReadings({
        gardenId: this.$route.params.garden,
        orderByDesc: 'id',
        take: 60,
      })
      .then(({ data }) => {
        this.readings = data.results;

        // Temperature
        this.temperatureData.labels = this.readings.map(r => moment(r.date).format('h:mm')).reverse();
        this.temperatureData.datasets[0].data = this.readings.map(r => r.temperature).reverse();

        // Light
        this.lightData.labels = this.temperatureData.labels;
        this.lightData.datasets[0].data = this.readings.map(r => r.light).reverse();

        // Humidity
        this.humidityData.labels = this.temperatureData.labels;
        this.humidityData.datasets[0].data = this.readings.map(r => r.humidity).reverse();

        // Moisture
        this.moistureData.labels = this.temperatureData.labels;
        this.moistureData.datasets[0].data = this.readings.map(r => r.moisture).reverse();
      })
      .catch(() => {
        this.error = true;
      })
      .then(() => {
        this.firstLoad = false;
      });
    }, 3000);
  },
  destroyed() {
    clearInterval(this.readingsInterval);
  },
};
</script>

<style scoped>
.d-inline {
  display: inline;
}
</style>
