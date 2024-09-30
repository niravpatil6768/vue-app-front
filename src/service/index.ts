import axios from 'axios';
import { LoginForm, ProductForm, SignupForm } from '@/types/ItemTypes';
import { useAuthStore } from '@/stores/Store';
import { Pinia } from 'pinia';
import { ref } from 'vue';


const BASE_API = 'http://localhost:3000'

export const createService = (pinia: Pinia) => {
    
    const AuthStore = useAuthStore(pinia);
    const token = AuthStore.token;
    const userType = ref(AuthStore.userType);
    const userId = ref(AuthStore.userId);
    
     const LoginService = async (formData : LoginForm) => {
        try {
            const res = await axios.post(`${BASE_API}/user/signin`, formData)
            return res.data;
        } catch(error){
            throw new Error('Login failed. Please check your credentials.');
        }
    
    }
    
const signupService = async (FormData : SignupForm) => {
        try{
            const res = await axios.post(`${BASE_API}/user/signup`, FormData)
            return res.data;
        }
        catch(error){
            throw new Error('Signup is failed. Please try again to register.');
        }
    }
    
     const productService = async () => {
        try {
            if(userType.value === 'SUPERADMIN' || userType.value === 'BUYER'){
                console.log("all");
           const res = await axios.get(`${BASE_API}/product/getProducts`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
           });
           return res;
        }
        else {
            console.log("seller");
            const res = await axios.get(`${BASE_API}/product/getProducts/${userId.value}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
               });
               return res.data.products;
        }
        }catch(error){
            throw new Error('Error in fetching products');
        }
    }
    
     const userProductService = async (userId: unknown) => {
        try {
           const res = await axios.get(`${BASE_API}/product/getProducts/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
           });
           return res.data.products;
        }catch(error){
            throw new Error('Error in fetching products');
        }
    }
    
     const addProductService = async (formData : ProductForm, userId : unknown) => {
        try{
          const res = await axios.post(`${BASE_API}/product/createProduct/${userId}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
           })
          return res;
        }
        catch(error){
            throw new Error('Error in add product');
        }
    }
    
     const getSingleProductService = async (Id: string) => {
        try {
            const res = await axios.get(`${BASE_API}/product/getProduct/${Id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return res.data.product;
        }
        catch(error){
            throw new Error('Error in get single product');
        }
    }
    
     const updateProductService = async (formData : ProductForm, Id : string) => {
        try {
            const res = await axios.put(`${BASE_API}/product/editProduct/${Id}`, formData,{
                headers: {
                    Authorization: `Bearer ${token}`
    
                }
            })
            return res;
        }
        catch(error){
            throw new Error('Error in update product');
        }
    }
    
     const deleteProductService = async (id: string) => {
        try {
            const res = await axios.delete(`${BASE_API}/product/deleteProduct/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
    
                }
            })
            return res;
        }
        catch(error){
            throw new Error('Error in Delete product');
        }
    }

    return { LoginService, signupService, productService, userProductService, deleteProductService, updateProductService, addProductService, getSingleProductService}
}