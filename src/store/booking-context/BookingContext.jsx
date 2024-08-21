import { createContext, useState, useContext, useEffect } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingId, setBookingId] = useState(null);
  const [isAgreed, setIsAgreed] = useState(false);

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

  // ==================================================

  return (
    <BookingContext.Provider
      value={{ bookingId, setBookingId, isAgreed, setIsAgreed }}
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
