import "../navbar/navbar.css";
import { NavLink } from "react-router-dom";
import Login from "../../Auth/login/Login";
import Register from "../../Auth/Register/Register";
import logo from "../../assets/images/mj-collection(2).JPEG";
import { getToken, removeToken, getCartCount, getUser } from "../../utils/api";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const token = getToken();
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    window.location.reload();
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg py-2">
        <div className="container">
          <NavLink
            className="navbar-brand fw-bold fs-3 d-flex align-items-center"
            to="/"
          >
            <img
              src={logo}
              alt=""
              height="50"
              width="50"
              style={{ borderRadius: "50%" }}
            />
            MJ Collection
          </NavLink>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>

            <div className="buttons">
              {!user ? (
                <button
                  className="btn btn-outline-dark ms-2"
                  // active models
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                >
                  Login
                </button>
              ) : (
                <>
                  <span className="me-2 fw-bold">
                    {user.name} ({user.role})
                  </span>
                  <button
                    className="btn btn-outline-danger ms-2"
                    onClick={() => {
                      removeToken();
                      localStorage.removeItem("user");
                      window.location.reload();
                    }}
                  >
                    Logout
                  </button>
                </>
              )}

              <NavLink to="/cart" className="btn btn-outline-dark ms-2">
                Cart ({getCartCount()})
              </NavLink>
              {user && user.role === "user" && (
                <NavLink to="/my-orders" className="btn btn-outline-dark ms-2">
                  My Orders
                </NavLink>
              )}

               {user && user.role === "admin" && (
                <NavLink to="/admin-dashboard" className="btn btn-outline-dark ms-2">
                  Dashboard
                </NavLink>
              )}




            </div>
          </div>
        </div>
      </nav>

      <Login />
      <Register />
    </>
  );
}

export default Navbar;
