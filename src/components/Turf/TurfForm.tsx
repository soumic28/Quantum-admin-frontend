import { useEffect, useState } from "react";
import {
  BottomGradient,
  Button,
  Input,
  Label,
  LabelInputContainer,
} from "../../ui";
import MultiSelect from "../../ui/MultiSelect";
import { getSports } from "../../api/sports";
import { getFacilities } from "../../api/facilities";
import { Sport } from "../../interfaces/Sport";
import { Facility } from "../../interfaces/Facility";
import { Option, Options } from "../../interfaces/Option";
import { createTurf } from "../../api/turf";
import { useToast } from "../../ui/use-toast";
import SelectInput from "../../ui/SelectInput";
import { getLocations } from "../../api/location";
import { Location } from "../../interfaces/Location";
import { MultipleUploadImage } from "../MultipleImageUpload";
import { RiDeleteBinLine } from "react-icons/ri";

export function TurfForm() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [pincode, setPincode] = useState<number>(0);
  const [street, setStreet] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  const [sports, setSports] = useState<string[]>([]);
  const [facilities, setFacilities] = useState<string[]>([]);

  const [sportsOptions, setSportsOptions] = useState<Option[]>([]);
  const [facilityOptions, setFacilityOptions] = useState<Option[]>([]);
  const [locationOptions, setLocationOptions] = useState<Location[]>([]);
  const [stateList, setStateList] = useState<Options[]>([]);
  const [cityList, setCityList] = useState<Options[]>([]);
  const generateRandomString = Math.random().toString(36).substring(2, 9);
  const { toast } = useToast();
  useEffect(() => {
    const locationWithState = locationOptions.filter(
      (location: Location) => location.state === state
    );
    const cityList = locationWithState.map((location: Location) => ({
      value: location.city,
      label: location.city,
    }));
    setCityList(cityList);
  }, [state]);
  useEffect(() => {
    const fetchData = async () => {
      const fetchFacilities = await getFacilities();
      const fetchSports = await getSports();
      const fetchLocations = await getLocations();
      setSportsOptions(
        fetchSports.data.map((sport: Sport) => ({
          name: sport.name,
          checked: false,
          id: sport._id,
        }))
      );
      setFacilityOptions(
        fetchFacilities.data.map((facility: Facility) => ({
          name: facility.name,
          checked: false,
          id: facility._id,
        }))
      );
      setLocationOptions(
        fetchLocations.data.map((location: Location) => ({
          state: location.state,
          city: location.city,
          id: location._id,
        }))
      );
      setStateList(() => {
        const unfilteredList = fetchLocations.data.map(
          (location: Location) => ({
            value: location.state,
            label: location.state,
          })
        );
        const filteredList: Options[] = [];
        unfilteredList.forEach((location: Options) => {
          if (
            !filteredList.find(
              (state: Options) => state.value === location.value
            )
          ) {
            filteredList.push(location);
          }
        });
        return filteredList;
      });
    };
    fetchData();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error get user location: ", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser");
    }
  };
  const handleSportSelect = (selected: string[]) => {
    setSports(selected);
  };
  const handleFacilitySelect = (selected: string[]) => {
    setFacilities(selected);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      name,
      description,
      contact,
      location,
      address: {
        city,
        state,
        street,
        pincode,
      },
      sports,
      facilities,
      images,
    };
    try {
      const response = await createTurf(data);
      console.log(response.data);
      toast({
        title: "success",
        description: response.message,
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "error",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  return (
    <form className="mt-10 mx-10" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <LabelInputContainer>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Ex. Rangoli Mall | roofTop"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="location">Location</Label>
          <Button type="button" variant="outline" onClick={getUserLocation}>
            Get Current Location
          </Button>
        </LabelInputContainer>
      </div>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="Description">Description</Label>
        <Input
          id="lastname"
          placeholder="Ex best place to play cricket afforable price"
          type="text"
          onChange={(e) => setDescription(e.target.value)}
        />
      </LabelInputContainer>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="Description">Contact</Label>
        <Input
          id="lastname"
          placeholder="someone@email.com or 9985 098765"
          type="text"
          onChange={(e) => setContact(e.target.value)}
        />
      </LabelInputContainer>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <LabelInputContainer>
          <Label htmlFor="State">State</Label>
          <SelectInput
            Options={stateList}
            onOptionChange={setState}
            className="w-full"
            placeholder="State"
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="City">City</Label>
          <SelectInput
            Options={cityList}
            onOptionChange={setCity}
            className="w-full"
            placeholder="City"
          />
        </LabelInputContainer>
      </div>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="street"> Street</Label>
        <Input
          id="street"
          placeholder="44/1, mahatama gandhi road"
          type="text"
          onChange={(e) => setStreet(e.target.value)}
        />
      </LabelInputContainer>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="pincode">Pincode</Label>
        <Input
          id="pincode"
          placeholder="700001"
          type="number"
          onChange={(e) => setPincode(parseInt(e.target.value))}
        />
      </LabelInputContainer>
      {/**sports and facilities */}
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="Sports">Select Type of Sports</Label>
          <MultiSelect
            options={sportsOptions}
            onChange={handleSportSelect}
            setOptions={setSportsOptions}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="Facility">Select Type of Facilities</Label>
          <MultiSelect
            options={facilityOptions}
            onChange={handleFacilitySelect}
            setOptions={setFacilityOptions}
          />
        </LabelInputContainer>
      </div>
      {/**add logic of multiple images */}
      <div className="flex gap-2 flex-wrap">
        <MultipleUploadImage
          setKeys={setImages}
          folder={"turf"}
          id={generateRandomString}
          keys={images}
        />
        {images.length
          ? images.map((item, index) => (
              <div key={index} className="relative border border-white">
                <img
                  key={index}
                  src={item}
                  alt="image"
                  className="w-40 h-40 z-0"
                />
                <span
                  className="absolute right-0 top-0 z-10 p-1 rounded-full bg-slate-500"
                  onClick={() =>
                    setImages(images.filter((image) => image !== item))
                  }
                >
                  <RiDeleteBinLine />
                </span>
              </div>
            ))
          : null}
      </div>

      <button
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600  dark:bg-zinc-800 w-[20%] text-white rounded-xl h-14 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] my-4"
        type="submit"
      >
        Submit &rarr;
        <BottomGradient />
      </button>

      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
    </form>
  );
}
