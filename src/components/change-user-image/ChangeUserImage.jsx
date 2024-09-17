import { useState } from "react";
import { changeUserImage } from "../../utils/api-connector";
import FileBase64 from "react-file-base64";
import { useLanguageContext } from "../../store/language-context/LanguageContext.jsx";
import "./ChangeUserImage.css";
import ToggleButton from "../toggle-button/ToggleButton";

const ChangeUserImage = () => {
  const [showForm, setShowForm] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { settingsData } = useLanguageContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await changeUserImage(newImage);
      setMessage(response.message);
    } catch (error) {
      setError(error.message);
    }
  };

  return !showForm ? (
    <ToggleButton
      onToggle={() => setShowForm(true)}
      buttonName={settingsData.changeUserImageButtonLabel}
      className="button-type-standard"
    />
  ) : (
    <div className="change-user-image-container">
      <h2>{settingsData.changeUserImageButtonLabel}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="newImage">{settingsData.newImageLabel}</label>
          <FileBase64
            multiple={false}
            onDone={({ base64 }) => setNewImage(base64)}
          />
        </div>
        <button type="submit">{settingsData.changeUserImageButtonLabel}</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ChangeUserImage;