import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../src/App.css";
function Allbooks() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("https://bookstore-fullstack-4a2h.onrender.com/api/auth/get-all-books");
        setData(response.data);
      } catch (err) {
        console.error("Failed to fetch books:", err.message);
      }
    };
    fetch();
  }, []);

  return (
    <div className="container min-vh-100 pb-5">
      <h2 className="text-center my-4">All Books</h2>
      
      <div className="row g-4">
        {data &&
          data.map((item, i) => (
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 " key={item._id}>
              <Link to={`/view-books/${item._id}`} className="text-decoration-none">
                <div className="text-white border border-warning border-3 rounded-5" style={{ backgroundColor: "black" }}>
                  <div className="p-3 d-flex gap-4">
                    <img src={item.url} alt={item.title} style={{ width: "150px", height: "200px", objectFit: "cover" }}/>
                    <div className="d-flex flex-column justify-content-between">
                      <strong>{item.title}</strong>
                      <p className="mb-1">by {item.author}</p>
                      <p className="mb-0">{item.price} ₹</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Allbooks;
