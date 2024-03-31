import { hash } from "../_lib/bcrypt";
import { getUserByUsername, insertUser, NewUser } from "../../../../../lib/db";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

// api/user/register

const schema = z.object({
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
    if (user.length > 0) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const hashedPassword = await hash(password);

    const newUser: NewUser = {
      username: username,
      password: hashedPassword,
      createdAt: new Date(Date.now() + 2 * (60 * 60 * 1000)),
    };

    const dbRes = await insertUser(newUser);

    return NextResponse.json(dbRes[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
