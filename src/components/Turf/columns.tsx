import { ColumnDef } from "@tanstack/react-table"

import {Turf} from '../../interfaces/Turf'
import { DataTableColumnHeader } from "../../ui/dataTableColumnHeader"
import { DataTableRowActions } from "../../ui/dataTableRowAction"
import { Button } from "../../ui"
import { useToast } from "../../ui/use-toast"
import { verifyTurf } from "../../api/turf"
import { LucideArrowUpRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const columns: ColumnDef<Turf>[] = [
  {
    accessorKey: "_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Turf" />
    ),
    cell: ({ row }) => {
        const value = row.getValue("_id")?.toString();
        const sliced = value?.slice(0,5) 
        return(
            <div className="w-[100px]">Turf-{sliced}</div>
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
        const turf = row.original;
        const navigate = useNavigate();
        return(
          <div className="flex w-44 hover:underline truncate group cursor-pointer items-center" onClick={() => navigate(`/turf/${turf._id}`)}>
            <div>{turf.name}</div>
            <div
                className="ml-1 underline hidden group-hover:block transition-all duration-300 ease-in-out"
            >
                <LucideArrowUpRight className="ml-1" size={16} />
            </div>
          </div>
        )
    },
  },
  {
    accessorKey: "contact",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2">
          <span className="max-w-[450px] truncate font-medium">
            {row.getValue("contact")}
          </span>
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
          await verifyTurf(row.getValue("_id"));
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