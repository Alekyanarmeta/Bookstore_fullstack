import axios from "axios"
import { useEffect, useState } from "react"
import SideBar from "./sidebar";
import { Outlet } from "react-router-dom";
function Profile() {
    const [profile, setdetails] = useState({})
    const headers = { id: localStorage.getItem("id"), authorization: `Bearer ${localStorage.getItem("token")}` };
    useEffect(
        () => {
            const fetch = async () => {
                try {
                    const res = await axios.get("http://localhost:3000/api/auth/user-information", { headers })
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
        <div className="min-vh-100">
            {Object.keys(profile).length === 0 &&
                <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
            {profile && <>
            <div className="d-flex bg-light m-3">
                <div className="p-1  m-2">
                    <SideBar data={profile} />
                </div>
                <div className="flex-grow-1 p-3">
                    <Outlet />
                </div>
            </div>
            </>
            }

        </div>
    )
}
export default Profile