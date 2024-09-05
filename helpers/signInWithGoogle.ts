import { googleAuthURL } from "./constants";

const getFromLocalStorage = (key: string) => {
    if (!key || typeof window === 'undefined') {
        return ""
    }
    return localStorage.getItem(key);
};

const setLocalStorage = (key: string, value: string) => {
    if (!key || typeof window === 'undefined') {
        return ""
    }
    localStorage.setItem(key, value);
};

export const getGoogleRefreshCode = () => {
    const refreshCode = getFromLocalStorage('code');

    if (refreshCode && refreshCode.length > 0) {
        return;
    } else {
        window.location.href = googleAuthURL; // Redirect to Google for authentication
    }
};

export const setGoogleRefreshCode = () => {
    // Extract the code from the URL after redirection from Google
    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            setLocalStorage('code', code);
            window.history.replaceState({}, document.title, window.location.pathname); // Clear the code from the URL
        }
    }
};