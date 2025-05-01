import {columns} from "./columns"
import {Event,Options} from '../../interfaces'
import { DataTable } from "../../ui/DataTable";
import { useEffect, useState } from "react";
import { getLocations } from "../../api/location"

interface Props{
  itemsList:Event[];
}

function EventList({itemsList}: Props) {
  const [locationList,setLocationList] =useState<Options[]>([]);
  useEffect(()=>{
    async function fetchLocation(){
      const response=await getLocations();
      setLocationList(response.data.map((item:any)=>{
        return {
          value:item.state,
          label:item.state
        }
      }))
    }
    fetchLocation()
  },[])

  return (
    <div>
      <DataTable columns={columns} data={itemsList} tableFilterColumn="name" facetFilter={true} locationList={locationList}/>
    </div>
  );
}

export default EventList;
