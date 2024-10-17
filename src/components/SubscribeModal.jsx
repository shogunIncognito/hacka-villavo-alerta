'use client'

import { Button } from "@/components/ui/button";
import logo from '@/assets/logo.png';
import { useState } from 'react';
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
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { subscribeEmail } from "@/services/api";

export default function SubscribeModal() {
    const [email, setEmail] = useState('');
    const [validateform, setValidateform] = useState(false)
    const [description, setDescription] = useState('')
    const [open, setOpen] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.length <= 0) {
            setValidateform(true)
            setDescription('El correo es requerido')
            return
        } else if (!emailRegex.test(email)) {
            setValidateform(true)
            setDescription('Ingrese un correo valido')
            return
        }

        setEmail('')

        toast.promise(subscribeEmail(email), {
            loading: 'Registrando...',
            success: () => {
                setOpen(false)
                return `Suscripción exitosa`;
            },
            error: 'Este correo ya esta registrado',
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                            <div className='flex flex-col col-span-3'>
                                <Input
                                    id="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        setValidateform(false)
                                    }}
                                    className="w-full"
                                    placeholder="Ingresa tu correo"
                                />
                                {
                                    validateform ? <span className='text-red-500 text-sm'>{description}</span> : null
                                }
                            </div>

                        </div>
                    </div>
                    <DialogFooter>
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
    )
}
