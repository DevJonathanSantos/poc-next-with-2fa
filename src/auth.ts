import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        code2fa: { label: "Code", type: "text" },
        validateType: { type: "text" },
      },
      async authorize(credentials) {
        console.log("### CredentialProvider ###", "Credentials");

        const user = {
          id: "1",
          email: "user@nextmail.com",
          password: "123456",
          name: "User Hardcoded",
          role: "admin",
        };

        return { ...user, credentialsVerified: false };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      const customUser = user as unknown as any;

      if (user) {
        return {
          ...token,
          credentialsVerified: customUser.credentialsVerified,
          userAutenticated: customUser.userAutenticated,
          role: customUser.role,
        };
      }

      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          name: token.name,
          email: token.email,
          role: `${token.role}`,
        },
        credentialsVerified: token.credentialsVerified,
        userAutenticated: token.userAutenticated,
      };
    },
  },
  pages: {
    signIn: "/login",
  },
});
