import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../store/booking-context/BookingContext";
import {
  fetchAvailability,
  addAvailability,
  bookSlot,
} from "../../utils/api-connector";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MentorAvailabilityCalendar = ({ mentorId, userRole }) => {
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const { setBookingId } = useBookingContext(); // Use the booking context
  const navigate = useNavigate();

  useEffect(() => {
    fetchAvailabilityData();
  }, [mentorId, userRole]);

  const fetchAvailabilityData = async () => {
    try {
      const response = await fetchAvailability(mentorId); // efgef the id should be fetched in the backend
      const formattedEvents = response.map((slot) => ({
        start: new Date(slot.start),
        end: new Date(slot.end),
        title: slot.title || "Available",
        id: slot._id,
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  };

  const handleSelectSlot = (slotInfo) => {
    if (userRole === "mentor") {
      setSelectedSlot(slotInfo);
    }
  };

  const handleAddAvailability = async () => {
    if (!selectedSlot) return;

    try {
      await addAvailability(selectedSlot.start, selectedSlot.end);
      fetchAvailabilityData();
      setSelectedSlot(null);
    } catch (error) {
      console.error("Error adding availability:", error);
    }
  };

  const handleBookSlot = async (event) => {
    if (userRole !== "mentee") return;

    try {
      await bookSlot(event.id);
      fetchAvailabilityData();
      setBookingId(event.id); // Set the booking ID in the context
      navigate(`/booking/${event.id}`); // Redirect to BookingDetails page with event ID dhfdf
    } catch (error) {
      console.error("Error booking slot:", error);
    }
  };

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        selectable={userRole === "mentor"}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleBookSlot}
      />
      {userRole === "mentor" && selectedSlot && (
        <div className="mt-4 p-4 bg-blue-100 rounded">
          <h3 className="text-lg font-semibold">Add Availability</h3>
          <p>
            Start: {moment(selectedSlot.start).format("MMMM Do YYYY, h:mm a")}
          </p>
          <p>End: {moment(selectedSlot.end).format("MMMM Do YYYY, h:mm a")}</p>
          <button
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleAddAvailability}
          >
            Add Availability
          </button>
        </div>
      )}
    </div>
  );
};

export default MentorAvailabilityCalendar;
