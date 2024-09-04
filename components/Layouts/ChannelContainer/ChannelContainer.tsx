import { Fragment, useEffect, useState } from 'react';
import { SidebarOption } from './SidebarOption';
import IconPlus from '@/components/Icon/IconPlus';
import { listChannelsForUser } from '@/services/listChannels';
import styles from './ChannelContainer.module.css';
import { useChannel } from '@/context/ChannelContext';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import AddChannel from '@/components/AddChannel/AddChannel';
import { Transition, Dialog } from '@headlessui/react';
import { listFilesFromChannel } from '@/services/listFilesFromChannel';
import { FileData } from '@/components/usable_components/Folders';

const showAlert = async () => {
    Swal.fire({
        icon: 'info',
        title: 'No channels found',
        text: 'Looks like there are no channels for the user. Add channels to access the files.',
        padding: '2em',
        customClass: 'sweet-alerts',
    });
};

interface Channel {
    guid: string;
    name: string;
}

interface ChannelContainerProps {
    fileData: FileData[];
    setFileData: (fileData: FileData[]) => void;
}

export const ChannelContainer: React.FC<ChannelContainerProps> = ({ fileData, setFileData }) => {
    const [channels, setChannels] = useState<Channel[]>([]);
    const { selectedChannel, setSelectedChannel } = useChannel();

    const { data: session, status } = useSession();
    const [userEmail, setUserEmail] = useState('test@admin.com');
    const [addChannelModal, setAddChannelModal] = useState(false);

    useEffect(() => {
        if (session?.user?.email) {
            setUserEmail(session.user.email);
        }
    }, [session]);

    useEffect(() => {
        const fetchChannels = async () => {
            try {
                const fetchedChannels = await listChannelsForUser(userEmail);
                setChannels(fetchedChannels?.channel_names);
                if (fetchedChannels.length == 0) {
                    showAlert();
                }
            } catch (error) {
                console.error('Failed to fetch channels:', error);
            }
        };
        if (userEmail != 'test@admin.com') {
            fetchChannels();
        }
    }, [userEmail]);

    useEffect(() => {
        if (channels.length > 0) {
            setSelectedChannel(channels[0]);
        }
    }, [channels]);

    useEffect(() => {
        if (selectedChannel && selectedChannel.guid != 'default-guid') {
            selectChannel();
        }
    }, [selectedChannel]);

    const addChannel = () => {
        setAddChannelModal(true);
    };

    const selectChannel = async () => {
        try {
            const seletedChannelName = selectedChannel?.toString();
            const filesFromChannel = await listFilesFromChannel(userEmail, seletedChannelName);
            setFileData([...filesFromChannel?.files]);

        } catch (error) {
            console.error('Failed to fetch files:', error);
        }
    };

    return (
        <div className={`h-full min-h-screen w-[300px] transition-all duration-300 p-1 ` + styles.sidebar}>
            <div className={styles.sidebar__options}>
                <h2 className="text-xl">Channels</h2>
                <hr />
                {channels.length > 0 && channels?.map((channel) =>
                    <SidebarOption
                        key={channel.guid}
                        sub={styles.sidebarOption__sub}
                        channel={channel}
                        userEmail={userEmail}
                        selectChannel={selectChannel}
                    />
                )}
                <h3 className={styles.sidebarOption__channel} onClick={addChannel}>
                    <div className={styles.sidebarOption__addChannel}><IconPlus className={styles.sidebar__icon} /><span>Add channel</span></div>
                </h3>
                <Transition appear show={addChannelModal} as={Fragment}>
                    <Dialog as="div" open={addChannelModal} onClose={() => setAddChannelModal(false)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>
                        <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                            <div className="flex min-h-screen items-center justify-center px-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel as="div" className="panel my-8 w-full max-w-xl overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                        <AddChannel setCreateFolderModal={setAddChannelModal} channelNames={[]} setChannelNames={() => { }} />
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </div>
    );
}