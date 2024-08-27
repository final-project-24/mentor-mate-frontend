import { deleteUser } from "../../utils/api-connector";
import { useLanguageContext } from "../../store/language-context/LanguageContext";
import "./DeleteUser.css";

const DeleteUser = () => {
  const { settingsData } = useLanguageContext(); // Use settingsData from LanguageContext

  const handleDeleteUser = async () => {
    try {
      const response = await deleteUser();
      console.log("User deleted: ", response);
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  return (
    <button
      className="delete-user-button"
      onClick={() => {
        console.log("Attempting to delete user");
        handleDeleteUser();
      }}
    >
      {settingsData.deleteUserButtonLabel}
    </button>
  );
};

export default DeleteUser;
