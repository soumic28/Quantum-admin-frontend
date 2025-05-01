
import { DotsHorizontalIcon } from "@radix-ui/react-icons"

import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./DropdownMenu"
import { useToast } from "./use-toast";
import { deleteTurf } from "../api/turf";

interface props{
  id:string;
}

export function DataTableRowActions({id}:props) {
  const {toast} = useToast();
  async function handleDelete(){
    try{
      await deleteTurf(id);
      toast({
        title:"Delete Success",
        description:"The turf is deleted",
        variant:"default"
      })
    }catch(error:any){
      toast({
        title:"Error",
        description:error.message,
        variant:"destructive"
      })
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
        {/* <DropdownMenuItem onClick={() => duplicateTurf(id)}>Make a copy</DropdownMenuItem> */}
        {/* <DropdownMenuItem>Favorite</DropdownMenuItem> */}
        <DropdownMenuItem onClick={handleDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}