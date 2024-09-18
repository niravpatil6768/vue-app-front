import { defineStore } from 'pinia';
import { Item } from '../types/ItemTypes'

interface State {
    items: Item[]
}

export const useItemStore = defineStore('itemStore',{
    state: (): State => ({
        items: [],
    }),
    actions: {
        createItem(item: Item){
            this.items.push(item)
        }
    }
})