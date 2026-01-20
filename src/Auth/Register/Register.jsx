import  { useState } from 'react'
import "../Register/register.css";
import { authAPI, saveToken } from "../../utils/api";
import { toast } from "react-toastify";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const response = await authAPI.register({ name, email, password, role: "user" });
      saveToken(response.token);
      toast.success("Registration successful!");
      
      // Close modal
      const registerModal = document.getElementById("registerModel");
      if (registerModal) {
        if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
          const bsModal = bootstrap.Modal.getInstance(registerModal);
          if (bsModal) bsModal.hide();
        } else {
          // Fallback: trigger close button
          const closeButton = registerModal.querySelector('[data-bs-dismiss="modal"]');
          if (closeButton) closeButton.click();
        }
      }
      
      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      
      // Reload page to update auth state
      window.location.reload();
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
   <>
    <div
  className="modal fade"
  id="registerModel"
  tabIndex="-1"
  aria-labelledby="loginModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content login-modal">
      <div className="modal-header border-0">
        <h5 className="modal-title text-white" id="loginModalLabel">
          Registration Form
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
          <h2 className="text-white text-center mb-4">Sign Up</h2>

          {/* Full Name */}
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label text-white">
              Name
            </label>
            <input
              type="text"
              className="form-control input-field"
              id="fullName"
              placeholder="Enter Full Name here"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">
              Email
            </label>
            <input
              type="email"
              className="form-control input-field"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">
              Password
            </label>
            <input
              type="password"
              className="form-control input-field"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="btn btn-dark w-100 mt-3"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
   
   </>
  )
}

export default Register





