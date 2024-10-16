import { AlertCircle } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
export function AlertError({ description }) {
    return (
        <div className="flex justify-center items-center top-0 py-5 w-full absolute">
            <Alert className="z-[100] w-[40%] bg-destructive">
                <AlertCircle color="white" className="h-4 w-4" />
                <AlertTitle><span className="text-white">Error</span></AlertTitle>
                <AlertDescription>
                    <span className="text-white">{description}</span>
                </AlertDescription>
            </Alert>
        </div>
    )
}