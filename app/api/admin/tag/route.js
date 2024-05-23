import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Tag from "@/models/tag";
import category from "@/models/category";
import slugify from "slugify";
export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  const { name, parentCategory } = body;
  console.log(name, parentCategory);
  const categoryObj = await category.findOne({ _id: parentCategory });
  const categoryName = categoryObj.name;
  console.log(categoryName);
  try {
    const tag = await Tag.create({
      name,
      parentCategory,
      slug: slugify(categoryName + "+" + name),
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
