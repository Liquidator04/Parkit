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
      <br></br>
      <div className="flex justify-between items-center w-full">
        <Image
          className="ml-8 rounded-full"
          src={logo}
          alt="Picture of the author"
          width={100}
          height={80}
        />
        <div className="flex space-x-4 mr-8">
          {" "}
          {/* Add margin right to the button group */}
          <Button variant="outline">About us</Button>
          <Button variant="outline">Contact us</Button>
        </div>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div class="w-full flex justify-center mt-20">
        <Button
          variant="secondary"
          className="bg-blue-500 text-white py-2 px-4 rounded mt-20 h-20 w-40"
        >
          Get Started
        </Button>
      </div>

      <h1 className="text-center text-5xl md:text-7xl font-bold text-white-800 mb-8 mt-8">
        Let us find your parking
      </h1>
    </>
  );
}

export default page;
