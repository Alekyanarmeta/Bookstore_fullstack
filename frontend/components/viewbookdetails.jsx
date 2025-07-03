import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart,FaEdit} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "../src/App.css"
import { useSelector } from "react-redux";
function Bookdetails() {
  const {id} = useParams();
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
        setData(response.data.message);
      } catch (err) {
        console.error("Failed to fetch book:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);
  console.log(data)
  const bookid=id
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid:id,
  }
  const AddtoFav=async()=>{
      const res=await axios.put("http://localhost:3000/api/auth/add-to-favourites",{},{headers})
      alert(res.data.message)
   
  }
  const Addtocart=async()=>{
    const res=await axios.put(`http://localhost:3000/api/auth/add-to-cart/${bookid}`,{},{headers})
    alert(res.data.message)
  }
  const DeleteBook=async()=>{
    const res1=await axios.delete(`http://localhost:3000/api/auth/remove-from-cart/${bookid}`,{headers})
    const res2=await axios.delete("http://localhost:3000/api/auth/remove-from-favourites",{headers})

  }
  const EditBook=async()=>{
    const res=await axios.delete(`http://localhost:3000/api/auth/remove-from-cart/${bookid}`,{headers})
  }
  if (loading) return <h3>Loading...</h3>;

  if (!data) return <h3>No book found.</h3>;

  return (
    <div className="min-vh-100 mt-5 justify-content-between ">
      <div className="card shadow bg-light min-vh-100 bookcart m-3">
        <h2 className="mb-3 ps-4 ms-5">{data.title}</h2>
        <div className=" d-flex justify-content-center bookcart">
          <div className="d-flex ms-5 flex-column">
            <div className="w-5 d-flex justify-content-center bookcart" style={{ width: "500px" }}>
              <img src={data.url} alt={data.title} style={{ maxHeight: "400px", width: "300px", padding: "10px" }} className="" />
              {islogged && role == "user" && (
                <div className="custom-button1">
                  <button className="bg-secondary m-2 text-white icons" onClick={AddtoFav}>
                    <FaHeart style={{ width: "2rem", height: "1rem", color: "white" }} />
                    <p className="d-block d-md-none mb-0 ms-2">Add Favourites</p>
                  </button>
                  <button className="bg-secondary m-2 text-white icons" onClick={Addtocart}>
                    <FaShoppingCart style={{ width: "2rem", height: "1rem", color: "white" }} />
                    <p className="d-block d-md-none mb-0 ms-2">Add to cart</p>
                  </button>
                </div>)}
              {islogged && role == "admin" && (
                <div className="custom-button1">
                  <button className="bg-secondary m-2 text-white icons" onClick={EditBook}>
                    <FaEdit style={{ width: "2rem", height: "1rem", color: "white" }} />
                    <p className="d-block d-md-none mb-0 ms-2">Edit</p>
                  </button>
                  <button className="bg-secondary m-2 text-white icons" onClick={DeleteBook}>
                    <MdDelete style={{ width: "2rem", height: "1rem", color: "white" }} />
                    <p className="d-block d-md-none mb-0 ms-2">Delete book</p>
                  </button>
                </div>)}
            </div>
            <div className="ms-5">
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
