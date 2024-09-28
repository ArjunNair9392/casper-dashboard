import React from "react";
import Dashboard from "@/components/Dashboard/Dashboard";
import Registration from "@/components/Registration/Registration";
import { useSession } from "next-auth/react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/router';

function Index() {
    const { status } = useSession();
    const { error, registeredCompany } = useAuth();
    const router = useRouter();

    if (status === "authenticated") {
        if (error) {
            return <div className="error">{error}</div>;
        }

        if (registeredCompany.length > 0) {
            return (
                <div className="flex flex-col items-center justify-center">
                    <Dashboard />
                </div>
            );
        } else {
            router.push('/other/company-registration');
        }
    }
    if (status === "unauthenticated") {
        return <Registration />;
    }
}

export default Index;