"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import FileUpload from "@/components/InputFIle"
import { useState } from "react"
import { axiosPost } from "@/helpers/requests/post"


export default function AddPost(){

    const [title, setTitle] = useState("")  
    const [description, setDescription] = useState("")  
    const [category, setCategory] = useState("")  
    const [switchValidate, setSwitchValidate] = useState(false)
    const [file, setFile] = useState([])

    const onSubmit = (e) => {
        e.preventDefault();

        // const formData = new FormData();
        // formData.append("title", title.target.value);
        // formData.append("description", description.target.value);
        // formData.append("category", category);
        // formData.append("generateAIResponse", switchValidate);
        // formData.append("image", file);
        
        axiosPost({url: '/api/posts', data: {
            title: title.target.value,
            description: description.target.value,
            category: category,
            generateAIResponse: switchValidate,
            image: "https://cblawgroup.com/wp-content/uploads/2022/12/shutterstock_1721672671-1024x576.jpg",
            author: "Juanito"
        }})
            .then(res=> console.log(res))
            .catch(error=> console.log(error))
      }

    return (
        <>
            <div className="flex justify-center items-center h-[85vh]">
                <Card className="w-[550px]">
                    <CardHeader>
                        <CardTitle>Crear Nueva Alerta</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={onSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex justify-center items-center gap-9">
                                <div className="w-[30%]">
                                    <Label className="justify-start items-center" htmlFor="title">Título</Label>
                                </div>
                                <div className="w-[70%]">
                                    <Input onChange={(e)=>setTitle(e)} className="w-full" id="name" placeholder="Ingrese el título" />
                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-9">
                                <div className="w-[30%]">
                                    <Label className="justify-start items-center" htmlFor="description">Descripción</Label>
                                </div>
                                <div className="w-[70%]">
                                    <Input onChange={(e)=>setDescription(e)} className="w-full" id="name" placeholder="Name of your project" />
                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-9">
                                <div className="w-[30%]">
                                    <Label className="justify-start items-center" htmlFor="category">Categoría</Label>
                                </div>
                                <div className="w-[70%]">
                                    <Select onValueChange={(e)=>setCategory(e)} className="w-full" >
                                        <SelectTrigger id="framework">
                                            <SelectValue placeholder="Categoría" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="Trafico">Trafico</SelectItem>
                                            <SelectItem value="Seguridad">Seguridad</SelectItem>
                                            <SelectItem value="Clima">Clima</SelectItem>
                                            <SelectItem value="Salud">Salud</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex justify-end items-center space-x-2">
                                <Switch onCheckedChange={(e)=>setSwitchValidate(e)} id="airplane-mode"/>
                                <Label htmlFor="airplane-mode">¿Desea una conclusión generada por la IA?</Label>
                            </div>
                            <div className="flex justify-center items-center">
                                <FileUpload setFile={setFile}/>
                            </div>
                        </div>
                        <CardFooter className="flex justify-end my-4">
                            <Button>Publicar</Button>
                        </CardFooter>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}