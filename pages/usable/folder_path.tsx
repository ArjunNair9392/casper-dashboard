import React, { useState, useEffect } from 'react';
import Folders from '../../components/usable_components/Folders';
import { ChannelContainer } from '@/components/Layouts/ChannelContainer/ChannelContainer';
import { useChannel } from '@/context/ChannelContext';
import GoogleConnect from '@/components/SocialMediaConnectors/GoogleConnect/GoogleConnect';
import { useAuth } from '@/context/AuthContext';
import { getSession, GetSessionParams } from 'next-auth/react';

interface FileData {
    id: string;
    docId: string;
    docName: string;
    docUrl: string;
    name: string;
    webViewLink: string;
    status?: boolean;
}

const FolderPath = () => {
    const [fileData, setFileData] = useState<FileData[]>([]);
    const { selectedChannel } = useChannel();
    const [disableListFiles, setDisableListFiles] = useState<boolean>(false);
    const { doesTokenExist, isLoading } = useAuth();

    useEffect(() => {
        if (selectedChannel && selectedChannel.guid === 'default-guid') {
            setDisableListFiles(true);
        } else {
            setDisableListFiles(false);
        }
    }, [selectedChannel]);

    return (
        <div className='flex'>
            <ChannelContainer fileData={fileData} setFileData={setFileData} />
            <div className="folder-content" style={{ 'width': '100%' }}>
                {isLoading ? (
                    <div className="screen_loader animate__animated fixed inset-0 z-[60] grid place-content-center bg-[#fafafa] dark:bg-[#060818]">
                        <svg width="64" height="64" viewBox="0 0 135 135" xmlns="http://www.w3.org/2000/svg" fill="#4361ee">
                            <path d="M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z">
                                <animateTransform attributeName="transform" type="rotate" from="0 67 67" to="-360 67 67" dur="2.5s" repeatCount="indefinite" />
                            </path>
                            <path d="M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z">
                                <animateTransform attributeName="transform" type="rotate" from="0 67 67" to="360 67 67" dur="8s" repeatCount="indefinite" />
                            </path>
                        </svg>
                    </div>
                ) : (doesTokenExist ? (
                    <Folders fileData={fileData} disabled={disableListFiles} />
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <GoogleConnect />
                    </div>
                ))}
            </div>
        </div>
    )
};

export const getServerSideProps = async (context: GetSessionParams | undefined) => {
    const session = await getSession(context);

    if (!session) {
        // If not authenticated, redirect to login page
        return {
            redirect: {
                destination: '/', // Redirect to your sign-in page
                permanent: false,
            },
        };
    }

    return {
        props: { session }, // Pass the session to the page component as a prop
    };
};

export default FolderPath;
