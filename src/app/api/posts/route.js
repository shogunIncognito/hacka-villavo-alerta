import { dbConnect } from "@/db/db_config";
import { sendNewPostEmails } from "@/lib/utils";
import Post from "@/models/Post";
import RegisteredEmails from "@/models/RegisteredEmails";
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

    const emails = await RegisteredEmails.find({})
    sendNewPostEmails({ emails, post: savedPost })

    return NextResponse.json(savedPost)
}