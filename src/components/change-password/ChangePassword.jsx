import { useState } from "react";
import { changePassword } from "../../utils/api-connector";
import "./ChangePassword.css";
import ToggleButton from "../toggle-button/ToggleButton";

const ChangePassword = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      const response = await changePassword(
        currentPassword,
        newPassword,
        confirmPassword
      );
      setSuccess("Password changed successfully");
    } catch (error) {
      setError(error.response?.data?.msg || "Error changing password");
    }
  };

  return !showForm ? (
    <ToggleButton
      onToggle={() => setShowForm(true)}
      buttonName="Change Password"
      className="change-password-button"
    />
  ) : (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="change-password-error-message">{error}</p>}
        {success && (
          <p className="change-password-success-message">{success}</p>
        )}
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
