import AddChannel from '@/components/AddChannel/AddChannel';
import { Transition, Dialog } from '@headlessui/react';
import styles from './SidebarOption.module.css';
import { FC, Fragment, useState } from 'react';

interface SidebarOptionProps {
    Icon?: React.ComponentType<{ className?: string }>;
    title?: string;
    sub?: string;
    addChannelOption?: boolean;
    online?: string;
}
interface Channel {
    guid: string;
    name: string;
    type: string;
}

export const SidebarOption: FC<SidebarOptionProps> = ({
    Icon,
    title,
    sub,
    addChannelOption,
}) => {
    const [createFolderModal, setCreateFolderModal] = useState(false);
    const [channels, setChannels] = useState<Channel[]>([]);
    const selectChannel = () => {
        // Channel selection logic
    };

    const addChannel = () => {
        setCreateFolderModal(true);
    };

    return (
        <div
            className={`${styles.sidebarOption} ${sub ? styles.sidebarOption__sub : ''}`}
            onClick={addChannelOption ? addChannel : selectChannel}
        >
            {Icon && <Icon className={styles.sidebarOption__icon} />}
            {Icon ? (
                <h3 className={styles.sidebarOption__channel}>{title}</h3>
            ) : (
                <h3 className={styles.sidebarOption__channel}>
                    <span className={styles.sidebarOption__hash}>#</span> {title}
                </h3>
            )}
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
                                    <AddChannel setCreateFolderModal={setCreateFolderModal} channelNames={[...channels]} setChannelNames={setChannels} />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};