
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { CustomerForm } from "./CustomerForm"




/*
<form>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Customer Number</Label>
                    <Input id="name" placeholder="Number" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Customer Name</Label>
                    <Input id="name" placeholder="Name" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Customer Age</Label>
                    <Input id="name" placeholder="Age" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Customer Date of Birth</Label>
                    <Input id="name" placeholder="Date of Birth" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Customer Gender</Label>
                    <Input id="name" placeholder="Gender" />
                    </div>
                </div>
            </form>
*/


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
            <Button>Add Customer</Button>
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
            <Button type="submit">Submit</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    )
}

/*
<Card className="w-[350px]">
        <CardHeader>
            <CardTitle>Add Customer</CardTitle>
        </CardHeader>
        <CardContent>
            
        </CardContent>
        <CardFooter className="flex justify-between">
        <Link href={"customers/"}>
            <Button variant="outline">
                Cancel
            </Button>
            </Link>
            <Button>Submit</Button>
        </CardFooter>
        </Card>
*/