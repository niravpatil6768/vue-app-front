
<template>
    <div>
       <h2>Create User</h2>
       <div>
         <h5>{{items}}</h5>
       </div>
       <form @submit.prevent="createUser">
         <input v-model="name" placeholder="Name"/>
         <input v-model="description" placeholder="description"/>
         <button type="submit">Add</button>
       </form>
    </div>    
    </template>

    <script setup lang="ts">
    import { useItemStore } from "@/store/itemStore";
import {computed, ref} from "vue"
    const name = ref('');
    const description = ref('');
    const itemStore = useItemStore();
    const items = computed(() => itemStore.items)

    const createUser = () => {
      console.log(name.value);
      itemStore.createItem({id: Date.now(), name: name.value, description: description.value})
    }
   </script>