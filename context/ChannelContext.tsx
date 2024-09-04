import { createContext, useContext, useState, FC, ReactNode } from 'react';

interface Channel {
    guid: string;
    name: string;
}

interface ChannelContextProps {
    selectedChannel: Channel;
    setSelectedChannel: (channel: Channel) => void;
}

const ChannelContext = createContext<ChannelContextProps | undefined>(undefined);

export const ChannelProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedChannel, setSelectedChannel] = useState<Channel>({
        guid: 'default-guid',
        name: 'CasperAI',
    });

    return (
        <ChannelContext.Provider value={{ selectedChannel, setSelectedChannel }}>
            {children}
        </ChannelContext.Provider>
    );
};

export const useChannel = () => {
    const context = useContext(ChannelContext);
    if (!context) {
        throw new Error('useChannel must be used within a ChannelProvider');
    }
    return context;
};
