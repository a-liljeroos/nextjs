"use server";
import { getUserByUsername } from "../../../../lib/db";

export const isUsernameAvailable = async (
  username: string
): Promise<boolean> => {
  const user = await getUserByUsername(username);
  if (user.length > 0) {
    return false;
  } else {
    return true;
  }
};
