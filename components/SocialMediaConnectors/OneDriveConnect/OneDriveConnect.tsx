import React, { useEffect, useState } from 'react';
import styles from './OneDrive.module.css';
import { getGoogleRefreshCode } from '@/helpers/signInWithGoogle';

const OneDriveConnect: React.FC = () => {
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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="48"
                    height="48"
                    className={styles.googleIcon}
                >
                    <path d="M10,6V18A1,1,0,0,0,11,19.21l6-3.4a1,1,0,0,0,0-1.73l-6-3.4A1,1,0,0,0,10,6ZM5,19H3V5H5a3,3,0,0,1,3-3H21V21H8A3,3,0,0,1,5,19ZM12,8.88l4.37,2.47L12,14.82Z" />
                </svg>
                <div className={styles.statusMessage + `${isConnected ? styles.connected : ''}`}>
                    {isConnected ? 'Connected' : 'Connect with OneDrive'}
                </div>
            </button>
        </div>
    );
};

export default OneDriveConnect;
