import { useState } from "react";
import { changeUserName } from "../../utils/api-connector";
import { useLanguageContext } from "../../store/language-context/LanguageContext.jsx";
import "./ChangeUserName.css";
import ToggleButton from "../toggle-button/ToggleButton";

const ChangeUserName = () => {
  const [showForm, setShowForm] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { settingsData } = useLanguageContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await changeUserName(newUserName);
      setMessage(response.message);
    } catch (error) {
      setError(error.message);
    }
  };

  return !showForm ? (
    <ToggleButton
      onToggle={() => setShowForm(true)}
      buttonName={settingsData.changeUsernameButtonLabel}
      className="button-type-standard"
    />
  ) : (
    <div className="change-user-name-container">
      <h2>{settingsData.changeUsernameTitle}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="newUserName">{settingsData.newUsernameLabel}</label>
          <input
            type="text"
            id="newUserName"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            required
          />
        </div>
        <button type="submit">{settingsData.changeUsernameButtonLabel}</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ChangeUserName;
