import { cn } from "../utils/cn";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./select";
interface props{
    Options:Options[];
    onOptionChange:(Option:string)=>void;
    className:string;
    placeholder:string;
}
interface Options{
    value:string;
    label:string;
}
export default function SelectInput({Options,onOptionChange,className,placeholder}:props){
    return (
        <Select onValueChange={(value) => {
            onOptionChange(value);
        }}>
            <SelectTrigger className={cn("w-[180px]",className)}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {Options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}