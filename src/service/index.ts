import axios from 'axios';
import { LoginForm } from '@/types/ItemTypes';

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