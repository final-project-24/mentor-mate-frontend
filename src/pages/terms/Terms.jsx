import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import terms from "../../assets/data/terms.json";

const Terms = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      const id = new URLSearchParams(location.search).get("id");
      if (id) {
        navigate(`/booking/${id}`, { state: { agreed: true } });
      } else {
        console.error("ID not found in URL");
      }
    }
  };

  const handleGoBack = () => {
    const id = new URLSearchParams(location.search).get("id");
    if (id) {
      navigate(`/booking/${id}`, { state: { agreed: isChecked } });
    } else {
      console.error("ID not found in URL");
    }
  };

  return (
    <div className="terms-page">
      <h1>Terms and Conditions</h1>
      <p>{terms.terms}</p>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        I agree to the terms and conditions
      </label>
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
};

export default Terms;
