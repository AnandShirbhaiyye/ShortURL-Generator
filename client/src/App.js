import './App.css';
import ShortUrl from './component/ShortUrl/ShortUrl';
 import { BrowserRouter as Router} from "react-router-dom";

function App() {
  return (
    // <div className="App">
    //  <ShortUrl/>
    // </div>
    <Router>
      <ShortUrl />
    </Router>
  );
}

export default App;
