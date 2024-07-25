import { Fragment, useEffect, useState } from 'react';
import IconX from '../Icon/IconX';
import ConfirmationModal from '../ConfirmationModal';
import { useSession } from "next-auth/react";
import { addChannel } from '@/services/addChannel';

interface AddChannelProps {
    setCreateFolderModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddChannel: React.FC<AddChannelProps> = ({ setCreateFolderModal }) => {
    const [channel, setChannel] = useState<string>('');
    const [currentEmail, setCurrentEmail] = useState<string>('');
    const [confirmShare, setConfirmShare] = useState(false);
    const { data: session, status } = useSession();


    // useEffect(() => {
    //     const userEmail: string = session?.user?.email ?? 'test@admin.com';
    //     getShareUsers(userEmail)
    //         .then(response => {
    //             // Handle successful response
    //             setExistingUsers(response.data.userIds);
    //         })
    //         .catch(error => {
    //             // Handle error
    //             console.error('Error fetching files:', error);
    //         });
    //     // setExistingUsers();
    // }, []);

    const handleShare = () => {
        if (channel.length == 0) {
            alert('Add channel to create');
        } else {
            setConfirmShare(true);
        }
    };

    const handleConfirmShare = () => {
        addChannel('', '', '').then(response => {
            console.log(response)
        })
        setConfirmShare(false);
        setCreateFolderModal(false);
    };

    const handleCancelShare = () => {
        setConfirmShare(false);
    };

    return (
        <div className="bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-600">
                <h5 className="text-lg font-bold">Create new channel</h5>
                <button type="button" className="text-white-dark hover:text-dark" onClick={() => setCreateFolderModal(false)}>
                    <IconX />
                </button>
            </div>
            <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-600">
                <label htmlFor="emailInput" className="italic mb-2 p-2">Enter channel Name:</label>
                <input
                    id="emailInput"
                    type="text"
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    className="p-2 mb-2 mr-2 ml-2 border border-gray-300 rounded max-w-lg"
                />
            </div>
            <div className="flex justify-end">
                <button type="button" className="btn btn-outline-danger" onClick={() => setCreateFolderModal(false)}>
                    Cancel
                </button>
                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => handleShare()}>
                    Save
                </button>
            </div>
            <ConfirmationModal
                isOpen={confirmShare}
                title="Create new channe;"
                message="Are you sure you want to create a new channel?"
                onConfirm={handleConfirmShare}
                onCancel={handleCancelShare}
            />
        </div>
    );
};

export default AddChannel;
