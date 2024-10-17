'use client';

import Image from 'next/image';
import logo from '@/assets/logo.png';
import Link from 'next/link';
import SubscribeModal from './SubscribeModal';
import { Button } from './ui/button';
import { useSession, signOut } from 'next-auth/react';
import { toast } from 'sonner';
import { LogOut, Plus } from "lucide-react"
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const { data } = useSession();
    const pathname = usePathname()

    const handleLogout = () => {
        signOut()
            .then(() => toast.success('Sesión cerrada'))
            .catch(() => toast.error('Ha ocurrido un error'));
    };

    if (['/auth/admin'].includes(pathname)) return null

    return (
        <header className="w-full h-[70px] bg-[#2563eb] flex justify-between items-center px-4">
            <div className="flex items-center">
                <Link href='/'>
                    <Image src={logo} alt='villavoAlertaslogo' className="object-cover w-48" />
                </Link>
            </div>
            <div className="flex items-center gap-5">
                {data ? (
                    <>
                        <Link href='/dash/addPost'>
                            <Button className="bg-green-500 hover:bg-green-600">
                                <Plus className="mr-2 h-4 w-4" /> Publicar
                            </Button>
                        </Link>
                        <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
                            <LogOut className="mr-2 h-4 w-4" /> Logout
                        </Button>
                    </>
                ) : (
                    <SubscribeModal />
                )}
            </div>
        </header>
    );
}
