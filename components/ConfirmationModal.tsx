import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import IconX from './Icon/IconX';

interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, title, message, onConfirm, onCancel }) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60"
                onClose={onCancel}
            >
                <div className="flex min-h-screen items-center justify-center px-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel as="div" className="panel my-8 w-full max-w-xl overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                            <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                <h5 className="text-lg font-bold">{title}</h5>
                                <button type="button" className="text-white-dark hover:text-dark" onClick={onCancel}>
                                    <IconX />
                                </button>
                            </div>
                            <div className='mb-2 p-4'>
                                <p>{message}</p>
                                <div className="flex justify-end">
                                    <button type="button" className="btn btn-outline-danger mr-4" onClick={onCancel}>
                                        Cancel
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={onConfirm}>
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ConfirmationModal;
