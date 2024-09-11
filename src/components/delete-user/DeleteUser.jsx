import React, { useState } from "react";
import { deleteUser } from "../../utils/api-connector";
import { useLanguageContext } from "../../store/language-context/LanguageContext";
import "./DeleteUser.css";
import ConfirmationDialog from "../confirmation-dialog/ConfirmationDialog";

const DeleteUser = () => {
  const { settingsData } = useLanguageContext(); // Use settingsData from LanguageContext
  const [showDialog, setShowDialog] = useState(false);

  const handleDeleteUser = async () => {
    try {
      const response = await deleteUser();
      console.log("User deleted: ", response);
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  //   return (
  //     <button
  //       className="delete-user-button"
  //       onClick={() => {
  //         console.log("Attempting to delete user");
  //         handleDeleteUser();
  //       }}
  //     >
  //       {settingsData.deleteUserButtonLabel}
  //     </button>
  //   );
  // };

  return (
    <div>
      <button
        className="delete-user-button"
        onClick={() => {
          console.log("Attempting to delete user");
          setShowDialog(true);
        }}
      >
        {settingsData.deleteUserButtonLabel}
      </button>
      {showDialog && (
        <ConfirmationDialog
          message="Are you sure you want to delete this user?"
          onConfirm={handleDeleteUser}
          onCancel={() => setShowDialog(false)}
        />
      )}
    </div>
  );
};

export default DeleteUser;
