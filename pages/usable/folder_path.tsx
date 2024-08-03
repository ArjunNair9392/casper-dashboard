import React from 'react';
import axios from 'axios';
import Folders from './folders';
import { ChannelContainer } from '@/components/Layouts/ChannelContainer/ChannelContainer';


const FolderPath = () => {
    // useEffect(() => {
    //     axios.get('/api/folder-paths')
    //         .then(response => {
    //             setFolderPaths(response.data);
    //             if (response.data.length > 0) {
    //                 setSelectedPath(response.data[0]);
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error fetching folder paths:', error);
    //         });
    // }, []);

    return (
        <div className='flex'>
            <ChannelContainer />
            <div className="folder-content" style={{ 'width': '100%' }}>
                <Folders fileData={[]} />
            </div>
        </div>
    )
};

export default FolderPath;
