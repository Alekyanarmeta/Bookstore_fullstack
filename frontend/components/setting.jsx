import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
function Settings()
{
    const [user,setuser]=useState()
    const [Edit,setedit]=useState(false)
    const [address,setaddress]=useState()
    const headers={
        id:localStorage.getItem("id"),
        authorization:`Bearer ${localStorage.getItem("token")}`
    }
    useEffect(
          ()=>{
            const fetch=async()=>{
                const res1=await axios.get("https://bookstore-fullstack-4a2h.onrender.com/api/auth/user-information",{headers});
                setuser(res1.data)
            }
            fetch()
        },[]
    )
    const changeAddress=async()=>{
       const res1=await axios.put("https://bookstore-fullstack-4a2h.onrender.com/api/auth/update-address",{address:address},{headers});
       window.location.reload()
       setedit(false)
    }
    return (
        <>
            <h1 className="text-dark text-opacity-50">settings</h1>
            {
              user ? (
                <div className="text-white d-flex flex-column gap-4">
                    <div>
                    <strong>Username: </strong>
                    <span>{user.username}</span>
                    </div>
                    <div>
                    <strong>Email: </strong>
                    <span>{user.email}</span>
                    </div>
                    <div>
                        <strong>Address: </strong>
                        <div>
                            <form className="form-control d-flex flex-column bg-transparent text-white bg-opacity-75" 
                            onClick={
                                (e)=>{
                                    e.preventDefault()
                                }
                            }
                            style={{maxWidth:"250px"}}>
                                {user.address && !Edit?(<p>{user.address}</p>
                                ):Edit?(
                                    <>
                                <textarea className="form-label bg-white text-dark" value={address} onChange={(e)=>setaddress(e.target.value)}/>
                                <button type="submit" className="btn btn-success w-25" onClick={()=>{
                                    changeAddress()
                                    setedit(false)
                                }}>save</button>
                                </>
                                ):(<p>No address saved</p>)
                                }
                                <button className="btn btn-light w-25" onClick={(e)=>setedit(true)
                                }>Edit</button>
                            </form>
                        </div>
                    </div>
                </div>
              ):(
                <div className=" d-flex min-vh-100 justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status">
                </div>
                </div>
              )
            }
        </>
    )
}
export default Settings