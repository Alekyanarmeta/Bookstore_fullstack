import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
function Orders() {
  const [orders, setorders] = useState()
  const navigate = useNavigate()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    role: localStorage.getItem("role"),
  };

  const fetchOrders = async () => {
    try {
      if (headers.role === "user") {
        const res = await axios.get("http://localhost:3000/api/auth/get-orders-history", { headers });
        setorders(res.data.orders || []);
      } else {
        const res = await axios.get("http://localhost:3000/api/auth/get-user-orders", { headers });
        setorders(res.data.orders)
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  const updatestatus = async (id, status) => {
    try {
      await axios.put(
        "http://localhost:3000/api/auth/update-status",
        { id, status },
        { headers }
      );
      fetchOrders(); 
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  return (
    <>
      <h1 className="text-dark text-opacity-50">Your Orders</h1>
      {
        orders && orders.length > 0 ? (
          orders.map((item) => (
            <div
              key={item._id}
              className="d-flex bg-dark m-2 p-2 bg-opacity-25 justify-content-between align-items-md-center text-white flex-column flex-md-row"
            >
              <div className="d-flex">
                <img
                  src={item.books?.url}
                  alt="book"
                  style={{ width: "80px", height: "120px" }}
                  onClick={() => navigate(`/view-books/${item.books._id}`)}
                />
                <div className="d-flex ms-3 flex-column justify-content-md-center">
                  <p><strong>Title: </strong> {item.books?.title}</p>
                  <p><strong>Author: </strong> {item.books?.author}</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                {item.status === "order placed" ? (
                  <>
                    <p className="text-success text-opacity-100 m-2">{item.status}</p>
                    {headers.role=="user" && <button className="btn btn-light text-danger" onClick={() => updatestatus(item._id, "order cancelled")}>cancel order</button>}
                  </>
                ) : item.status === "delivered" ? (
                  <p className="text-warning m-2">{item.status}</p>
                ) : item.status === "order cancelled" ? (
                  <p className="text-danger m-2">{item.status}</p>
                ) : (
                  <>
                    <p className="text-primary m-2">{item.status}</p>
                    {headers.role=="user" && <button className="btn btn-light text-danger" onClick={() => updatestatus(item._id, "order cancelled")}>cancel order</button>}
                  </>

                )}
                {headers.role == "admin" && (item.status == "order placed" || item.status == "out of delivered") && (
                  <select className="bg-white text-black" value={item.status} onChange={(e) => updatestatus(item._id, e.target.value)}>
                    <option value="out of delivered">out of delivered</option>
                    <option value="order placed">order placed</option>
                    <option value="delivered">delivered</option>
                  </select>
                )
                }
                <p className="m-2">{item.books?.price} ₹</p>
              </div>
            </div>
          ))
        ) : orders ? (
          <p className="text-white">No orders found.</p>
        ) : (
          <div className=" d-flex min-vh-100 justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
            </div>
          </div>
        )
      }
    </>
  );
}
export default Orders