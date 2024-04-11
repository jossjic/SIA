import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import { Login } from "./screens/login"
import { Components } from "./screens/components"
import { NavBar } from "./components/navBar";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/login" element = {<Login/>}/>
          <Route path="/components" element = {<Components/>}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
