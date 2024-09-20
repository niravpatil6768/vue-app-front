<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style>
/* Add some basic styling for navigation links */
nav {
  padding: 1rem;
}

nav a {
  margin-right: 1rem;
  text-decoration: none;
  color: blue;
}

nav a.router-link-active {
  font-weight: bold;
}
</style>
