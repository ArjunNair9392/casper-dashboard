import { Fragment, useEffect, useState } from 'react';
import IconX from '../Icon/IconX';
import EmailPill from '../usable_components/EmailPill';
import ConfirmationModal from '../ConfirmationModal';

interface ShareUsersProps {
    setShareModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShareUsers: React.FC<ShareUsersProps> = ({ setShareModal }) => {
    const [existingUsers, setExistingUsers] = useState([]);
    const [emails, setEmails] = useState<string[]>([]);
    const [currentEmail, setCurrentEmail] = useState<string>('');
    const [confirmShare, setConfirmShare] = useState(false);

    const isValidEmail = (email: string) => {
        // Regular expression for validating email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && currentEmail.trim() !== '') {
            const emailsArray = currentEmail.split(',').map(email => email.trim());
            emailsArray.forEach(email => {
                if (isValidEmail(email)) {
                    setEmails(prevEmails => [...prevEmails, email]);
                }
            });
            setCurrentEmail('');
        }
    };

    const removeEmail = (index: number) => {
        const updatedEmails = [...emails];
        updatedEmails.splice(index, 1);
        setEmails(updatedEmails);
    };

    const handleShare = () => {
        if (emails.length == 0) {
            alert('Add emails to share');
        } else {
            setConfirmShare(true);
        }
    };

    const handleConfirmShare = () => {
        const emailList = emails.map(email => email.trim()).join(',');
        console.log('Sharing emails:', emailList);
        // Call API to share and close modal
        setConfirmShare(false);
        setShareModal(false);
    };

    const handleCancelShare = () => {
        setConfirmShare(false);
    };

    return (
        <div className="bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-600">
                <h5 className="text-lg font-bold">Share file access</h5>
                <button type="button" className="text-white-dark hover:text-dark" onClick={() => setShareModal(false)}>
                    <IconX />
                </button>
            </div>
            <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-600">
                <input
                    id="emailInput"
                    type="text"
                    value={currentEmail}
                    onChange={(e) => setCurrentEmail(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    onBlur={() => {
                        if (isValidEmail(currentEmail)) {
                            setEmails(prevEmails => [...prevEmails, currentEmail.trim()]);
                            setCurrentEmail('');
                        }
                    }}
                    className="p-2 mb-2 mr-2 ml-2 border border-gray-300 rounded max-w-lg"
                />
                <label htmlFor="emailInput" className="italic mb-2 p-2">Enter Email Addresses (comma-separated):</label>
                <div className="flex flex-wrap">
                    {emails.map((email, index) => (
                        <EmailPill key={index} email={email} index={index} removeEmail={() => removeEmail(index)} />
                    ))}
                </div>
            </div>
            {/* Section for displaying existing users */}
            <div className="px-5 py-3">
                <h6 className="text-sm font-semibold mb-2">Already added users:</h6>
                <ul>
                    {existingUsers.map(user => (
                        // <li key={user.id}>{user.name}</li>
                        <p>user</p>
                    ))}
                </ul>
            </div>
            <div className="flex justify-end">
                <button type="button" className="btn btn-outline-danger" onClick={() => setShareModal(false)}>
                    Cancel
                </button>
                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => handleShare()}>
                    Save
                </button>
            </div>
            <ConfirmationModal
                isOpen={confirmShare}
                title="Share File Access"
                message="Are you sure you want to share file access?"
                onConfirm={handleConfirmShare}
                onCancel={handleCancelShare}
            />
        </div>
    );
};

export default ShareUsers;
