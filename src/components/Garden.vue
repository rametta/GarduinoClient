<template>

  <v-container grid-list-md>

    <v-layout v-if="garden" row>

      <v-flex xs12>
        <h1 class="d-inline">{{garden.name}}</h1>
        <span class="mx-3 d-inline">{{garden.description}}</span>
        <small v-if="readings[0]">Last update: {{formatDate(readings[0].date)}}</small>
      </v-flex>

    </v-layout>

    <v-layout v-if="!garden && !firstLoad">
      <v-flex xs12>
        There is no garden here, <router-link to="/">go back home</router-link>
      </v-flex>
    </v-layout>

    <v-progress-linear v-if="firstLoad" indeterminate color="primary"></v-progress-linear>

    <v-layout v-if="garden && readings.length === 0 && !firstLoad">
      <v-flex xs12>
        <v-alert color="info" icon="priority_high" value="true">
          There is no data for this garden yet
        </v-alert>
      </v-flex>
    </v-layout>



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

    <v-dialog v-if="garden" v-model="confirmDelete" max-width="290">
      <v-card>
        <v-card-title class="headline">Delete Garden?</v-card-title>
        <v-card-text>Are you sure you would like to permanently delete garden <strong>{{garden.name}}</strong>?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="darken-1" flat="flat" @click.native="confirmDelete = false">Cancel</v-btn>
          <v-btn color="red darken-1" flat="flat" @click.native="confirmDelete = false; deleteGarden()">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-tooltip top>
      <v-btn
        slot="activator"
        fixed
        dark
        fab
        bottom
        right
        color="primary"
        @click="bottomSheetVisible = true"
      >
        <v-icon>local_florist</v-icon>
      </v-btn>
      <span>Garden Actions</span>
    </v-tooltip>

    <div class="text-xs-center">
      <v-bottom-sheet v-model="bottomSheetVisible">
        <v-list>
          <v-subheader>Garden actions</v-subheader>
          <v-list-tile @click="bottomSheetVisible = false" :disabled="true">
            <v-list-tile-title>Water Garden 3 Sec.</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="bottomSheetVisible = false" :disabled="true">
            <v-list-tile-title>Modify Garden</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="bottomSheetVisible = false; confirmDelete = true">
            <v-list-tile-title>Delete Garden</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-bottom-sheet>
    </div>

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
      bottomSheetVisible: false,
      confirmDelete: false,

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
    deleteGarden() {
      gardenService.deleteGarden({ gardenId: this.garden.id })
        .then(() => {
          this.$router.replace({ name: 'home' });
        })
        .catch(() => {
          this.error = true;
        });
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
