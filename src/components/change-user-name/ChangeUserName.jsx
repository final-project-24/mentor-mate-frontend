import { useState } from "react";
import { changeUserName } from "../../utils/api-connector";
import "./ChangeUserName.css";
import ToggleButton from "../toggle-button/ToggleButton";

const ChangeUserName = () => {
  const [showForm, setShowForm] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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
      buttonName="Change Username"
      className="button-type-standard"
    />
  ) : (
    <div className="change-user-name-container">
      <h2>Change Username</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="newUserName">New Username:</label>
          <input
            type="text"
            id="newUserName"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Username</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ChangeUserName;
