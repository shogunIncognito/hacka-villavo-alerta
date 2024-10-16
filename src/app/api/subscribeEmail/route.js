import { dbConnect } from "@/db/db_config";
import registeredEmails from "@/models/RegisteredEmails";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function GET() {
  await dbConnect();
  const emails = await registeredEmails.find({});
  return NextResponse.json(emails);
}

export async function POST(req) {
  await dbConnect();
  const { email } = await req.json();
  const newEmail = new registeredEmails({
    email,
    isActive: true,
    unsuscribeToken: jwt.sign({ email }, process.env.JWT_SECRET)
  });
  const savedEmail = await newEmail.save();
  return NextResponse.json(savedEmail);
}