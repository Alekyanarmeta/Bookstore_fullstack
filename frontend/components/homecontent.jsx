import "../src/App.css";

function Homecontent() {
  return (
    <div>
        <div className="d-flex justify-content-between align-items-center pt-5 gap-5 flex-column flex-md-row">
        <div className="text-white ps-5 " style={{ width: "500px" }}>
          <h2>"Discover a world of stories, knowledge, and wonder"</h2>
        </div>
        <div>
          <img className="homepage" src="/home.png" alt="Reading Illustration" />
        </div>
      </div>

      
    </div>
  );
}

export default Homecontent;
