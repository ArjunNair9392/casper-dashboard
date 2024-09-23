'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import IconGoogle from '../Icon/IconGoogle';
import { signIn } from "next-auth/react";

const Registration: React.FC = () => {
    const router = useRouter();

    const handleSignIn = async (platform: string) => {
        try {
            await signIn(platform, { callbackUrl: '/usable/folder_path' });
        } catch (error) {
            console.error('Error during sign-in:', error);
        }
    };

    return (
        <div className="min-h-screen bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat dark:bg-[#060818]">
            <BackgroundImages />
            <div className="relative flex items-center justify-center px-6 py-10 sm:px-16">
                <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
                    <LeftPanel />
                    <RightPanel handleSignIn={handleSignIn} />
                </div>
            </div>
        </div>
    );
};

const BackgroundImages: React.FC = () => (
    <>
        <div className="absolute inset-0">
            <img src="/assets/images/auth/bg-gradient.png" alt="background" className="h-full w-full object-cover" />
        </div>
        <img src="/assets/images/auth/coming-soon-object1.png" alt="decoration" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
        <img src="/assets/images/auth/coming-soon-object2.png" alt="decoration" className="absolute left-24 top-0 h-40 md:left-[30%]" />
        <img src="/assets/images/auth/coming-soon-object3.png" alt="decoration" className="absolute right-0 top-0 h-[300px]" />
        <img src="/assets/images/auth/polygon-object.svg" alt="decoration" className="absolute bottom-0 end-[28%]" />
    </>
);

const LeftPanel: React.FC = () => (
    <div className="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgba(239,18,98,1)_0%,rgba(67,97,238,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
        <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
        <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
            <Link href="/" className="ms-10 block w-48 lg:w-72">
                <img src="/assets/images/auth/logo-white.svg" alt="Logo" className="w-full" />
            </Link>
            <div className="mt-24 hidden w-full max-w-[430px] lg:block">
                <img src="/assets/images/auth/unlock.svg" alt="Cover Image" className="w-full" />
            </div>
        </div>
    </div>
);

interface RightPanelProps {
    handleSignIn: (platform: string) => Promise<void>;
}

const RightPanel: React.FC<RightPanelProps> = ({ handleSignIn }) => (
    <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
        <div className="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
            <Link href="/" className="block w-8 lg:hidden">
                <img src="/assets/images/logo.svg" alt="Logo" className="mx-auto w-10" />
            </Link>
        </div>
        <div className="w-full max-w-[440px] lg:mt-16">
            <div className="mb-10 flex items-center">
                <div className="mb-10">
                    <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Welcome</h1>
                    <p className="text-base font-bold leading-normal text-white-dark">Sign in with your Google account</p>
                </div>
            </div>
            <div className="mb-10 md:mb-[60px]">
                <ul className="flex justify-center gap-3.5 text-white">
                    <li>
                        <button onClick={() => handleSignIn('google')} className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                            <p className='space-x-2'> <IconGoogle /></p>  Sign in with Google
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handleSignIn('slack')} className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                            <p className='space-x-2'></p>  Sign in with Slack
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <p className="absolute bottom-6 w-full text-center dark:text-white">© {new Date().getFullYear()}. CasperAI All Rights Reserved.</p>
    </div>
);

export default Registration;
