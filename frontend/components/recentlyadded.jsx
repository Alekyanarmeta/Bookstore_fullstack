import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import "../src/App.css";
function Recentbooks() {
    const [data, setdata] = useState();
    useEffect(
        () => {
            const fetch = async () => {
                try {
                    const response = await axios.get("https://bookstore-fullstack-4a2h.onrender.com/api/auth/recent-books")

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
        <div className="container pb-5 text-white">
            <h1 className="text-center">Recently added books</h1>
            <div className=" row d-flex d-block justify-content-center align-items-center gap-5 ">
                {
                    (data && data.map(
                        (item, i) => {
                            return (
                                <div className="text-muted bg-light col-12 col-sm-12 col-md-6 col-lg-4 rounded-5 recent" style={{borderWidth:"2px",borderColor:"aqua"}}>
                                    <div key={i} className="ps-4 pe-4 pt-4 pb-4" >
                                        <img className="add" src={item.url} />
                                        <strong>{item.title}</strong>
                                        <p>by {item.author}</p>
                                        <large>{item.price} ₹ </large>
                                    </div>
                                </div>
                            );
                        }
                    ))
                }
            </div>
        </div>
    )
}

export default Recentbooks