import styles from './SidebarOption.module.css';
import { FC, Fragment, useEffect, useState } from 'react';
import { useChannel } from '@/context/ChannelContext';

interface SidebarOptionProps {
    Icon?: React.ComponentType<{ className?: string }>;
    title?: string;
    sub?: string;
    channel?: { guid: string, name: string };
    userEmail: string;
    selectChannel: () => void;
}

export const SidebarOption: FC<SidebarOptionProps> = ({
    Icon,
    sub,
    channel,
    selectChannel
}) => {
    const { selectedChannel, setSelectedChannel } = useChannel();


    return (
        <div
            className={`${styles.sidebarOption} ${sub ? styles.sidebarOption__sub : ''} ${(selectedChannel?.name === channel?.name) ? styles.sidebarOption__selected : ''}`}
            onClick={selectChannel}
        >
            {Icon && <Icon className={styles.sidebarOption__icon} />}
            <h3 className={styles.sidebarOption__channel}>
                <span className={styles.sidebarOption__hash}>#{channel?.toString()}</span>
            </h3>
        </div>
    );
};