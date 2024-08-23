import { useEffect, useState } from 'react';
import { SidebarOption } from './SidebarOption';
import IconPlus from '@/components/Icon/IconPlus';
import { listChannelsForUser } from '@/services/listChannels';
import styles from './ChannelContainer.module.css';
import { useChannel } from '@/context/ChannelContext';
import { useSession } from 'next-auth/react';

interface Channel {
    guid: string;
    name: string;
}

export const ChannelContainer = () => {
    const [channels, setChannels] = useState<Channel[]>([]);
    const { selectedChannel, setSelectedChannel } = useChannel();

    const { data: session, status } = useSession();
    const [userEmail, setUserEmail] = useState('test@admin.com');


    useEffect(() => {
        if (session?.user?.email) {
            setUserEmail(session.user.email);
        }
    }, [session])

    useEffect(() => {
        const fetchChannels = async () => {
            try {
                const fetchedChannels = await listChannelsForUser(userEmail);
                setChannels(fetchedChannels?.channel_names);
                if (!selectedChannel && fetchedChannels?.channel_names.length > 0) {
                    setSelectedChannel(fetchedChannels[0]);
                }
            } catch (error) {
                console.error('Failed to fetch channels:', error);
            }
        };
        if (userEmail != 'test@admin.com') {
            fetchChannels();
        }
    }, [userEmail]);

    return (
        <div className={`h-full min-h-screen w-[300px] transition-all duration-300 p-1 ` + styles.sidebar}>
            <div className={styles.sidebar__options}>
                <h2 className="text-xl">Channels</h2>
                <hr />
                {channels.length && channels?.map((channel) =>
                    <SidebarOption
                        title={channel.name}
                        key={channel.guid}
                        sub={styles.sidebarOption__sub}
                        channel={channel}
                        userEmail={userEmail}
                    />
                )}
                <SidebarOption
                    Icon={IconPlus}
                    title="Add Channel"
                    sub={styles.sidebarOption__sub}
                    addChannelOption
                    userEmail={userEmail}
                />
            </div>
        </div>
    );
}