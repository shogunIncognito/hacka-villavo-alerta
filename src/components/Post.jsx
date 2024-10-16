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

const MAX_LENGTH = 100;

export default function Post({ post }) {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [isAIResponseExpanded, setIsAIResponseExpanded] = useState(false);

    const toggleDescription = () => setIsDescriptionExpanded(prev => !prev);
    const toggleAIResponse = () => setIsAIResponseExpanded(prev => !prev);

    const formatDate = useMemo(() => {
        const today = new Date().getDate();
        const postDay = Number(post.createdAt.split('-')[2].slice(0, 2));

        // TODO: Validar también el mes para comprobar que sea el mismo
        if (postDay === today) return 'Hoy';
        if (postDay === today - 1) return 'Ayer';

        return new Date(post.createdAt).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    }, [post.createdAt]);

    const renderTruncatedText = (text, isExpanded) =>
        isExpanded ? text : `${text.substring(0, MAX_LENGTH)}${text.length > MAX_LENGTH ? '...' : ''}`;

    const AvatarComponent = () => (
        <Avatar className="mr-2">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    );

    return (
        <Card className="w-full max-w-[90%]  p-3 bg-white shadow-md rounded-lg mx-auto relative overflow-hidden">
            <CardHeader className="flex items-end p-0 mt-4 pr-5">
                <CardDescription className="text-gray-500 text-sm">{formatDate}</CardDescription>
            </CardHeader>

            <CardHeader className="p-1">
                {post.title && (
                    <CardTitle className="text-lg font-semibold mt-2">{post.title}</CardTitle>
                )}
                {post.description && (
                    <div className={`relative ${isDescriptionExpanded ? 'h-[150px] overflow-y-scroll' : ''}`}>
                        <CardDescription className="text-gray-600">
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

            <CardContent className="p-0">
                {post.ai_response && (
                    <>
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <Button variant="none" className="p-0">
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
                            <AvatarComponent />
                            <div className={`text-gray-600 ${isAIResponseExpanded ? 'h-[150px] overflow-y-scroll' : ''}`}>
                                <CardDescription className="text-gray-600">
                                    <Markdown className="inline">
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
                                </CardDescription>
                            </div>
                        </div>
                    </>
                )}
            </CardContent>

            {post.image && post.image.length > 0 && (
                <CardContent className="p-0">
                    <div className="w-full h-[250px] overflow-hidden rounded-lg">
                        <img
                            src={post.image[0]}
                            className="object-cover w-full h-full"
                            alt={post.title}
                        />
                    </div>
                </CardContent>
            )}

            <CardFooter className="p-4 flex justify-between items-center">
                {post.category && <Badge variant="secondary">{post.category}</Badge>}
                {post.author && <CardDescription className="text-gray-500">{post.author}</CardDescription>}
            </CardFooter>
        </Card>
    );
}
