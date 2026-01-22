import { useState } from "react";
import "../login/loginStyle.css";
import Register from "../Register/Register";
import { saveUser } from "../../utils/api";
import { authAPI, saveToken } from "../../utils/api";
import { toast } from "react-toastify";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // add bootstrap instance
  const bootstrap = window.bootstrap;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await authAPI.login({ email, password });

      saveToken(response.token);
      saveUser(response.user);

      localStorage.setItem("user", JSON.stringify(response.user));
      toast.success("Login successful");
      window.location.reload();

      // Close modal
      const loginModal = document.getElementById("loginModal");
      bootstrap.Modal.getInstance(loginModal)?.hide();

      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal fade" id="loginModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content login-modal">
            <div className="modal-header border-0">
              <h5 className="modal-title text-white">Welcome Back</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <h2 className="text-white text-center mb-4">Sign in</h2>

                <div className="mb-3">
                  <label className="form-label text-white">Email</label>
                  <input
                    type="email"
                    className="form-control input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-white">Password</label>
                  <input
                    type="password"
                    className="form-control input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-dark w-100 mt-3"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              <div className="text-center mt-4">
                <span className="text-white">
                  Don&apos;t have an account?
                  <button
                    type="button"
                    className="text-primary border-0 bg-transparent"
                    style={{ textDecoration: "underline" }}
                    data-bs-dismiss="modal"
                    data-bs-toggle="modal"
                    data-bs-target="#registerModel"
                  >
                    Sign Up
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Register />
    </>
  );
}

export default Login;
