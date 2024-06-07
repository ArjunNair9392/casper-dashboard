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
import { useSession } from "next-auth/react";
import { processFiles } from '@/services/processFiles';
import { deleteFile } from '@/services/deleteFile';
import IconCircleCheck from '@/components/Icon/IconCircleCheck';
import ShareUsers from '@/components/ShareUsers/ShareUsers';
import { getSelectedFiles } from '../../services/selectedFiles';

interface FileData {
    id: string;
    docId: string;
    docName: string;
    docUrl: string;
    name: string;
    webViewLink: string;
    status?: boolean;
}

const Folders = () => {
    const dispatch = useDispatch();
    const { data: session, status } = useSession();

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
    const [search, setSearch] = useState('');
    const userEmail: string = session?.user?.email ?? 'test@admin.com';

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    const getFiles = () => {
        getSelectedFiles(userEmail)
            .then(response => {
                // Handle successful response
                setRecordsData(response.data);
            })
            .catch(error => {
                // Handle error
                console.error('Error fetching files:', error);
            });
    }

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
        getFiles()
    }, [page, pageSize, initialRecords]);



    useEffect(() => {
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
        //console.log('Selected Records in Folders:', selectedRecords);
        setRowData(selectedRecords)
        setInitialRecords(sortBy(selectedRecords, 'name'));
        setRecordsData(selectedRecords);
        const fileIds = selectedRecords.map((record: { id: any; }) => record.id);
        const userEmail: string = session?.user?.email ?? 'test@admin.com';
        processFiles(fileIds, userEmail);
    };

    // TODO: (Dev)
    // const getFileName = () => {
    //     return recordsData.name || recordsData.docName
    // };

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
        deleteFile(idToDelete, userEmail);
    };

    if (status === "unauthenticated") {
        return <p>Access Denied</p>
    }

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
                                                <ShareUsers setShareModal={setShareModal} />
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
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
                                    render: ({ docName, docId, docUrl }) => (
                                        <div className="flex w-max items-center name-column">
                                            {/* <div>{name}</div> */}
                                            <a href={docUrl} target="_blank" rel="noopener noreferrer">
                                                {docName}
                                            </a>
                                        </div>
                                    ),
                                },
                                {
                                    accessor: 'action',
                                    title: 'Action',
                                    titleClassName: '!text-center action-column',
                                    render: ({ docId }) => (
                                        <div className="mx-auto flex w-max items-center gap-2"
                                            onClick={() => handleDelete(docId)}
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

export default Folders;
