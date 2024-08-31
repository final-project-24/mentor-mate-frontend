import { useState, useEffect } from "react";
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
// import "./MentorAvailabilityCalendar.css";

const localizer = momentLocalizer(moment);

const MentorAvailabilityCalendar = ({ mentorUuid, userRole }) => {
  const [events, setEvents] = useState([]); // State to store the availability events
  const [selectedSlot, setSelectedSlot] = useState(null); // State to store the selected slot
  const { setBookingId } = useBookingContext(); // Use the booking context to set the event ID
  const navigate = useNavigate();

  useEffect(() => {
    fetchAvailabilityData();
  }, [mentorUuid, userRole]); // Fetch availability data when the mentor ID or user role changes

  const fetchAvailabilityData = async () => {
    try {
      const response = await fetchAvailability(mentorUuid); // efgef the id should be fetched in the backend
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
  }; // Fetch availability data from the API

  const handleSelectSlot = (slotInfo) => {
    if (userRole === "mentor") {
      setSelectedSlot(slotInfo);
    }
  }; // Handle slot selection

  const handleAddAvailability = async () => {
    if (!selectedSlot) return; // Return if no slot is selected

    try {
      await addAvailability(selectedSlot.start, selectedSlot.end);
      fetchAvailabilityData();
      setSelectedSlot(null);
    } catch (error) {
      console.error("Error adding availability:", error);
    }
  }; // Handle adding availability

  const handleBookSlot = async (event) => {
    if (userRole !== "mentee") return; // Return if the user is not a mentee

    try {
      await bookSlot(event.id);
      fetchAvailabilityData();
      setBookingId(event.id); // Set the booking ID in the context
      navigate(`/booking/${event.id}`); // Redirect to BookingDetails page with event ID dhfdf
    } catch (error) {
      console.error("Error booking slot:", error);
    }
  }; // Handle booking a slot

  return (
    <div
      className="calendar-container flex flex-col lg:flex-row"
      style={{ height: "calc(100vh)" }}
    >
      <div
        className={`calendar flex   transition-all duration-300 ${
          selectedSlot ? "lg:w-[70%]" : "w-full"
        }`}
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100vh", width: "100%" }}
          selectable={userRole === "mentor"}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleBookSlot}
        />
      </div>
      {userRole === "mentor" && selectedSlot && (
        <div className="selected-slot-info lg:w-[30%] mt-4 p-4 bg-blue-100 rounded flex flex-col items-center justify-center transition-all duration-300">
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
