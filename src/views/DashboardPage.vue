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
                  <v-card-actions class="card-action">
        <v-btn
          class="btn"
          @click="fetchProduct(product._id)"
        >
          Update Product
        </v-btn>
       <DeleteButton @delete="deleteProduct(product._id)"/>
      </v-card-actions>
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
import { ProductData } from "@/types/ItemTypes";
import { ref, onMounted } from "vue";
import DeleteButton from '@/components/DeleteButton.vue';
import NavBar from "./NavBar.vue";
import { createService } from '@/service';
import { pinia } from '@/main';
import { useProductData, useProductList} from "@/stores/Store";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const { deleteProductService, getSingleProductService, productService, userProductService } = createService(pinia);
const Products = ref<ProductData[]>([]);
  // const storeId = useUserId();
  // const userId = storeId.userId;
  const router = useRouter();
  const token : string | null = localStorage.getItem('token');
  const userType = ref(token ? JSON.parse(atob(token.split('.')[1])).type : null);
  const singleProduct = useProductData();
  const productStore = useProductList();
  const toast = useToast();


// const fetchProducts = async () => {
//   try {
    
//     if(userType.value === "SUPERADMIN" || userType.value === "BUYER"){
//       const data = await productService();
//       Products.value = data
//     } else if(userType.value === "SELLER" ){
//       const data = await userProductService(userId);
//       Products.value = data
//     }
//     console.log(Products.value);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//   }
// };

onMounted(async () => {
    await productStore.fetchProduct();
    if(productStore.productData){
      Products.value = productStore.productData;
    }
    // fetchProducts();
});

const fetchProduct = async (id: string) => {
  try  {
    const res = await getSingleProductService(id);
    console.log(res);
    singleProduct.setProductForm(res);
    router.push('/create') 
  }
  catch (error) {
    console.error("Error fetching single product:", error);
  }
}

const deleteProduct = async (id: string) => {
 try {
  const res = await deleteProductService(id);
  console.log(res);
  if(res.status === 200){
    toast.success("Product deleted successfully!", {
    timeout: 3000, // Duration
  });
  }
 } catch (error) {
    console.error("Error in delete product:", error);
  }
};
</script>

<style>
.card{
  background-color: antiquewhite !important;
  width: 270px;
  /* height: 350px; */
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
.btn{
  background-color: orange !important;
  color: white !important;
}
.btn1{
  background-color: red !important;
  color: white !important;
}
.card-action{
  display: flex;
  flex-direction: column;
}
</style>
