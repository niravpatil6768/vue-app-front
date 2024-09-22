<template>
    <v-container class="v-container">
      <v-col class="section1">
        <v-form @submit="onSubmit" class="form">
          <div class="div">
            <h1>Signup User</h1>
          </div>
          <div class="div">
            <h5 class="text">{{ errorMessage }}</h5>
          </div>
          <v-select
  label="Select User Type"
  :items="['SELLER', 'BUYER']"
></v-select>
            <v-text-field
            v-model="email"
            v-bind="emailAttrs"
            class="text-field"
            label="Email"
            type="email"
            autocomplete="off"
            required
            clearable
            :error-messages="errors.email"
            />
    
            <v-text-field
            v-model="password"
            label="Password"
            type="password"
            v-bind="passwordAttrs"
            autocomplete="new-password"
            required
            clearable
            :error-messages="errors.password"
          />
          <div class="div1">
            <v-btn class="btn" type="submit">Sign up</v-btn>
          </div>
    
          <div class="mt-4 text-center">
            Already have an account? <router-link to="/">Sign in</router-link>
          </div>
        </v-form>
      </v-col>
    </v-container>
    </template>
    
    
    <script setup lang="ts">
    import { LoginService } from '@/service';
    import { LoginForm } from '@/types/ItemTypes';
    import * as yup from "yup";
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useForm } from 'vee-validate';
    import { useUserId } from '@/stores/Store';
    
    const router = useRouter();
    const userIdStore = useUserId(); 
    
    
        const errorMessage = ref<string>('');
        const { errors, handleSubmit, defineField } = useForm({
      validationSchema: yup.object({
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
      }),
    });
    
    const onSubmit = handleSubmit( async (values) => {
      try {
        errorMessage.value = '';
        const data = await LoginService(values as LoginForm);
        if (data.token) {
          router.push("/dashboard");
          localStorage.setItem('token', data.token);
          const token = data.token;
                const userId = JSON.parse(atob(token.split('.')[1]))._id
                userIdStore.setUserId(userId)
                console.log(JSON.parse(atob(token.split('.')[1])).type)
            }
               console.log(data);
            } catch(error){
                errorMessage.value = 'Login failed. Please check your email and password.';
            }
    })
    
    const [email, emailAttrs] = defineField('email');
    const [password, passwordAttrs] = defineField('password');
    
    </script>
    
    <style scoped>
    .v-container {
      max-width: 500px;
      margin: 0 auto;
    }
    .container{
      display: flex;
      min-width: 900px;
      margin: 0 auto;
    }
    .section1{
      display: flex;
      justify-content: center;
    }
    .form{
      min-width: 550px;
      padding: 30px 20px;
    }
    .text{
      color: brown;
    }
    .text-field{
      margin-bottom: 5px;
    }
    .div{
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
    .div1{
      display: flex;
      justify-content: center;
    }
    .btn{
      background-color: orange;
      font-size: large;
      margin: 5px 0;
      display: flex;
      justify-self: center;
    }
    </style>