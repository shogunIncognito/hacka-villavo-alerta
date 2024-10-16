import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import RegisteredEmails from "@/models/RegisteredEmails";
import { dbConnect } from "@/db/db_config";

export async function DELETE(req, { params }) {
    try {
        await dbConnect()

        const content = jwt.verify(params.token, process.env.JWT_SECRET)
        await RegisteredEmails.findOneAndDelete({ email: content.email })

        return NextResponse.json({ message: 'Unsuscribe success' })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Invalid token' }, { status: 400 })
    }
}