import Swal from 'sweetalert2';

// Basic alert function
export const showAlert = (message: string, title: string = 'Alert') => {
    return Swal.fire({
        title: title,
        text: message,
        icon: 'info',
    });
};

// Function for showing loading alert
export const showFilesLoadingAlert = () => {
    return Swal.fire({
        title: 'Loading',
        text: 'Files are loading...',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading();
        },
    });
};

export const hideFilesLoadingAlert = () => {
    Swal.close();
};

// Function for showing loading failed alert
export const showFilesLoadingFailedAlert = () => {
    return Swal.fire({
        title: 'Error',
        text: 'Failed to load files. Please try again.',
        icon: 'error',
    });
};
