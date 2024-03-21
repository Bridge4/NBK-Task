import { Customer, columns } from "./columns"
import { DataTable } from "./data-table"
import { AddCustomerDialog } from "../components/AddCustomerDialog"
import { withPageAuthRequired, getSession, handleLogout } from '@auth0/nextjs-auth0';
import { Button } from "../components/ui/button";
import { NextRequest, NextResponse } from "next/server";
import { Redirect } from "next";
import Link from "next/link";
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

function logoutHandler(){
    
}

export default withPageAuthRequired(
    async function SSRPage() {
        const user = await getSession()
        var data = await getData()
        console.log(data)
        return (
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data}></DataTable>
                <AddCustomerDialog></AddCustomerDialog>
                <Button asChild>
                    <Link href="/">Logout</Link>
                </Button>
            </div>
        )
    },
    { returnTo: '/api/auth/login' }
);

