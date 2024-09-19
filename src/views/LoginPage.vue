<template>
<v-container>
    <v-form v-model="valid" ref="formRef">
        <v-text-field
        v-model="formData.email"
        label="Email"
        :rules="[rules.required, rules.email]"
        type="email"
        required
        clearable/>

        <v-text-field
        v-model="formData.password"
        label="Password"
        :rules="[rules.required, rules.minLength]"
        type="password"
        required
        clearable
      />
      <v-btn @click="loginUser" :disabled="!valid" color="primary">Submit</v-btn>
    </v-form>
</v-container>
</template>


<script setup lang="ts">
import { LoginService } from '@/service';
import { LoginForm } from '@/types/ItemTypes';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

      const formData = ref<LoginForm>({
          email: '',
          password: ''
      });
      const errorMessage = ref<string>('');
        const valid = ref(false);
    const formRef = ref(null);

    const rules = {
      required: (value: string) => !!value || 'Required.',
      email: (value: string) => /.+@.+\..+/.test(value) || 'Invalid e-mail.',
      minLength: (value: string) =>
        value.length >= 6 || 'Password must be at least 6 characters.',
    };
      
      const loginUser = async () => {
        try {
            errorMessage.value = '';
            const data = await LoginService(formData.value);
            if(data.token){
            router.push("/dashboard");
            localStorage.setItem('token', data.token);
        }
           console.log(data);
        } catch(error){
            errorMessage.value = 'Login failed. Please check your email and password.';
        }
      }
</script>

<style scoped>
.v-container {
  max-width: 500px;
  margin: 0 auto;
}
</style>