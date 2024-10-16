import Image from 'next/image'
import logo from '@/assets/logo.png'
import Link from 'next/link'
import { Bell } from 'lucide-react'
import { Button } from './ui/button'

export default function Navbar() {

    return (
        <header className="w-full h-[70px] bg-[#2563eb] flex justify-between items-center px-4">
            <Link href='/'>
                <Image src={logo} alt='villavoAlertaslogo' className="object-cover w-48" />
            </Link>

            <div className='flex justify-center items-center gap-5'>
                <Button variant="ghost" size="icon" className="relative group">
                    <Bell className="h-5 w-5 text-white group-hover:text-black" />
                    <span className="sr-only">Notificaciones</span>
                    <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500" />
                </Button>

                <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-100 hover:text-blue-700">
                    Suscríbete
                </Button>
            </div>
        </header>
    )
}