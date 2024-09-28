import React, { useState, useEffect } from 'react';
import Folders from '../../components/usable_components/Folders';
import { ChannelContainer } from '@/components/Layouts/ChannelContainer/ChannelContainer';
import { useChannel } from '@/context/ChannelContext';
import GoogleConnect from '@/components/SocialMediaConnectors/GoogleConnect/GoogleConnect';
import { useAuth } from '@/context/AuthContext';

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
    const { selectedChannel, setSelectedChannel } = useChannel();
    const [disableListFiles, setDisableListFiles] = useState<boolean>(false);
    const { doesTokenExist } = useAuth();

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
                {(doesTokenExist) ?
                    <Folders fileData={fileData} disabled={disableListFiles} />
                    :
                    <div style={{ 'display': 'flex', 'justifyContent': 'center', 'alignContent': 'center', 'height': '100%' }}><GoogleConnect /></div>
                }
            </div>
        </div>
    )
};

export default FolderPath;
