import NextAuth from "next-auth";
import Yandex from "next-auth/providers/yandex";
import { NextResponse } from "next/server";
import "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Yandex],
  callbacks: {
    jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
    authorized: async ({ request, auth }) => {
      if (!auth) {
        return NextResponse.redirect(
          new URL(
            "/login?redirectTo=" +
              encodeURIComponent(request.nextUrl.toString()),
            request.url
          )
        );
      }
      return true;
    },
  },
});

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
