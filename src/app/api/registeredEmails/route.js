import { dbConnect } from "@/db/db_config";
import registeredEmails from "@/models/registeredEmails";
import { NextResponse } from "next/server";

export async function GET () {
  await dbConnect();
  const emails = await registeredEmails.find({});
  return NextResponse.json(emails);
}

export async function POST (req) {
  await dbConnect();
  const email = await req.json();
  const newEmail = new registeredEmails(email);
  const savedEmail = await newEmail.save();
  return NextResponse.json(savedEmail);
}