import { Button} from "@/components/ui/button"
import logo from './public/logo.png'
import Image from 'next/image'
import { Input } from "@/components/ui/input"

function page() {
  return (
   <>
   <Button 
   variant="destructive"
   >Click Me</Button>
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
  )
}

export default page