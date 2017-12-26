<template>

  <v-container grid-list-md>

    <v-layout>
      <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
    </v-layout>

    <v-layout>
      <v-flex xs12>
        <h1>Gardens</h1>
      </v-flex>
    </v-layout>

    <v-alert color="error" icon="warning" :value="error">
      There has been an error
    </v-alert>

    <v-layout v-if="gardens.length > 0" row wrap>

      <v-flex md6 v-for="garden in gardens" :key="garden.id">
        <v-card :to="{ name: 'garden', params: { garden: garden.id }}">
          <v-card-media :src="garden.imageLink || '/static/placeholder.jpg'" height="200px"></v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{garden.name}}</h3>
              <div>{{garden.description}}</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>

    </v-layout>

    <v-layout row wrap v-if="!loading && gardens.length === 0">
      <v-flex xs12>
        There are no gardens here yet 😞
      </v-flex>
    </v-layout>

    <v-snackbar
      :timeout="timeout"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      v-model="snackbar"
    >
      {{ text }}
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>

    <v-tooltip top>
      <v-btn
        slot="activator"
        fixed
        dark
        fab
        bottom
        right
        color="primary"
        @click="dialog = true"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <span>New Garden</span>
    </v-tooltip>

    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
      <v-card>

        <v-toolbar dark color="primary">
          <v-btn icon @click.native="dialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>New Garden</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialog = false; onSaveClick()" :disabled="!valid">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-container>
          <v-layout xs12 row>
            <v-flex>
              <v-form v-model="valid">
                <v-text-field
                  label="Name"
                  v-model="name"
                  :rules="nameRules"
                  required
                ></v-text-field>
                <v-text-field
                  label="Description"
                  v-model="description"
                ></v-text-field>
                <v-text-field
                  label="Image Link"
                  v-model="imageLink"
                ></v-text-field>
              </v-form>
            </v-flex>
          </v-layout>
        </v-container>

      </v-card>
    </v-dialog>

  </v-container>

</template>

<script>
import gardenService from './../services/garden.service';

export default {
  data() {
    return {
      gardens: [],
      error: false,
      loading: false,
      dialog: false,

      // New garden form
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length > 3 || 'Name must be greater than 3 characters',
      ],
      description: '',
      imageLink: '',

      // Snackbar
      snackbar: false,
      color: '',
      mode: '',
      timeout: 3000,
      text: '',
    };
  },
  created() {
    this.loading = true;

    gardenService
      .queryGardens()
      .then(({ data }) => {
        this.gardens = data.results;
      })
      .catch(() => {
        this.error = true;
      })
      .then(() => {
        this.loading = false;
      });
  },
  methods: {
    onSaveClick() {
      if (this.valid) {
        gardenService.postGarden({
          name: this.name,
          description: this.description,
          imageLink: this.imageLink,
        })
        .then(({ data }) => {
          this.gardens.push(data);

          this.color = 'success';
          this.text = 'Garden added successfully!';
          this.snackbar = true;
        })
        .catch(() => {
          this.error = true;

          this.color = 'error';
          this.text = 'Garden add failed!';
          this.snackbar = true;
        });
      }
    },
  },
};
</script>

<style scoped>

</style>
