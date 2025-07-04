import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { MdDelete } from "react-icons/md";
import { BsCartXFill } from "react-icons/bs";
function Cart() {
    const [books, setbooks] = useState()
    const [cartbooks, setcartbooks] = useState()
    const navigate = useNavigate()
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    }
    console.log(headers)
    useEffect(
        () => {
            const fetch = async () => {
                const res1 = await axios.get("https://bookstore-fullstack-4a2h.onrender.com/api/auth/get-user-cart", { headers });
                setbooks(res1.data.cart)
            }
            fetch()
        }, []
    )
    console.log(books)
    useEffect(
        () => {
            const fetch = async () => {
                const res = await Promise.all(
                    books.map(
                        async (id) => {
                            const res1 = await axios.get(`https://bookstore-fullstack-4a2h.onrender.com/api/auth/get-book/${id}`);
                            return res1.data.message
                        }
                    ))
                setcartbooks(res)
            }
            fetch()
        }, [books]
    )

    const removeall=async()=>{
        const res1 = await axios.post("https://bookstore-fullstack-4a2h.onrender.com/api/auth/place-order", { books:books},{headers });
        navigate("/profile/orders") 
    }

    const removeBook = async (bookid) => {
        const res1 = await axios.delete(`https://bookstore-fullstack-4a2h.onrender.com/api/auth/remove-from-cart/${bookid}`, { headers });
        alert(res1.data.message)
        window.location.reload()
    }
    if (!cartbooks) {
        return (<div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>)
    }
    if (cartbooks.length === 0) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100 flex-column">
                <h3 className="text-secondary">Empty Cart</h3>
                <BsCartXFill className="w-25 h-25 text-secondary"/>
            </div>
        );
    }
    const price = cartbooks && cartbooks.reduce((acc, curr) => acc + eval(curr.price), 0)
    const discount = cartbooks && cartbooks.reduce((acc, curr) => acc + eval(curr.price) * 0.02, 0)
    return (
        <div className="min-vh-100 m-4">
            
            {
                cartbooks.map((book) => (
                    <div
                        className="m-3 bg-light p-2 d-flex align-items-center justify-content-between border border-dark border-opacity-50 rounded shadow"
                        key={book._id}
                    >
                        <div className="d-flex align-items-center">
                            <div className="me-3" onClick={() => navigate(`/view-books/${book._id}`)} style={{ cursor: "pointer" }}>
                                <img src={book.url} style={{ width: "100px", height: "100px" }} alt={book.title} />
                            </div>
                            <div>
                                <p><strong>Title: </strong>{book.title}</p>
                                <p><strong>Author: </strong>{book.author}</p>
                                <p><strong>Price: </strong>{book.price} RS</p>
                            </div>
                        </div>
                        <div className="d-flex flex-md-row flex-column align-items-center">
                            <div className="me-3" onClick={() => removeBook(book._id)}>
                                <button className="btn btn-danger"><MdDelete /></button>
                            </div>
                        </div>
                    </div>
                ))

            }
            <div className="m-3 bg-light p-2 d-flex border border-dark border-opacity-50 rounded shadow">
                <div className="w-100">
                    <strong>Price Details</strong>
                    <div className="d-flex justify-content-between me-4">
                        <p>price({cartbooks && cartbooks.length} items)</p>
                        <p>{price} RS</p>
                    </div>
                    <div className="d-flex justify-content-between me-4">
                        <p>Discount</p>
                        <p>{discount}</p>
                    </div>
                    <div className="d-flex justify-content-between me-4">
                        <p>Platform Fee</p>
                        <p>{price && 10} RS</p>
                    </div>
                    <div className="d-flex justify-content-between me-4">
                        <strong>Total Amount</strong>
                        <p>{price && Math.ceil(price - discount + 10)}</p>
                    </div>
                    <div className="d-flex justify-content-end me-4">
                        <button className="btn btn-warning " onClick={()=>removeall()}>Place order</button>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Cart