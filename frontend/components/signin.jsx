import { useRef } from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
function Signin() {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const address = useRef()
    const Navigate=useNavigate()
    const Adddetails = async () => {
        try {
            if (username.current.value && email.current.value && password.current.value && address.current.value) {

                const response=await axios.post("http://localhost:3000/api/auth/sign-up",{username:username.current.value,email:email.current.value,password:password.current.value,address:address.current.value})
                console.log(response)
                alert(response.data.message)
                username.current.value = "";
                email.current.value = "";
                password.current.value ="";
                address.current.value = "";
                if(response.data.message==="Signup successfull" || response.data.message==="Email already exists"){
                    Navigate("/login")
                }
            }
            else {
                alert("invalid details")
            }
        }
        catch (err) {
            console.log("sign in internal error")
        }

    }

    return (
        <div className="login-wrapper">
            <div className="container1 shadow">
                <h1>Signin</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    Adddetails();
                }}>
                    <div className="d-flex align-items-center">
                        <label className="container2">Username:</label>
                        <input className=" form-control bg-white border-2 border-dark" type="text" placeholder=" Ex:XYZ345" name="username" ref={username} />
                    </div>
                    <br />
                    <div className="d-flex align-items-center">
                        <label className="container2">Email:</label>
                        <input className=" form-control bg-white  border-2 border-dark w-100" type="text" placeholder=" Ex:XYZ@gmail.com" name="email" ref={email} />
                    </div>
                    <br />
                    <div className="d-flex align-items-center">
                        <label className="container2">Password:</label>
                        <input className=" form-control bg-white  border-2 border-dark" type="password" placeholder=" Ex:XYZ@345" name="password" ref={password} /><br />
                    </div><br />
                    <div className="d-flex align-items-center">
                        <label className="container2">Address:</label>
                        <textarea className=" form-control bg-white  border-2 border-dark w-100" id="address" name="address" row="4" cloumn="5" ref={address}></textarea>
                    </div><br />
                    <button className="btn btn-primary">Signin</button>
                </form>
                <div>
                    <p>or</p>
                    <p>Already have account
                        <Link to="/login">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Signin