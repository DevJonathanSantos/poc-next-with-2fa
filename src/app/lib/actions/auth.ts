"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function authenticate(formData: FormData) {
  try {
    console.log(formData);
    await signIn("credentials", formData);
  } catch (error) {
    console.log("XXXXXXXXXXXXXXXXXXX", error);

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
