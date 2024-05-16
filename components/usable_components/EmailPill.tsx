import React from 'react';

interface EmailPillProps {
    email: string;
    index: number;
    removeEmail: (index: number) => void;
}

const EmailPill: React.FC<EmailPillProps> = ({ email, index, removeEmail }) => {
    return (
        <div className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
            <span>{email}</span>
            <button onClick={() => removeEmail(index)} className="ml-1 focus:outline-none">
                <svg className="w-4 h-4 fill-current text-gray-600" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M11.414 10l3.293-3.293a1 1 0 1 0-1.414-1.414L10 8.586 6.707 5.293a1 1 0 1 0-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 1 0 1.414 1.414L10 11.414l3.293 3.293a1 1 0 1 0 1.414-1.414L11.414 10z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
};

export default EmailPill;
