import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom";
import "../src/App.css";
function Allbooks() {
    const [data, setdata] = useState();
    useEffect(
        () => {
            const fetch = async () => {
                try {
                    const response = await axios.get("http://localhost:3000/api/auth/get-all-books")

                    setdata(response.data)
                }
                catch (err) {
                    console.error("Failed to fetch books:", err.message);
                }

            }
            fetch();
        }, []
    )
    return (
        <div className="min-vh-100 pb-5 ">
            <h2 className="text-center">All books</h2>
            <div className="d-flex d-block  gap-5 flows ps-5 pe-5">
                {
                    (data && data.map(
                        (item, i) => {
                            return (
                                <Link to={`/view-books/${item._id}`}>
                                <div style={{ backgroundColor: "black", borderColor: "aqua", borderWidth: "4px" }} className="text-white">
                                    <div key={i} className="ps-4 pe-4 pt-4 pb-4 " >
                                    
                                        <img className="add" src={item.url} />
                                        <strong>{item.title}</strong>
                                        <p>by {item.author}</p>
                                        <large>{item.price} RS</large>
                                    </div>
                                </div>
                                </Link>
                            );
                        }
                    ))
                }
            </div>
        </div>
    )
}

export default Allbooks