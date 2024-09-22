import React from 'react';
import { useGoogleOAuth } from '@/hooks/useGoogleOAuth';
import { googleAuthURL } from '@/helpers/constants';

const GoogleConnect = () => {
    const { isLoading, isConnected } = useGoogleOAuth();

    const connectGoogleAccount = () => {
        if (!isLoading) {
            window.location.href = googleAuthURL;
        }
    };

    return (
        <div>
            <button
                type="button"
                onClick={connectGoogleAccount}
                disabled={isLoading || isConnected}
                className={`flex items-center px-5 py-2 rounded-lg transition duration-300 ease-in-out shadow-md 
                ${isConnected ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'} 
                ${isLoading ? 'cursor-wait opacity-50' : ''}`}
            >
                {isLoading ? 'Connecting...' : (isConnected ? 'Connected' : 'Connect Google Account')}
            </button>
        </div>
    );
};

export default GoogleConnect;
