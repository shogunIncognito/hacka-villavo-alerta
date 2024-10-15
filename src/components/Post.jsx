import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image from 'next/image'

export default function Post({post}){

    return (
        <Card className="w-[80%] h-full">
            <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full h-[300px]">
                    <img src={post.image[0]} 
                     className="object-cover w-full h-full"
                     alt={post.title} />
                </div>
            </CardContent>
            <CardFooter>
                <div className="w-full flex justify-between items-center">
                    <p>{post.category}</p>
                    <CardDescription>{post.author}</CardDescription>
                </div>
                
            </CardFooter>
        </Card>
    )
}