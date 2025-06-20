import Homecontent from "./homecontent"
import Recentbooks from "./recentlyadded"
function Home() {
    return (
        <div  style={{ backgroundColor: "#0F52BA", }}>
            
                
                <Homecontent />
                <Recentbooks />

        </div>
    )
}
export default Home