import { dbConnect } from "@/db/db_config";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function GET() {
    await dbConnect()
    const admins = await Admin.find({}).select('-password'); // quita la contraseña
    return NextResponse.json(admins);
}

export async function POST(req) {
    await dbConnect();
    const admin = await req.json();
    const newAdmin = new Admin({
        ...admin,
        password: await bcrypt.hash(admin.password, 10)
    });
    const savedAdmin = await newAdmin.save();
    return NextResponse.json(savedAdmin);
}