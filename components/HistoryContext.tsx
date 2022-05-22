import {HistoryElement} from "../core/HistoryElement";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface HistoryContextProps {
    data: HistoryElement[],
    setData: (arr: HistoryElement[]) => void,
    reset: () => Promise<void>,
    set: (item: HistoryElement[]) => Promise<void>,
    get: () => HistoryElement[]
}

const historyContext = createContext<HistoryContextProps>({
    data: [],
    setData: () => {},
    reset: () => Promise.reject(),
    set: () => Promise.reject(),
    get: () => []
});

const KEY = "history";

export const useHistory = () => useContext(historyContext);

export function HistoryProvider(props : {children: ReactNode}) {
    const [data, setData] = useState<HistoryElement[]>([]);

    useEffect(() => {
        AsyncStorage.getItem(KEY)
            .then(res => {
                if(!res)
                    return;
                setData(JSON.parse(res));
            });
    }, []);

    function reset() {
        setData([]);
        return AsyncStorage.clear();
    }

    function set(arr: HistoryElement[]) {
        setData(arr);
        return AsyncStorage.setItem(KEY, JSON.stringify(arr));
    }

    function get() {
        return data;
    }

    const provider: HistoryContextProps = {
        data,
        setData,
        reset,
        set,
        get
    };

    return (
        <historyContext.Provider value={provider}>
            {props.children}
        </historyContext.Provider>
    )
}