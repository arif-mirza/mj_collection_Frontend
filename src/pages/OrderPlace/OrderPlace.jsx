import { useState } from "react";
import { nanoid } from "nanoid";
import { useLocation, useNavigate } from "react-router-dom";
import { orderAPI } from "../../utils/api";
import { toast } from "react-toastify";

const OrderPlace = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    address: "",
    phone: "",
    quantity: 1,
    paymentMethod: "COD",
    transactionId: "",
  });

  const [paymentId, setPaymentId] = useState("");
  const [loadingId, setLoadingId] = useState(false);
  const [loading, setLoading] = useState(false);

  const generatePaymentId = () => {
    setLoadingId(true);
    setTimeout(() => {
      setPaymentId(nanoid(10));
      setLoadingId(false);
    }, 1500);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    await orderAPI.placeOrder({
      productName: state.title,
      price: state.price,
      quantity: form.quantity,
      address: form.address,
      phone: form.phone,
      paymentMethod: form.paymentMethod,
      paymentId,
      transactionId: form.transactionId,
    });
   


    toast.success("Order placed successfully!");
    navigate("/products");
  };

  return (
    <div className="container py-5">
      <h3>Order: {state?.title}</h3>

      <form className="w-50 mt-4" onSubmit={handleSubmit}>

        <input className="form-control mb-2" placeholder="Address"
          onChange={(e) => setForm({ ...form, address: e.target.value })} required />

        <input className="form-control mb-2" placeholder="Phone"
          onChange={(e) => setForm({ ...form, phone: e.target.value })} required />

        <input type="number" className="form-control mb-2"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })} />

        <select className="form-control mb-3"
          onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}>
          <option value="COD">Cash on Delivery</option>
          <option value="ONLINE">Online Payment</option>
        </select>

        {form.paymentMethod === "ONLINE" && (
          <>
            {!paymentId ? (
              <button type="button" className="btn btn-outline-primary mb-2" onClick={generatePaymentId}>
                {loadingId ? "Generating ID..." : "Generate Payment ID"}
              </button>
            ) : (
              <>
                <p><strong>Payment ID:</strong> {paymentId}</p>
                <input
                  className="form-control mb-2"
                  placeholder="Enter Transaction ID"
                  onChange={(e) => setForm({ ...form, transactionId: e.target.value })}
                  required
                />
              </>
            )}
          </>
        )}

        <button className="btn btn-dark w-100 mt-3"
        disabled={loading}
        
        
        >
          {loading ? "Plesae wait...." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default OrderPlace;
