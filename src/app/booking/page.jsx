"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import QRCode from "qrcode-generator";
import { arr } from "@/components/drawer";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-white whitespace-pre"
      >
        Parkit.
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

export default function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-neutral-800 w-full flex-1 max-w-full mx-auto border border-neutral-700",
        // for your use case, use `h-screen` instead of `h-[60vh]`
        "h-[100vh]"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2 text-white">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: session.user.name,
                href: "#",
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <BookParking />
    </div>
  );
}

const BookParking = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [places, setPlaces] = useState([]);
  const [slots, setSlots] = useState([]);
  const [pricing, setPricing] = useState([]);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const arr_id = arr;
  console.log("arr");
  console.log(arr_id);
  async function setPlacesFunc() {
    let tmp = [];
    let tmp2 = [];
    let tmp3 = [];
    for (let i = 0; i < 6; i++) {
      let { data: Host, error } = await supabase
        .from("Host")
        .select("Place")
        .eq("id", arr_id[i]);
      if (error) {
        break;
      }
      let { data: Rem, err } = await supabase
        .from("Host")
        .select("ParkingSlots")
        .eq("id", arr_id[i]);
      if (err) {
        break;
      }
      let { data: Pri, err2 } = await supabase
        .from("Host")
        .select("Pricing")
        .eq("id", arr_id[i]);
      console.log(Host);
      tmp.push(Host[0].Place);
      tmp2.push(Rem[0].ParkingSlots);
      tmp3.push(Pri[0].Pricing);
    }
    setPlaces(tmp);
    setSlots(tmp2);
    setPricing(tmp3);
  }
  setPlacesFunc();
  console.log("Places");
  console.log(places);
  console.log("Slots");
  console.log(slots);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [qrCode, setQrCode] = useState("");
  const [counter, setCounter] = useState(5); // Initial number of available bookings
  const [bookingId, setBookingId] = useState(null); // Store the generated booking ID
  const [inputBookingId, setInputBookingId] = useState(""); // Store the input booking ID

  const handleBook = () => {
    setIsVisible(false);
    if (counter > 0) {
      const newBookingId = Date.now(); // Generate a unique booking ID
      const data = { bookingId: newBookingId, status: "booked" };
      setBookingData(data);
      setBookingId(newBookingId); // Store the booking ID

      const qr = QRCode(0, "L");
      qr.addData(JSON.stringify(data)); // QR contains booking info
      qr.make();
      setQrCode(qr.createImgTag(4));
      setIsBooked(true);
      setInputBookingId(""); // Reset input
    } else {
      alert("No available bookings left!");
    }
  };

  const handleScan = () => {
    if (isBooked) {
      if (inputBookingId) {
        const parsedBookingId = parseInt(inputBookingId, 10);
        if (parsedBookingId === bookingId) {
          // Check if input ID matches the generated ID
          setCounter(counter - 1); // Decrement the counter
          alert(
            `QR Code scanned successfully! Remaining bookings: ${counter - 1}`
          );
          // Reset booking status and QR code
          setIsBooked(false);
          setQrCode("");
          setBookingData(null);
          setBookingId(null); // Clear the stored booking ID
          setInputBookingId(""); // Clear input field
        } else {
          alert("Scanned ID does not match the booking!");
        }
      } else {
        alert("Please enter a booking ID!");
      }
    } else {
      alert("No booking found to scan!");
    }
  };

  return (
    <>
      <div className="flex justify-center text-3xl mt-5">
        <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          Park at      
        </p>
         
      </div>
      <div className="flex flex-col gap-5 justify-center items-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>{places[0]}</CardTitle>
            <CardDescription>
              Remaining spots {slots[0]} <br />
              Pricing per hour {pricing[0]}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            {isVisible && <Button onClick={handleBook}>Book</Button>}
            {isBooked && (
              <div style={{ marginTop: "20px" }}>
                <p style={{ fontSize: "18px" }}>Booking Successful!</p>
                <h2>Your Booking QR Code</h2>
                <div dangerouslySetInnerHTML={{ __html: qrCode }} />
                <input
                  type="text"
                  value={inputBookingId}
                  onChange={(e) => setInputBookingId(e.target.value)}
                  placeholder="Enter Booking ID"
                  style={{ marginTop: "10px", padding: "8px", width: "200px" }}
                />
                <Button onClick={handleScan} style={{ marginTop: "10px" }}>
                  Submit Scanned Booking ID
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
        {isVisible && (
          <>
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>{places[1]}</CardTitle>
                <CardDescription>
                  Remaining spots {slots[1]} <br />
                  Pricing per hour {pricing[1]}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-end">
                <Button>Book</Button>
              </CardFooter>
            </Card>
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>{places[2]}</CardTitle>
                <CardDescription>
                  Remaining spots {slots[2]} <br />
                  Pricing per hour {pricing[2]}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-end">
                <Button>Book</Button>
              </CardFooter>
            </Card>
          </>
        )}

        {/* <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>{places[3]}</CardTitle>
            <CardDescription>
              Remaining spots {slots[3]} <br />
              Pricing per hour {pricing[3]}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Button>Book</Button>
          </CardFooter>
        </Card>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>{places[4]}</CardTitle>
            <CardDescription>
              Remaining spots {slots[4]} <br />
              Pricing per hour {pricing[4]}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Button>Book</Button>
          </CardFooter>
        </Card>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>{places[5]}</CardTitle>
            <CardDescription>
              Remaining spots {slots[5]} <br />
              Pricing per hour {pricing[5]}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Button>Book</Button>
          </CardFooter>
        </Card> */}
      </div>
    </>
  );
};
