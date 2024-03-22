import { NewUser, insertUser } from "../db";

async function main() {
  const user: NewUser = {
    username: "test",
    password: "test",
    createdAt: new Date(),
  };
  const res = await insertUser(user);
  console.log(res);
  process.exit();
}

main();
