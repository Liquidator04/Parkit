"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default function Dashboard() {
  const router = useRouter();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  let [lat, setLat] = useState(0);
  let [lng, setLng] = useState(0);
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
  }

  const { data: session, status } = useSession();

  if (status === "authenticated") {
    // console.log("User Details:", session.user); // User's email, name, image, etc.
    return (
      <div>
        Welcome, {session.user.name}
        <Button
          onClick={async () => {
            await signOut("google");
          }}
        >
          Sign Out
        </Button>
        <Button onClick={handleClick}>Find Parking</Button>
      </div>
    );
  }

  return <div>Please sign in.</div>;
}
