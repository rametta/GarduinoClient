<template>
  <div>
    {{$route.name}}
    Gardens
    <ul>
      <li v-for="garden in gardens" :key="garden.id">{{garden.name}}</li>
    </ul>
  </div>
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
