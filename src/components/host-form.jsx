"use client";

import { createClient } from "@supabase/supabase-js";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    // Creating the host with numeric values
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    try {
      let data = {
        place: values.Locationname,
        ParkingSlots: values.Parkingslots,
        Pricing: values.Perhourpricing,
      };
      const res = await fetch("/api/geolocation", {
        method: "POST",
        header: {
          "Content-Type": "application/json", // Specify the content type
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="Locationname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the parking location" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Parkingslots"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parking slots</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the total no of parking slots you are willing to give"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Perhourpricing"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Per hour pricing</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the pricing rate per hour"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
