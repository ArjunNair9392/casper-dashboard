import styles from './ChannelContainer.module.css';
import { useState, useEffect, Fragment } from 'react';
import { SidebarOption } from './SidebarOption';
import IconBook from '@/components/Icon/IconBook';
import IconLock from '@/components/Icon/IconLock';
import IconPlus from '@/components/Icon/IconPlus';
import AddChannel from '@/components/AddChannel/AddChannel';
import { Transition, Dialog } from '@headlessui/react';

interface Channel {
    guid: string;
    name: string;
    type: string;
}

export const ChannelContainer = () => {
    const [channels, setChannels] = useState<Channel[]>([]);
    const [user, setUser] = useState<{ displayName: string } | null>(null);

    useEffect(() => {
        const data = localStorage.getItem('user');
        if (data) {
            setUser(JSON.parse(data));
        }

        // Set dummy data for channels and direct messages
        setChannels([
            { guid: '1', name: 'General', type: 'public' },
            { guid: '1', name: 'gpt-tech', type: 'public' },
            { guid: '2', name: 'tech101', type: 'private' },
            { guid: '2', name: 'Casper AI help', type: 'private' },
        ]);
    }, []);

    return (
        <div className={`sidebar z-50 h-full min-h-screen w-[300px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 p-1 ` + styles.sidebar}>
            <div className={styles.sidebar__options}>
                <SidebarOption Icon={IconBook} title="Channels" />
                <hr />
                {channels.map((channel) =>
                    channel.type === 'private' ? (
                        <SidebarOption
                            Icon={IconLock}
                            title={channel.name}
                            key={channel.guid}
                            sub={styles.sidebarOption__sub}
                        />
                    ) : (
                        <SidebarOption
                            title={channel.name}
                            key={channel.guid}
                            sub={styles.sidebarOption__sub}
                        />
                    )
                )}
                <SidebarOption
                    Icon={IconPlus}
                    title="Add Channel"
                    sub={styles.sidebarOption__sub}
                    addChannelOption
                />
            </div>
        </div>
    );
}
