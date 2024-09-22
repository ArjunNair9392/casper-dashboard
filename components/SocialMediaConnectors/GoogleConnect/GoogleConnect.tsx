import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { googleAuthURL } from '@/helpers/constants';

const GoogleConnect = () => {
    const { doesTokenExist } = useAuth();

    const connectGoogleAccount = () => {
        if (!doesTokenExist) {
            window.location.href = googleAuthURL;
        }
    };

    return (
        <div>
            <button
                type="button"
                onClick={connectGoogleAccount}
                disabled={doesTokenExist}
                className={`flex items-center px-5 py-2 rounded-lg transition duration-300 ease-in-out shadow-md 
                ${doesTokenExist ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
                {doesTokenExist ? 'Google drive is connected' : 'Connect Google Account'}
            </button>
        </div>
    );
};

export default GoogleConnect;