import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    const res = await fetch('http://localhost:5230/customers/get')
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    
    return res.json()
}

export default async function DemoPage() {
    const data = await getData()
    console.log(data)
    return (
        <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
        </div>
    )
}
