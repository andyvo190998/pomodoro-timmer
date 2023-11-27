import User from '@/models/User';
import connectDB from '@/models/db';
import { compare } from 'bcrypt';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};
export default NextAuth({
  // session: {
  //   jwt: true,
  // },
  // secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('In valid Email');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error('Incorrect password');
        }
        const userObject = { email: user.email, name: user.name, id: user._id };
        return Promise.resolve(userObject);
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user !== undefined) {
        if (user.id) {
          token = { ...token, id: user.id };
        }
      }
      return token;
    },
    async session(seshProps) {
      return seshProps;
    },
  },
});
