<template>
  <v-container class="container">
    <v-row justify="center">
      <v-col class="form" cols="12" md="6" lg="4" sm="7" xs="10">
        <div class="div1">
          <h1 class="text-center">
            {{
              Product && Object.keys(Product).length
                ? "Update Form"
                : "Create Form"
            }}
          </h1>
        </div>
        <v-form @submit.prevent="submitForm">
          <v-text-field
            label="Product Name"
            v-bind="nameAttrs"
            v-model="name"
            type="text"
            required
            outlined
            :error-messages="errors.name"
          >
          </v-text-field>
          <v-text-field
            label="Product Price"
            v-bind="priceAttrs"
            v-model="price"
            type="text"
            required
            outlined
            :error-messages="errors.price"
          ></v-text-field>
          <v-text-field
            v-model="description"
            v-bind="descriptionAttrs"
            label="Product description"
            type="text"
            required
            outlined
            :error-messages="errors.description"
          ></v-text-field>
          <div class="btn-div">
            <v-btn type="submit" class="button">
              {{
              Product && Object.keys(Product).length
                ? "Update Product"
                : "Create Product"
            }}
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { addProductSchema } from "@/schemas/addProductSchema";
import { addProductService, updateProductService } from "@/service";
import { useRouter } from "vue-router";
import { useUserId, useProductData } from "@/stores/Store";
import { ProductData, ProductForm } from "@/types/ItemTypes";
import { useForm } from "vee-validate";
import { computed, onMounted, ref, watch } from "vue";

const storeId = useUserId();
const singleProduct = useProductData();
const userId = storeId.userId;
const Product: ProductData =
  typeof singleProduct.productForm === "object"
    ? singleProduct.productForm
    : ({} as ProductData);
const router = useRouter();

const { handleSubmit, errors, defineField } = useForm<ProductForm>({
  validationSchema: addProductSchema,
});

const [name, nameAttrs] = defineField("name");
const [price, priceAttrs] = defineField("price");
const [description, descriptionAttrs] = defineField("description");

const formData = ref<ProductForm>({
  name: "",
  price: "",
  description: "",
});

const updateFormData = () => {
  // Ensure formData has valid values before updating fields
  if (formData.value.name && formData.value.price && formData.value.description) {
    name.value = formData.value.name;
    price.value = formData.value.price;
    description.value = formData.value.description;
  }
};

// Watch for changes in formData and update fields
watch(formData, (newValue) => {
  // Call updateFormData only if formData is not empty
  if (newValue.name || newValue.price || newValue.description) {
    updateFormData();
  }
});

// Set initial values
// onMounted(() => {
//   updateFormData();
// });

onMounted(async () => {
  if (Product && typeof Product === "object" && !Array.isArray(Product)) {
    formData.value = { ...Product };
    console.log("pro", Product);
  }
});

const submitForm = handleSubmit(async (values: ProductForm) => {
  try {
    if( Product && Object.keys(Product).length){
      console.log(values)
      const res = await updateProductService(values, Product._id);
      console.log(res);
      if (res.status === 200) {
        router.push("/dashboard");
      }
    }
    else{
      const res = await addProductService(values, userId);
      console.log(res);
      if (res.status === 201) {
        router.push("/dashboard");
      }
    }
  } catch (error) {
    console.log("error in add product: ", error);
  }
});
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.div1 {
  padding: 10px;
}
.form {
  background-color: aliceblue;
  justify-content: center;
}
.btn-div {
  display: flex;
  justify-content: center;
}
.button {
  background-color: orange !important;
  font-size: large;
  margin: 5px 0;
  display: flex;
  justify-self: center;
}
</style>
