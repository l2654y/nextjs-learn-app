"use server";
import sql from "@/db";
import md5 from "md5";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { IAuthData } from "@/app/account/page";

const jwtSecret = "NEXTJS_LEARN_APP_SECRET_KEY";

export const loginAction = async (email: string, password: string) => {
  try {
    const users = await sql.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, md5(password)]
    );
    if (users.length) {
      const user = users[0];

      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        jwtSecret as string,
        { expiresIn: "1h" }
      );

      (await cookies()).set({
        name: "auth_token",
        value: token,
        httpOnly: true,
      });

      return { status: 200, message: "Login successful" };
    } else {
      return { status: 401, message: "Login failed" };
    }
  } catch (error) {
    return {
      status: 500,
      message: error,
    };
  }
};
export const registerAction = async (
  username: string,
  email: string,
  password: string
) => {
  const users = await sql.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (users.length) {
    return { status: 401, message: "Email already exists" };
  }

  const encryptionPassword = md5(password);

  await sql.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
    [username, email, encryptionPassword]
  );
  return { status: 200, message: "Registration successful" };
};

export const logoutAction = async () => {
  (await cookies()).delete("auth_token");
  return { status: 200, message: "Logout successful" };
};

export const getAuthData = async () => {
  try {
    const token = (await cookies()).get("auth_token");
    if (token) {
      const result = jwt.verify(token.value, jwtSecret as string) as IAuthData;
      return {
        status: 200,
        data: result,
      };
    } else {
      return {
        status: 401,
        message: "Unauthorized",
      };
    }
  } catch (error) {
    return {
      status: 401,
      message: error,
    };
  }
};
