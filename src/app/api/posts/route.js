import { dbConnect } from "@/db/db_config";
import Post from "@/models/Post";
import { AIConclusions } from "@/services/api";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect()

    const posts = await Post.find({}).sort({ createdAt: -1 })
    return NextResponse.json(posts)
}

export async function POST(req) {
    await dbConnect()

    const post = await req.json()

    const AIPostConclusion = post.generateAIResponse ? await AIConclusions(post) : null

    const newPost = new Post({
        ...post,
        ai_response: AIPostConclusion
    })
    const savedPost = await newPost.save()

    return NextResponse.json(savedPost)
}