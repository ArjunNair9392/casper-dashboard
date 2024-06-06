// import { handleAuth } from '@auth0/nextjs-auth0';

// export default handleAuth();

import { authConfig } from "@/lib/auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };