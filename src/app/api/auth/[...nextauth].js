import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { compare } from 'bcryptjs';
import connectMongo from '../../../../lib/mongodb';
import User from '../../../../models/User';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        await connectMongo();
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error('No user found');
        }
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Invalid password');
        }
        return { email: user.email, name: user.name };
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.id = token.id;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + '/donor-search'; 
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
});
