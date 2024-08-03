import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import { getToken } from "next-auth/jwt";
export async function PUT(req) {
  await dbConnect();
  const _req = await req.json();
  const { deliveryAddress } = _req;
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  try {
    const updated = await User.findByIdAndUpdate(
      token.user._id,
      { deliveryAddress },
      { new: true }
    );
    return NextResponse.json(updated);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        err: "Server error. Please try again.",
      },
      { status: 500 }
    );
  }
}
