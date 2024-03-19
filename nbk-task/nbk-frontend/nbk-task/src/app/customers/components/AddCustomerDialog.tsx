import * as React from "react"
import { Button } from "@/components/ui/button"
import { CustomerForm } from "./CustomerForm"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export function AddCustomerDialog() {
    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button> Add Customer</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>
                Fill in the new customer's details below.
            </DialogDescription>
            </DialogHeader>
                <CustomerForm></CustomerForm>
            <DialogFooter>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    )
}