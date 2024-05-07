import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import { Login } from "./screens/login";
import { Layout } from "./screens/layout";
import { NavBar } from "./components/navBar";
import { AdminPage } from "./screens/adminPage";
import { MainPage } from "./screens/mainPage";
import { UserPage } from "./screens/adminUserPage";
import { CheckDateAdd } from "./screens/checkDateAdd";
import { CheckDateDelete } from "./screens/checkDateDelete";
import { RestorePass } from "./screens/restorePass";
import { CreateUser } from "./screens/createUser";
import { AddProduct } from "./screens/addProduct";
import { EditProduct } from "./screens/editProduct";
import { CodePage } from "./screens/codePage";
import { NewPass } from "./screens/newPass";
import { EditUser } from "./screens/editUser";

import { useState } from "react";

function App() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState();

  return (
    <div className="app">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/layout" element={<Layout />} />
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/adminUserPage" element={<UserPage />} />
          <Route
            path="/adminPage"
            element={
              <AdminPage
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
              />
            }
          />
          <Route
            path="/checkDateAdd"
            element={<CheckDateAdd selectedIds={selectedIds} />}
          />
          <Route
            path="/checkDateDelete"
            element={<CheckDateDelete selectedIds={selectedIds} />}
          />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/restorePass" element={<RestorePass />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/editProduct/:a_id" element={<EditProduct />} />
          <Route path="/codePage" element={<CodePage />} />
          <Route path="/newPass" element={<NewPass />} />
          <Route path="/editUser"
           element={<EditUser selectedUserId={selectedUserId}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
