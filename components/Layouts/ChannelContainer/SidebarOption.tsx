import AddChannel from '@/components/AddChannel/AddChannel';
import { Transition, Dialog } from '@headlessui/react';
import styles from './SidebarOption.module.css';
import { FC, Fragment, useEffect, useState } from 'react';
import { useChannel } from '@/context/ChannelContext';
import { listFilesFromChannel } from '@/services/listFilesFromChannel';

interface SidebarOptionProps {
    Icon?: React.ComponentType<{ className?: string }>;
    title?: string;
    sub?: string;
    addChannelOption?: boolean;
    channel?: { guid: string, name: string };
    userEmail: string;
}

export const SidebarOption: FC<SidebarOptionProps> = ({
    Icon,
    title,
    sub,
    addChannelOption,
    channel,
    userEmail
}) => {
    const [createFolderModal, setCreateFolderModal] = useState(false);
    const { selectedChannel, setSelectedChannel } = useChannel();

    console.log(selectedChannel);
    const selectChannel = async () => {
        if (channel) {
            setSelectedChannel(channel);
            try {
                const files = await listFilesFromChannel(userEmail, selectedChannel?.toString())
                console.log(files); /*TODO: PASS FILES TO LIST FILES COMPONENT */
            } catch (error) {
                console.error('Failed to fetch files:', error);
            }
        }
    };

    const addChannel = () => {
        setCreateFolderModal(true);
    };

    return (
        <div
            className={`${styles.sidebarOption} ${sub ? styles.sidebarOption__sub : ''} ${selectedChannel?.name === channel?.name ? styles.sidebarOption__selected : ''}`}
            onClick={addChannelOption ? addChannel : selectChannel}
        >
            {Icon && <Icon className={styles.sidebarOption__icon} />}
            <h3 className={styles.sidebarOption__channel}>
                {addChannelOption ? `Add channel` : <span className={styles.sidebarOption__hash}>#{channel?.toString()}</span>}
            </h3>
            <Transition appear show={createFolderModal} as={Fragment}>
                <Dialog as="div" open={createFolderModal} onClose={() => setCreateFolderModal(false)}>
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
                                    <AddChannel setCreateFolderModal={setCreateFolderModal} channelNames={[]} setChannelNames={() => { }} />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};