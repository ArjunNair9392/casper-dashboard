import { useEffect } from "react";
import { googleAuthURL } from "./constants";

const getFromLocalStorage = (key: string) => {
    if (!key || typeof window === 'undefined') {
        return ""
    }
    return localStorage.getItem(key)
}

const setLocalStorage = (key: string, value:string) => {
    if (!key || typeof window === 'undefined') {
        return ""
    }
    return localStorage.setItem(key,value)
}

const refreshCode = getFromLocalStorage('code');

export const getGoogleRefreshCode = () => {
    if (refreshCode && refreshCode.length > 0) {
        return;
    } else {
        window.location.href = googleAuthURL;
        setGoogleRefreshCode();
    }
}

export const setGoogleRefreshCode = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
        setLocalStorage('code', code);
    }
}