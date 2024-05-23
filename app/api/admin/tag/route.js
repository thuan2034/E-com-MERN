import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Tag from "@/models/tag";
import slugify from "slugify";
export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const { name, parentCategory } = body;
  try {
    const tag = await Tag.create({
      name,
      parentCategory,
      slug: slugify(name),
    });
    return NextResponse.json(tag);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        err: "Server error. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}
