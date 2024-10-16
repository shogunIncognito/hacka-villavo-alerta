'use client'

import Image from 'next/image';
import logo from '@/assets/logo.png';
import Link from 'next/link';

import SubscribeModal from './SubscribeModal';
import { Button } from './ui/button';
import { useSession } from 'next-auth/react';

export default function Navbar() {
    const { data } = useSession();

    return (
        <header className="w-full h-[70px] bg-[#2563eb] flex justify-between items-center px-4">
            <div className="flex items-center">
                <Link href='/'>
                    <Image src={logo} alt='villavoAlertaslogo' className="object-cover w-48" />
                </Link>
            </div>
            <div className="flex items-center gap-5">
                {/* si hay datos de session muestra el boton de crear post */}
                {data ? (
                    <Link href='/dash/addpost'>
                        <Button className="bg-green-500 hover:bg-green-600">
                            Crear Post
                        </Button>
                    </Link>
                ) : (
                    <SubscribeModal />
                )}
            </div>
        </header>
    );
}
