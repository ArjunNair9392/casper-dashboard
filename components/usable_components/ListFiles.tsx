import { useEffect, useState, useRef, Fragment } from 'react';
import 'tippy.js/dist/tippy.css';
import IconUserPlus from '@/components/Icon/IconUserPlus';
import IconX from '@/components/Icon/IconX';
import { Dialog, Transition } from '@headlessui/react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import { googleAuthURL } from '../../helpers/constants';
import { getListFiles } from '../../services/listFiles';
import ConfirmationModal from '@/components/ConfirmationModal';
import { hideFilesLoadingAlert, showAlert, showFilesLoadingAlert, showFilesLoadingFailedAlert } from '@/helpers/alerts';

interface FileData {
    id: string;
    name: string;
    webViewLink: string;
}

interface Props {
    onSave: (files: FileData[]) => void;
}

const PAGE_SIZES = [10, 20, 30, 50, 100];

const ListFiles: React.FC<Props> = ({ onSave }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const [listFilesModal, setListFilesModal] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<FileData[]>([]);
    const [recordsData, setRecordsData] = useState<FileData[]>([]);
    const [search, setSearch] = useState('');
    const [selectedRecords, setSelectedRecords] = useState<FileData[]>([]);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'name',
        direction: 'asc',
    });
    const [confirmFileSaveModal, setConfirmFileSaveModal] = useState(false);
    const isInitialMount = useRef(true);
    const hasCalledGetFiles = useRef(false);

    const [userEmail, setUserEmail] = useState('test@admin.com');

    useEffect(() => {
        if (session?.user?.email) {
            setUserEmail(session.user.email);
        }
    }, [session]);

    useEffect(() => {
        if (isInitialMount.current) {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            if (code) {
                window.localStorage.setItem('code', code);
                router.push('/usable/folder_path');
                if (userEmail !== 'test@admin.com') {
                    getFiles();
                }
            }
            isInitialMount.current = false;
        }
    }, [router, userEmail]);

    useEffect(() => {
        if (initialRecords.length) {
            setListFilesModal(true);
        }
    }, [initialRecords]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        const filteredRecords = initialRecords.filter((file) =>
            search === '' || file.name.toLowerCase().includes(search.trim().toLowerCase())
        );
        setRecordsData(filteredRecords.slice(from, to));
    }, [search, page, pageSize, initialRecords]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    }, [sortStatus]);

    const getFiles = async () => {
        showFilesLoadingAlert();
        try {
            const response = await getListFiles(userEmail);
            if (Array.isArray(response)) {
                setInitialRecords(response);
                hideFilesLoadingAlert();
            } else {
                console.error('Unexpected data format:', response);
                setInitialRecords([]);
            }
        } catch (error) {
            showFilesLoadingFailedAlert();
            console.error('Error fetching files:', error);
            setInitialRecords([]);
        }
    };

    const handleAddFiles = () => {
        setListFilesModal(true);
        getFiles();
    };

    const handleSaveButtonClick = () => {
        setConfirmFileSaveModal(true);
    };

    const handleConfirmFilesSave = () => {
        showAlert('Files saved successfully');
        const updatedSelectedRecords = selectedRecords.map(row => ({
            ...row,
            docName: row.name
        }));
        onSave(updatedSelectedRecords);
        setConfirmFileSaveModal(false);
        setListFilesModal(false);
    };

    return (
        <div>
            <button type="button" onClick={handleAddFiles} className="btn btn-primary">
                <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                Add Files
            </button>
            <Transition appear show={listFilesModal} as={Fragment}>
                <Dialog as="div" open={listFilesModal} onClose={() => setListFilesModal(false)}>
                    <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                        <div className="flex min-h-screen items-center justify-center px-4">
                            <Dialog.Panel className="panel my-8 w-full max-w-3xl overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                    <h5 className="text-lg font-bold">Select PDF files for Casper to read</h5>
                                    <button type="button" className="text-white-dark hover:text-dark" onClick={() => setListFilesModal(false)}>
                                        <IconX />
                                    </button>
                                </div>
                                <div className="p-5">
                                    <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                                        <h5 className="text-lg font-semibold dark:text-white-light">Files</h5>
                                        <input type="text" className="form-input w-auto ml-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                                    </div>
                                    <DataTable
                                        className="table-hover"
                                        records={recordsData}
                                        columns={[
                                            {
                                                accessor: 'name',
                                                title: 'File Name',
                                                sortable: true,
                                                render: ({ name, webViewLink }) => (
                                                    <a href={webViewLink} target="_blank" rel="noopener noreferrer">
                                                        {name}
                                                    </a>
                                                ),
                                            },
                                        ]}
                                        totalRecords={initialRecords.length}
                                        recordsPerPage={pageSize}
                                        page={page}
                                        onPageChange={setPage}
                                        recordsPerPageOptions={PAGE_SIZES}
                                        onRecordsPerPageChange={setPageSize}
                                        sortStatus={sortStatus}
                                        onSortStatusChange={setSortStatus}
                                        selectedRecords={selectedRecords}
                                        onSelectedRecordsChange={setSelectedRecords}
                                        highlightOnHover
                                        paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                                    />
                                    <div className="mt-8 flex items-center justify-end">
                                        <button type="button" className="btn btn-outline-danger" onClick={() => setListFilesModal(false)}>
                                            Discard
                                        </button>
                                        <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={handleSaveButtonClick}>
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <ConfirmationModal
                isOpen={confirmFileSaveModal}
                title="Save Files"
                message="Are you sure you want to save the selected files?"
                onConfirm={handleConfirmFilesSave}
                onCancel={() => setConfirmFileSaveModal(false)}
            />
        </div>
    );
};

export default ListFiles;
