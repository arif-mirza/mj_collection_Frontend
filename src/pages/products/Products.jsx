import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";
import { productAPI, getUser } from "../../utils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Products() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const totalPages = Math.ceil(filter.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filter.slice(indexOfFirstProduct, indexOfLastProduct);

  const user = getUser();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilter(data);
  }, [data]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAll();
      const products = response.products || [];
      setData(response.products || []);
      setFilter(products);

      const uniqueCategories = [
        "all",
        ...new Set(products.map((item) => item.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      toast.error(error.message || "Failed to fetch products");
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await productAPI.delete(id);
        toast.success("Product deleted successfully");
        fetchProducts(); // Refresh the list
      } catch (error) {
        toast.error(error.message || "Failed to delete product");
      }
    }
  };

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const filterProduct = (category) => {
    setCurrentPage(1);
    if (category === "all") {
      setFilter(data);
    } else {
      setFilter(data.filter((item) => item.category === category));
    }
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          {categories.map((cat, index) => (
            <button
              key={index}
              className="btn btn-outline-dark me-2 mb-2 text-capitalize"
              onClick={() => filterProduct(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        {filter.length === 0 ? (
          <div className="col-12 text-center">
            <h3>No products found</h3>
          </div>
        ) : (
          currentProducts.map((product) => (
            <div className="col-md-3 mb-4" key={product._id}>
              <div className="card h-100 text-center p-4">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                  height="250px"
                />
                <div className="card-body">
                  <h5 className="card-title mb-0">
                    {product.title.substring(0, 12)}...
                  </h5>
                  <p className="card-text lead fw-bold">${product.price}</p>
                  <NavLink
                    to={`/products/${product._id}`}
                    className="btn btn-outline-dark"
                  >
                    Buy Now
                  </NavLink>
                  {isAdmin && (
                    <div className="mt-2">
                      <NavLink
                        to={`/updateproduct/${product._id}`}
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        Update
                      </NavLink>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </>
    );
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="row py-5">
          <div className="col-12 mb-3 d-flex justify-content-between">
            <h1
              className="display-6 fw-bolder text-center"
              data-aos="fade-right"
            >
              Latest Products
            </h1>
            {isAdmin && (
              <NavLink
                to="/addproduct"
                className="btn btn-outline-dark d-flex justify-content-center align-items-center"
              >
                Add Product
              </NavLink>
            )}
          </div>
          <hr />
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <nav>
                <ul className="pagination">
                  {/* Previous */}
                  <li
                    className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Prev
                    </button>
                  </li>

                  {/* Page Numbers */}
                  {[...Array(totalPages)].map((_, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}

                  {/* Next */}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Products;
