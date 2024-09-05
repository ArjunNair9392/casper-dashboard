import React, { useState, useEffect } from 'react';
import Folders from '../../components/usable_components/Folders';
import { ChannelContainer } from '@/components/Layouts/ChannelContainer/ChannelContainer';
import { listFilesFromChannel } from '@/services/listFilesFromChannel';
import { useSession } from 'next-auth/react';
import { useChannel } from '@/context/ChannelContext';
import GoogleConnect from '@/components/SocialMediaConnectors/GoogleConnect/GoogleConnect';

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
    const { data: session, status } = useSession();
    const [userEmail, setUserEmail] = useState('test@admin.com');
    const { selectedChannel, setSelectedChannel } = useChannel();
    const [disableListFiles, setDisableListFiles] = useState<boolean>(false);
    const [refreshCode, setRefreshCode] = useState<string | null>(null);

    useEffect(() => {
        if (session?.user?.email) {
            setUserEmail(session.user.email);
        }
    }, [session])

    useEffect(() => {
        if (selectedChannel && selectedChannel.guid === 'default-guid') {
            setDisableListFiles(true);
        } else {
            setDisableListFiles(false);
        }
    }, [selectedChannel]);

    useEffect(() => {
        const code = typeof window !== "undefined" ? window.localStorage.getItem('code') : null;
        setRefreshCode(code);
    }, []);


    return (
        <div className='flex'>
            <ChannelContainer fileData={fileData} setFileData={setFileData} />
            <div className="folder-content" style={{ 'width': '100%' }}>
                {(refreshCode && refreshCode.length > 0) ?
                    <Folders fileData={fileData} disabled={disableListFiles} />
                    :
                    <div style={{ 'display': 'flex', 'justifyContent': 'center', 'alignContent': 'center', 'height': '100%' }}><GoogleConnect /></div>
                }
            </div>
        </div>
    )
};

export default FolderPath;
