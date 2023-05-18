import { Chip } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";

import moment from "moment";
import Link from "next/link";


export const Columns: ColumnDef<any, any>[] = [
  {
    id: "DateRegistered",
    accessorKey: "DateRegistered",
    header: "Registered on",
    cell: (date) => {
      
      return <span>{moment(date.row.original.DateRegistered).format("DD/MM/YYYY")}</span>;
    },
  },
 

  {
    accessorKey: "Name",
    header: "Name",
    cell: (user: any) => {
     return <span>{user.row.original.Name}</span>
    },
  },

  {
    accessorKey: "PhoneNumber",
    header: "Tel. no",
    cell: (phone: any) => {
     return <span>{phone.row.original.PhoneNumber}</span>
    },
  },

  {
    accessorKey: "PolicyNumber",
    header: "Policy no",
    cell: (policy: any) => {
     return <span>{policy.row.original.PolicyNumber}</span>
    },
  },

  {
    accessorKey: "listing_to_inspect",
    header: "",
    cell: (listing: any) => {
       return <Link href={`/vehicle/${listing.row.original.Id}`} className="bg-[#000] hover:opacity-70 rounded-[4px] text-white py-2 px-4">
            view
        </Link>
    },
  },


];