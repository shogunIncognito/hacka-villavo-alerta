import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"
import Markdown from 'react-markdown';

export default function Post({ post }) {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [isAIResponseExpanded, setIsAIResponseExpanded] = useState(false);

    const toggleDescription = () => setIsDescriptionExpanded(!isDescriptionExpanded);
    const toggleAIResponse = () => setIsAIResponseExpanded(!isAIResponseExpanded);

    const MAX_LENGTH = 100;

    return (
        <Card className="w-full max-w-[500px] h-full p-6 bg-white shadow-md rounded-lg overflow-hidden mx-auto">
            <CardHeader className="flex items-end p-1">
                {post.createdAt && (
                    <CardDescription className="text-gray-500 text-sm">
                        {new Date(post.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </CardDescription>
                )}
            </CardHeader>
            <CardHeader className="p-1">
                {post.title && (
                    <CardTitle className="text-lg font-semibold mt-2">{post.title}</CardTitle>
                )}
                {post.description && (
                    <CardDescription className="text-gray-600">
                        {isDescriptionExpanded ? post.description : `${post.description.substring(0, MAX_LENGTH)}${post.description.length > MAX_LENGTH ? '...' : ''}`}
                        {post.description.length > MAX_LENGTH && (
                            <span onClick={toggleDescription} className="text-blue-500 cursor-pointer ml-1">
                                {isDescriptionExpanded ? ' Ver menos' : ' Ver más'}
                            </span>
                        )}
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent className="p-1 ">
                {post.ai_response && (
                    <>
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <Button variant="none" className="p-1"><Badge variant="secondary" className="bg-green-500 text-white hover:text-black">Centaury AI</Badge></Button>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                                <div className="flex justify-between space-x-4">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>VC</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-semibold">@Centaury IA</h4>
                                        <p className="text-sm">
                                            Centaury IA es una inteligencia artificial diseñada para ayudarte a obtener una conclusión sobre el accidente.
                                        </p>
                                    </div>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                        <div className="flex items-center ">
                            <Avatar className="mr-2">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="text-gray-600">
                                <Markdown className="inline">
                                    {isAIResponseExpanded ? post.ai_response : `${post.ai_response.substring(0, MAX_LENGTH)}${post.ai_response.length > MAX_LENGTH ? '...' : ''}`}
                                </Markdown>
                                {post.ai_response.length > MAX_LENGTH && (
                                    <span onClick={toggleAIResponse} className="text-blue-500 cursor-pointer ml-1">
                                        {isAIResponseExpanded ? ' Ver menos' : ' Ver más'}
                                    </span>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </CardContent>
            <CardContent className="p-0">
                {post.image && post.image.length > 0 && (
                    <div className="w-full h-[250px]">
                        <img
                            src={post.image[0]}
                            className="object-cover w-full h-full"
                            alt={post.title}
                        />
                    </div>
                )}
            </CardContent>
            <CardFooter className="p-4 flex justify-between items-center">
                {post.category && (
                    <Badge variant="secondary">{post.category}</Badge>
                )}
                {post.author && (
                    <CardDescription className="text-gray-500">{post.author}</CardDescription>
                )}
            </CardFooter>
        </Card>
    );
}
