import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react';
import Folders from './folders';
import IconUserPlus from '@/components/Icon/IconUserPlus';
import AddChannel from '@/components/AddChannel/AddChannel';
import IconPlus from '@/components/Icon/IconPlus';

const FolderPath = () => {
    const [folderPaths, setFolderPaths] = useState(['Folder 1', 'Folder 2', 'Folder3']);
    const [selectedPath, setSelectedPath] = useState('Folder 1');
    const [createFolderModal, setCreateFolderModal] = useState(false);


    // useEffect(() => {
    //     axios.get('/api/folder-paths')
    //         .then(response => {
    //             setFolderPaths(response.data);
    //             if (response.data.length > 0) {
    //                 setSelectedPath(response.data[0]);
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error fetching folder paths:', error);
    //         });
    // }, []);

    const handleTabClick = (path: any) => {
        setSelectedPath(path);
    };

    return (
        <div>
            <div className="flex border-b mb-5">
                {folderPaths.map(path => (
                    <button
                        key={path}
                        className={`px-4 py-2 cursor-pointer bg-gray-200 border border-b-0 transition-colors ${selectedPath === path ? 'bg-white font-bold border-t border-r border-l' : 'hover:bg-gray-300'}`}
                        onClick={() => handleTabClick(path)}
                    >
                        {path}
                    </button>
                ))}
                <div className='ml-5'>
                    <button type="button" onClick={() => { setCreateFolderModal(true) }} className="btn btn-primary">
                        <IconPlus className="ltr:mr-2 rtl:ml-2" />
                        Create new channel
                    </button>
                </div>
            </div>
            <Transition appear show={createFolderModal} as={Fragment}>
                <Dialog as="div" open={createFolderModal} onClose={() => setCreateFolderModal(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
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
                                    <AddChannel setCreateFolderModal={setCreateFolderModal} />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <div className="folder-content">
                {selectedPath && <Folders fileData={[]} />}
            </div>
        </div>
    );
};

export default FolderPath;
