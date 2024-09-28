import { createContext, useState, useContext, useEffect } from 'react';
import { getUser } from '@/services/getUser';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

interface AuthContextType {
    doesTokenExist: boolean;
    error: string | null;
    userEmail: string;
    userSlackWorkspace: {};
    registeredCompany: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [doesTokenExist, setDoesTokenExist] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string>('');
    const [userSlackWorkspace, setSlackUserWorkspaces] = useState({});
    const [registeredCompany, setRegisteredCompany] = useState('');

    useEffect(() => {
        if (session?.user?.email) {
            setUserEmail(session.user.email);
        }
    }, [session]);

    useEffect(() => {
        const checkAdminStatus = async () => {
            if (session?.user?.email) {
                try {
                    const userData = await getUser(session.user.email);
                    setDoesTokenExist(userData.does_token_exist);
                    setSlackUserWorkspaces(userData.slack_workspace);
                    setRegisteredCompany(userData.company_id)

                    if (!userData.success) {
                        router.push('other/company-registration');
                    }
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                    setError("Unable to verify admin status. Please try again later.");
                }
            }
        };

        checkAdminStatus();
    }, [session, router]);
    return (
        <AuthContext.Provider value={{ doesTokenExist, error, userEmail, userSlackWorkspace, registeredCompany }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
