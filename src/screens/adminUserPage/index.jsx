import React, { useState, useEffect } from "react";
import "./adminUserPage.css";
import { GeneralButton } from "../../components/button";
import { Guide } from "../../components/guide";
import { ReturnButton } from "../../components/returnButton";
import { SearchBar } from "../../components/searchBar";
import { ConfirmationPopUp } from "../../components/confirmationPopUp";
import { useNavigate } from 'react-router-dom';

export const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [filter, setFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [deleteActive, setDeleteActive] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const navigate = useNavigate();
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    fetch("http://3.144.175.151:3000/usuarios")
      .then((response) => {
        if (response.ok) {
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
  }, []);

  const handleCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    setSelectedUserIds((prev) =>
      isChecked ? [...prev, id] : prev.filter((uid) => uid !== id)
    );
    setDeleteActive(selectedUserIds.length > 0);
  };

  const handleDeleteSelected = () => {
    Promise.all(
      selectedUserIds.map((id) =>
        fetch(`http://3.144.175.151:3000/usuarios/${id}`, { method: "DELETE" })
      )
    )
      .then(() => {
        setUsers(users.filter((user) => !selectedUserIds.includes(user.id)));
        setSelectedUserIds([]);
        setConfirmDeleteOpen(false);
        setDeleteSuccess(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDelete = (userId) => {
    fetch(`http://3.144.175.151:3000/usuarios/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setUsers(users.filter((user) => user.id !== userId));
        setIsModalOpen(null);
        setDeleteSuccess(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSearch = (searchTerm) => {
    setFilter(searchTerm.toLowerCase());
  };

  const handleEditUser = (userId) => {
    navigate(`/editUser/${userId}`);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.id.toLowerCase().includes(filter) ||
      user.email.toLowerCase().includes(filter) ||
      (user.otherField && user.otherField.toLowerCase().includes(filter))
  );

  const handleCreateUser = () => {
    navigate("/createuser");
  };

  return (
    <div className="userPage">
      <div className="buttonTopLeft">
        <ReturnButton />
      </div>
      <Guide
        message="Bienvenid@ administrador, en esta ventana podrá administrar a los usuarios del sistema, use las cajas al la izquierda del nombre de usuario para eliminar múltiples usuarios."
        size={100}
      />
      <SearchBar
        onSearch={handleSearch}
        addCartNumber={0}
        deleteCartNumber={selectedUserIds.length}
        deleteActive={selectedUserIds.length > 0}
        onDeleteSelected={() => setConfirmDeleteOpen(true)}
        onAddUser={handleCreateUser}
      />
      {confirmDeleteOpen && (
        <ConfirmationPopUp
          message="¿Está seguro que desea eliminar a los usuarios seleccionados permanentemente?"
          answer1="Si"
          answer2="No"
          funct={handleDeleteSelected}
          isOpen={confirmDeleteOpen}
          closeModal={() => setConfirmDeleteOpen(false)}
        />
      )}
      {deleteSuccess && (
        <div className="modalOverlay">
          <ConfirmationPopUp
            message="Usuario eliminado correctamente"
            answer1="Ok"
            isOpen={deleteSuccess}
            closeModal={() => setDeleteSuccess(false)}
          />
        </div>
      )}
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
                  <input
                    type="checkbox"
                    checked={selectedUserIds.includes(user.id)}
                    onChange={(e) => handleCheckboxChange(e, user.id)}
                    className="checkboxLarge"
                  />
                </td>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>
                  <GeneralButton
                    textElement=" Ver "
                    color="#28A745"
                    className="generalButton"
                  />
                  <GeneralButton
                    textElement=" Editar "
                    color="#19739A"
                    className="generalButton"
                    onClick={() => handleEditUser(user.id)}
                  />
                  <GeneralButton
                    textElement=" Eliminar "
                    color="#DC3545"
                    className="generalButton"
                    onClick={() => setIsModalOpen(user.id)}
                  />
                  {isModalOpen === user.id && (
                    <div className="modalOverlay">
                      <ConfirmationPopUp
                        message="¿Seguro que quieres eliminar al usuario de forma permanente?"
                        answer1="Si"
                        answer2="No"
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
