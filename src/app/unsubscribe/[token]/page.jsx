'use client'
import { Button } from "@/components/ui/button";
import { unsuscribeEmails } from "@/services/api";
import logo from '@/assets/logo.png'
import Image from "next/image";

export default function page({ params }) {

    const handleUnsuscribeEmails = () => {
        unsuscribeEmails(params.token)
            .then(() => alert('Te has desuscrito correctamente'))
            .catch(() => alert('Ha ocurrido un error, por favor intenta de nuevo'))
    }

    return (
        <div className="p-2 mt-10 flex justify-center items-center flex-col w-full gap-5 flex-1">
            <Image src={logo} alt="logo" width={240} height={220} className="invert h-[60px] object-cover" />
            <p>¿Deseas dejar de recibir correos?</p>
            <Button onClick={handleUnsuscribeEmails}>Cancelar suscripción</Button>
        </div>
    )
}
