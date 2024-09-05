import React, { useEffect, useState } from 'react';
import styles from './GoogleConnect.module.css';
import { getGoogleRefreshCode, setGoogleRefreshCode } from '@/helpers/signInWithGoogle';
import IconGoogle from '@/components/Icon/IconGoogle';
import Swal from 'sweetalert2';

const showAlert = async () => {
    Swal.fire({
        icon: 'success',
        title: 'Account linked!',
        text: 'You linked the Google account!',
        padding: '2em',
        customClass: 'sweet-alerts',
    });
};

const GoogleConnect: React.FC = () => {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        // Check if there's a code in the URL and store it
        setGoogleRefreshCode();

        // Check localStorage for the code
        const refreshToken = localStorage.getItem('code');
        setIsConnected(!!refreshToken);
    }, []);

    const connectGoogleAccount = async () => {
        if (isConnected) {
            return;
        } else {
            setIsLoading(true);
            await getGoogleRefreshCode();
            setIsLoading(false);
            const refreshToken = localStorage.getItem('code');
            if (refreshToken) {
                setIsConnected(true);
                showAlert();
            }
        }
    };

    return (
        <div className="mb-5">
            <button type="button" className="btn btn-secondary" onClick={connectGoogleAccount}>
                <p className="mr-2"><IconGoogle /></p>
                {isLoading ? 'Connecting...' : isConnected ? 'Connected' : 'Connect your Google Drive account'}
            </button>
        </div>
    );
};

export default GoogleConnect;