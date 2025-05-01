// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface Slot {
//   _id: string;
//   turfId: string;
//   startTime: string;
//   endTime: string;
//   price: number;
//   day: string;
//   isAvailable: 'available' | 'booked' | 'blocked';
// }

// const SlotPage: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<'schedule' | 'slots'>('schedule');
//   const [slots, setSlots] = useState<Slot[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');

//   useEffect(() => {
//     if (activeTab === 'slots') {
//       fetchSlots();
//     }
//   }, [activeTab]);

//   const fetchSlots = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get('/api/slots'); // Replace with actual API
//       setSlots(response.data.data || []);
//     } catch (err) {
//       setError('Failed to fetch slots.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDateTime = (dateTime: string) => new Date(dateTime).toLocaleString();

//   return (
//     <div className="p-6 bg-gray-900 min-h-screen text-white">
//       <h1 className="text-2xl font-bold mb-6">Quantum Admin</h1>

//       {/* Tab Buttons */}
//       <div className="flex mb-4">
//         <button
//           onClick={() => setActiveTab('schedule')}
//           className={`px-4 py-2 rounded-l ${
//             activeTab === 'schedule' ? 'bg-black text-blue-400' : 'bg-gray-700'
//           }`}
//         >
//           Schedule
//         </button>
//         <button
//           onClick={() => setActiveTab('slots')}
//           className={`px-4 py-2 rounded-r ${
//             activeTab === 'slots' ? 'bg-black text-blue-400' : 'bg-gray-700'
//           }`}
//         >
//           Slots
//         </button>
//       </div>

//       {/* Tab Content */}
//       <div>
//         {activeTab === 'schedule' && (
//           <div>
//             <p className="text-lg">This is the Schedule tab content.</p>
//             {/* Add Schedule-specific UI here */}
//           </div>
//         )}

//         {activeTab === 'slots' && (
//           <div>
//             {loading ? (
//               <p>Loading slots...</p>
//             ) : error ? (
//               <p className="text-red-500">{error}</p>
//             ) : slots.length > 0 ? (
//               <table className="w-full bg-gray-800 rounded-md overflow-hidden">
//                 <thead>
//                   <tr className="bg-gray-700">
//                     <th className="p-2">Turf ID</th>
//                     <th className="p-2">Day</th>
//                     <th className="p-2">Start Time</th>
//                     <th className="p-2">End Time</th>
//                     <th className="p-2">Price</th>
//                     <th className="p-2">Availability</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {slots.map((slot) => (
//                     <tr key={slot._id} className="text-center border-t border-gray-700">
//                       <td className="p-2">{slot.turfId}</td>
//                       <td className="p-2">{new Date(slot.day).toLocaleDateString()}</td>
//                       <td className="p-2">{formatDateTime(slot.startTime)}</td>
//                       <td className="p-2">{formatDateTime(slot.endTime)}</td>
//                       <td className="p-2">₹{slot.price}</td>
//                       <td
//                         className={`p-2 font-bold ${
//                           slot.isAvailable === 'available'
//                             ? 'text-green-400'
//                             : slot.isAvailable === 'booked'
//                             ? 'text-yellow-400'
//                             : 'text-red-400'
//                         }`}
//                       >
//                         {slot.isAvailable}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <p>No slots available.</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SlotPage;








































// import { useState } from "react";
// import { Button } from "../../ui";
// import { timeList } from "../../constants";
// import { addSchedule } from "../../api/slots";
// import { useToast } from "../../ui/use-toast";

// export function SlotPage({ day, slots, setSlots }: SlotProps) {
//   const [newSlot, setNewSlot] = useState({
//     startTime: "",
//     endTime: "",
//     price: 0,
//   });
//   const { toast } = useToast();

//   const addNewSlot = async () => {
//     // Add a new slot locally
//     const updatedSlots = [...slots[day], { ...newSlot }];
//     setSlots((prevSlots: any) => ({
//       ...prevSlots,
//       [day]: updatedSlots,
//     }));

//     try {
//       // Update database with new slots
//       const response = await addSchedule({ [day]: updatedSlots });
//       toast({
//         title: "Slot Added",
//         description: response.message,
//         variant: "default",
//       });
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="flex flex-col items-center gap-4">
//       <h2 className="text-lg font-semibold capitalize">{day}</h2>

//       <div className="flex gap-2 items-center">
//         <select
//           className="border p-2"
//           value={newSlot.startTime}
//           onChange={(e) =>
//             setNewSlot({ ...newSlot, startTime: e.target.value })
//           }
//         >
//           <option value="">Start Time</option>
//           {timeList.map((time, index) => (
//             <option key={index} value={time.value}>
//               {time.label}
//             </option>
//           ))}
//         </select>

