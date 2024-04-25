import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: error.message,
        status: 500,
      });
    }
  }
}

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (user) {
      return NextResponse.json({
        message: "User already exists",
        status: 400,
      });
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        password,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: error.message,
        status: 500,
      });
    }
  }
}
