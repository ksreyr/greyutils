import {useFetch} from "@/fetchApi/useFetch";

export const useGetRegistersByMonth = ()=>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useFetch()&&((body:any)=>useFetch().post("/api/register/datafilters",body))
}