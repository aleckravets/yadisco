import NextAuth from "next-auth";
import Yandex from "next-auth/providers/yandex";
import { NextResponse } from "next/server";
import "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: process.env.NODE_ENV === "development",
  providers: [
    Yandex({
      authorization: {
        url: "https://oauth.yandex.ru/authorize",
        params: {
          scope:
            "login:info login:email login:avatar cloud_api:disk.read cloud_api:disk.app_folder",
        },
      },
    }),
  ],
  pages: {
    error: "/error",
  },
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
    accessToken?: string
    user: {
      name?: string
      email?: string
      image?: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    refreshToken?: string
    expiresAt?: number
  }
}