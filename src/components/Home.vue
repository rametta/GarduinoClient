<template>
  <div>
    {{pageName}}
    {{gardens | json}}
  </div>
</template>

<script>
import gardenService from './../services/garden.service';

export default {
  name: 'Home',
  data() {
    return {
      pageName: 'Home page',
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
