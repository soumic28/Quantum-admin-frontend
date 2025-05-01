import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../ui";

export default function ScheduleDetails() {
  const { day, index } = useParams<{ day: string; index: string }>();
  const navigate = useNavigate();

  const [slotDetails, setSlotDetails] = useState<any>(null);

  useEffect(() => {
    if (day && index) {
      // Fetch the slot details based on the day and index
      // In a real app, you might want to fetch data from an API or database
      const fetchSlotDetails = () => {
        // Simulate the schedule data fetching logic
        const scheduleData = {
          monday: [
            { startTime: "09:00", endTime: "10:00", price: 20, description: "Morning session" },
            { startTime: "10:00", endTime: "11:00", price: 25, description: "Mid-morning session" },
          ],
          tuesday: [
            { startTime: "09:00", endTime: "10:00", price: 20, description: "Morning session" },
            { startTime: "11:00", endTime: "12:00", price: 30, description: "Midday session" },
          ],
          // Add data for other days as well
        };

        // Get the slot details based on the day and index
        const selectedSlot = scheduleData[day]?.[parseInt(index)];
        setSlotDetails(selectedSlot);
      };

      fetchSlotDetails();
    }
  }, [day, index]);

  if (!slotDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <h1>Schedule Details</h1>
      <p>
        <strong>Day:</strong> {day}
      </p>
      <p>
        <strong>Time:</strong> {slotDetails.startTime} - {slotDetails.endTime}
      </p>
      <p>
        <strong>Price:</strong> ${slotDetails.price}
      </p>
      <p>
        <strong>Description:</strong> {slotDetails.description}
      </p>
      <Button onClick={() => navigate("/")}>Back to Schedule</Button>
    </div>
  );
}