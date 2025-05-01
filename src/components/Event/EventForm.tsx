import { useEffect, useState } from "react";
import { BottomGradient, Input, Label, LabelInputContainer } from "../../ui";
import { getSports } from "../../api/sports";
import { getLocations } from "../../api/location";
import {
    Sport,
    Options,
    Location
} from "../../interfaces";
import { createEvent } from "../../api/event";
import { useToast } from "../../ui/use-toast";
import { MultipleUploadImage } from "../MultipleImageUpload";
import { RiDeleteBinLine } from "react-icons/ri";
import { useForm, Controller } from "react-hook-form";
import SelectInput from "../../ui/SelectInput";
import { DateTimePicker } from "../../ui/DatePicker";

export function EventForm() {
    const { register, handleSubmit, setValue, control, watch } = useForm();
    const [sportsOptions, setSportsOptions] = useState<Options[]>([]);
    const [locationOptions, setLocationOptions] = useState<Location[]>([]);
    const [stateList, setStateList] = useState<Options[]>([]);
    const [cityList, setCityList] = useState<Options[]>([]);
    const [start,setStart] =useState<Date | undefined>(undefined);
    const [end,setEnd] =useState<Date | undefined>(undefined);
    const generateRandomString = Math.random().toString(36).substring(2, 9);
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => {
        setExpanded(!expanded);
    };
    const { toast } = useToast();
    const images = watch("images", []);

    useEffect(() => {
        const locationWithState = locationOptions.filter((location: Location) => location.state === watch("address.state"));
        const newCityList = locationWithState.map((location: Location) => ({ value: location.city, label: location.city }));
        setCityList(newCityList);
        console.log(stateList,cityList)
    }, [watch("address.state")]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchSports = await getSports();
            const fetchLocations = await getLocations();
            setSportsOptions(fetchSports.data.map((sport: Sport) => ({ label:sport.name,value:sport._id })));
            setLocationOptions(fetchLocations.data.map((location: Location) => ({ state: location.state, city: location.city, id: location._id })));
            setStateList(() => {
                const unfilteredList = fetchLocations.data.map((location: Location) => ({ value: location.state, label: location.state }));
                const filteredList: Options[] = [];
                unfilteredList.forEach((location: Options) => {
                    if (!filteredList.find((state: Options) => state.value === location.value)) {
                        filteredList.push(location);
                    }
                });
                return filteredList;
            });
        };
        fetchData();
    }, []);

    const onSubmit = async (data: any) => {
        try {
            const response = await createEvent({...data,dateAndTime:{start,end}});
            toast({
                title: "success",
                description: response.message,
                variant: "default"
            });
        } catch (error: any) {
            toast({
                title: "error",
                description: error.message,
                variant: "destructive"
            });
        }
    };


    return (
         <form className="mt-10 mx-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-7">
                <div className="">
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <LabelInputContainer>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Ex. Rangoli Mall | roofTop" type="text" {...register("name")} />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" placeholder="near howrah railway station" type="text" {...register("location")} />
                        </LabelInputContainer>
                    </div>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" placeholder="Ex. best place to play cricket affordable price" type="text" {...register("description")} />
                    </LabelInputContainer>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <LabelInputContainer>
                            <Label htmlFor="startTime">Start Time</Label>
                            <DateTimePicker value={start} onChange={setStart} className="w-full"/>
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="endTime">End Time</Label>
                            <DateTimePicker value={end} onChange={setEnd} className="w-full"/>
                        </LabelInputContainer>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <LabelInputContainer>
                            <Label htmlFor="state">State</Label>
                            <Controller
                                control={control}
                                name="address.state"
                                render={({ field:{onChange} }) => (
                                    <SelectInput Options={stateList} onOptionChange={onChange} className="w-full" placeholder="Select State" />
                                )}
                            />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="city">City</Label>
                            <Controller
                                control={control}
                                name="address.city"
                                render={({ field:{onChange} }) => (
                                    <SelectInput Options={cityList} onOptionChange={onChange} className="w-full" placeholder="Select City" />
                                )}
                            />
                        </LabelInputContainer>
                    </div>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="street">Street</Label>
                        <Input id="street" placeholder="44/1, Mahatma Gandhi Road" type="text" {...register("address.street")} />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input id="pincode" placeholder="700001" type="number" {...register("address.pincode", { valueAsNumber: true })} />
                    </LabelInputContainer>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <LabelInputContainer>
                            <Label htmlFor="price">Price</Label>
                            <Input id="price" placeholder="Rs. 499" type="number" {...register("price", { valueAsNumber: true })} />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="capacity">Capacity</Label>
                            <Input id="capacity" placeholder="400" type="number" {...register("capacity", { valueAsNumber: true })} />
                        </LabelInputContainer>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="sports">Select Sports Category</Label>
                            <Controller
                                control={control}
                                name="Category"
                                render={({ field:{onChange} }) => (
                                    <SelectInput Options={sportsOptions} onOptionChange={onChange} className="w-full" placeholder="Ex. cricket"/>
                                )}
                            />
                        </LabelInputContainer>
                    </div>
                </div>
                <div className="flex flex-col gap-4 flex-wrap">
                    <LabelInputContainer>
                        <Label htmlFor="images">Upload Reference Images</Label>
                        <Controller
                            control={control}
                            name="images"
                            render={({ field }) => (
                                <MultipleUploadImage
                                className="w-full"
                                setKeys={field.onChange} 
                                folder={"events"} 
                                id={generateRandomString} 
                                keys={field.value || []} 
                                />
                            )}
                        />
                    </LabelInputContainer>
                    <div className="flex flex-wrap gap-2">
                        {images.length ? images.slice(0, expanded ? images.length : 5).map((item:string, index:number) => (
                            <div key={index} className="relative border border-white">
                                <img
                                    src={item}
                                    alt="image"
                                    className="w-40 h-40 z-0"
                                />
                                <span
                                    className="absolute right-0 top-0 z-10 p-1 rounded-full bg-slate-500"
                                    onClick={() => setValue("images", images.filter((image:string) => image !== item))}
                                >
                                    <RiDeleteBinLine />
                                </span>
                            </div>
                        )) : null}
                        {images.length > 5 && !expanded && (
                            <button onClick={toggleExpanded} className="w-40 h-40 border rounded-2xl flex items-center justify-center">
                                Show More
                            </button>
                        )}
                    </div>
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl mb-6">Organizer details</h2>
                        <LabelInputContainer>
                            <Label htmlFor="organizer.name">Name</Label>
                            <Input id="organizerName" placeholder="Enter name" type="text" {...register("organizer.name")} />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="organizer.email">Email</Label>
                            <Input id="organizerEmail" placeholder="Enter email" type="email" {...register("organizer.email")} />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="organizer.phoneNumber">Contact Number</Label>
                            <Input id="organizerPhoneNumber" placeholder="Enter Phone number" type="number" {...register("organizer.phoneNumber",{valueAsNumber:true})} />
                        </LabelInputContainer>
                    </div>
                </div>
            </div>
            <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 dark:bg-zinc-800 w-[20%] text-white rounded-xl h-14 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
            >
                Submit &rarr;
                <BottomGradient />
            </button>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
    );
}