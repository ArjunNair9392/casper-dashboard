import { useEffect, useState, Fragment } from 'react';
import 'tippy.js/dist/tippy.css';
import IconUserPlus from '@/components/Icon/IconUserPlus';
import { Dialog, Transition } from '@headlessui/react';
import { googleAuthURL } from '../../helpers/constants';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import IconX from '@/components/Icon/IconX';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { getListFiles } from '../../services/listFiles';
import { useUser } from "@auth0/nextjs-auth0/client";
import ConfirmationModal from '@/components/ConfirmationModal';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

interface FileData {
    id: string;
    name: string;
    webViewLink: string;
}

interface Props {
    onSave: ([]) => void;
}
const PAGE_SIZES = [10, 20, 30, 50, 100];

const showAlert = async () => {
    Swal.fire({
        icon: 'success',
        title: 'Update successful!',
        text: 'You have shared successfully!',
        padding: '2em',
        customClass: 'sweet-alerts',
    });
};

const ListFiles: React.FC<Props> = ({ onSave }) => {
    const router = useRouter();
    const { user } = useUser();
    const [listFilesModal, setListFilesModal] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<FileData[]>([]);
    const [recordsData, setRecordsData] = useState<FileData[]>(sortBy([...initialRecords.slice(0, pageSize)], 'name'));
    const [search, setSearch] = useState('');
    const [selectedRecords, setSelectedRecords] = useState<any>([]);
    const [refreshCode, setRefreshCode] = useState(localStorage.getItem('code'));
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'name',
        direction: 'asc',
    });
    const [confirmFileSaveModal, setConfirmFileSaveModal] = useState(false);

    const generateGoogleAuthURL = () => {
        setListFilesModal(true);
        if (refreshCode && refreshCode.length > 0) {
            getFiles(refreshCode);
        } else {
            window.location.href = googleAuthURL;
        }
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            localStorage.setItem('code', code);
            router.push('/usable/folders');
            getFiles(code);
        }
    }, []);

    useEffect(() => {
        if (initialRecords.length) {
            setListFilesModal(true);
        }
    }, [initialRecords]);

    const getFiles = (code: string) => {
        const userEmail = user?.email ? user.email : 'test@admin.com'
        getListFiles(userEmail, code)
            .then(response => {
                // Handle successful response
                setInitialRecords(response.data);
            })
            .catch(error => {
                // Handle error
                console.error('Error fetching files:', error);
            });
    }

    const handleSaveButtonClick = () => {
        setConfirmFileSaveModal(true);
    };

    const handleConfirmFilesSave = () => {
        showAlert();
        onSave(selectedRecords);
        setConfirmFileSaveModal(false);
        setListFilesModal(false);
    };

    const handleCancelShare = () => {
        setConfirmFileSaveModal(false);
    };

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        const filteredRecords = initialRecords.filter((file) => {
            if (search !== '' && !file.name.toLowerCase().includes(search.trim().toLowerCase())) {
                return false;
            }
            return true;
        })
        setRecordsData(filteredRecords.slice(from, to));
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    }, [sortStatus]);

    return (
        <div>
            <div className="flex items-center justify-center">
                <button type="button" onClick={() => generateGoogleAuthURL()} className="btn btn-primary">
                    <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                    Add Files
                </button>
            </div>
            <Transition appear show={listFilesModal} as={Fragment}>
                <Dialog as="div" open={listFilesModal} onClose={() => setListFilesModal(false)}>
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
                                <Dialog.Panel as="div" className="panel my-8 w-full overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                        <h5 className="text-lg font-bold">Select PDF files for Casper to read</h5>
                                        <button type="button" className="text-white-dark hover:text-dark" onClick={() => setListFilesModal(false)}>
                                            <IconX />
                                        </button>
                                    </div>
                                    <div className="p-5">
                                        <div className="panel mt-6">
                                            <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                                                <h5 className="text-lg font-semibold dark:text-white-light">Files</h5>
                                                <div className="ltr:ml-auto rtl:mr-auto">
                                                    <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="datatables">
                                                <DataTable
                                                    className="table-hover"
                                                    records={recordsData}
                                                    columns={[
                                                        {
                                                            accessor: 'name',
                                                            title: 'File Name',
                                                            sortable: true,
                                                            render: (rowData) => (
                                                                <a href={rowData.webViewLink} target="_blank" rel="noopener noreferrer">
                                                                    {rowData.name}
                                                                </a>
                                                            ),
                                                        },
                                                    ]}
                                                    loadingText={"Please wait while we fetch your files"}
                                                    highlightOnHover
                                                    totalRecords={initialRecords.length}
                                                    recordsPerPage={pageSize}
                                                    page={page}
                                                    onPageChange={(p) => setPage(p)}
                                                    recordsPerPageOptions={PAGE_SIZES}
                                                    onRecordsPerPageChange={setPageSize}
                                                    paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                                                    sortStatus={sortStatus}
                                                    onSortStatusChange={setSortStatus}
                                                    selectedRecords={selectedRecords}
                                                    onSelectedRecordsChange={setSelectedRecords}
                                                />
                                            </div>
                                        </div>
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
                            </Transition.Child>
                            <ConfirmationModal
                                isOpen={confirmFileSaveModal}
                                title="Save Files"
                                message="Are you sure you want to save the selected files?"
                                onConfirm={handleConfirmFilesSave}
                                onCancel={handleCancelShare}
                            />
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default ListFiles;
