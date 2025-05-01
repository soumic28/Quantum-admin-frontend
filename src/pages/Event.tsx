import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { EventForm } from "../components/Event/EventForm";
import { Event } from "../interfaces";
import { getEvents } from "../api/event";
import EventList from "../components/Event/EventList";

export default function EventPage() {
  const [events, setEvents] = useState<Event[] | null>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await getEvents();
      setEvents(response.data);
      console.log(response.data);
    };
    fetchEvents();
  }, []);
  return (
    <div className="mx-auto mt-8">
      <div className="flex justify-between items-center p-5">
        <h1 className="text-3xl">Events</h1>
        <Button
          variant={showForm ? "destructive" : "default"}
          size="lg"
          onClick={() => setShowForm(!showForm)}
          className="text-lg"
        >
          {showForm ? "Close Form" : "Create Event"}
        </Button>
      </div>
      {!showForm && !events && (
        <p className="w-full flex items-center text-5xl capitalize justify-center  h-[calc(100vh-10rem)]">
          no Events listed{" "}
        </p>
      )}
      {showForm && <EventForm />}
      {!showForm && events && events.length > 0 && (
        <div className="">
          <EventList itemsList={events} />
        </div>
      )}
    </div>
  );
}
