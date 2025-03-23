import NextAuth from "next-auth";
import Yandex from "next-auth/providers/yandex";
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
  },
});

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
