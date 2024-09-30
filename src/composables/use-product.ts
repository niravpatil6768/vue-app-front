import { createService } from '@/service'; 
import { pinia } from '@/main';
import { AxiosResponse } from 'axios';



export interface IProductRes {
    message : string;
    products : IProduct[];
} 

export interface IProduct {
    _id : string;
    name : string;
    price : string;
    description : string;
    seller : string;
}

export const useProduct = async () : Promise<IProductRes> => {
    const {productService} = createService(pinia);
      return new Promise((resolve, reject) => {
        productService()
        .then((res : AxiosResponse<IProductRes>) => {
            resolve(res.data)
        })
        .catch((error) => {
            reject(error.response);
        })
      })
}