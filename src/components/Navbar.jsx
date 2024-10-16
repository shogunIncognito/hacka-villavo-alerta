import Image from 'next/image'
import logo from '@/assets/logo.png'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

export default function Navbar() {

    return (
        <header className="w-full h-[70px] bg-[#2563eb] flex justify-between items-center px-4">
            <Link href='/'>
                <Image src={logo} alt='villavoAlertaslogo' className="object-cover w-48" />
            </Link>

            <Button variant="outline" className="bg-primary text-white" >
                <Bell className="mr-2 h-4 w-4" /> Suscríbete
            </Button>
        </header>
    )
}