import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import HomeScreen from "@/components/HomeScreen/HomeScreen";
import MultiStepLogin from "@/components/MultistepLogin/MultistepLogin";
import Registration from "@/components/Registration/Registration";
import Dashboard from "@/components/Dashboard/Dashboard";

function index() {
    const { user, error, isLoading } = useUser();
    const router = useRouter();
    const [isAdminRegistered, setIsAdminRegistered] = useState(false);

    useEffect(() => {
        if (user) {
            //API CALL FOR GET ADMIN INFO
        }
    }, [user]);

    const handleRegisterClick = () => {
        router.push('/usable/company_details');
    };

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

    if (user) {
        return (
            <div className="flex flex-col items-center justify-center">
                <>
                    {/* <HomeScreen /> */}
                    <Dashboard />
                </>
                {!isAdminRegistered && (
                    <div className="bg-alert px-4 py-3 rounded relative mb-4 mt-4" role="alert">
                        <span className="mr-2"><FontAwesomeIcon icon={faInfoCircle} /></span>
                        <strong className="font-bold">Info:</strong>
                        <span className="block sm:inline">It seems that you are not registered as an admin. Please register <button onClick={handleRegisterClick} className="text-blue-500">here</button>.</span>
                    </div>
                )}
                <style jsx>{`
                .bg-alert {
                    background-color: #fff3e5;
                    color: #6f4814;
                }
            `}</style>
            </div>
        );
    }

    return (
        // <div className="flex flex-col items-center justify-center h-screen">
        //     <h1 className="text-3xl font-bold mb-4">Welcome to CasperAI!</h1>
        //     <p className="text-lg mb-8 text-center">
        //         A tool for professionals to simplify their workflow by summarizing articles, creating content, and sharing insights with stakeholders.
        //         <br /><br />
        //         We are the ChatGPT in your browser to quickly and easily get the gist of any web page or PDF, without having to read the whole thing.
        //         <br /><br />
        //         Unlock the power of AI with Casper's Dashboard. This dashboard streamlines your workflow with insights and summaries, utilizing OpenAI's GPT's newest models.
        //         <br /><br />
        //         Whether you're preparing for an exam, conducting due diligence on an investment, working on a major deal, or trying to stay on top of new legislation, this tool will make your job easier.
        //     </p>
        //     <a href="/api/auth/login" className="bg-blue-500 text-white font-bold py-4 px-8 rounded hover:bg-blue-700">Try now</a>
        // </div>
        // <MultiStepLogin />
        <Registration />
    )
};

export default index;
