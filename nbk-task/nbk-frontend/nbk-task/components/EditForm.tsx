"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {z} from "zod";
import { Button } from "./ui/button"
import { cn } from "../lib/utils"
import { format } from "date-fns"
import { Calendar } from "./ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "./ui/popover"
import { CalendarIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation";


const formSchema = z.object({
    customerName: z.string(),
    age: z.coerce.number(),
    dateOfBirth: z.coerce.date() || z.string(),
    gender: z.string()
})

export function EditForm({...props}){
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema), 
        defaultValues:
        {
            customerName: props.name,
            age: props.age,
            dateOfBirth: props.DOB,
            gender: props.gender
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>){
        fetch("http://localhost:5230/customers/" + props.customerNumber, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                customerNumber: props.customerNumber,
                customerName: values.customerName,
                age: values.age,
                dateOfBirth: values.dateOfBirth.getFullYear() + '-'
                + ('0' + (values.dateOfBirth.getMonth()+1)).slice(-2) + '-'
                + ('0' + values.dateOfBirth.getDate()).slice(-2),
                gender: values.gender
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
        router.refresh()
    }
    
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" >
                <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </form>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" >
                <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </form>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" >
                <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value ? (
                                format(field.value, "PPP")
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start" >
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </form>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
            <Button type="submit">Submit</Button>
            </form>
        </Form>

    )
}