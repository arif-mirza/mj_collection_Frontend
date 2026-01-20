  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import formSchema from "../../validation/formSchema";
  import { toast, ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { productAPI } from "../../utils/api";

  function AddProduct() {
    // states
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setcategory] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
      const file = e.target.files[0]; // Get the selected file
      if (file) {
        const reader = new FileReader(); // Create a FileReader object
        reader.onloadend = () => {
          setImage(reader.result); // Set the image state with the Data URL
        };
        reader.readAsDataURL(file); // Convert the file to a Data URL
      }
    };

    const handleAddProduct = async (e) => {
      e.preventDefault();

      let newProduct = {
        image,
        title: name,
        price,
        description,
        category,
      };

      // validation
      try {
        await formSchema.validate(newProduct, { abortEarly: false });
        setLoading(true);
        await productAPI.create(newProduct);
        toast.success("Product added successfully!");
        navigate("/products");
      } catch (err) {
        if (err.inner) {
          // Show validation errors using Toastify
          err.inner.forEach((error) => {
            toast.error(error.message);
          });
        } else {
          toast.error(err.message || "Failed to add product");
        }
      } finally {
        setLoading(false);
      }
    };

    return (
      <>
        {/* add product form  */}
        <ToastContainer />
        <div className="container">
          <div className="row">
            <div className="col-12 text-center my-4">
              <h2 className="display-3 fw-bold text-dark">Add Product</h2>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-12 w-50 ">
              <form onSubmit={handleAddProduct}>
                <div className="form-group">
                  <label for="productName" className="my-2">
                    Product Image
                  </label>
                  <input
                    onChange={handleImageChange}
                    type="file"
                    className="form-control"
                    id="productName"
                    placeholder="Enter product name"
                  />
                </div>
                <div className="form-group">
                  <label for="productName" className="my-2">
                    Product Name
                  </label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="form-control"
                    id="productName"
                    placeholder="Enter product name"
                  />
                </div>
                <div className="form-group">
                  <label for="productPrice" className="my-2">
                    Product Price
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setPrice(e.target.value)}
                    className="form-control"
                    id="productPrice"
                    placeholder="Enter product price"
                  />
                </div>
                <div className="form-group">
                  <label for="Description" className="my-2">
                    Description
                  </label>
                  <input
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    className="form-control"
                    id="Description"
                    placeholder="Description"
                  />
                </div>
                <div className="form-group">
                  <label for="category" className="my-2">
                    category
                  </label>
                  <input
                    onChange={(e) => setcategory(e.target.value)}
                    type="text"
                    className="form-control"
                    id="category"
                    placeholder="category"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-outline-dark w-100 my-4"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Product"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

  export default AddProduct;
