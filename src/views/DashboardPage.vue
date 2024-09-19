<template>
  <v-container>
    <v-container>
      <v-row align="center" justify="center">Dashboard</v-row>
    </v-container>
    <v-container>
      <v-col
        v-for="product in Products"
        :key="product._id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-row>
          <v-card class="mx-auto" min-width="250" outlined>
            <v-img
              class="test--white align-end"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
              <v-card-title><span class="text-white">{{ product.name }}</span></v-card-title>
            </v-img>

            <v-card-text class="text-primary">
              <div>{{ product.description }}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange">
                {{ product.price }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-col>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { productService } from "@/service";
import { ProductData } from "@/types/ItemTypes";
import { ref, onMounted } from "vue";

const Products = ref<ProductData[]>([]);

const fetchProducts = async () => {
  try {
    const data = await productService();
    Products.value = data;
    console.log(Products.value);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

onMounted(fetchProducts);
</script>
