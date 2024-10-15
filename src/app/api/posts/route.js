import { dbConnect } from "@/db/db_config";
import Post from "@/models/Post";
import { AIConclusions } from "@/services/api";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect()

    const posts = await Post.find({})
    return NextResponse.json(posts)
}

export async function POST(req) {
    await dbConnect()

    const post = await req.json()
    const AIPostConclusion = await AIConclusions(post)
    
    const newPost = new Post({
        ...post,
        ai_response: AIPostConclusion
    })
    const savedPost = await newPost.save()

    return NextResponse.json(savedPost)
}