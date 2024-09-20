import * as yup from 'yup';

export const addProductSchema = yup.object({
    name: yup.string().required("Product Name is required"),
    price: yup.string().required("Product Price is required"),
    description: yup.string().required('Product description is required'),
})