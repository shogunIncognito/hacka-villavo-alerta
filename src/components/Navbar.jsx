"use client";

import { useState } from 'react';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertError } from './AlertError';

export default function Navbar() {
    const [email, setEmail] = useState('');
    const [alertError, setAlertError] = useState(false)
    const [description, setDescription] = useState('')

    const onSubmit = (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.length <= 0) {
            setAlertError(true)
            setDescription('El correo es requerido')
            setTimeout(() => {
                setAlertError(false)
            }, 5000)
            return
        } else if (!emailRegex.test(email)) {
            setAlertError(true)
            setDescription('Tienes que ingresar un correo valido')
            setTimeout(() => {
                setAlertError(false)
            }, 5000)
            return
        }

        setEmail('')
    }

    return (
        <header className="w-full h-[70px] bg-[#2563eb] flex justify-between items-center px-4">
            {
                alertError ? <AlertError description={description} /> : null
            }
            <div className="flex items-center">
                <Link href='/'>
                    <Image src={logo} alt='villavoAlertaslogo' className="object-cover w-48" />
                </Link>
            </div>
            <div className="flex items-center gap-5">
                <Button variant="ghost" size="icon" className="relative group">
                    <Bell className="h-5 w-5 text-white group-hover:text-black" />
                    <span className="sr-only">Notificaciones</span>
                    <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500" />
                </Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="bg-white text-primary">
                            Suscríbete
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[600px]">
                        <form onSubmit={onSubmit}>
                            <DialogHeader>
                                <DialogTitle className="text-center">Suscríbete</DialogTitle>
                                <DialogDescription>
                                    Recibe notificaciones cada vez que subamos una nueva alerta. Haz clic en guardar cuando hayas terminado.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">
                                        Correo
                                    </Label>
                                    <Input
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="col-span-3"
                                        placeholder="Ingresa tu correo"
                                    />
                                </div>
                            </div>
                            <DialogFooter className="">
                                <div className='flex w-full justify-between'>
                                    <Link href='https://villavicencio.gov.co/' aria-label="Alcaldia Website" target="_blank">
                                        <Image src={logo} alt='Alcaldia Logo' className="object-cover invert w-48 h-[50px]" />
                                    </Link>
                                    <Button className="bg-primary text-center">
                                        Guardar
                                    </Button>
                                </div>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </header>
    );
}
