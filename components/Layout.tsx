import {ReactNode} from "react";
import {Navigation} from "./Navigation";

export function Layout(props : {children: ReactNode}) {
    return (
        <>
            {props.children}
            <Navigation/>
        </>
    )
}