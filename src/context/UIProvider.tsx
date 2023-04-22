import {UIContext} from "@/context/UIContext";
import {useReducer} from "react";
import {uiReducer} from "@/context/uiReducer";

export type INITIAL_STATE_STRUCTUR = {
    openMenu: boolean
}
export const INITIAL_STATE: INITIAL_STATE_STRUCTUR = {
    openMenu: false
}
export const UIProvider = ({children}: { children: any }) => {
    const [uiState, dispatch] = useReducer(uiReducer, INITIAL_STATE);
    return (
        <UIContext.Provider value={{
            ...uiState,
            dispatch
        }}>
            {children}
        </UIContext.Provider>)
}