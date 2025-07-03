import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
function Favourites()
{
    const [books,setbooks]=useState()
    const [favbooks,setfavbooks]=useState()
    const navigate=useNavigate()
    const id=localStorage.getItem("id")
    const token=localStorage.getItem("token")
    const headers={
        id:id,
        authorization:`Bearer ${token}`
    }
    useEffect(
       ()=>{
        const fetch=async()=>{
            const res=await axios.get("http://localhost:3000/api/auth/all-favourite-books",{headers});
            setbooks(res.data.favourites)
        }
        fetch()
       },[id]
    )
    useEffect(
        ()=>{
            const fetch=async()=>{
                const res=await Promise.all(
                    books.map(
                    async(id)=>{
                        const res1=await axios.get(`http://localhost:3000/api/auth/get-book/${id}`);
                        return res1.data.message
                    }
                ))
                console.log(res.message)
                setfavbooks(res)
            }
            fetch()
        },[books]
    )
    const removeBook=async(bookid)=>{
        const headers={
            id:localStorage.getItem("id"),
            bookid:bookid,
            authorization:`Bearer ${localStorage.getItem("token")}`
        }
        const res1=await axios.delete("http://localhost:3000/api/auth/remove-from-favourites",{headers});
        
        window.location.reload();
    }
    console.log(favbooks)
    return (
        <>
            {
                favbooks && favbooks.length>0 ? favbooks.map(
                (book)=>{
                    return <div className="bg-white m-3 d-flex align-items-center justify-content-between flex-column flex-md-row " key={book._id}>
                        <div className="d-flex align-items-center flex-md-row flex-column">
                        <div className="p-2" onClick={()=>navigate(`/view-books/${book._id}`)}>
                        <img src={book.url} style={{width:"130px",height:"150px"}}/>
                        </div>
                        <div className="p-2">
                        <p><b>title:</b>{book.title}</p>
                        <p><b>author:</b>{book.author}</p>
                        <p><b>price:</b>{book.price}</p>
                        </div>
                        </div>
                        <div className="me-5" onClick={()=>removeBook(book._id)}>
                            <button className="btn btn-danger">Remove</button>
                        </div>
                    </div>
                }
            ):(<div className="text-white min-vh-100 d-flex justify-content-center align-items-center flex-column">
            <h2>No Favourites Books</h2>
                <img src="/fav.png" style={{maxWidth:"15vw"}}/>
            </div>
            )
            } 
        </>
    )
}
export default Favourites