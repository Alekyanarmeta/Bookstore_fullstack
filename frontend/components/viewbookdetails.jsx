import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import "../src/App.css"
import { useSelector } from "react-redux";
function Bookdetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const islogged = useSelector((state) => {
    return state.auth.islogged
  })
  const role = useSelector((state) => {
    return state.auth.role
  })
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/auth/get-book/${id}`);
        setData(response.data);
      } catch (err) {
        console.error("Failed to fetch book:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <h3>Loading...</h3>;

  if (!data) return <h3>No book found.</h3>;

  return (
    <div className="min-vh-100 mt-5 justify-content-between ">
      <div className="card shadow bg-light min-vh-100 bookcart m-3">
        <h2 className="mb-3 ps-4">{data.title}</h2>
        <div className="  d-flex justify-content-center bookcart">
          <div className="  d-flex flex-column">
            <div className="w-5 d-flex justify-content-center bookcart" style={{ width: "500px" }}>
              <img src={data.url} alt={data.title} style={{ maxHeight: "400px", width: "300px", padding: "10px" }} className="" />
              {islogged && role == "user" && (
                <div className="d-flex d-md-flex flex-md-column d-lg-flex flex-lg-column align-items-center bg-primary min-vw-100 justify-content-center">
                  <button className="bg-secondary m-4 d-flex align-items-center text-white w-25 p-2 w-md-25">
                    <FaHeart style={{ width: "2rem", height: "1rem", color: "white" }} />
                    <p className="d-block d-lg-none mb-0 ms-2">Add Favourites</p>
                  </button>
                  <button className="bg-secondary m-4 d-flex align-items-center text-white w-25 p-2 w-md-25">
                    <FaShoppingCart style={{ width: "2rem", height: "1rem", color: "white" }} />
                    <p className="d-block d-lg-none mb-0 ms-2">Add to cart</p>
                  </button>
                </div>)}
            </div>
            <div>
              <p><strong>Author:</strong> {data.author}</p>
              <p><strong>Price:</strong> ₹{data.price}</p>
              <p><strong>Language:</strong> {data.language}</p>
            </div>
          </div>
          <div className="discription ">
            <p><strong>Description:</strong> {data.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookdetails;
