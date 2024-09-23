import * as yup from 'yup';

export const signupSchema = yup.object({
    type: yup.string().required("User Type is required"),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(12).required(),
  })