
import { Customer, columns } from "./columns"
import { DataTable } from "./data-table"
import { AddCustomerDialog } from "./components/AddCustomerDialog"
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation'

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

export default async function DemoPage() {
    const user = await getSession()

    var data = await getData()
    console.log(data)
    return (
        user && <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data}></DataTable>
            <AddCustomerDialog></AddCustomerDialog>
        </div>
    )
    
    
}

//export const getServerSideProps = withPageAuthRequired();
