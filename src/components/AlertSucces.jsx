import { Terminal } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
export function AlertSucces({ description }) {
    return (
        <div className="flex justify-center items-center top-0 py-5 w-full absolute">
            <Alert className="z-[100] bg-green-500 w-[40%]">
                <Terminal color="white" className="h-4 w-4" />
                <AlertTitle><span className="text-white">Exito</span></AlertTitle>
                <AlertDescription>
                    <span className="text-white">{description}</span>
                </AlertDescription>
            </Alert>
        </div>
    )
}