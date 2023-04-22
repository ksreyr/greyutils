import {useFetch} from "@/fetchApi/useFetch";

export const useGetTotalIva = ()=> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useFetch() && (()=>useFetch().get("/api/register/datafilters", null))
}