import React, { useEffect, useState } from 'react';
import styles from './GoogleConnect.module.css';
import { getGoogleRefreshCode } from '@/helpers/signInWithGoogle';
import IconGoogle from '@/components/Icon/IconGoogle';

const GoogleConnect: React.FC = () => {
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        const refreshToken = localStorage.getItem('code');
        setIsConnected(!!refreshToken);
    }, []);

    const connectGoogleAccount = () => {
        if (isConnected) {
            return;
        } else {
            getGoogleRefreshCode();
            setIsConnected(true);
        }
    };

    return (
        <div>
            <button type="button" className="btn btn-outline-primary" onClick={connectGoogleAccount}>
                <IconGoogle />
                {isConnected ? 'Connected' : 'Connect with Google'}
            </button>
        </div>
    );
};

export default GoogleConnect;
