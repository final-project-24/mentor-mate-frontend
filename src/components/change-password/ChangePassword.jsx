import { useState } from "react";
import { changePassword } from "../../utils/api-connector";
import { useLanguageContext } from "../../store/language-context/LanguageContext.jsx";
import "./ChangePassword.css";
import ToggleButton from "../toggle-button/ToggleButton";

const ChangePassword = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { settingsData } = useLanguageContext();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError(settingsData.passwordsDoNotMatchError);
      return;
    }

    try {
      const response = await changePassword(
        currentPassword,
        newPassword,
        confirmPassword
      );
      setSuccess(settingsData.passwordChangeSuccessMessage);
    } catch (error) {
      setError(error.response?.data?.msg || settingsData.passwordChangeErrorMessage);
    }
  };

  return !showForm ? (
    <ToggleButton
      onToggle={() => setShowForm(true)}
      buttonName={settingsData.changePasswordButtonLabel}
      className="button-type-standard"
    />
  ) : (
    <div className="change-password-container">
      <h2>{settingsData.changePasswordTitle}</h2>
      <form onSubmit={handleChangePassword}>
        <div className="form-group">
          <label htmlFor="currentPassword">{settingsData.currentPasswordLabel}</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">{settingsData.newPasswordLabel}</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">{settingsData.confirmNewPasswordLabel}</label>
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
        <button type="submit">{settingsData.changePasswordButtonLabel}</button>
      </form>
    </div>
  );
};

export default ChangePassword;
