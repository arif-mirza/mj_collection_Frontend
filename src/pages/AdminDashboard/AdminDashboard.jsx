import { useEffect, useState } from "react";
import { orderAPI } from "../../utils/api";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [view, setView] = useState("Pending");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await orderAPI.getAll();
    setOrders(res.orders);
  };

  const handleStatusUpdate = async (id, status) => {
    await orderAPI.updateStatus(id, status);
    fetchOrders(); // Refresh table automatically
  };

  const filteredOrders =
    view === "All" ? orders : orders.filter((o) => o.status === view);

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card p-3 bg-light" onClick={() => setView("All")}>
            All Orders: {orders.length}
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="card p-3 bg-warning"
            onClick={() => setView("Pending")}
          >
            Pending: {orders.filter((o) => o.status === "Pending").length}
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="card p-3 bg-success text-white"
            onClick={() => setView("Completed")}
          >
            Completed: {orders.filter((o) => o.status === "Completed").length}
          </div>
        </div>
      </div>

      <h4>Showing {view} Orders</h4>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer Name</th>
            <th>Order Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Quantity</th>
            <th>Payment</th>
            <th>Amount</th>
            <th>Payment Status</th>
            <th>Current Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order._id}>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>{order.user?.name || "N/A"}</td>
              <td>{order?.productName}</td>
              <td>{order?.address}</td>
              <td>{order.phone}</td>
              <td>{order.quantity}</td>
              <td>{order.paymentMethod}</td>
              <td>${order.totalAmount}</td>
              <td>
                {order.paymentMethod === "ONLINE" ? (
                  <>
                    <p>
                      <b>ID:</b> {order.paymentId}
                    </p>
                    <p>
                      <b>Txn:</b> {order.transactionId}
                    </p>

                    <select
                      className="form-select"
                      value={order.paymentStatus}
                      onChange={async (e) => {
                        await orderAPI.updatePayment(order._id, {
                          paymentStatus: e.target.value,
                        });
                        fetchOrders();
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                    </select>
                  </>
                ) : (
                  "COD"
                )}
              </td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusUpdate(order._id, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AdminDashboard;
