"use client";

import { createClient } from "@supabase/supabase-js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Import your Label component
import { useRouter } from "next/navigation";

const formSchema = z.object({
  Locationname: z.string().min(2, {
    message: "Location name must be at least 2 characters.",
  }),
  Parkingslots: z.string().min(2, {
    message: "Parking slots must be at least 2 characters.",
  }),
  Perhourpricing: z.string().min(2, {
    message: "Per hour pricing must be at least 2 characters.",
  }),
});

export function ProfileForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  async function onSubmit(values) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    try {
      const data = {
        place: values.Locationname,
        ParkingSlots: values.Parkingslots,
        Pricing: values.Perhourpricing,
      };
      await fetch("/api/geolocation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="max-w-md mt-20 w-full mx-auto p-6 rounded-2xl shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Parking Details
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Please fill in the details of your parking location.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="Locationname"
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <FormLabel>Location name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the parking location" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="Parkingslots"
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <FormLabel>Parking slots</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Total number of parking slots"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="Perhourpricing"
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <FormLabel>Per hour pricing</FormLabel>
                <FormControl>
                  <Input placeholder="Enter pricing rate per hour" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />
          <Button
            type="submit"
            className="bg-gradient-to-br from-black to-neutral-600 w-full text-white rounded-md h-10 font-medium shadow-input"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
