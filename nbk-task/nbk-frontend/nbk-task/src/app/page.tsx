import { Customer, columns } from "./customers/columns"
import { DataTable } from "./customers/data-table"
import { AddCustomerDialog } from "./customers/components/AddCustomerDialog"

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

export default async function Home() {
    var data = await getData()
    console.log(data)
    return (
        <div className="container mx-auto py-10">
            <a className="button__login" href="/api/auth/login">
            Log In
            </a>
        </div>
    );
    
}
