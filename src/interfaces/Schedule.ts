import { Slot } from "./Slot";

export interface ScheduleType {
    _id?: string;
    monday: [Slot],
    tuesday: [Slot],
    wednesday: [Slot],
    thursday: [Slot],
    friday: [Slot],
    saturday: [Slot],
    sunday: [Slot],
}