import React, { useEffect, useState } from 'react';
import styles from './SharePoint.module.css';
import { getGoogleRefreshCode } from '@/helpers/signInWithGoogle';

const SharePointConnect: React.FC = () => {
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
                    <path d="M20.15,2H12.17A3,3,0,0,0,9.34,3.69l-6.38,11A3,3,0,0,0,3.79,17h-.1a3,3,0,0,0,0,2.1,3,3,0,0,0,.79.76,3,3,0,0,0,2.11.89h7.93A3,3,0,0,0,14.9,20h.2a3,3,0,0,0,2.1-.87,3,3,0,0,0,.79-.76,3,3,0,0,0,0-2.1h.1a3,3,0,0,0-.79-.76l1.84-3.17A3,3,0,0,0,20.15,2ZM8.64,18H4.81l1.47-2.53a3,3,0,0,0,2.63-1.49ZM10.26,12,6,4H18.11Zm9.29,6h-.1l-1.82-3.17a3,3,0,0,0,.5-1.66,3,3,0,0,0-3-3H7.89L10.9,8H15l-1.42,2.45a3,3,0,0,0,.07,3.1,3,3,0,0,0,1.75,1.45L19.56,18Z" />
                </svg>
                <div className={styles.statusMessage + `${isConnected ? styles.connected : ''}`}>
                    {isConnected ? 'Connected' : 'Connect with SharePoint'}
                </div>
            </button>
        </div>
    );
};

export default SharePointConnect;