//         <select
//           className="border p-2"
//           value={newSlot.endTime}
//           onChange={(e) =>
//             setNewSlot({ ...newSlot, endTime: e.target.value })
//           }
//         >
//           <option value="">End Time</option>
//           {timeList.map((time, index) => (
//             <option key={index} value={time.value}>
//               {time.label}
//             </option>
//           ))}
//         </select>

//         <input
//           type="number"
//           placeholder="Price"
//           value={newSlot.price}
//           className="border p-2 w-20"
//           onChange={(e) =>
//             setNewSlot({ ...newSlot, price: parseInt(e.target.value) || 0 })
//           }
//         />

//         <Button onClick={addNewSlot}>Create New Slot</Button>
//       </div>

//       <div>
//         {slots[day]?.map((slot, index) => (
//           <div key={index} className="flex gap-3 items-center">
//             <p>
//               {slot.startTime} - {slot.endTime} | Price: {slot.price}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// interface SlotProps {
//   day: string;
//   slots: {
//     [key: string]: { startTime: string; endTime: string; price: number }[];
//   };
//   setSlots: React.Dispatch<
//     React.SetStateAction<{
//       [key: string]: { startTime: string; endTime: string; price: number }[];
//     }>
//   >;
// }

// export default SlotPage;


































// import { useState } from "react";
// import { Button, Input, Label } from "../../ui";
// import { FaPlus, FaTrash, FaRegCopy, FaPaste } from "react-icons/fa";
// import { timeList } from "../../constants";
// // import { useToast } from "../../ui/use-toast";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../../ui/select";
// import { addSchedule } from "../../api/slots";
// import { Switch } from "@radix-ui/react-switch";

// Define initial state for week schedule
// const initialWeekState: { [key: string]: boolean } = {
//   monday: true,
//   tuesday: true,
//   wednesday: true,
//   thursday: true,
//   friday: true,
//   saturday: false,
//   sunday: false,
// };

// const initialWeekData = {
//   monday: [],
//   tuesday: [],
//   wednesday: [],
//   thursday: [],
//   friday: [],
//   saturday: [],
//   sunday: [],
// };

// export function SlotPage() {
//   const [weekState, setWeekState] = useState<{ [key: string]: boolean }>(
//     initialWeekState
//   );
//   const [copyDay, setCopyDay] = useState<string>("");
//   const [slots, setSlots] = useState<{
//     [key: string]: { startTime: string; endTime: string; price: number }[];
//   }>(initialWeekData);
//   const { toast } = useToast();

//   const handleSubmit = async () => {
//     try {
//       const response = await addSchedule(slots);
//       toast({
//         title: "Success",
//         description: response.message,
//         variant: "default",
//       });
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     }
//   };

//   const copySlotsToOtherDay = (pasteDay: string) => {
//     setSlots((prevSlots) => ({
//       ...prevSlots,
//       [pasteDay]: prevSlots[copyDay].map((slot) => ({ ...slot })),
//     }));
//   };

//   const addNewSlot = () => {
//     // Add a new slot (you can define logic here to add a slot)
//     console.log("Creating a new slot...");
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center p-5">
//         <h1 className="text-3xl">Create Slot</h1>
//         <Button
//           variant="destructive"
//           className="text-lg"
//           onClick={() => console.log("Cancel")}
//         >
//           Cancel
//         </Button>
//       </div>
//       <div className="flex flex-col gap-3 m-10 items-center">
//         <div>
//           {/* Render weekly schedule toggles */}
//           {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((item, index) => {
//             return (
//               <Toggle
//                 key={index}
//                 day={item}
//                 isActive={weekState[item]}
//                 setWeekState={setWeekState}
//                 slots={slots}
//                 setSlots={setSlots}
//                 setCopyDay={setCopyDay}
//                 copySlotsToOtherDay={copySlotsToOtherDay}
//               />
//             );
//           })}
//         </div>
//         <div className="flex justify-center items-center gap-5 mt-5">
//           {/* Button to create new slot */}
//           <Button variant="default" size="lg" onClick={addNewSlot}>
//             Create New Slot
//           </Button>
//           <Button variant="default" size="lg" onClick={handleSubmit}>
//             Submit
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// interface ToggleProps {
//   day: string;
//   isActive: boolean;
//   setWeekState: React.Dispatch<
//     React.SetStateAction<{ [key: string]: boolean }>
//   >;
//   slots: {
//     [key: string]: { startTime: string; endTime: string; price: number }[];
//   };
//   setSlots: React.Dispatch<
//     React.SetStateAction<{
//       [key: string]: { startTime: string; endTime: string; price: number }[];
//     }>
//   >;
//   setCopyDay: React.Dispatch<React.SetStateAction<string>>;
//   copySlotsToOtherDay: (copyDay: string) => void;
// }

