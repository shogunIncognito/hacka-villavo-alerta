'use client'
import { Button } from "@/components/ui/button";
import { unsuscribeEmails } from "@/services/api";

export default function page({params}) {

    const handleUnsuscribeEmails = () => {        
        unsuscribeEmails(params.token)
            .then(() => alert('Te has desuscrito correctamente'))
            .catch(() => alert('Ha ocurrido un error, por favor intenta de nuevo'))
    }

    return (
        <div className="p-2 mt-10 flex justify-center items-center flex-col w-full gap-5">
            <p>¿Deseas dejar de recibir correos?</p>
            <Button onClick={handleUnsuscribeEmails}>Desuscribirse</Button>
        </div>
    )
}
