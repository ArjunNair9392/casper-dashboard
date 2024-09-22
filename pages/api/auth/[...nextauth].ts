
//Working code

import NextAuth, { NextAuthOptions } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import GoogleProvider from "next-auth/providers/google";
import SlackProvider from "next-auth/providers/slack";

export const authConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        SlackProvider({
            clientId: '',
            clientSecret: ''
        })
    ],
    secret: 'secret!JWTrandom65',
    pages: {
        signIn: '/',
    },
};

export default NextAuth(authConfig);

