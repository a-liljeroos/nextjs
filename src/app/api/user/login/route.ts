import { compare } from "../_lib/bcrypt";
import { getUserByUsername } from "../../../../../lib/db";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

// api/user/login

const schema = z.object({
  csrfToken: z.string(),
  username: z.string().max(20),
  password: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const { username, password } = result.data;

    const user = await getUserByUsername(username);

    if (user.length === 0) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const match = await compare(password, user[0].password);

    if (!match) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(user[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
