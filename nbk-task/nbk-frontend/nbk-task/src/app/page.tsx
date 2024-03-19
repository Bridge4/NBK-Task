"use client"
import Image from "next/image";
import { DatePickerForm } from "./customers/components/calendar";
import { AddCustomerDialog } from "./customers/components/AddCustomerDialog";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AddCustomerDialog></AddCustomerDialog>
    </main>
  );
}
