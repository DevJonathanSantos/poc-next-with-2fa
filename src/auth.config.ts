import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Assuming the user object has a role property
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = `${token.role}`;
        session.credentialsVerified = Boolean(token.credentialsVerified);
        session.userAutenticated = Boolean(token.userAutenticated);
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.userAutenticated;
      const userRole = auth?.user?.role;

      if (!isLoggedIn) return false;

      if (isLoggedIn && !nextUrl.pathname.startsWith("/private")) {
        return Response.redirect(new URL("/private", nextUrl));
      }

      if (!isLoggedIn && !nextUrl.pathname.startsWith("/login")) {
        return Response.redirect(new URL("/login", nextUrl));
      }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
