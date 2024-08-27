import React, { useState } from "react";
import { updateUserRole } from "../../utils/api-connector.js";
import "./ChangeRole.css";

const ChangeRole = ({ user }) => {
  const [newRole, setNewRole] = useState(user.role);

  const handleRoleChange = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUserRole(newRole);
      console.log("User role updated:", updatedUser);
      // Optionally, update the user context here if needed
      window.location.reload(); // Reload the page after updating the role
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  return (
    <div className="change-role-container">
      <form onSubmit={handleRoleChange}>
        <label htmlFor="role">Change Role:</label>
        <select
          id="role"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="mentor">Mentor</option>
          <option value="mentee">Mentee</option>
        </select>
        <button type="submit">Update Role</button>
      </form>
    </div>
  );
};

export default ChangeRole;
