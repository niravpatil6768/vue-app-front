import axios from 'axios';
import { LoginForm, ProductForm, SignupForm } from '@/types/ItemTypes';

const BASE_API = "http://localhost:3000"

const token = localStorage.getItem('token');

export const LoginService = async (formData : LoginForm) => {
    try {
        const res = await axios.post(`${BASE_API}/user/signin`, formData)
        return res.data;
    } catch(error){
        throw new Error('Login failed. Please check your credentials.');
    }

}

export const signupService = async (FormData : SignupForm) => {
    try{
        const res = await axios.post(`${BASE_API}/user/signup`, FormData)
        return res.data;
    }
    catch(error){
        throw new Error('Signup is failed. Please try again to register.');
    }
}

export const productService = async () => {
    try {
       const res = await axios.get(`${BASE_API}/product/getProducts`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
       });
       return res.data.products;
    }catch(error){
        throw new Error('Error in fetching products');
    }
}

export const userProductService = async (userId: unknown) => {
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

export const addProductService = async (formData : ProductForm, userId : unknown) => {
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

export const getSingleProductService = async (Id: string) => {
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

export const updateProductService = async (formData : ProductForm, Id : string) => {
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

export const deleteProductService = async (id: string) => {
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