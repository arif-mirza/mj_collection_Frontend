import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productAPI } from "../../utils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Create state for form fields
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setFetching(true);
      const response = await productAPI.getById(id);
      const product = response.product;
      setTitle(product.title || "");
      setPrice(product.price || "");
      setDescription(product.description || "");
      setCategory(product.category || "");
      setImage(product.image || "");
    } catch (error) {
      toast.error(error.message || "Failed to fetch product");
      navigate("/products");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      title,
      price,
      description,
      category,
      image,
    };

    try {
      setLoading(true);
      await productAPI.update(id, updatedProduct);
      toast.success("Product updated successfully!");
      navigate("/products");
    } catch (error) {
      toast.error(error.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="text-center my-5">
              <h3>Loading...</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <ToastContainer />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="my-4 text-center">Update Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Product Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <input
                type="text"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <input
                type="text"
                className="form-control"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
          
            <button
              type="submit"
              className="btn btn-outline-dark w-100 my-3"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Product"}
            </button>

          
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
