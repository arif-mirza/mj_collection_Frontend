import * as yup from "yup";

// form schema

const formSchema = yup.object().shape({
  title: yup.string().required("Product Name is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
});

export default formSchema;
