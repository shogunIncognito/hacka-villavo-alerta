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
    console.log(post.image[0])

    return (
        <Card className="w-[80%] h-full">
            <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full h-[300px]">
                    {/* <Image 
                        src="https://imagenes.eltiempo.com/files/image_652_366/uploads/2023/10/02/651b1faf35780.jpeg"
                        alt={post.title}
                        className="object-cover w-full h-full"
                        layout="fill" // Ajusta la imagen al contenedor
                        objectFit="cover" // Opcional: ajusta la imagen sin distorsionar
                    /> */}
                    <img src={post.image[0]} 
                     className="object-cover w-full h-full"
                     alt="" />
                </div>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    )
}