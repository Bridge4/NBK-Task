"use client"

import { Button } from "../components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { AddCustomerDialog } from "../components/AddCustomerDialog"
import { EditDialog } from "../components/EditDialog"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { DeleteButton } from "../components/DeleteButton"


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
            const thisRow = row.getAllCells()
            const customerID = row.getAllCells()[0].row.original.customerNumber
            console.log("DEBUG: " + row.getAllCells()[0].row.original)
            const customerName = thisRow[0].row.original.customerName
            const customerAge = thisRow[0].row.original.age
            const customerDOB = thisRow[0].row.original.dateOfBirth
            const customerGender = thisRow[0].row.original.gender

            function deleteEntry(){
                const router = useRouter()
                console.log("DELETING")
                fetch("http://localhost:5230/customers/" + customerID, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error));
                router.refresh()
            }
            return (
                <div>
                    <EditDialog customerNumber={customerID} name={customerName} age={customerAge} 
                        DOB={customerDOB} gender={customerGender}></EditDialog>
                    
                    <DeleteButton customerID={customerID}></DeleteButton>
                </div>
            )
        }
    }
    //<Button variant={"destructive"} onClick={deleteEntry} className="container mx-auto py-1" >Delete</Button>
]
