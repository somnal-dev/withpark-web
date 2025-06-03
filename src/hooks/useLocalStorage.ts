const useLocalStorage = () => {
    const get = (key: string, defaultValue: string | null) => {
        return window.localStorage.getItem(key) ?? defaultValue;
    };

    const set = (key: string, value: string | null) => {
        window.localStorage.setItem(key, value as string);
    };

    const remove = (key: string) => {
        window.localStorage.removeItem(key);
    }

    return {
        get,
        set,
        remove
    }
};

export default useLocalStorage;