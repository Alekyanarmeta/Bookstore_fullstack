import axios from "axios"
import { useState } from "react"
function AddBook()
{
    const [url,seturl]=useState()
    const [title,settitle]=useState()
    const [author,setauthor]=useState()
    const [price,setprice]=useState()
    const [desc,setdescription]=useState()
    const [language,setlanguage]=useState()

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    }

    const details=async()=>{
        const res1 = await axios.post("https://bookstore-fullstack-4a2h.onrender.com/api/auth/add-books",{url,title,author,price,desc,language}, { headers });
        alert(res1.data.message)
        seturl("")
        settitle("")
        setauthor("")
        setprice("")
        setdescription("")
        setlanguage("")
    }
    return(
        <div className=" d-flex align-items-center flex-column" >
            <h1 className="text-dark text-opacity-50">Add Book</h1>
            <form className="form-control  bg-transparent text-white fs-5 d-flex flex-column p-5" onClick={
                (e)=>{
                    e.preventDefault()
                }
            }>
                <div className="d-md-flex mb-4">
                <label>Image url: </label>
                <input type="text" placeholder="Paste image url" className="form-control w-75 ms-md-3 w-sm-75" value={url} onChange={(e)=>seturl(e.target.value)}/>
                </div>
                <div className="d-md-flex mb-4">
                <label>Title:</label>
                <input type="text" placeholder="Enter the Title" className="form-control w-75 ms-md-3 w-sm-75" value={title} onChange={(e)=>settitle(e.target.value)}/>
                </div>
                <div className="d-md-flex mb-4">
                <label>Author: </label>
                <input type="text" placeholder="Enter the Author Name" className="form-control w-75 ms-md-3 w-sm-75" value={author} onChange={(e)=>setauthor(e.target.value)}/>
                </div>
                <div className="d-md-flex mb-4">
                <label>Price: </label>
                <input type="text" placeholder="Enter the Price" className="form-control w-75 ms-md-3 w-sm-75" value={price} onChange={(e)=>setprice(e.target.value)}/>
                </div>
                <div className="d-md-flex mb-4">
                <label>Description: </label>
                <textarea placeholder="Enter the description" className="form-control w-75 ms-md-3 w-sm-75" value={desc} onChange={(e)=>setdescription(e.target.value)}/>
                </div>
                <div className="d-md-flex mb-4">
                <label>Language: </label>
                <input type="text" placeholder="Enter the language" className="form-control w-75 ms-md-3 w-sm-75" value={language} onChange={(e)=>setlanguage(e.target.value)}/>
                </div>
                <div className="w-full d-flex justify-content-center">
                <button type="submit" className="btn btn-primary shadow" style={{width:"100px"}} onClick={()=>{
                    details()
                }}>Submit</button>
                </div>
            </form>
        </div>
    )
}
export default AddBook