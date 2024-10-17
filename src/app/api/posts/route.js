import { dbConnect } from "@/db/db_config";
import { sendNewPostEmails } from "@/lib/utils";
import Post from "@/models/Post";
import RegisteredEmails from "@/models/RegisteredEmails";
import { AIConclusions } from "@/services/api";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await dbConnect()

        const { searchParams } = new URL(req.url)
        const page = searchParams.get('page')

        const currentPage = Number(page) || 1;
        const limit = 8;

        const postPagination = await Post.find({})
            .limit(limit)
            .skip(limit * (currentPage - 1))
            .sort({ createdAt: -1 });

        const totalPages = Math.ceil(await Post.countDocuments({}) / limit)

        return NextResponse.json({ posts: postPagination, totalPages, currentPage, lastPage: totalPages === currentPage })
    } catch (error) {
        return NextResponse.json({ message: 'Error al realizar la peticion', error: error.message }, { status: 500 })
    }
}

export async function POST(req) {
    try {
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
    } catch (error) {
        return NextResponse.json({ message: 'Error al realizar la peticion', error: error.message }, { status: 500 })
    }
}