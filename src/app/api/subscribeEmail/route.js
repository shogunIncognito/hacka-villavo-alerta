import { dbConnect } from "@/db/db_config";
import registeredEmails from "@/models/RegisteredEmails";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import RegisteredEmails from "@/models/RegisteredEmails";

export async function GET() {
  try {
    await dbConnect();
    const emails = await registeredEmails.find({});
    return NextResponse.json(emails);
  } catch (error) {
    return NextResponse.json({ message: 'Error al realizar la peticion', error: error.message }, { status: 500 })
  }
}

export async function POST(req) {
  await dbConnect();
  const { email } = await req.json();

  const emailExists = await RegisteredEmails.findOne({ email })
  if (emailExists) return NextResponse.json({ message: 'Correo ya registrado' }, { status: 400 });

  const newEmail = new registeredEmails({
    email,
    isActive: true,
    unsuscribeToken: jwt.sign({ email }, process.env.JWT_SECRET)
  });
  const savedEmail = await newEmail.save();
  return NextResponse.json(savedEmail);
}