import { dbConnect } from "@/db/db_config";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
    await dbConnect()

    const post = await Post.findById(params.id)
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

    return NextResponse.json(post)
}

export async function PUT(req, { params }) {
    await dbConnect()

    const body = await req.json()

    const updatedPost = await Post.findByIdAndUpdate(params.id, body, { new: true })
    if (!updatedPost) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

    return NextResponse.json(updatedPost)
}

export async function DELETE(_, { params }) {
    await dbConnect()

    const deletedPost = await Post.findByIdAndDelete(params.id)
    if (!deletedPost) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

    return NextResponse.json(deletedPost)
}
