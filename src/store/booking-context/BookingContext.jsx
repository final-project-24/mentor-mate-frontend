import { createContext, useState, useContext, useEffect } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingId, setBookingId] = useState(null); // data from Booking.jsx
  const [isAgreed, setIsAgreed] = useState(false);
  const [selectedMentorUuid, setSelectedMentorUuid] = useState(null); // data from InfoCard.jsx
  const [selectedSkill, setSelectedSkill] = useState(null); // data from InfoCard.jsx
  const [mentors, setMentors] = useState([]); // data from SearchBar.jsx / and other search components

  // Debug logs ========================================

  useEffect(() => {
    console.log("BookingContext initialized");
  }, []);

  useEffect(() => {
    console.log("bookingId changed:", bookingId);
  }, [bookingId]);

  useEffect(() => {
    console.log("isAgreed changed:", isAgreed);
  }, [isAgreed]);

  useEffect(() => {
    console.log("selectedMentorUuid changed:", selectedMentorUuid);
  }, [selectedMentorUuid]);

  useEffect(() => {
    console.log("selectedSkill changed:", selectedSkill);
  }, [selectedSkill]);

  useEffect(() => {
    console.log("mentors changed:", mentors);
  }, [mentors]);

  // ==================================================

  return (
    <BookingContext.Provider
      value={{
        bookingId,
        setBookingId,
        isAgreed,
        setIsAgreed,
        selectedMentorUuid,
        setSelectedMentorUuid,
        selectedSkill,
        setSelectedSkill,
        mentors,
        setMentors,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

// export const useBookingContext = () => useContext(BookingContext);

// export with debug logs ========================================

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    console.error("useBookingContext must be used within a BookingProvider");
  }
  return context;
};
