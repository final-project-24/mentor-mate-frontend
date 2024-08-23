// import React from "react";
import { deleteUser } from "../../utils/api-connector";
import { useLanguageContext } from "../../store/language-context/LanguageContext";
import "./DeleteUser.css";

const DeleteUser = ({ userId }) => {
  const { settingsData } = useLanguageContext(); // Use settingsData from LanguageContext

  const handleDeleteUser = async (id) => {
    try {
      const response = await deleteUser(id);
      console.log("User deleted: ", response);
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  return (
    <button
      className="delete-user-button"
      onClick={() => handleDeleteUser(userId)}
    >
      {settingsData.deleteUserButtonLabel}
    </button>
  );
};

export default DeleteUser;
