import { Link, useNavigate } from "react-router-dom"
import "../src/App.css"
import { useDispatch } from "react-redux"
import { logout, updaterole } from "../store/auth"
function SideBar({ data }) {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const role=localStorage.getItem("role")
    return (
            <div className="p-2 bg-primary flex-column align-items-center justify-content-between sidebar"  >
                
                    <div className="d-flex flex-column align-items-center">
                        <img src={data.avatar} />
                        <p>{data.username}</p>
                        <p>{data.email}</p>
                    </div>
                    <div className="d-flex flex-column align-items-center p-4" >
                        {role=="user" && <div className="hover1 p-2">
                            <Link className="text-dark text-decoration-none " to="/profile/favourites">Favourites</Link>
                        </div >}
                        <div className="hover1 p-2">
                            <Link className="text-dark text-decoration-none " to="/profile/orders">Orders</Link>
                        </div>
                       {role=="user" && <div className="hover1 p-2">
                            <Link className="text-dark text-decoration-none " to="/profile/settings">Settings</Link>
                        </div>}
                        {
                            role=="admin" && <div className="hover1 p-2">
                            <Link className="text-dark text-decoration-none " to="/profile/addbook">Add Book</Link>
                        </div>
                        }
                    </div>
                    <div className="hover1 p-2">
                        <button onClick={()=>{
                            dispatch(logout())
                            dispatch(updaterole("user"))
                            localStorage.clear("id")
                            localStorage.clear("role")
                            localStorage.clear("token")
                            navigate("/")
                        }}>Logout</button>
                    </div>
            </div>
    )
}
export default SideBar