import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
type Data = {
  email: string;
  password: string;
};
// export default NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     CredentialsProvider({
//       //@ts-ignore
//       async authorize(credentials: Data){
//         const {email, password} = credentials;

//         const isExists = await prisma.customer.findUnique({
//           where:{email},
//         });

//         console.log(isExists)
//         if(!isExists) throw new Error("User doesn't exist!");

//         //@ts-ignore
//         console.log(password, user.password);
//         const isPasswordValid = await bcrypt.compare(
//           password,
//           isExists.password
//         )
//         console.log(isPasswordValid);
//         if(!isPasswordValid) throw new Error("Wrong Password!");
//         return isExists
//       }
//     }),

//     GithubProvider({
//       // @ts-ignore
//       clientId: process.env.GITHUB_ID,
//       // @ts-ignore
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//   ],
//   callbacks: {
//     async session({ session, customer }: any) {
//       const check = await prisma.customer.findUnique({
//         // @ts-ignore
//         where: { email: session.customer.email },
//       });
//       console.log("check >>", check)
//       session.customer = {
//         name: check?.name,
//         email: check?.email,
//       };
//       return session;
//     },

//   },
// });
export const authOptions: any = {
  providers: [
    CredentialsProvider({
      // @ts-ignore
      async authorize(credentials: Data) {
        const { email, password } = credentials;

        // @ts-ignore
        const isExists = await prisma.customer.findUnique({
          where: { email },
        });

        // console.log('is exists', isExists);
        if (!isExists) throw new Error("User Doesn't Exist!");

        // console.log(password, isExists.password);

        const isPasswordValid = await bcrypt.compare(
          password,
          isExists.password
        );
        // console.log(isPasswordValid);

        if (!isPasswordValid) throw new Error("Wrong Password!");
        return isExists;
      },
    }),
    GithubProvider({
      // @ts-ignore
      clientId: process.env.GITHUB_ID,
      // @ts-ignore
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }: any) {
      // console.log('inside callback:', session.user,'user:', user)
      let check;
      check = await prisma.customer.findUnique({
        // @ts-ignore
        where: { email: session.user.email },
      });
      if(!check){
        check = await prisma.user.findUnique({
          // @ts-ignore
          where: { email: session.user.email },
        });
      }

      // console.log("check >>", check)
      session.user = {
        name: check?.name,
        email: check?.email,
      };
      return session;
  
   
  },
    
  },
  secret: process.env.JWT_SECRET,
  
};

export default NextAuth(authOptions);
