import {defineStore} from 'pinia';
import {ref, computed} from 'vue';

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

