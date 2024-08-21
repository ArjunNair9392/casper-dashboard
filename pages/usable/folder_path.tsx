import React, { useState, useEffect } from 'react';
import Folders from '../../components/usable_components/Folders';
import { ChannelContainer } from '@/components/Layouts/ChannelContainer/ChannelContainer';
import { listFilesFromChannel } from '@/services/listFilesFromChannel';
import { useSession } from 'next-auth/react';
import { useChannel } from '@/context/ChannelContext';

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

    useEffect(() => {
        if (session?.user?.email) {
            setUserEmail(session.user.email);
        }
    }, [session])

    useEffect(() => {
        if (userEmail != 'test@admin.com') {
            if (fileData && fileData.length == 0) {
                getFiles();
            }
        }
    }, [userEmail])

    const getFiles = () => {
        listFilesFromChannel(userEmail, selectedChannel.name)
            .then(response => {
                setFileData(response.data);
            })
            .catch(error => {
                console.error('Error fetching files:', error);
            });
    }

    return (
        <div className='flex'>
            <ChannelContainer />
            <div className="folder-content" style={{ 'width': '100%' }}>
                <Folders fileData={fileData} />
            </div>
        </div>
    )
};

export default FolderPath;
