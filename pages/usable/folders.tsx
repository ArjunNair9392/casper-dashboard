import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconBell from '@/components/Icon/IconBell';
import IconXCircle from '@/components/Icon/IconXCircle';
import IconPencil from '@/components/Icon/IconPencil';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconShare from '@/components/Icon/IconShare';
import IconUserPlus from '@/components/Icon/IconUserPlus';
import IconSearch from '@/components/Icon/IconSearch';
import ListFiles from '@/components/usable_components/ListFiles';

interface FileData {
    id: string;
    name: string;
    webViewLink: string;
}

const Folders = () => {
    const dispatch = useDispatch();
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

    const [search, setSearch] = useState('');

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
        // Handle the selected records here in Folders component
        console.log('Selected Records in Folders:', selectedRecords);
        setRowData(selectedRecords)
        setInitialRecords(sortBy(selectedRecords, 'name'));
        setRecordsData(selectedRecords);
    };

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'name',
        direction: 'asc',
    });

    useEffect(() => {
        console.log('Sort');
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

    return (
        <div>
            <div className="panel mt-6">
                <div className="flex flex-wrap items-center justify-between gap-5 mb-5">
                <h2 className="text-xl">Files</h2>
                <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex gap-3">
                        <div>
                            <ListFiles onSave={handleListFilesSave}/>
                        </div>
                        <div>
                            <button type="button" className="btn btn-primary" onClick={() => editUser()}>
                                <IconShare className="ltr:mr-2 rtl:ml-2" />
                                Share
                            </button>
                        </div>
                    </div>
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
                                    render: ({id}) => (
                                        <div className="mx-auto flex w-max items-center gap-2"
                                            onClick={() => handleDelete(id)} 
                                        >
                                            <Tippy content="Delete">
                                                <IconTrashLines />
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
        </div>
    );
};

export default Folders;
