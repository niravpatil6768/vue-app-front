import {defineStore} from 'pinia';

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