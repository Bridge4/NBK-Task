import { Customer, columns } from "./columns"
import { DataTable } from "./data-table"
import { AddCustomerDialog } from "../components/AddCustomerDialog"
import { withPageAuthRequired, getSession, handleLogout } from '@auth0/nextjs-auth0';
import { Button } from "../components/ui/button";

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


export default withPageAuthRequired(
    async function CustomerManager() {
        var data = await getData()
        console.log(data)
        return (
            <>
                <Button asChild>
                    <a href="/api/auth/logout">Logout</a>
                </Button>
            <div className="container mx-auto py-10">
                
                <DataTable columns={columns} data={data}></DataTable>
                <AddCustomerDialog></AddCustomerDialog>
                
            </div>
            </>
        )
    },
    { returnTo: '/api/auth/login' }
);

