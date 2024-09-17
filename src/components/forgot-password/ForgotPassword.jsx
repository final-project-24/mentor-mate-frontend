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
    <div className="forgot-password-container border mx-2 mt-[180px] mb-[250px] w-[95%]">
      <h2 className="pb-4 text-accent md:text-lg">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="md:text-lg">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;
