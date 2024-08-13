import React from "react";
import { deleteUser } from "../../utils/api-connector"

const DeleteUser = ({ userId }) => {
  const handleDeleteUser = async (id) => {
    try {
      const response = await deleteUser(id);
      console.log("User deleted: ", response);
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  return <button onClick={() => handleDeleteUser(userId)}>Delete User</button>;
};

export default DeleteUser;
