import Image from 'next/image'
import logo from '@/app/fonts/logo.png'
import { buttonVariants } from "@/components/ui/button"
import Link from 'next/link'

export default function Navbar(){

    return (
        <header className="w-full h-[70px] bg-[#2563eb] flex justify-between items-center px-4">
            <Image src={logo} className="object-cover w-48"/>

            <Link className='px-4 py-2 rounded-[8px] border border-white flex justify-center items-center' href='/'>
                <span className='text-white'>SUSCRIBETE</span>
            </Link>
        </header>
    )
}