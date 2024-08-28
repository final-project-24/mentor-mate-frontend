import { useState } from "react";
import { changeEmail } from "../../utils/api-connector";
import "./ChangeEmail.css";
import ToggleButton from "../toggle-button/ToggleButton";

const ChangeEmail = () => {
  const [showForm, setShowForm] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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
      buttonName="Change Email"
      className="change-email-button"
    />
  ) : (
    <div className="change-email-container">
      <h2>Change Email</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="newEmail">New Email:</label>
          <input
            type="email"
            id="newEmail"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Email</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ChangeEmail;