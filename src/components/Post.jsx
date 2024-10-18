import React, { useState, useMemo } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import Markdown from 'react-markdown';
import { Calendar, Edit, EllipsisVertical, Loader2, Trash } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { deletePost } from '@/services/api';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';


const MAX_LENGTH = 200;

export default function Post({ post, deletePostFromState }) {
    const { data } = useSession();
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [isAIResponseExpanded, setIsAIResponseExpanded] = useState(false);

    const toggleDescription = () => setIsDescriptionExpanded(prev => !prev);
    const toggleAIResponse = () => setIsAIResponseExpanded(prev => !prev);

    const [loadingDelete, setLoadingDelete] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const formatDate = useMemo(() => {
        const today = new Date().getDate();
        const postDay = Number(post.createdAt.split('-')[2].slice(0, 2));

        const logDate = new Date(post.createdAt).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });

        // TODO: Validar también el mes para comprobar que sea el mismo
        if (postDay === today) return 'Hoy';
        if (postDay === today - 1) return 'Ayer';

        return logDate
    }, [post.createdAt]);

    const renderTruncatedText = (text, isExpanded) =>
        isExpanded ? text : `${text.substring(0, MAX_LENGTH)}${text.length > MAX_LENGTH ? '...' : ''}`;

    const AvatarComponent = () => (
        <Avatar className="mr-2">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    );

    const handleDeletePost = (postId) => {
        setLoadingDelete(true);
        deletePost(postId)
            .then(() => {
                toast.success('Publicación eliminada con éxito');
                setOpenDialog(false);
                deletePostFromState(postId);
            })
            .catch(() => toast.error('Ocurrió un error al eliminar la publicación'))
            .finally(() => setLoadingDelete(false));
    }

    return (
        <Card className="w-full max-w-[95%] flex flex-col p-3 border-2 bg-white shadow-md rounded-lg mx-auto relative overflow-hidden">
            <CardHeader className="flex flex-col md:flex-row justify-between items-center p-0 mt-4 pr-5">
                {post.category && <Badge variant="secondary">{post.category}</Badge>}
                <CardDescription className="text-gray-500 text-sm m-0">
                    <Calendar className="inline mr-1" size={16} />
                    <span>{formatDate}</span>
                </CardDescription>
            </CardHeader>

            <CardHeader className="p-1">
                {post.title && (
                    <CardTitle className="text-xl font-semibold mt-2">{post.title}</CardTitle>
                )}
                {post.description && (
                    <div className={`relative ${isDescriptionExpanded ? 'overflow-y-auto' : ''}`}>
                        <CardDescription className="text-gray-600 pr-1">
                            {renderTruncatedText(post.description, isDescriptionExpanded)}
                            {post.description.length > MAX_LENGTH && (
                                <Button
                                    onClick={toggleDescription}
                                    className="text-blue-500 cursor-pointer p-0"
                                    variant="link"
                                >
                                    {isDescriptionExpanded ? 'Ver menos' : 'Ver más'}
                                </Button>
                            )}
                        </CardDescription>
                    </div>
                )}
            </CardHeader>

            <hr className='my-5' />

            <CardContent className="p-0">
                {post.ai_response && (
                    <>
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <Button variant="none" className="p-0">
                                    <AvatarComponent />
                                    <Badge variant="secondary" className="bg-green-500 text-white hover:text-black">
                                        Centaury AI
                                    </Badge>
                                </Button>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                                <div className="flex justify-between space-x-4">
                                    <AvatarComponent />
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-semibold">@Centaury IA</h4>
                                        <p className="text-sm">
                                            Centaury IA es una inteligencia artificial diseñada para ayudarte a obtener una conclusión sobre el accidente.
                                        </p>
                                    </div>
                                </div>
                            </HoverCardContent>
                        </HoverCard>

                        <div className="flex items-center overflow-hidden">
                            <div className={`text-gray-600 ${isAIResponseExpanded ? 'h-[250px] overflow-y-auto' : ''}`}>
                                <Markdown className="inline text-sm pr-1">
                                    {renderTruncatedText(post.ai_response, isAIResponseExpanded)}
                                </Markdown>
                                {post.ai_response.length > MAX_LENGTH && (
                                    <Button
                                        onClick={toggleAIResponse}
                                        className="text-blue-500 cursor-pointer p-0"
                                        variant="link"
                                    >
                                        {isAIResponseExpanded ? 'Ver menos' : 'Ver más'}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </CardContent>

            {post.image && post.image.length > 0 && (
                <CardContent className="p-1 flex-1">
                    <div className="w-full h-[450px] overflow-hidden rounded-lg">
                        <img
                            src={post.image[0]}
                            className="object-cover w-full h-full"
                            alt={post.title}
                        />
                    </div>
                </CardContent>
            )}

            <CardFooter className="p-4 flex justify-between items-center">
                {post.author && (
                    <CardDescription className="text-gray-500 flex items-center gap-2">
                        <Avatar>
                            <AvatarFallback>{post.author[0]}</AvatarFallback>
                        </Avatar>
                        <b>{post.author}</b>
                    </CardDescription>
                )}

                {data && (
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    <EllipsisVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Gestionar publicación</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <Link href={`/dash/updatePost/${post._id}`}>
                                        <DropdownMenuItem className="cursor-pointer">
                                            <Edit className="mr-2 h-4 w-4" />
                                            <span>Editar</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    <DialogTrigger className='w-full'>
                                        <DropdownMenuItem className="cursor-pointer">
                                            <Trash className="mr-2 h-4 w-4" />
                                            <span>Eliminar</span>
                                        </DropdownMenuItem>
                                    </DialogTrigger>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>¿Quieres eliminar la publicación?</DialogTitle>
                                <DialogDescription>
                                    Esta acción no se puede deshacer y perderás toda la información de la publicación.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button
                                    onClick={() => handleDeletePost(post._id)}
                                    disabled={loadingDelete}
                                    variant="destructive"
                                    className="w-1/5"
                                >
                                    {loadingDelete ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Eliminar'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}

            </CardFooter>
        </Card >
    );
}
