import { ColumnDef } from "@tanstack/react-table"
import {Event} from '../../interfaces'
import { DataTableColumnHeader } from "../../ui/dataTableColumnHeader"
import { DataTableRowActions } from "../../ui/dataTableRowAction"
import { Button } from "../../ui"
import { useToast } from "../../ui/use-toast"
import { verifyEvent } from "../../api/event"
import { LucideArrowUpRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Event" />
    ),
    cell: ({ row }) => {
        const value = row.getValue("_id")?.toString();
        const sliced = value?.slice(0,5) 
        return(
            <div className="w-[75px]">EID-{sliced}</div>
        )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
        const navigate = useNavigate();
        const event = row.original;
        return(
          <div className="flex w-44 hover:underline truncate group cursor-pointer items-center" onClick={() => navigate(`/event/${event._id}`)}>
            <div>{event.name}</div>
            <div className="ml-1 underline hidden group-hover:block transition-all duration-300 ease-in-out" >
                <LucideArrowUpRight className="ml-1" size={16} />
            </div>
          </div>
        )
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2">
          <span className="max-w-[450px] truncate font-medium">
            {row.getValue("description")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.getValue("status")}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "verified",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Verified" />
    ),
    cell: ({ row }) => {
      const {toast} = useToast();
      async function handleVerify(){
        try {
          await verifyEvent(row.getValue("_id"));
          toast({
            title:"Success",
            description:"verification Successful",
            variant:"default",
          })
        } catch (error:any) {
          toast({
            title:"Error",
            description:error.message,
            variant:"destructive"
          })
        }
      }
      const value = row.getValue("verified");
      return (
        <div className="flex items-center">
          {value?"badge": <Button onClick={handleVerify}>verify</Button>}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({row}) => <DataTableRowActions id={row.getValue("_id")}/>,
  },
]