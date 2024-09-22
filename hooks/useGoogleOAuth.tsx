import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { connectGDrive } from '@/services/connectGdrive';
import Swal from 'sweetalert2';

const showConnectedAlert = async () => {
    Swal.fire({
        icon: 'success',
        title: 'Account linked!',
        text: 'You linked the Google account!',
        padding: '2em',
        customClass: 'sweet-alerts',
    });
};

const showErrorAlert = async () => {
    Swal.fire({
        icon: 'error',
        title: 'Account connecting failed!',
        text: 'There was an error. Please try again later.',
        padding: '2em',
        customClass: 'sweet-alerts',
    });
};

export const useGoogleOAuth = () => {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const refreshToken = localStorage.getItem('code');
        if (refreshToken) {
            // If there's a refresh token, attempt to connect Google Drive
            connectToGoogleDrive(refreshToken);
        }
    }, []);

    const connectToGoogleDrive = async (refreshToken: string) => {
        if (session?.user?.email) {
            setIsLoading(true);
            const response = await connectGDrive(refreshToken, session.user.email);
            if (response?.status === 200) {
                setIsConnected(true);
                showConnectedAlert()
            } else {
                showErrorAlert();
            }
            setIsLoading(false);
        }
    };

    return { isLoading, isConnected, connectToGoogleDrive };
};
