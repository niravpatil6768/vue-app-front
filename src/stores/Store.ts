import { productService, userProductService } from '@/service';
import { ProductData, ProductState } from '@/types/ItemTypes';
import {defineStore} from 'pinia';
import { ref } from 'vue';

const token : string | null = localStorage.getItem('token');
const userType = ref(token ? JSON.parse(atob(token.split('.')[1])).type : null);
export const useUserId = defineStore('userId', {
    state: () => ({
        userId: localStorage.getItem('userId') ?? ''
    }),

    actions : {
        setUserId(value: string){
            this.userId = value;
            localStorage.setItem('userId', value);
        }
    }
    
})

export const useProductData = defineStore('product',{
    
    state: () => {
        const productForm = localStorage.getItem('product') ?? '';
        console.log('Initial productForm:', productForm); // Log the state on load
        return {
            productForm
        };
    },
    
    actions : {
        setProductForm(value: string){
            this.productForm = value;
            localStorage.setItem('product', value);
        }
    }
})

const userId = localStorage.getItem('userId');

// interface ProductState {
//     productData: ProductData[]; // Define the type for productData
// }

// export const useProductList = defineStore('productData', {
//     state: () : ProductState => ({
//         productData: JSON.parse(localStorage.getItem('productData') ?? '[]')   
//     }),
    
//     actions: {
//         async fetchProduct(){
//             try {
//                 if(userType.value === "SUPERADMIN" || userType.value === "BUYER"){
//                     const data = await productService();
//                     this.productData = data;
//                     console.log("state id: ", this.productData)
//                     localStorage.setItem('productData', JSON.stringify(data));
//                 } else if(userType.value === "SELLER" ){
//                     const data = await userProductService(userId);
//                     this.productData = data;
//                     console.log("state id1: ",this.productData)
//                     localStorage.setItem('productData', JSON.stringify(data));
//                   }
//             } catch(error){
//                 console.error('Error fetching product data:', error);
//             }
//         }
//     }
// })

export const useProductList =defineStore('productData', {
    state: () : ProductState =>({
        productData: []
    }),

    actions: {
        async loadProductData() {
            try {
                const cachedProductData = localStorage.getItem("productData");

                if(cachedProductData){
                    this.productData = JSON.parse(cachedProductData);
                }

                await this.fetchProduct();
            } catch (error) {
                console.error('Error loading product data:', error);
              }
        },

        async fetchProduct() {
            try {
                let data;

                if(userType.value === 'SUPERADMIN' || userType.value === 'BUYER'){
                    data = await productService();
                } else if (userType.value === 'SELLER') {
                    data = await userProductService(userId);
                  }

                  if(data){
                    this.productData = data;
                    localStorage.setItem('productData', JSON.stringify(data));
                  }
            } catch (error) {
                console.error('Error fetching product data:', error);
              }
        } 
    }
})