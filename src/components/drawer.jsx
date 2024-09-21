import * as React from "react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import { useRouter } from "next/navigation";

const data = Array.from({ length: 48 }, (_, i) => ({ goal: i + 1 }));
export let arr;

export function DrawerDemo() {
  const router = useRouter();
  const [hours, setHours] = React.useState(12); // Default to 24 hours
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  let [lat, setLat] = useState(0);
  let [lng, setLng] = useState(0);
  const [idSorted, setIdSorted] = useState(0);
  navigator.geolocation.getCurrentPosition(function (position) {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
    // console.log("coordinates");
    // console.log(lat);
    // console.log(lng);
  });

  function getDistance(lat1, lon1, lat2, lon2) {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = (lon1 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result
    return c * r;
    // return lat2;
  }

  const currLoc = [lat, lng];
  async function handleClick() {
    console.log("Inside handle click");
    let { data: Host, error } = await supabase
      .from("Host")
      .select("id,latitude, longitude");
    // let newArr = [];
    // for (let i = 0; i < Host.length; i++) newArr.push(Host[i]);
    // console.log("New arr: ", newArr);
    // let newArr = structuredClone(Host); // Makes a deep copy

    let arr1 = [], //id array
      arr2 = [], //latitude array
      arr3 = []; //longitude array
    for (let i = 0; i < Host.length; i++) {
      arr1.push(Host[i].id);
      arr2.push(Host[i].latitude);
      arr3.push(Host[i].longitude);
    }
    console.log("arr1: ", arr1);
    console.log("arr2: ", arr2);
    console.log("arr3: ", arr3);

    let n = Host.length;
    console.log("n=", n);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        let dist1 = getDistance(lat, lng, arr2[j], arr3[j]);
        let dist2 = getDistance(lat, lng, arr2[j + 1], arr3[j + 1]);
        if (dist1 > dist2) {
          //swapping
          [arr1[j], arr1[j + 1]] = [arr1[j + 1], arr1[j]];
          [arr2[j], arr2[j + 1]] = [arr2[j + 1], arr2[j]];
          [arr3[j], arr3[j + 1]] = [arr3[j + 1], arr3[j]];
        }
      }
    }
    console.log("arr1: ", arr1);
    console.log("arr2: ", arr2);
    console.log("arr3: ", arr3);

    arr = arr1;

    router.push("/booking");
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Search for parking</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Set Hours</DrawerTitle>
            <DrawerDescription>Select number of hours.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex flex-col items-center justify-center">
              <input
                type="range"
                min="1"
                max="12"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-7xl font-bold tracking-tighter">{hours}</div>
              <div className="text-[0.70rem] uppercase text-muted-foreground">
                Hours
              </div>
            </div>
            <div className="mt-3 h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                {/* <BarChart data={data}>
                  <Bar
                    dataKey="goal"
                    style={{
                      fill: "hsl(var(--foreground))",
                      opacity: 0.9,
                    }}
                  />
                </BarChart> */}
              </ResponsiveContainer>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={handleClick}>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