// const Toggle = ({
//   day,
//   isActive,
//   setWeekState,
//   slots,
//   setSlots,
//   setCopyDay,
//   copySlotsToOtherDay,
// }: ToggleProps) => {
//   const [checked, setChecked] = useState(isActive);

//   const handleToggleChange = () => {
//     setChecked(!checked);
//     setWeekState((prevState) => ({
//       ...prevState,
//       [day]: !checked,
//     }));
//     if (checked) {
//       setSlots((prevSlots) => ({
//         ...prevSlots,
//         [day]: [],
//       }));
//     }
//   };

//   const addSlot = () => {
//     setSlots((prevSlots) => ({
//       ...prevSlots,
//       [day]: [...prevSlots[day], { startTime: "", endTime: "", price: 0 }],
//     }));
//   };

//   const removeSlot = (index: number) => {
//     setSlots((prevSlots) => ({
//       ...prevSlots,
//       [day]: prevSlots[day].filter((_, i) => i !== index),
//     }));
//   };

//   const updateSlot = (
//     index: number,
//     startTime: string,
//     endTime: string,
//     price: number
//   ) => {
//     setSlots((prevSlots) => {
//       const newSlots = [...prevSlots[day]];
//       newSlots[index] = { startTime, endTime, price };
//       return {
//         ...prevSlots,
//         [day]: newSlots,
//       };
//     });
//   };

//   return (
//     <div className="flex flex-col mb-4">
//       <div className="flex gap-16 justify-between items-center w-full">
//         <div className="flex gap-2 p-3 items-center w-[200px]">
//           <Switch
//             id={day}
//             checked={checked}
//             onCheckedChange={handleToggleChange}
//           />
//           <Label htmlFor={day} className="capitalize">
//             {day}
//           </Label>
//         </div>
//         {checked && (
//           <div className="flex gap-3 justify-center items-center">
//             <FaPlus
//               className="text-slate-400 cursor-pointer"
//               onClick={addSlot}
//             />
//             <FaRegCopy
//               className="text-slate-400 cursor-pointer"
//               onClick={() => setCopyDay(day)}
//             />
//             <FaPaste
//               className="text-slate-400 cursor-pointer"
//               onClick={() => copySlotsToOtherDay(day)}
//             />
//           </div>
//         )}
//       </div>
//       <div className="w-full">
//         {slots[day].map((slot, index) => (
//           <div key={index} className="flex justify-between mb-2">
//             <div className="w-[200px]"></div>
//             <SlotData
//               slot={slot}
//               updateSlot={(startTime, endTime, price) =>
//                 updateSlot(index, startTime, endTime, price)
//               }
//               removeSlot={() => removeSlot(index)}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const SlotData = ({ slot, updateSlot, removeSlot }: SlotDataProps) => {
//   const [start, setStart] = useState(slot.startTime);
//   const [end, setEnd] = useState(slot.endTime);
//   const [price, setPrice] = useState(slot.price);

//   const handleStartChange = (value: string) => {
//     setStart(value);
//     updateSlot(value, end, price);
//   };

//   const handleEndChange = (value: string) => {
//     setEnd(value);
//     updateSlot(start, value, price);
//   };
//   const handlePriceChange = (value: number) => {
//     setPrice(value);
//     updateSlot(start, end, value);
//   };

//   return (
//     <div className="flex gap-3 justify-center items-center">
//       <div className="flex justify-center items-center gap-4">
//         <Select
//           value={start}
//           onValueChange={(value) => {
//             handleStartChange(value);
//           }}
//         >
//           <SelectTrigger className="w-[100px]">
//             <SelectValue placeholder="Start" />
//           </SelectTrigger>
//           <SelectContent>
//             {timeList.map((time, index) => (
//               <SelectItem key={index} value={time.value}>
//                 {time.label}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//         <span>-</span>
//         <Select
//           value={end}
//           onValueChange={(value) => {
//             handleEndChange(value);
//           }}
//         >
//           <SelectTrigger className="w-[100px]">
//             <SelectValue placeholder="End" />
//           </SelectTrigger>
//           <SelectContent>
//             {timeList.map((time, index) => (
//               <SelectItem key={index} value={time.value}>
//                 {time.label}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//         <Input
//           type="number"
//           placeholder="Price"
//           value={price}
//           className="w-20"
//           onChange={(e) => {
//             handlePriceChange(parseInt(e.target.value));
//           }}
//         />
//       </div>

//       <FaTrash className="cursor-pointer" onClick={removeSlot} />
//     </div>
//   );
// };

// interface SlotDataProps {
//   slot: { startTime: string; endTime: string; price: number };
//   updateSlot: (startTime: string, endTime: string, price: number) => void;
//   removeSlot: () => void;
// }

