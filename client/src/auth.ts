import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { sendRequest } from "./util/api";
import { AccountIsNotActive, InvalidEmailPasswordError, ServerError } from "./util/error";
import { IUser } from "./types/next-auth";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = await sendRequest<IBackendRes<IDataRes>>({
          url: `${process.env.URL_BACKEND}/auth/login`,
          method: "POST",
          body: {
            email: credentials.email,
            password: credentials.password
          }
        });

        if (+user?.statusCode === 200) {
          return {
            id: user?.data?.user?.id,
            email: user?.data?.user?.email,
            name: user?.data?.user?.name,
            access_token: user?.data?.AT
          };
        }else if(+user?.statusCode === 401){
          throw new InvalidEmailPasswordError();
        }else if(+user?.statusCode === 400){
          throw new AccountIsNotActive();
        }else{
          throw new ServerError();
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
    if (user) {
      token.user = (user as IUser);
    }

    return token;
    },
    async session({ session, token }) {
      (session.user as IUser) = token.user;
      return session;
    },
    authorized: async ({ auth }) => {
      return !!auth;
    },
    },
})