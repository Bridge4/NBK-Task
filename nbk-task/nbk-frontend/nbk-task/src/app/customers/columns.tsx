"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"

export type Customer = {
  customerNumber: number
  customerName: string
  age: number
  dateOfBirth: Date
  gender: string
}


export const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: "customerNumber",
        header: "Customer Number"
    },
    {
        accessorKey: "customerName",
        header: "Customer Name"
    },
    {
        accessorKey: "age",
        header: "Customer Age"
    },
    {
        accessorKey: "dateOfBirth",
        header: "Date of Birth"
    },
    {
        accessorKey: "gender",
        header: "Gender"
    },
    {
        header: "Actions",
        cell: ({ row }) => {
            return (
                <div>
                    <Button>Edit</Button>
                    <Button variant={"destructive"}>Delete</Button>
                </div>
            )
        }
    }
]
