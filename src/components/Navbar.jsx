'use client';

import Image from 'next/image';
import logo from '@/assets/logo.png';
import Link from 'next/link';
import SubscribeModal from './SubscribeModal';
import { Button } from './ui/button';
import { useSession, signOut } from 'next-auth/react';
import { toast } from 'sonner';
import { Bell, LogOut, Plus, AlignJustify } from "lucide-react"
import { usePathname } from 'next/navigation'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"


export default function Navbar() {
    const { data } = useSession();
    const pathname = usePathname()

    const handleLogout = () => {
        signOut()
            .then(() => toast.success('Sesión cerrada'))
            .catch(() => toast.error('Ha ocurrido un error'));
    };

    const handleNotifications = () => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission()
                .then((permission) => {
                    if (permission === 'granted') {
                        new Notification('Notificaciones activadas', {
                            body: 'Ahora recibirás las nuevas noticias publicadas.',
                        })
                    }
                })
        }
    }

    if (['/auth/admin'].includes(pathname)) return null

    return (
        <header className="w-full h-[70px] bg-[#2563eb] flex justify-between items-center px-4">
            <div className="flex items-center">
                <Link href='/'>
                    <Image src={logo} alt='villavoAlertaslogo' className="object-cover w-44 md:w-48" />
                </Link>
            </div>
            {
                data ?
                    <>
                        <div className='flex md:hidden'>
                            <Menubar>
                                <MenubarMenu>
                                    <MenubarTrigger>
                                        <AlignJustify />
                                    </MenubarTrigger>
                                    <MenubarContent>
                                        <MenubarItem>
                                            <Link className='w-full h-full flex justify-start items-center' href='/dash/addPost'>
                                                <Plus className="mr-2 h-4 w-4" /> Publicar
                                            </Link>
                                        </MenubarItem>
                                        <MenubarItem>
                                            <button onClick={handleLogout} className="w-full h-full flex justify-start items-center">
                                                <LogOut className="mr-2 h-4 w-4 " /> Cerrar sesión
                                            </button>
                                        </MenubarItem>
                                        <MenubarItem>
                                            <Bell onClick={handleNotifications} size={20} />
                                        </MenubarItem>
                                    </MenubarContent>
                                </MenubarMenu>
                            </Menubar>
                        </div>
                    </> :
                    <>
                        <div className='flex md:hidden'>
                            <Menubar>
                                <MenubarMenu>
                                    <MenubarTrigger>
                                        <AlignJustify />
                                    </MenubarTrigger>
                                    <MenubarContent>
                                        <MenubarItem>
                                            <SubscribeModal />
                                        </MenubarItem>
                                        <MenubarItem>
                                            <Bell onClick={handleNotifications} size={20} />
                                        </MenubarItem>
                                    </MenubarContent>
                                </MenubarMenu>
                            </Menubar>
                        </div>
                    </>
            }
            <div className="hidden md:flex items-center gap-5">
                <Bell onClick={handleNotifications} size={data ? 45 : 65} className={`text-white ${data ? null : "hover:text-slate-300"} cursor-pointer ${data ? "hover:bg-gray-500" : null} p-2 rounded-full transition-all`} />
                {data ? (
                    <>
                        <Link href='/dash/addPost'>
                            <Button className="bg-green-500 font-medium hover:bg-green-600">
                                <Plus className="mr-2 h-4 w-4" /> Publicar
                            </Button>
                        </Link>
                        <Button onClick={handleLogout} className="bg-white text-red-500 font-medium hover:bg-gray-200">
                            <LogOut className="mr-2 h-4 w-4 " /> Cerrar sesión
                        </Button>
                    </>
                ) : (
                    <SubscribeModal />
                )}
            </div>
        </header>
    );
}
