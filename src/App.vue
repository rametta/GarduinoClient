<template>
  <div id="app">
    <router-link to="/login">Login</router-link>
    <router-link to="/signup">Signup</router-link>
    <router-link to="/">Home</router-link>
    <router-link to="/garden/1">Garden 1</router-link>
    {{$route.name}}
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>

</style>
