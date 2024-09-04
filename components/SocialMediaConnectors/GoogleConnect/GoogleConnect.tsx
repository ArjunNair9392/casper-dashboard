import React, { useEffect, useState } from 'react';
import styles from './GoogleConnect.module.css';
import { getGoogleRefreshCode } from '@/helpers/signInWithGoogle';
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
                <IconGoogle />
                {isLoading ? 'Connecting...' : isConnected ? 'Connected' : 'Connect with Google'}
            </button>
        </div>
    );
};

export default GoogleConnect;
