<template>
  <div>
    {{$route.name}}
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
        this.gardens = data.Response;
      })
      .catch(() => {
        this.error = true;
      });
  },
};
</script>

<style scoped>

</style>
