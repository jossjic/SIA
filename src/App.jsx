import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import { Login } from "./screens/login";
import { Layout } from "./screens/layout";
import { NavBar } from "./components/navBar";
import { TestScreen } from "./screens/testScreen";
import { MainPage } from "./screens/mainPage";
import { UserPage } from "./screens/adminUserPage";
import { AdminPage } from "./screens/adminPage";
import { CheckDateAdd } from "./screens/checkDateAdd";
import { CheckDateDelete } from "./screens/checkDateDelete";
import { RestorePass } from "./screens/restorePass";
import { CreateUser } from "./screens/createUser";
import { AddProduct } from "./screens/addProduct";


function App() {
  return (
    <div className="app">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/layout" element={<Layout />} />
          <Route path="/testscreen" element={<TestScreen />} />
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/adminUserPage" element={<UserPage />} />
          <Route path="/adminPage" element={<AdminPage />} />
          <Route path="/checkDateAdd" element={<CheckDateAdd/>}/>
          <Route path="/checkDateDelete" element={<CheckDateDelete/>}/>
          <Route path="/createUser" element={<CreateUser/>}/>
          <Route path="/restorePass" element={<RestorePass />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/addProduct" element={<AddProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
