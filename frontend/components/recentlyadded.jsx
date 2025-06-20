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
                    const response = await axios.get("http://localhost:3000/api/auth/recent-books")

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
        <div className=" pb-5  text-white">
            <h1 className="text-center">Recently added books</h1>
            <div className="d-flex d-block justify-content-center align-items-center gap-5 flows">
                {
                    (data && data.map(
                        (item, i) => {
                            return (
                                <div className="text-muted bg1">
                                    <div key={i} className="ps-4 pe-4 pt-4 pb-4 " >
                                        <img className="add" src={item.url} />
                                        <strong>{item.title}</strong>
                                        <p>by {item.author}</p>
                                        <large>{item.price} RS</large>
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