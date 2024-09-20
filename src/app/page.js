import { Button} from "@/components/ui/button"
import logo from './public/logo.png'
import Image from 'next/image'
import { Input } from "@/components/ui/input"

function page() {
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
  <div className="flex space-x-4 mr-8">  {/* Add margin right to the button group */}
    <Button variant="ghost">About us</Button>
    <Button variant="ghost">Contact us</Button>
  </div>
</div>
    
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    
    <div class="w-full flex justify-center mt-20">
    <Button className="bg-blue-500 text-white py-2 px-4 rounded mt-20 h-20 w-40">Get Started</Button>
</div>
   </>
  )
}

export default page