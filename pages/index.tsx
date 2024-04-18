import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

const Index = () => {
    const { isLoading, error, user } = useUser();
    if(isLoading) return <div>Loading...</div>
    if(error) return <div>{error.message}</div>

    return (
        <>
            <div>
                <h1>starter page</h1>
                <div>
                    {!!user && <Link href="/api/auth/logout">Logout</Link>}
                    {!user && <Link href="/api/auth/login">login</Link>}
                </div>
            </div>
        </>
    );
};

export default Index;
