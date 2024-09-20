import { Button } from "@/components/ui/button";
import logo from "./public/logo.png";
import Image from "next/image";
import { Input } from "@/components/ui/input";

async function page() {
  let data = {
    place:
      "VIT, Vellore Campus, Tiruvalam Rd, Katpadi, Vellore, Tamil Nadu 632014",
  };
  let res = await fetch("http://localhost:3000/api/geolocation", {
    method: "POST",
    header: {
      "Content-Type": "application/json", // Specify the content type
    },
    body: JSON.stringify(data),
  });
  console.log("response");
  if (res.ok) {
    let data = await res.json;
    console.log(data);
  }

  return (
    <>
      <Button variant="destructive">Click Me</Button>
      <br></br>
      <Image
        src={logo}
        alt="Picture of the author"
        width={100}
        height={80}
        // blurDataURL="data:..." automatically provided
        // placeholder="blur" // Optional blur-up while loading
      />
      <br></br>
      <Input className="mr-8 text-4xl" type="email" placeholder="Email" />
    </>
  );
}

export default page;
