import React from "react";


const CustomToolbar = (props) => {
  const { label, onNavigate } = props;

  const goToBack = () => onNavigate("PREV");
  const goToNext = () => onNavigate("NEXT");
  const goToToday = () => onNavigate("TODAY");

  return (
  
      <div className="custom-toolbar">
        <button
          onClick={goToBack}
          className="text-lg border border-red-600 w-1/3 h-[50px]"
        >
          Back
        </button>
        <ToggleButton
          onClick={goToToday}
          className="text-lg border border-red-600 w-1/3 h-[50px]"
        >
          Today
        </ToggleButton>
        <ToggleButton
          onClick={goToNext}
          className="text-lg border border-red-600 w-1/3 h-[50px]"
        >
          Next
        </ToggleButton>
        <span>{label}</span>
      </div>
    
  );
};

export default CustomToolbar;
