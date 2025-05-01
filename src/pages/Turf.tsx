import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { TurfForm } from "../components/Turf/TurfForm";
import { Turf } from "../interfaces/Turf";
import { getTurfs } from "../api/turf";
import TurfList from "../components/Turf/TurfList";

export default function TurfPage() {
  const [turfs, setTurfs] = useState<Turf[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const fetchTurfs = async () => {
      const response = await getTurfs();
      setTurfs(response.data);
      console.log("Truf details",response.data);
    };
    fetchTurfs();
  }, []);
  return (
    <div className="mx-auto mt-8">
      <div className="flex justify-between items-center p-5">
        <h1 className="text-3xl">Turfs</h1>
        <Button
          variant={showForm ? "destructive" : "default"}
          size="lg"
          onClick={() => setShowForm(!showForm)}
          className="text-lg"
        >
          {showForm ? "Close Form" : "Create Turf"}
        </Button>
      </div>
      {!showForm && turfs.length === 0 && (
        <p className="w-full flex items-center text-5xl capitalize justify-center  h-[calc(100vh-10rem)]">
          no turfs listed{" "}
        </p>
      )}
      {showForm && <TurfForm />}
      {!showForm && turfs.length > 0 && (
        <div className="my-5">
          <TurfList itemsList={turfs} />
        </div>
      )}
    </div>
  );
}
