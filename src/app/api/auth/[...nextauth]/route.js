import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../../lib/mongodb";
import User from "../../../../../models/User"; 

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  debug: true,

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          
          const newUser = new User({
            name: user.name || profile.name,
            email: user.email,
            password: "", 
            bloodType: "", 
            contactNumber: "", 
          });
          await newUser.save();
        }
        return true; 
      } catch (error) {
        console.error('Error during sign-in:', error);
        return false; 
      }
    },
    async session({ session, token }) {
      session.user.id = token.sub; 
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
