import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./TermsAndConditions.css";

const TermsAndConditions = ({ onAgree, id }) => {
  const [isChecked, setIsChecked] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.agreed) {
      setIsChecked(true);
      onAgree(true);
    }
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onAgree(!isChecked);
  };

  const handleReadTerms = () => {
    if (id) {
      navigate(`/terms?id=${id}`);
    } else {
      console.error("ID not found in props");
    }
  };

  return (
    <div className="terms-container">
      <button onClick={handleReadTerms}>Read the terms and conditions</button>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        I agree to the terms and conditions
      </label>
    </div>
  );
};

export default TermsAndConditions;
