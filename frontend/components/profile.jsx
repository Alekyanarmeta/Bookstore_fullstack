import axios from "axios"
import { useEffect, useState } from "react"
import SideBar from "./sidebar";
import { Outlet } from "react-router-dom";
import "../src/App.css";
function Profile() {
    const [profile, setdetails] = useState({})
    const headers = { id: localStorage.getItem("id"), authorization: `Bearer ${localStorage.getItem("token")}` };
    useEffect(
        () => {
            const fetch = async () => {
                try {
                    const res = await axios.get("https://bookstore-fullstack-4a2h.onrender.com/api/auth/user-information", { headers })
                    setdetails(res.data)
                }
                catch (err) {
                    console.log("internal error")
                }
            }
            fetch()
        }, []
    )
    return (
        <div className="min-vh-100 bg-light">
            {Object.keys(profile).length === 0 &&
                <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
            {profile && <>
            <div className="d-flex m-3 profile min-vw-100">
                <div className="p-1 m-2 min-vh-md-100 bg-primary">
                    <SideBar data={profile} />
                </div>
                <div className="flex-grow-1 p-3 m-2 min-vh-100 bg-secondary p-4">
                    <Outlet />
                </div>
            </div>
            </>
            }

        </div>
    )
}
export default Profile