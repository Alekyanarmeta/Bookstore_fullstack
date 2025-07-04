import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { login } from "../store/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updaterole } from "../store/auth";
function Login() {
    const [values, setValues] = useState({ username: "", password: "" });
    const dispatch=useDispatch()
    const Navigate=useNavigate()
    const change = (e) => {
        const tag = e.target;
        setValues({ ...values, [tag.name]: tag.value });
    };
   
     const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      if (values.username && values.password) {
        const response = await axios.post(
          "https://bookstore-fullstack-4a2h.onrender.com/api/auth/sign-in",
          values
        );
        console.log(response.data)
        dispatch(login())
        dispatch(updaterole(response.data.role))
        localStorage.setItem("id",response.data.id)
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("role",response.data.role)
        setValues({ username: "", password: "" });
        Navigate("/")
      } else {
        alert("Enter full details");
      }
    } catch (err) {
      console.log("Sign in internal error:", err.message);
      alert("Sign in failed. Please try again.");
    }
  };

    return (
        <div className="login-wrapper">
            <div className="container1 shadow p-4">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="d-flex align-items-center mb-3">
                        <label className="container2 me-2">Username:</label>
                        <input
                            className="form-control bg-white border-2 border-dark text-dark"
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={values.username}
                            onChange={change}
                        />
                    </div>

                    <div className="d-flex align-items-center mb-3">
                        <label className="container2 me-2">Password:</label>
                        <input
                            className="form-control bg-white border-2 border-dark text-dark"
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={values.password}
                            onChange={change}
                        />
                    </div>

                    <button className="btn btn-primary" type="submit">
                        Login
                    </button>
                </form>

                <div className="mt-3">
                    <p>or</p>
                    <p>
                        Don't have an account?{" "}
                        <Link to="/signin">
                            <strong>Sign in</strong>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
