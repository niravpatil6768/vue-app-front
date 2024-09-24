<template>
<div>
<v-btn class="btn1" @click="handleDelete">Delete Product</v-btn>
</div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

const emit = defineEmits(
  ['delete']
);

const handleDelete = () => {
  console.log("delete");
  emit('delete'); // Emit the delete event
};

</script>

<style>
.btn1{
  background-color: red !important;
  color: white !important;
}
</style>