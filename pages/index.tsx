import React from "react";
import Dashboard from "@/components/Dashboard/Dashboard";
import Registration from "@/components/Registration/Registration";
import { useSession } from "next-auth/react";
import { useAuth } from "@/context/AuthContext";

function Index() {
    const { status } = useSession();
    const { isAdmin, error } = useAuth();
    console.log({ status });
    // if (status === 'loading' || isAdmin === null) {
    //     return <div>Something went wrong :( Please try again later.</div>;
    // }

    if (status === "authenticated") {
        if (error) {
            return <div className="error">{error}</div>;
        }

        if (isAdmin) {
            return (
                <div className="flex flex-col items-center justify-center">
                    <Dashboard />
                </div>
            );
        } else {
            return null; // The user will be redirected, so no need to render anything here
        }
    }
    if (status === "unauthenticated") {
        return <Registration />;
    }
}

export default Index;