import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import { Login } from "./screens/login";
import { Layout } from "./screens/layout";
import { NavBar } from "./components/navBar";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/layout" element={<Layout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
