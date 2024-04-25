import { NextResponse } from "next/server";

import type { UserTp } from "../../../../types/user.ts";

export async function POST(req: Request){
  const { username, password } = await req.json();

  const newUser: UserTp = {
    username,
    password,
  }

    return NextResponse.json({
      message: "Nuevo usuario",
      user: newUser})

}