<template>

  <v-container grid-list-md>

    <v-layout row wrap>

      <v-flex md6 v-for="garden in gardens" :key="garden.id">
        <v-card :to="{ name: 'garden', params: { garden: garden.id }}">
          <v-card-media :src="garden.imageLink" height="200px"></v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{garden.name}}</h3>
              <div>{{garden.description}}</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>

    </v-layout>

  </v-container>

</template>

<script>
import gardenService from './../services/garden.service';

export default {
  data() {
    return {
      gardens: [],
      error: false,
    };
  },
  created() {
    gardenService
      .queryGardens()
      .then(({ data }) => {
        this.gardens = data.results;
      })
      .catch(() => {
        this.error = true;
      });
  },
};
</script>

<style scoped>

</style>
