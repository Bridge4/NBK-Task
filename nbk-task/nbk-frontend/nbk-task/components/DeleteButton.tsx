"use client"
import * as React from "react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"


export function DeleteButton({...props}) {
    const router = useRouter()
    function deleteEntry(){
        console.log("DELETING")
        fetch("http://localhost:5230/customers/" + props.customerID, {
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
            <Button variant={"destructive"} onClick={deleteEntry} className="container mx-auto py-1">Delete</Button>
        </div>
    )
}