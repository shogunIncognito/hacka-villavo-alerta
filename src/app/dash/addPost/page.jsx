"use client";

import Spinner from '@/components/Spinner';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import FileUpload from "@/components/InputFIle";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { axiosPost } from "@/helpers/requests/post";
import { useSession } from "next-auth/react";

export default function AddPost() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [switchValidate, setSwitchValidate] = useState(false);
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const { data: session } = useSession();

    const validate = () => {
        const newErrors = {};
        if (!title) newErrors.title = "El título es requerido";
        if (!description) newErrors.description = "La descripción es requerida";
        if (!category) newErrors.category = "La categoría es requerida";
        if (!file) newErrors.file = "El archivo es requerido";
        return newErrors;
    };

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file.file);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);

        try {
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return res.data.secure_url;
        } catch (error) {
            toast.error("Error al subir la imagen a Cloudinary. Verifique las configuraciones.");
            throw error;
        }
    };

    const author = session?.user?.username || "Anónimo";

    const onSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            const imageUrl = await uploadImageToCloudinary(file);

            await axiosPost({
                url: "/api/posts",
                data: {
                    title: title,
                    description: description,
                    category: category,
                    generateAIResponse: switchValidate,
                    image: imageUrl,
                    author: author,
                },
            });

            toast.success("Post creado exitosamente");
            setErrors({});
            setTitle("");
            setDescription("");
            setCategory("");
            setImageUrl(null);
            setSwitchValidate(false);
            setFile(null);
        } catch (error) {
            toast.error("Error al crear el post");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center py-7 my-5 2xl:my-0 h-[110vh] 2xl:h-[90vh] relative">
            <Card className="w-[650px] 2xl:w-[850px] relative rounded-lg">
                {isSubmitting && (
                    <div className="absolute inset-0 bg-white bg-opacity-50 flex justify-center items-center z-10 rounded-lg">
                        <Spinner className="h-auto w-auto" />
                    </div>
                )}
                <div className={`${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}>
                    <CardHeader>
                        <CardTitle>Crear Nueva Alerta</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={onSubmit}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex justify-center items-center gap-9">
                                    <div className="w-[30%]">
                                        <Label htmlFor="title">Título</Label>
                                    </div>
                                    <div className="w-[70%]">
                                        <Input
                                            onChange={(e) => setTitle(e.target.value)}
                                            value={title}
                                            className="w-full focus:border-bd-primary"
                                            id="title"
                                            placeholder="Ingrese el título"
                                            disabled={isSubmitting}
                                        />
                                        {errors.title && (
                                            <p className="text-red-500 text-sm">{errors.title}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-center items-center gap-9">
                                    <div className="w-[30%]">
                                        <Label htmlFor="description">Descripción</Label>
                                    </div>
                                    <div className="w-[70%]">
                                        <Input
                                            onChange={(e) => setDescription(e.target.value)}
                                            value={description}
                                            className="w-full focus:border-bd-primary"
                                            id="description"
                                            placeholder="Ingrese la descripción"
                                            disabled={isSubmitting}
                                        />
                                        {errors.description && (
                                            <p className="text-red-500 text-sm">{errors.description}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-center items-center gap-9">
                                    <div className="w-[30%]">
                                        <Label htmlFor="category">Categoría</Label>
                                    </div>
                                    <div className="w-[70%]">
                                        <Select
                                            onValueChange={(value) => setCategory(value)}
                                            value={category}
                                            className="w-full focus:border-bd-primary"
                                            disabled={isSubmitting}
                                        >
                                            <SelectTrigger id="category">
                                                <SelectValue placeholder="Categoría" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectItem value="Trafico">Trafico</SelectItem>
                                                <SelectItem value="Seguridad">Seguridad</SelectItem>
                                                <SelectItem value="Clima">Clima</SelectItem>
                                                <SelectItem value="Salud">Salud</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.category && (
                                            <p className="text-red-500 text-sm">{errors.category}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-end items-center space-x-2">
                                    <Switch
                                        onCheckedChange={(checked) => setSwitchValidate(checked)}
                                        checked={switchValidate}
                                        id="airplane-mode"
                                        disabled={isSubmitting}
                                    />
                                    <Label htmlFor="airplane-mode">
                                        ¿Desea una conclusión generada por la IA?
                                    </Label>
                                </div>
                                <div className="flex justify-center items-center">
                                    <FileUpload setFile={setFile} setUrl={setImageUrl} url={imageUrl} disabled={isSubmitting} />
                                </div>
                                {errors.file && (
                                    <p className="text-red-500 text-sm text-center">
                                        {errors.file}
                                    </p>
                                )}
                            </div>
                            <CardFooter className="flex justify-end my-4">
                                <Button className="flex w-32 justify-center items-center" type="submit" disabled={isSubmitting}>
                                    <span>Publicar</span>
                                </Button>
                            </CardFooter>
                        </form>
                    </CardContent>
                </div>
            </Card>
        </div>
    );
}
