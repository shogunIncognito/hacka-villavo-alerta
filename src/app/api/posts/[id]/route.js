import { dbConnect } from "@/db/db_config";
import Post from "@/models/Post";
import { AIConclusions } from "@/services/api";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
    try {
        await dbConnect()

        const post = await Post.findById(params.id)
        if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

        return NextResponse.json(post)
    } catch (error) {
        return NextResponse.json({ message: 'Error al realizar la peticion', error: error.message }, { status: 500 })
    }
}

export async function PUT(req, { params }) {
    try {
        await dbConnect()

        const body = await req.json()

        const updatedPost = await Post.findByIdAndUpdate(params.id, {
            ...body,
            ai_response: body.generateAIResponse ? await AIConclusions(body) : null
        }, { new: true })
        if (!updatedPost) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

        return NextResponse.json(updatedPost)
    } catch (error) {
        return NextResponse.json({ message: 'Error al realizar la peticion', error: error.message }, { status: 500 })
    }
}

export async function DELETE(_, { params }) {
    try {
        await dbConnect()

        const deletedPost = await Post.findByIdAndDelete(params.id)
        if (!deletedPost) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

        return NextResponse.json(deletedPost)
    } catch (error) {
        return NextResponse.json({ message: 'Error al realizar la peticion', error: error.message }, { status: 500 })
    }
}
