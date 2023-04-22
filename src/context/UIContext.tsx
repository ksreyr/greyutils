import {createContext, Dispatch} from "react";
import {ACTION_STRUCTUR} from "@/context/uiReducer";

type UI_CONTEXT_STRUCTUR = {
    openMenu: boolean
    dispatch: Dispatch<ACTION_STRUCTUR>
}
export const UIContext = createContext({} as UI_CONTEXT_STRUCTUR);