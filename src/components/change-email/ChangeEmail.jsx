import { useState } from "react";
import { changeEmail } from "../../utils/api-connector";
import { useLanguageContext } from "../../store/language-context/LanguageContext.jsx";
import "./ChangeEmail.css";
import ToggleButton from "../toggle-button/ToggleButton";

const ChangeEmail = () => {
  const [showForm, setShowForm] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { settingsData } = useLanguageContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await changeEmail(newEmail);
      setMessage(response.message);
    } catch (error) {
      setError(error.message);
    }
  };

  return !showForm ? (
    <ToggleButton
      onToggle={() => setShowForm(true)}
      buttonName={settingsData.changeEmailButtonLabel}
      className="button-type-standard"
    />
  ) : (
    <div className="change-email-container">
      <h2>{settingsData.changeEmailTitle}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="newEmail">{settingsData.newEmailLabel}</label>
          <input
            type="email"
            id="newEmail"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">{settingsData.changeEmailButtonLabel}</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ChangeEmail;