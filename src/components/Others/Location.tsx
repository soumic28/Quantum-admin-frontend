import { useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../ui/select';
import { State, City } from 'country-state-city';
import { useToast } from '../../ui/use-toast';
import { createLocation, getLocations } from '../../api/location';
import { Location } from '../../interfaces/Location';
import { Button } from '../../ui';
import LocationList from './LocationList';

interface SelectOptions{
    code?:string;
    value:string;
    label:string;
}
const AdminLocationSelector = ({ onLocationSelect }:any) => {
  const [selectedState, setSelectedState] = useState<SelectOptions>();
  const [cities, setCities] = useState<SelectOptions[] | null>();
  const [selectedCity, setSelectedCity] = useState<SelectOptions | null>();

  const stateOptions:SelectOptions[] = State.getStatesOfCountry('IN').map(state => ({
    code:state.isoCode,
    value: state.name,
    label: state.name,
  }));

  const handleStateChange = (selectedOption:SelectOptions) => {
    setSelectedState(selectedOption);
    const cityOptions:SelectOptions[] = City.getCitiesOfState('IN', selectedOption?.code || "").map(city => ({
      code:city.stateCode,
      value: city.name,
      label: city.name,
    }));
    setCities(cityOptions);
    setSelectedCity(null);
  };

  const handleCityChange = (selectedOption:SelectOptions) => {
    console.log(selectedCity)
    setSelectedCity(selectedOption);
    onLocationSelect(selectedState?.value, selectedOption.value);
  };

  return (
    <div className="flex gap-3">
        <Select onValueChange={(value) => {
            const selectedOption = stateOptions.find(option => option.value === value);
            if (selectedOption) handleStateChange(selectedOption);
        }}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
                {stateOptions.map((option:SelectOptions) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>

        <Select onValueChange={(value) => {
            const selectedOption = cities?.find(option => option.value === value);
            if (selectedOption) handleCityChange(selectedOption);
        }}>            
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
                {cities && cities.map((option:{value:string;label:string}) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
  );
};


export default function AddLocation(){
    useEffect(()=>{
        async function fetchLocations(){
            try{
                const response = await getLocations();
                setLocations(response.data);
            }catch(err:any){
                toast({
                    title:"Error",
                    description:err.message,
                    variant:"destructive"
                })
            }
        }
        fetchLocations();
    },[])
    const {toast} = useToast();
    const [data,setData]=useState<Location>({
        state:"",
        city:""
    });
    const [locations,setLocations]=useState<Location[]>([]);
    const handleSubmit = async(e:any)=>{
        e.preventDefault();
        try{
            const response = await createLocation(data);
            console.log(response);
            setLocations((prevState)=>{
                const data = {
                    state:response.data.state,
                    city:response.data.city
                }
                return [...prevState,data];
            })
            toast({
                title:"Location Created",
                description:response.message,
                variant:"default"
            })
        }catch(err:any){
            toast({
                title:"Error",
                description:err.message,
                variant:"destructive"
            })
        }
    }

    const handleLocationSelect = async(state:string, city:string) => {
            setData({state,city})
    };

  return (
    <div className="flex flex-col gap-3">
      <h1>Admin Location Selector</h1>
      <div className='flex gap-8'>
        <AdminLocationSelector onLocationSelect={handleLocationSelect} />
        <Button variant="custom" size="lg" onClick={handleSubmit} className='text-white bg-orange-800 hover:bg-accent'>Submit</Button>
        
      </div>
      <LocationList locationList={locations} setLocationList={setLocations}/>
    </div>
  );
};

