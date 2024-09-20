<template>
  <v-app>
    <v-container>
      <NavBar/>
      <v-container class="containPro">
          <h2>
            Dashboard
          </h2>
      </v-container>
      <v-container>
        <v-row wrap class="contain" justify="space-evenly">
          <v-col
            v-for="product in Products"
            :key="product._id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-row justify="center">
              <v-responsive :aspect-ratio="16/9">
                
                <v-card class="card" outlined>
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
      
                  <v-card-subtitle>
                      {{ product.price }}
                  </v-card-subtitle>
                </v-card>
              </v-responsive>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { productService, userProductService } from "@/service";
import { ProductData } from "@/types/ItemTypes";
import { ref, onMounted } from "vue";
import NavBar from "./NavBar.vue";
import { useUserId } from "@/stores/Store";

const Products = ref<ProductData[]>([]);
  const storeId = useUserId();
  const userId = storeId.userId;
  const token : string | null = localStorage.getItem('token');
  const userType = ref(token ? JSON.parse(atob(token.split('.')[1])).type : null);

const fetchProducts = async () => {
  try {
    
    if(userType.value === "SUPERADMIN"){
      const data = await productService();
      Products.value = data
    } else if(userType.value === "SELLER" ){
      const data = await userProductService(userId);
      Products.value = data
    }
    console.log(Products.value);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

onMounted(fetchProducts);
</script>

<style>
.card{
  background-color: antiquewhite !important;
  width: 250px;
  height: 350px;
  margin: 20px;

}
.contain{
  display: flex;
  justify-content: center;
  align-items: center;
}
.containPro{
  margin-top: 50px;
}
</style>
