import React, { useState, useEffect } from "react";
import "./adminUserPage.css";
import { GeneralButton } from "../../components/button";
import { Guide } from "../../components/guide";
import { ReturnButton } from "../../components/returnButton";
import { SearchBar } from "../../components/search";
import { ConfirmationPopUp } from "../../components/confirmationPopUp";

export const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(null);


  useEffect(() => {
    fetch("http://3.20.237.82:3000/usuarios") // Replace with our actual API endpoint
      .then((response) => {
        if (response.ok) {
          console.log(response);
          return response.json();
        }
        throw new Error("Error al obtener los usuarios");
      })
      .then((data) => {
        setUsers(data.map((user) => ({ id: user.u_id, email: user.u_email })));
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []); // This effect runs only once when the component is mounted

  const handleDelete = (userId) => {
    // Call the delete API endpoint
    fetch(`http://3.20.237.82:3000/usuarios/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Remove the user from the state to update the UI
        setUsers(users.filter(user => user.id !== userId));
        setIsModalOpen(null);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSearch = (searchTerm) => {
    setFilter(searchTerm.toLowerCase());
  };

  const filteredUsers = users.filter(user => user.id.toLowerCase().includes(filter));

  return (
    <div className="userPage">
      <div className="buttonTopLeft">
        <ReturnButton />
      </div>
      <Guide
        message="Bienvenid@ administrador, en esta ventana podrá administrar a los usuarios del sistema, 
      use las cajas al la izquierda del nombre de usuario para eliminar múltiples usuarios."
        size={100}
      />
      <SearchBar onSearch={handleSearch} />
      <div className="tableContainer">
        <table className="userTable square">
          <thead>
            <tr>
              <th></th> {/* Space for checkboxes */}
              <th>Usuario</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
          {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <input type="checkbox" className="checkboxLarge" />
                </td>
                <td>{user.id}</td>{" "}
                <td>{user.email}</td>
                <td>
                  <GeneralButton
                    textElement=" Ver  "
                    color="#28A745"
                    className="generalButton"
                  />
                  <GeneralButton
                    textElement="  Editar  " path="/editUser"
                    color="#19739A"
                    className="generalButton"
                  />
                  <GeneralButton
                    textElement="  Eliminar  "
                    color="#DC3545"
                    className="generalButton"
                    onClick={() => setIsModalOpen(user.id)}
                  />
                  {isModalOpen === user.id && (
                    <div className="modalOverlayConf">
                      <ConfirmationPopUp
                        message="¿Seguro que quieres eliminar al usuario de forma permanente?"
                        answer1="Si" answer2="No"
                        funct={() => handleDelete(user.id)}
                        isOpen={isModalOpen === user.id}
                        closeModal={() => setIsModalOpen(null)}
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};