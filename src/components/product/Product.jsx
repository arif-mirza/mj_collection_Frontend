import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { productAPI } from "../../utils/api";
import { addToCart, getToken } from "../../utils/api";
// import { addToCart } from "../../utils/api";
import { useNavigate } from "react-router-dom";


function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

//   const user = getUser();
// const isAdmin = user?.role === "admin";


  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getById(id);
        setProduct(response.product || {});
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6">
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            height="400px"
            width="400px"
          />
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black-500">{product.category}</h4>

          <h1 className="display-5">{product.title}</h1>

          <p className="lead fw-bolder">
            <i className="fa fa-star"></i>
          </p>

          <h3 className="display-6 fw-bold my-4">$ {product.price}</h3>
          <p className="lead">{product.description}</p>

  
          <NavLink to="/order-place" state={product}>
            <button className="btn btn-dark ms-2 px-4">Buy Now</button>
          </NavLink>

         <button
  className="btn btn-outline-dark ms-2 px-4"
  onClick={() => {
    if (!getToken()) {
      alert("Please login first");
      navigate("/login");
      return;
    }
    addToCart(product);
    alert("Added to cart");
    navigate("/cart");
  }}
>
  Add to Cart
</button>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="container py-5">
        <div className="row py-5">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </>
  );
}

export default Product;