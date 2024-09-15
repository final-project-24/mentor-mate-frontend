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
import "./MentorAvailabilityCalendar.css";

const localizer = momentLocalizer(moment);

const MentorAvailabilityCalendar = ({ mentorUuid, userRole }) => {
  const [events, setEvents] = useState([]); // State to store the availability events
  const [selectedSlot, setSelectedSlot] = useState(null); // State to store the selected slot
  const { setBookingId, selectedSkill } = useBookingContext(); // Use the booking context to set the event ID
  const navigate = useNavigate();

  // Fetch availability data when the mentor ID or user role changes
  useEffect(() => {
    fetchAvailabilityData();
  }, [mentorUuid, userRole]);

  // Fetch availability data from the API
  const fetchAvailabilityData = async () => {
    try {
      const response = await fetchAvailability(mentorUuid); // Fetch the availability data from the API
      const formattedEvents = response.map((slot) => ({
        start: new Date(slot.start),
        end: new Date(slot.end),
        title: slot.title || "30 min session",
        id: slot._id,
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  };

// Handle slot selection
const handleSelectSlot = (slotInfo) => {
  if (userRole === "mentor") {
    const start = new Date(slotInfo.start);
    const end = new Date(start);

    // Check if the selected slot is a whole day
    if (slotInfo.slots.length === 1 && slotInfo.slots[0].getHours() === 0) {
      start.setHours(12, 0, 0, 0); // Set start time to 12 PM
      end.setHours(13, 0, 0, 0); // Set end time to 1 PM
    } else {
      end.setMinutes(start.getMinutes() + 60); // Set the end time to 60 minutes after the start time
    }

    setSelectedSlot({ start, end });
  }
};

  // Handle adding availability
  const handleAddAvailability = async () => {
    if (!selectedSlot) return; // Return if no slot is selected

    try {
      await addAvailability(selectedSlot.start, selectedSlot.end);
      fetchAvailabilityData();
      setSelectedSlot(null);
    } catch (error) {
      console.error("Error adding availability:", error);
    }
  };

  // Handle booking a slot
  const handleBookSlot = async (event) => {
    if (userRole !== "mentee") return; // Return if the user is not a mentee

    try {
      await bookSlot(event.id, selectedSkill._id); // Include selectedSkill in the request
      fetchAvailabilityData();
      setBookingId(event.id); // Set the booking ID in the context
      navigate(`/booking/${event.id}`); // Redirect to BookingDetails page with event ID
    } catch (error) {
      console.error("Error booking slot:", error);
    }
  };

  return (
    <div
      className="calendar-container w-[90%] h-[90%] border  border-red-600  flex flex-col lg:flex-row mb-[100px]"
      style={{ height: "calc(100vh)" }}
    >
      <div
        className={`calendar flex flex-col lg:flex transition-all duration-300   ${
          selectedSlot ? "lg:w-[70%]" : "w-full"
        }`}
      >
        <div className="text-lg">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            className="w-[100%] h-[100vh] flex overflow-hidden  "
            selectable={userRole === "mentor"}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleBookSlot}
          />
        </div>
      </div>
      {userRole === "mentor" && selectedSlot && (
        <div className="selected-slot-info lg:w-[50%] mt-4 p-4 bg-blue-100 rounded flex flex-col items-center justify-center transition-all duration-300">
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

