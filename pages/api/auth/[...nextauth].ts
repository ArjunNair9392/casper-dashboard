
//Working code
// import { handleAuth } from '@auth0/nextjs-auth0';

// export default handleAuth();

import NextAuth, { NextAuthOptions } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import GoogleProvider from "next-auth/providers/google";

export const authConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    secret: 'secret!JWTrandom65',
    pages: {
        signIn: '/',
    },
};

export default NextAuth(authConfig);

// export async function loginIsRequiredServer() {
//     const session = await getServerSession(authConfig);
//     if (!session) return redirect("/");
// }

// export function loginIsRequiredClient() {
//     if (typeof window !== "undefined") {
//         const session = useSession();
//         const router = useRouter();
//         if (!session) router.push("/");
//     }
// }
