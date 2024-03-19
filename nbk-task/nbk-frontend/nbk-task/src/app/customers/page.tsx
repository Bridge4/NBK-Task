import { Button } from "@/components/ui/button"
import { Customer, columns } from "./columns"
import { DataTable } from "./data-table"
import Link from "next/link"
import { AddCustomerDialog } from "./components/AddCustomerDialog"
import { useEffect } from 'react';

async function getData(): Promise<Customer[]> {
    const res = await fetch('http://localhost:5230/customers/', {
        method: "GET",
        cache: "no-store"
    })
    
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

type SearchParamProps = {
    searchParams: Record<string, string> | null | undefined;
  };

// TODO: ADD BUTTON FROM THE LIBARY
// CLICK ADD CUSTOMER -> MODAL TO FILL IN INFO -> GET INFO FROM FORMS AND POST TO DB
export default async function DemoPage({ searchParams }: SearchParamProps) {
    
    var data = await getData()
    console.log(data)
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
            <AddCustomerDialog></AddCustomerDialog>        
        </div>
    )
}