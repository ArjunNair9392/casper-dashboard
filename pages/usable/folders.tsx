import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState, Fragment } from 'react';
import sortBy from 'lodash/sortBy';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconShare from '@/components/Icon/IconShare';
import { Dialog, Transition } from '@headlessui/react';
import IconSearch from '@/components/Icon/IconSearch';
import ListFiles from '@/components/usable_components/ListFiles';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useUser } from "@auth0/nextjs-auth0/client";
import { processFiles } from '@/services/processFiles';
import IconCircleCheck from '@/components/Icon/IconCircleCheck';
import IconX from '@/components/Icon/IconX';
import ConfirmationModal from '@/components/ConfirmationModal';

interface FileData {
    id: string;
    name: string;
    webViewLink: string;
    status?: boolean;
}

const Folders = () => {
    const dispatch = useDispatch();
    const { user, error, isLoading } = useUser();

    useEffect(() => {
        dispatch(setPageTitle('Folders'));
    });

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    });

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [rowData, setRowData] = useState<FileData[]>([]);
    const [initialRecords, setInitialRecords] = useState<FileData[]>([]);
    const [recordsData, setRecordsData] = useState<FileData[]>([]);
    const [shareModal, setShareModal] = useState(false);
    const [emails, setEmails] = useState<string[]>([]);
    const [currentEmail, setCurrentEmail] = useState<string>('');
    const [search, setSearch] = useState('');
    const [confirmShare, setConfirmShare] = useState(false);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        console.log('Search Call', search);
        setInitialRecords(() => {
            return rowData.filter((item) => {
                const itemName = item.name.toLowerCase().trim();
                const searchTerm = search.toLowerCase().trim();
                return (
                    itemName.includes(searchTerm)
                );
            });
        });
    }, [search]);

    const handleListFilesSave = (selectedRecords: any) => {
        console.log('Selected Records in Folders:', selectedRecords);
        setRowData(selectedRecords)
        setInitialRecords(sortBy(selectedRecords, 'name'));
        setRecordsData(selectedRecords);
        const fileIds = selectedRecords.map((record: { id: any; }) => record.id);
        processFiles(fileIds, 'Amazon', user?.email ? user.email : '');
    };

    const handleEmailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentEmail(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && isValidEmail(currentEmail)) {
            // Add currentEmail to the list of emails
            setEmails(prevEmails => [...prevEmails, currentEmail]);
            // Clear the currentEmail input
            setCurrentEmail('');
        }
    };

    const removeEmail = (index: number) => {
        setEmails(prevEmails => prevEmails.filter((_, i) => i !== index));
    };

    const isValidEmail = (email: string) => {
        // Regular expression for validating email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleShare = () => {
        const emailList = emails.map(email => email.trim()).join(',');
        console.log('Sharing emails:', emailList);
        setConfirmShare(true);
    };

    const handleConfirmShare = () => {
        // Call API to share and close modal
        console.log('Sharing...');
        setConfirmShare(false);
        setShareModal(false);
    };

    const handleCancelShare = () => {
        setConfirmShare(false);
    };

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'name',
        direction: 'asc',
    });

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    }, [sortStatus]);

    const handleDelete = (idToDelete: string) => {
        // Filter out the item to delete from rowData
        const updatedRowData = rowData.filter(item => item.id !== idToDelete);

        // Filter out the item to delete from initialRecords
        const updatedInitialRecords = initialRecords.filter(item => item.id !== idToDelete);

        // Filter out the item to delete from recordsData
        const updatedRecordsData = recordsData.filter(item => item.id !== idToDelete);

        // Update the state with the filtered arrays
        setRowData(updatedRowData);
        setInitialRecords(updatedInitialRecords);
        setRecordsData(updatedRecordsData);
    };

    const EmailPill = ({ email, onDelete }: { email: string, onDelete: () => void }) => {
        return (
            <div className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                <span>{email}</span>
                <button onClick={onDelete} className="ml-1 focus:outline-none">
                    <svg className="w-4 h-4 fill-current text-gray-600" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M11.414 10l3.293-3.293a1 1 0 1 0-1.414-1.414L10 8.586 6.707 5.293a1 1 0 1 0-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 1 0 1.414 1.414L10 11.414l3.293 3.293a1 1 0 1 0 1.414-1.414L11.414 10z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        );
    };

    return (
        <div>
            <div className="panel mt-6">
                <div className="flex flex-wrap items-center justify-between gap-5 mb-5">
                    <h2 className="text-xl">Files</h2>
                    <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                        <div className="flex gap-3">
                            <div>
                                <ListFiles onSave={handleListFilesSave} />
                            </div>
                            <div>
                                <button type="button" className="btn btn-primary" onClick={() => { setShareModal(true) }}>
                                    <IconShare className="ltr:mr-2 rtl:ml-2" />
                                    Share
                                </button>
                            </div>
                        </div>
                        <Transition appear show={shareModal} as={Fragment}>
                            <Dialog as="div" open={shareModal} onClose={() => setShareModal(false)}>
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
                                                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                                    <h5 className="text-lg font-bold">Share file access</h5>
                                                    <button type="button" className="text-white-dark hover:text-dark" onClick={() => setShareModal(false)}>
                                                        <IconX />
                                                    </button>
                                                </div>
                                                <div className='mb-2 p-4'>
                                                    <input
                                                        id="emailInput"
                                                        type="text"
                                                        value={currentEmail}
                                                        onChange={handleEmailsChange}
                                                        onKeyDown={handleKeyDown}
                                                        className="p-2 mb-2 mr-2 ml-2 border border-gray-300 rounded max-w-lg"
                                                    />
                                                    <label htmlFor="emailInput" className="italic mb-2 p-2">Enter Email Addresses (comma-separated):</label>
                                                    <div className="flex flex-wrap">
                                                        {emails.map((email, index) => (
                                                            <EmailPill key={index} email={email} onDelete={() => removeEmail(index)} />
                                                        ))}
                                                    </div>
                                                    <div className="flex justify-end">
                                                        <button type="button" className="btn btn-outline-danger" onClick={() => setShareModal(false)}>
                                                            Cancel
                                                        </button>
                                                        <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={handleShare}>
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                        <ConfirmationModal
                            isOpen={confirmShare}
                            title="Share File Access"
                            message="Are you sure you want to share file access?"
                            onConfirm={handleConfirmShare}
                            onCancel={handleCancelShare}
                        />
                        <div className="relative">
                            <input type="text" placeholder="Search Folders" className="peer form-input py-2 ltr:pr-11 rtl:pl-11" value={search} onChange={(e) => setSearch(e.target.value)} />
                            <button type="button" className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
                                <IconSearch className="mx-auto" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="datatables">
                    {isMounted && (
                        <DataTable
                            className="table-hover whitespace-nowrap"
                            records={recordsData}
                            columns={[
                                {
                                    accessor: 'name',
                                    title: 'Name',
                                    sortable: true,
                                    titleClassName: 'flex items-center',
                                    render: ({ name, id, webViewLink }) => (
                                        <div className="flex w-max items-center name-column">
                                            {/* <div>{name}</div> */}
                                            <a href={webViewLink} target="_blank" rel="noopener noreferrer">
                                                {name}
                                            </a>
                                        </div>
                                    ),
                                },
                                {
                                    accessor: 'action',
                                    title: 'Action',
                                    titleClassName: '!text-center action-column',
                                    render: ({ id }) => (
                                        <div className="mx-auto flex w-max items-center gap-2"
                                            onClick={() => handleDelete(id)}
                                        >
                                            <Tippy content="Delete">
                                                <IconTrashLines />
                                            </Tippy>
                                        </div>
                                    ),
                                },
                                {
                                    accessor: 'status',
                                    title: 'Status',
                                    titleClassName: '!text-center action-column',
                                    render: ({ status }) => (
                                        <div className="mx-auto flex w-max items-center gap-2"
                                        >
                                            <Tippy content="Status">
                                                <IconCircleCheck status={status} />
                                            </Tippy>
                                        </div>
                                    ),
                                },
                            ]}
                            totalRecords={initialRecords.length}
                            recordsPerPage={pageSize}
                            page={page}
                            onPageChange={(p) => setPage(p)}
                            recordsPerPageOptions={PAGE_SIZES}
                            sortStatus={sortStatus}
                            onSortStatusChange={setSortStatus}
                            onRecordsPerPageChange={setPageSize}
                            minHeight={200}
                            paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                        />
                    )}
                </div>
            </div>
        </div >
    );
};

export default withPageAuthRequired(Folders);
