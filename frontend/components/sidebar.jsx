import { Link } from "react-router-dom"
import "../src/App.css"
function SideBar({ data }) {
    console.log(data)
    return (
            <div className=" p-3 bg-primary d-flex flex-column align-items-center justify-content-between" style={{ width: "200px", height: "100vh" }} >
                
                    <div className="d-flex flex-column align-items-center">
                        <img src={data.avatar} />
                        <p>{data.username}</p>
                        <p>{data.email}</p>
                    </div>
                    <div className="d-flex flex-column align-items-center p-4" >
                        <div className="hover1 p-2">
                            <Link className="text-dark text-decoration-none " to="/profile/favourites">Favourites</Link>
                        </div >
                        <div className="hover1 p-2">
                            <Link className="text-dark text-decoration-none " to="/profile/orders">Orders</Link>
                        </div>
                        <div className="hover1 p-2">
                            <Link className="text-dark text-decoration-none " to="/profile/settings">Settings</Link>
                        </div>
                    </div>
                    <div className="hover1 p-2">
                        <button>Logout</button>
                    </div>
            </div>
    )
}
export default SideBar