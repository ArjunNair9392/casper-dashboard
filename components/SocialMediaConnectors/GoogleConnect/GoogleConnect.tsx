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
            showAlert();
        }
    };

    return (
        <div className="mb-5">
            <button type="button" className="btn btn-secondary" onClick={connectGoogleAccount}>
                <IconGoogle />
                {isConnected ? 'Connected' : 'Connect with Google'}
            </button>
        </div>
    );
};

export default GoogleConnect;
