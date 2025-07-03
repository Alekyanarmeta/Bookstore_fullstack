import { useSelector } from "react-redux";
import "../src/App.css";
import { Link } from "react-router-dom";
function Navbar() {
  const links = [
    { title: "Home", link: "/" },
    { title: "AllBooks", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" }
  ];
  const islogged=useSelector((state)=>{
    return state.auth.islogged
  })
  if (islogged==false){
    links.splice(1,3)
  }
  return (
    <div className="min-vw-100 text-white py-3 h-3 d-flex align-items-center justify-content-between justify-content-center direction"  style={{backgroundColor:"rgb(70, 70, 70)"}}>
      <div className="d-flex gap-3 items-center ps-md-4">
        <img className="logo" src="/book.png" alt="Logo" />
        <h2>Bookstore</h2>
      </div>

      <div className="d-flex items-center align-items-center justify-content-center direction me-md-3">
        <div className="navbar">
          {links.map((item, i) => (
            <Link key={i} className="navbar1 direction  direction1 text-white text-decoration-none" to={item.link}>
              {item.title}
            </Link>
          ))}
        </div>

        <div className="d-flex gap-4 direction ps-4">
          {islogged==false &&<>
          <Link className="btn btn-primary bg-transparent" to="/login">Login</Link>
          <Link className="btn btn-primary bg-transparent" to="/signin">Signin</Link> </>
          }
        </div>
      </div>
    </div>
  );
}

export default Navbar;
