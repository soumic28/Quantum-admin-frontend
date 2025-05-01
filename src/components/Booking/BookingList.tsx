import { useEffect, useState } from "react";
import { getAllBookings, getBookingsInRange } from "../../api/booking";
import { DataTableColumnHeader } from "../../ui/dataTableColumnHeader";
import { DataTableRowActions } from "../../ui/dataTableRowAction";
import { useToast } from "../../ui/use-toast";
import { Button } from "../../ui";
import { useNavigate } from "react-router-dom";
import { DataTable } from "../../ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { IBooking } from "../../interfaces";
import { Download } from "lucide-react";
import { addDays } from "date-fns";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/AlertBox";
import { DatePickerWithRange } from "../../ui/DateRange";
import { DateRange } from "react-day-picker";

const columns: ColumnDef<IBooking>[] = [
  {
    accessorKey: "_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Booking ID" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("_id") as string;
      return <div className="font-medium">{value.slice(0, 8)}...</div>;
    },
  },
  {
    accessorKey: "orderId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order ID" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("orderId") as string;
      return <div className="font-medium">{value}</div>;
    },
  },
  {
    accessorKey: "bookingObjectType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Booking Type" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("bookingObjectType") as string;
      return <div className="font-medium">{value}</div>;
    },
  },
  {
    accessorKey: "bookingDetails",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Booking Details" />
    ),
    cell: ({ row }) => {
      const booking = row.original;
      if (booking.bookingObjectType === "TurfBooking") {
        const slot = booking.bookingObjectId.slots?.[0];
        return (
          <div className="flex flex-col">
            <div>Start: {new Date(slot?.startTime || "").toLocaleString()}</div>
            <div>End: {new Date(slot?.endTime || "").toLocaleString()}</div>
            <div>Price: ₹{slot?.price}</div>
          </div>
        );
      } else if (booking.bookingObjectType === "EventBooking") {
        const event = booking.bookingObjectId.eventId;
        return (
          <div className="flex flex-col">
            <div className="font-medium">{event?.name}</div>
            <div>
              Start: {new Date(event?.dateAndTime.start || "").toLocaleString()}
            </div>
            <div>
              End: {new Date(event?.dateAndTime.end || "").toLocaleString()}
            </div>
            <div>Price: ₹{event?.price}</div>
            <div>Quantity: {booking.bookingObjectId.quantity}</div>
          </div>
        );
      }
      return null;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Amount" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount / 100);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div
          className={`font-medium ${
            status === "verified" ? "text-green-600" : "text-yellow-600"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Booking Date" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt") as string);
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions id={row.getValue("_id")?.toString()} />
    ),
  },
];

export function Booking() {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      try {
        const response = await getAllBookings();
        setBookings(response.data);
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    }
    fetch();
  }, [toast]);

  const downloadCSV = async () => {
    if (!date.from || !date.to) {
      toast({
        title: "Error",
        description: "Please select a date range",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await getBookingsInRange(date.from, date.to);
      const rangeBookings = response.data;

      // Generate CSV content
      const csvContent = generateCSV(rangeBookings);

      // Create a Blob with the CSV content
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

      // Create a download link and trigger the download
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute(
          "download",
          `bookings_${date.from.toISOString().slice(0, 10)}_to_${date.to
            .toISOString()
            .slice(0, 10)}.csv`
        );
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      toast({
        title: "Success",
        description: "Bookings CSV downloaded successfully",
        variant: "default",
      });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const generateCSV = (data: IBooking[]) => {
    const headers = [
      "Booking ID",
      "Order ID",
      "Booking Type",
      "Start Time",
      "End Time",
      "Price",
      "Total Amount",
      "Status",
      "Booking Date",
    ];

    const rows = data.map((booking) => {
      let startTime = "";
      let endTime = "";
      let price = "";

      if (booking.bookingObjectType === "TurfBooking") {
        const slot = booking.bookingObjectId.slots?.[0];
        startTime = new Date(slot?.startTime || "").toLocaleString();
        endTime = new Date(slot?.endTime || "").toLocaleString();
        price = slot?.price.toString() || "";
      } else if (booking.bookingObjectType === "EventBooking") {
        const event = booking.bookingObjectId.eventId;
        startTime = new Date(event?.dateAndTime.start || "").toLocaleString();
        endTime = new Date(event?.dateAndTime.end || "").toLocaleString();
        price = event?.price.toString() || "";
      }

      return [
        booking._id,
        booking.orderId,
        booking.bookingObjectType,
        startTime,
        endTime,
        price,
        (booking.amount / 100).toFixed(2),
        booking.status,
        new Date(booking.createdAt).toLocaleDateString(),
      ];
    });

    return [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
  };

  return (
    <div className="mx-auto mt-8">
      <div className="flex justify-between items-center mb-6 mr-5">
        <h1 className="text-3xl font-bold">Bookings</h1>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download CSV
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="mb-2">
                Download Bookings CSV
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-2">
                <h1>Select Date Range</h1>
                <DatePickerWithRange
                  date={date}
                  setDate={setDate}
                  className="z-10"
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button variant="default" onClick={downloadCSV}>
                Download
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <DataTable
        columns={columns}
        data={bookings}
        tableFilterColumn="orderId"
        facetFilter={true}
        onRowClick={(row) => navigate(`/booking/${row.original._id}`)}
      />
    </div>
  );
}
