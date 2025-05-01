import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Schedule } from "../components/Slot/Schedule";
//import { SlotPage } from "../components/Slot/Slot"; // Import SlotPage
import { useToast } from "../ui/use-toast";
import { fetchSlots, getAllSchedules } from "../api/slots";
import { ScheduleType } from "../interfaces/Schedule";
import {
  AlertDialog,
  // AlertDialogCancel,
  AlertDialogContent,
  // AlertDialogDescription,
  // AlertDialogFooter,
  // AlertDialogHeader,
  // AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/AlertBox";
// import { Loader } from "../ui";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { Turf } from "../interfaces";
import { getTurfs } from "../api/slots";
// import { DatePickerWithRange } from "../ui/DateRange";
// import { addDays } from "date-fns";
// import { DateRange } from "react-day-picker";
import { Tabs} from "../ui/tabs";
// import { useNavigate } from "react-router-dom";
// import { SlotPage } from "../components/Slot/Slot";
// import { Label, LabelInputContainer } from "../ui";
import { useForm } from "react-hook-form";
// import SelectInput from "../ui/SelectInput";

// const slots = [
//   {
//     date: "2021-09-01",
//     startTime: "10:00 AM",
//     endTime: "12:00 PM",
//   },
//   {
//     date: "2021-09-01",
//     startTime: "02:00 PM",
//     endTime: "04:00 PM",
//   },
//   {
//     date: "2021-09-02",
//     startTime: "10:00 AM",
//     endTime: "12:00 PM",
//   },
//   {
//     date: "2021-09-02",
//     startTime: "02:00 PM",
//     endTime: "04:00 PM",
//   },
// ]

export function Slot() {
  const { setValue } = useForm();
  const [turfList, setTurfList] = useState([]);
  const [chosenTurf, setChosenTurf] = useState("");
  const [chosenTurfKey, setChosenTurfKey] = useState("");

  useEffect(() => {
    getTurfs()
      .then((data) => {
        console.log(data.data);
        setTurfList(data.data);
      })
      .catch((error) => {
        console.error("Error during GET request:", error);
      });
  }, []);

  const handleTurfChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTurfName = e.target.value;
    setChosenTurf(selectedTurfName);
    setValue("turf", selectedTurfName);

    const selectedTurf = turfList.find((turf: any) => turf.name === selectedTurfName);
    if (selectedTurf) {
      setChosenTurfKey(selectedTurf._id);
    }
  };

  return (
    <div className="my-10">
      <select
          id="turf"
          name="turf"
          className="w-full border rounded p-2 bg-gray-800 text-white"
          value={chosenTurf}
          onChange={handleTurfChange}
          >
          <option value="" disabled>Select Your Turf</option>
          {turfList.map((turf: any) => (
            <option key={turf._id} value={turf.name} className="bg-gray-800 text-white">
            {turf.name}
            </option>
          ))}
      </select>
      <SchedulePage turf={chosenTurfKey} />
        
      <Tabs defaultValue="Schedule" className="space-y-4">
        {/* <TabsList>
          <TabsTrigger value="Schedule">Schedule</TabsTrigger>
          <TabsTrigger value="Slots">Slots</TabsTrigger>
        </TabsList> */}

        {/* <LabelInputContainer>
          <Label htmlFor="turf">Turf</Label> */}
            
        {/* </LabelInputContainer> */}

        {/* <TabsContent value="Schedule" className="space-y-4"> */}
        {/* </TabsContent> */}
        {/* <TabsContent value="Slots" className="space-y-4">
          <SlotsPage turfId="" />
        </TabsContent> */}
      </Tabs>
    </div>
  );
}

// export function SlotsPage({ turfId }: { turfId: string }) {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [slots, setSlots] = useState<any[]>([]);
//   const { toast } = useToast();

//   useEffect(() => {
//     async function fetchSlots() {
//       try {
//         setLoading(true);
//         const response = await getAllSchedules(); // Replace with actual API for slots
//         setSlots(response?.data || []);
//       } catch (error: any) {
//         toast({
//           title: "Error",
//           description: error.message,
//         });
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchSlots();
//   }, [turfId]);

//   return (
//     <div className="p-5">
//       <h1 className="text-3xl mb-4">Slots</h1>
//       {loading ? (
//         <div className="text-center">
//           <Loader />
//         </div>
//       ) : slots.length === 0 ? (
//         <p className="text-center text-lg">No slots available.</p>
//       ) : (
//         <SlotPage />
//       )}
//     </div>
//   );
// }

export function SchedulePage({ turf }: { turf: string }) {
  console.log('turfID in schedulePage', turf);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [schedules, setSchedules] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchSchedules() {
      try {
        if(turf === "") return;
        const response = await getAllSchedules(turf);
        console.log('response', response);
        setSchedules(response.data);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
        });
      }
    }
    fetchSchedules();
  }, [turf, showForm]);

  if (showForm) return <Schedule setShowForm={setShowForm} turf={turf} />;
  return (
    <div>
      <div className="flex justify-between items-center p-5">
        <h1 className="text-3xl">Schedule</h1>
        <Button
          variant="default"
          size="lg"
          className="text-lg"
          onClick={() => setShowForm(true)}
        >
          Create new Schedule
        </Button>
      </div>
      <div className="flex flex-col ">
        {schedules.length === 0 && (
          <h1 className="text-3xl text-center">No schedules found</h1>
        )}
        {schedules.map((schedule: ScheduleType, index) => (
          <ScheduleCard index={index} schedule={schedule} key={index} turfId={turf} />
        ))}
      </div>
    </div>
  );
}

// const weekDays = [
//   "monday",
//   "tuesday",
//   "wednesday",
//   "thursday",
//   "friday",
//   "saturday",
//   "sunday",
// ];

function ScheduleCard({
  schedule,
  index,
  turfId
}: {
  schedule: ScheduleType;
  index: number;
  turfId: string;
}) {
  // const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [slots, setSlots] = useState<any[]>([]);
  // const [date, setDate] = useState<DateRange>({
  //   from: new Date(),
  //   to: addDays(new Date(), 10),
  // });
  // const { toast } = useToast();
  // const navigate = useNavigate();

  useEffect(() => {
    fetchSlots(turfId, schedule._id)
      .then((data) => {
        console.log(data.data);
        setSlots(data.data);
      })
      .catch((error) => {
        console.error("Error during GET request:", error);
      });

  }, []);

  return (
    <div className="flex flex-col justify-between border mb-4 p-4 rounded-md cursor-pointer mr-6">
      <div className="flex justify-between">
        <h1 className="text-xl">Schedule {index + 1}</h1>
        <div className="flex gap-4">
            <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger className="relative flex items-center rounded-lg text-md px-4 py-2 bg-orange-800 hover:bg-accent cursor-pointer">
              View Slots
            </AlertDialogTrigger>
            <AlertDialogContent>
              <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Available Slots</h2>
              <button onClick={() => setOpen(false)} className="text-xl font-bold">&times;</button>
              </div>
              <div className="mt-4">
                {slots && slots.length > 0 ? (
                <ul className="space-y-2">
                {slots.map((slot, index) => (
                  <li key={index} className="border p-4 rounded flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    {/* <MdEvent /> */}
                  <p>{slot.day}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* <MdAccessTime /> */}
                  <p>Start Time: {slot.startTime}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* <MdAccessTime /> */}
                  <p>End Time: {slot.endTime}</p>
                  </div>
                  </li>
                ))}
                </ul>
                ) : (
                <p>No slots available.</p>
                )}
              </div>
            </AlertDialogContent>
            </AlertDialog>
        </div>
      </div>
    </div>
  );
}
