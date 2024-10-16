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
                <CardDescription className="text-gray-500 text-sm">
                    {new Date(post.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                </CardDescription>
            </CardHeader>
            <CardHeader className="p-1">
                <CardTitle className="text-lg font-semibold mt-2">{post.title}</CardTitle>
                <CardDescription className="text-gray-600">
                    {/* {isDescriptionExpanded ? post.description : `${post.description.substring(0, MAX_LENGTH)}${post.description.length > MAX_LENGTH ? '...' : ''}`}
                    {post.description.length > MAX_LENGTH && (
                        <span onClick={toggleDescription} className="text-blue-500 cursor-pointer ml-1">
                            {isDescriptionExpanded ? ' Ver menos' : ' Ver más'}
                        </span>
                    )} */}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-1 m-2">
                <Badge variant="secondary" className="bg-green-500 text-white hover:text-black">Centaury AI</Badge>
                <div className="flex items-center mt-2">
                    <Avatar className="mr-2">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {/* <div className="text-gray-600">
                        <Markdown className="inline">
                            {isAIResponseExpanded ? post.ai_response : `${post.ai_response.substring(0, MAX_LENGTH)}${post.ai_response.length > MAX_LENGTH ? '...' : ''}`}
                        </Markdown>
                        {post.ai_response.length > MAX_LENGTH && (
                            <span onClick={toggleAIResponse} className="text-blue-500 cursor-pointer ml-1">
                                {isAIResponseExpanded ? ' Ver menos' : ' Ver más'}
                            </span>
                        )}
                    </div> */}
                </div>
            </CardContent>
            <CardContent className="p-0">
                <div className="w-full h-[250px]">
                    <img
                        src={post.image[0]}
                        className="object-cover w-full h-full"
                        alt={post.title}
                    />
                </div>
            </CardContent>
            <CardFooter className="p-4 flex justify-between items-center">
                <Badge variant="secondary">{post.category}</Badge>
                <CardDescription className="text-gray-500">{post.author}</CardDescription>
            </CardFooter>
        </Card>
    );
}
