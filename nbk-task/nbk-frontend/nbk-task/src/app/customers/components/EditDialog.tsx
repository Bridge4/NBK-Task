"use client"
import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { EditForm } from "./EditForm"

export function EditDialog({...props}) {
    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button className="container mx-auto py-1">Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>
                Fill in the new customer's details below.
            </DialogDescription>
            </DialogHeader>
                <EditForm customerNumber={props.customerNumber} name={props.name} age={props.age} 
                                DOB={props.DOB} gender={props.gender}></EditForm>
            <DialogFooter>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    )
}