import { useEffect, useState } from "react";
import { orderAPI } from "../../utils/api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    const res = await orderAPI.getMyOrders();
    setOrders(res.orders);
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">My Orders</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Payment</th>
            <th>Payment Status</th>
            <th>Order Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>{o.productName}</td>
              <td>{o.quantity}</td>
              <td>{o.paymentMethod}</td>
              <td>
                <span
                  className={`badge ${
                    o.paymentStatus === "Confirmed"
                      ? "bg-success"
                      : "bg-warning"
                  }`}
                >
                  {o.paymentStatus}
                </span>
              </td>
              <td>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
