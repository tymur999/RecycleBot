import {createRef} from "react";
import {NavigationContainerRef} from "@react-navigation/native";

export const navigationRef = createRef<NavigationContainerRef<any>>();

export function navigate(name: string, params?: {}) {
    const nav = navigationRef.current;
    if(nav)
        nav.navigate(name, params);
}