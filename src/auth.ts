import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { User as NextAuthUser } from "next-auth";

interface User extends NextAuthUser {
  username: string;
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.username = token.username as string;
        session.user.name = token.name!;
        session.user.email = token.email!;
      }

      return session;
    },
    async jwt({ token, user, session, trigger }) {
      if (!token.sub) return token;

      if (user) {
        const userWithUsername = user as User;
        token.sub = userWithUsername.id;
        token.username = userWithUsername.username;
      }

      if (trigger === "update") {
        token.name = session.name;
        token.username = session.username;
        token.email = session.email;
      }

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
