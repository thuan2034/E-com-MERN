import { NextResponse } from "next/server";

export async function GET(req) {
return NextResponse.json({ time: new Date() });
}

//mongodb+srv://hutan:hutan2034@cluster0.js5xwh1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0