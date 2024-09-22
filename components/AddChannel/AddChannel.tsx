import { Fragment, useEffect, useState } from 'react';
import IconX from '../Icon/IconX';
import ConfirmationModal from '../ConfirmationModal';
import { useSession } from "next-auth/react";
import { addChannel } from '@/services/addChannel';
import { listChannelsForUser } from '@/services/listChannels';
import { Channel } from '../Layouts/ChannelContainer/ChannelContainer';


interface AddChannelProps {
    setCreateFolderModal: React.Dispatch<React.SetStateAction<boolean>>;
    channelNames?: Channel[];
    setChannelNames?: React.Dispatch<React.SetStateAction<Channel[]>>;
    onUpdateChannels?: (channels: Channel[]) => void; // Callback to update channels in the parent component
    onSelectChannel?: (channel: Channel) => void;
}

const AddChannel: React.FC<AddChannelProps> = ({
    setCreateFolderModal,
    channelNames = [],
    setChannelNames,
    onUpdateChannels,
    onSelectChannel,
}) => {
    const [channel, setChannel] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [confirmShare, setConfirmShare] = useState(false);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session?.user?.email) {
            setUserEmail(session.user.email);
        }
    }, [session]);

    const handleShare = () => {
        if (channel.length === 0) {
            alert('Add channel to create');
        } else {
            setConfirmShare(true);
        }
    };

    const handleConfirmShare = async () => {
        try {
            const response = await addChannel(channel, userEmail);

            if (response && response.success) {
                // Fetch the updated list of channels
                const updatedChannels = await listChannelsForUser(userEmail);

                if (onUpdateChannels) {
                    const formattedChannels = updatedChannels.channel_names.map((name: string) => ({
                        guid: `${name}-guid`,
                        name,
                        selected: false,
                    }));

                    onUpdateChannels(formattedChannels); // Update channels state

                    // Set the newly added channel as the default selected channel
                    const newChannel = formattedChannels.find((ch: { name: string; }) => ch.name === channel);
                    if (newChannel && onSelectChannel) {
                        onSelectChannel(newChannel); // Set the newly added channel as selected
                    }
                }
            } else {
                console.error('Failed to add channel:', response.message);
            }
        } catch (error) {
            console.error('Error adding channel:', error);
        } finally {
            setConfirmShare(false);
            setCreateFolderModal(false);
        }
    };

    const handleCancelShare = () => {
        setConfirmShare(false);
    };

    return (
        <div className="bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-600">
                <h5 className="text-lg font-bold">Create new channel</h5>
                <button
                    type="button"
                    className="text-white-dark hover:text-dark"
                    onClick={() => setCreateFolderModal(false)}
                >
                    <IconX />
                </button>
            </div>
            <div className="px-5 py-3">
                <label htmlFor="channelName" className="italic mb-2 p-2">
                    Enter channel name:
                </label>
                <input
                    id="channelName"
                    type="text"
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    className="p-2 mb-2 mr-2 ml-2 border border-gray-300 rounded max-w-lg"
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => setCreateFolderModal(false)}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className="btn btn-primary ltr:ml-4 rtl:mr-4"
                    onClick={() => handleShare()}
                >
                    Save
                </button>
            </div>
            <ConfirmationModal
                isOpen={confirmShare}
                title="Create new channel"
                message="Are you sure you want to create a new channel?"
                onConfirm={handleConfirmShare}
                onCancel={handleCancelShare}
            />
        </div>
    );
};

export default AddChannel;