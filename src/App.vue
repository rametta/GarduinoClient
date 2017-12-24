<template>
  <v-app id="inspire">

    <v-toolbar dark fixed app>
      <v-toolbar-title>
        <v-btn :to="'/'" flat icon>
          <v-icon>home</v-icon>
        </v-btn>
        Garduino
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>

    <v-footer dark app>
      <div class="white--text text-xs-center" style="width: 100%" v-once>&copy; Rametta {{year}}</div>
    </v-footer>

  </v-app>
</template>

<script>
export default {
  data: () => ({}),

  computed: {
    year() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style>

</style>
