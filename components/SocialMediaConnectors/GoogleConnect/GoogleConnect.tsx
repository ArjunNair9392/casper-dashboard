import React, { useEffect, useState } from 'react';
import styles from './GoogleConnect.module.css';
import { getGoogleRefreshCode } from '@/helpers/signInWithGoogle';

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
        <div className={styles.container}>
            <button onClick={connectGoogleAccount} className={styles.googleButton}>
                <svg className={styles.googleIcon} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48">
                    <path d="M44.5 20H24v8.5h11.7C34.8 34.6 30 39 24 39 17.4 39 12 33.6 12 27S17.4 15 24 15c3.5 0 6.7 1.4 9 3.6l6.1-6.1C35.5 8.5 30.1 6 24 6 12.3 6 3 15.3 3 27s9.3 21 21 21c10.6 0 20-8.2 21-18.5 0-.8-.5-1.5-1.5-1.5z" />
                </svg>
                <div className={styles.statusMessage + `${isConnected ? styles.connected : ''}`}>
                    {isConnected ? 'Connected' : 'Connect with Google'}
                </div>
            </button>
        </div>
    );
};

export default GoogleConnect;
