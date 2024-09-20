<template>
    <v-app-bar app color="primary">
        <v-app-bar-nav-icon  @click="drawer = !drawer"></v-app-bar-nav-icon>

        <router-link to="/dashboard">
            <v-btn depressed class="hidden-sm-and-down button-text">Home</v-btn>
        </router-link>
<router-link to="/create">
    <v-btn depressed class="hidden-sm-and-down button-text">Add Product</v-btn>
</router-link>

<v-spacer></v-spacer>
<v-spacer></v-spacer>
<v-toolbar-title>My App</v-toolbar-title>
<v-spacer></v-spacer>


<v-spacer></v-spacer>
    <v-btn @click="logout" depressed class="hidden-sm-and-down button-text1">Logout</v-btn>
    <v-navigation-drawer v-model="drawer" app>
    <v-list>
      <v-list-item link to="/">
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/about">
        <v-list-item-title>About</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/contact">
        <v-list-item-title>Contact</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
    </v-app-bar>

</template>

<script setup lang="ts">
   import {ref} from 'vue';
   import {useRouter} from 'vue-router';

   const router = useRouter();
   const drawer = ref(false);

   const logout = () => {
         localStorage.clear();
         router.push('/')
   }
</script>

<style>
.button-text{
    color: aliceblue !important;
    text-transform: none !important;
    text-decoration: none !important;
    font-size: 0.9rem !important;
    font-weight: bold !important;
}
.button-text1{
    color: rgb(44, 136, 216) !important;
    margin-right: 30px !important;
    background-color: aliceblue !important;
    text-transform: none !important;
    text-decoration: none !important;
    font-size: 0.9rem !important;
    font-weight: bold !important;
}

</style>