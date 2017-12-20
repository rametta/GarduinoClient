<template>
  <v-app id="inspire">

    <v-toolbar color="green" dark fixed app>
      <v-toolbar-title>Garduino - {{$route.name}}</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
          align-center
        >
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer color="green" app>
      <span class="white--text" v-once>Jason Rametta &copy; {{year}}</span>
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
