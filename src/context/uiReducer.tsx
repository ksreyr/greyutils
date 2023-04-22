import {INITIAL_STATE_STRUCTUR} from "@/context/UIProvider";

export type ACTION_STRUCTUR = {
    type: 'CHANGE'
}
export const uiReducer = (state: INITIAL_STATE_STRUCTUR,
                          action: ACTION_STRUCTUR) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                openMenu: !state.openMenu
            }
        default:
            return state
    }
}