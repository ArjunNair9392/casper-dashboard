import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Dashboard from "@/components/Dashboard/Dashboard";
import Registration from "@/components/Registration/Registration";
import { useSession } from "next-auth/react";
import { getUser } from '@/services/getUser';

function Index() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState<boolean | null>(true);
    const [error, setError] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState('test@admin.com');

    useEffect(() => {
        if (session?.user?.email) {
            setUserEmail(session.user.email);
        }
    }, [session])

    useEffect(() => {
        const checkAdminStatus = async () => {
            if (session && session.user && userEmail != 'test@admin.com') {
                try {
                    const userData = await getUser(userEmail);
                    setIsAdmin(userData !== 'FAILURE');

                    if (!userData.admin) {
                        router.push('other/company-registration');
                    }
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                    setError("Unable to verify admin status. Please try again later.");
                }
            }
        };

        //checkAdminStatus();
    }, [session, router, userEmail]);

    // if (status === 'loading' || isAdmin === null) return <div>Loading...</div>;

    if (status === "authenticated") {
        if (error) {
            return (
                <div className="error">
                    {error}
                </div>
            );
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

    return <Registration />;
}

export default Index;