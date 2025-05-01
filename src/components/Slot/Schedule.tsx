import {  useState } from "react";
import { Button, Input, Label } from "../../ui";
import { Switch } from "../../ui/Switch";
// import { FaPlus, FaTrash, FaRegCopy, FaPaste } from "react-icons/fa";
import { FaPlus, FaTrash } from "react-icons/fa";
import { timeList } from "../../constants";
import { useToast } from "../../ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { addSchedule } from "../../api/slots";

const initialWeekState: { [key: string]: boolean } = {
  monday: true,
  tuesday: true,
  wednesday: true,
  thursday: true,
  friday: true,
  saturday: false,
  sunday: false,
};

const initialWeekData = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
};

export function Schedule({
  setShowForm,
  turf,
}: {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  turf: string;
}) {
  const week = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const [weekState, setWeekState] = useState<{ [key: string]: boolean }>(
    initialWeekState
  );
  // const [copyDay, setCopyDay] = useState<string>("");
  const [slots, setSlots] = useState<{
    [key: string]: { startTime: string; endTime: string; price: number }[];
  }>(initialWeekData);
  const { toast } = useToast();
  const handleSubmit = async () => {
    try {
      const response = await addSchedule(slots, turf);
      toast({
        title: "Success",
        description: response.message,
        variant: "default",
      });
      setShowForm(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // const copySlotsToOtherDay = (pasteDay: string) => {
  //   setSlots((prevSlots) => ({
  //     ...prevSlots,
  //     [pasteDay]: prevSlots[copyDay].map((slot) => ({ ...slot })),
  //   }));
  // };

  return (
    <div>
      <div className="flex justify-between items-center p-5">
        <h1 className="text-3xl">Create Schedule</h1>
        <Button
          variant="destructive"
          className="text-lg"
          onClick={() => setShowForm(false)}
        >
          Cancel
        </Button>
      </div>
      <div className="flex flex-col gap-3 m-10 items-center">
        <div>
          {week.map((item, index) => {
            return (
              <Toggle
                key={index}
                day={item}
                isActive={weekState[item]}
                setWeekState={setWeekState}
                slots={slots}
                setSlots={setSlots}
                // setCopyDay={setCopyDay}
                // copySlotsToOtherDay={copySlotsToOtherDay}
              />
            );
          })}
        </div>
        <Button variant="default" size="lg" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}

interface ToggleProps {
  day: string;
  isActive: boolean;
  setWeekState: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
  slots: {
    [key: string]: { startTime: string; endTime: string; price: number }[];
  };
  setSlots: React.Dispatch<
    React.SetStateAction<{
      [key: string]: { startTime: string; endTime: string; price: number }[];
    }>
  >;
  setCopyDay?: React.Dispatch<React.SetStateAction<string>>;
  copySlotsToOtherDay?: (copyDay: string) => void;
}

const Toggle = ({
  day,
  isActive,
  setWeekState,
  slots,
  setSlots,
  // setCopyDay,
  // copySlotsToOtherDay,
}: ToggleProps) => {
  const [checked, setChecked] = useState(isActive);

  const handleToggleChange = () => {
    setChecked(!checked);
    setWeekState((prevState) => ({
      ...prevState,
      [day]: !checked,
    }));
    if (checked) {
      setSlots((prevSlots) => ({
        ...prevSlots,
        [day]: [],
      }));
    }
  };

  const addSlot = () => {
    setSlots((prevSlots) => ({
      ...prevSlots,
      [day]: [...prevSlots[day], { startTime: "", endTime: "", price: 0 }],
    }));
  };

  const removeSlot = (index: number) => {
    setSlots((prevSlots) => ({
      ...prevSlots,
      [day]: prevSlots[day].filter((_, i) => i !== index),
    }));
  };

  const updateSlot = (
    index: number,
    startTime: string,
    endTime: string,
    price: number
  ) => {
    setSlots((prevSlots) => {
      const newSlots = [...prevSlots[day]];
      newSlots[index] = { startTime, endTime, price };
      return {
        ...prevSlots,
        [day]: newSlots,
      };
    });
  };
  return (
    <div className="flex flex-col mb-4">
      <div className="flex gap-16 justify-between items-center w-full">
        <div className="flex gap-2 p-3 items-center w-[200px]">
          <Switch
            id={day}
            checked={checked}
            onCheckedChange={handleToggleChange}
          />
          <Label htmlFor={day} className="capitalize">
            {day}
          </Label>
        </div>
        {checked && (
          <div className="flex gap-3 justify-center items-center">
            <FaPlus
              className="text-slate-400 cursor-pointer"
              onClick={addSlot}
            />
            {/**add copy button and paste button */}
            {/* <FaRegCopy
              className="text-slate-400 cursor-pointer"
              onClick={() => setCopyDay(day)}
            />
            <FaPaste
              className="text-slate-400 cursor-pointer"
              onClick={() => copySlotsToOtherDay(day)}
            /> */}
          </div>
        )}
      </div>
      <div className="w-full">
        {slots[day].map((slot, index) => (
          <div key={index} className="flex justify-between mb-2">
            <div className="w-[200px]"></div>
            <SlotData
              slot={slot}
              updateSlot={(startTime, endTime, price) =>
                updateSlot(index, startTime, endTime, price)
              }
              removeSlot={() => removeSlot(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
interface SlotDataProps {
  slot: { startTime: string; endTime: string; price: number };
  updateSlot: (startTime: string, endTime: string, price: number) => void;
  removeSlot: () => void;
}
const SlotData = ({ slot, updateSlot, removeSlot }: SlotDataProps) => {
  const [start, setStart] = useState(slot.startTime);
  const [end, setEnd] = useState(slot.endTime);
  const [price, setPrice] = useState(slot.price);

  const handleStartChange = (value: string) => {
    setStart(value);
    updateSlot(value, end, price);
  };

  const handleEndChange = (value: string) => {
    setEnd(value);
    updateSlot(start, value, price);
  };
  const handlePriceChange = (value: number) => {
    setPrice(value);
    updateSlot(start, end, value);
  };
  return (
    <div className="flex gap-3 justify-center items-center">
      <div className="flex justify-center items-center gap-4">
        <Select
          value={start}
          onValueChange={(value) => {
            handleStartChange(value);
          }}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Start" />
          </SelectTrigger>
          <SelectContent>
            {timeList.map((time, index) => (
              <SelectItem key={index} value={time.value}>
                {time.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>-</span>
        <Select
          value={end}
          onValueChange={(value) => {
            handleEndChange(value);
          }}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="End" />
          </SelectTrigger>
          <SelectContent>
            {timeList.map((time, index) => (
              <SelectItem key={index} value={time.value}>
                {time.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="number"
          placeholder="Price"
          value={price}
          className="w-20"
          onChange={(e) => {
            handlePriceChange(parseInt(e.target.value));
          }}
        />
      </div>

      <FaTrash className="cursor-pointer" onClick={removeSlot} />
    </div>
  );
};
