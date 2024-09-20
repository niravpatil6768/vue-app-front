<template>
  <v-container class="container">
    <v-row justify="center">
      <v-col class="form" cols="12" md="6" lg="5">
        <div class="div1">
          <h1 class="text-center text-blue">Create Form</h1>
        </div>
        <v-form @submit.prevent="submitForm">
          <v-text-field
            label="Product Name"
            v-bind="nameAttrs"
            v-model="formData.name"
            type="text"
            required
            outlined
            :error-messages="errors.name"
          >
          </v-text-field>
          <v-text-field
            label="Product Price"
            v-bind="priceAttrs"
            v-model="formData.price"
            type="text"
            required
            outlined
            :error-messages="errors.price"
          ></v-text-field>
          <v-text-field
            v-model="formData.description"
            v-bind="descriptionAttrs"
            label="Product description"
            type="text"
            required
            outlined
            :error-messages="errors.description"
          ></v-text-field>
          <div class="btn-div">
            <v-btn type="submit" class="button">Add Product</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { addProductSchema } from "@/schemas/addProductSchema";
import { addProductService } from "@/service";
import { useUserId } from "@/stores/Store";
import { ProductForm } from "@/types/ItemTypes";
import { useForm } from "vee-validate";
import { ref } from "vue";

const storeId = useUserId();
const userId = storeId.userId;
const formData = ref<ProductForm>({
  name: "",
  price: "",
  description: "",
});

const {handleSubmit, errors, defineField} = useForm<ProductForm>({
  validationSchema: addProductSchema,
})

const [name, nameAttrs] = defineField('name');
const [price, priceAttrs] = defineField('price');
const [description, descriptionAttrs] = defineField('description');

const submitForm = handleSubmit( async (values: ProductForm) => {
  console.log("kdfg")
  try {
    const res = await addProductService(values, userId);
    console.log(res);
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
}
.btn-div {
  display: flex;
  justify-content: center;
}
.button {
  margin-top: 12px;
  background-color: #007bff !important;
  color: white !important;
  padding: 10px 20px !important;
  border-radius: 5px !important;
  border: none;
}
</style>
