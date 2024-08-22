import { useState } from "react";
import { forgotPassword } from "../../utils/api-connector"; 
import "./ForgotPassword.css";

function ForgotPassword({ onResetRequest }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setMessage("Password reset email sent. Check your inbox.");
      setEmail("");
      if (onResetRequest) onResetRequest(); // Optionally handle post-reset request actions
    } catch (error) {
      setMessage("Error sending password reset email.");
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;
