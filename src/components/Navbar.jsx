"use client"; // Marca este archivo como un Client Component

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

export default function Navbar() {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubscribe = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            console.log('Correo suscrito:', email);
            // Aquí puedes agregar la lógica para enviar el correo a una API o backend
        } else {
            console.log('Por favor, ingresa un correo válido.');
        }
    };

    return (
        <header className="w-full h-[70px] bg-[#2563eb] flex justify-between items-center px-4">
            <div className="flex items-center">
                <Link href='/'>
                    <Image src={logo} alt='villavoAlertaslogo' className="object-cover w-48" />
                </Link>
            </div>
            <div className="flex items-center">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="bg-primary text-white">
                            <Bell className="mr-2 h-4 w-4" /> Suscríbete
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
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
                                    onChange={handleEmailChange}
                                    className="col-span-3"
                                    placeholder="Ingresa tu correo"
                                />
                            </div>
                        </div>
                        <DialogFooter className="grid grid-cols-2 items-center justify-between">
                            <div className="flex justify-start">
                                <Link href='https://villavicencio.gov.co/' aria-label="Alcaldia Website" target="_blank">
                                    <Image src={logo} alt='Alcaldia Logo' className="object-cover invert w-48 h-[50px]" />
                                </Link>
                            </div>
                            <div className="flex justify-end">
                                <Button onClick={handleSubscribe} className="bg-primary text-center">
                                    Guardar
                                </Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </header>
    );
}
