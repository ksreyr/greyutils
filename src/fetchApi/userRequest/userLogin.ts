import {useFetch} from "@/fetchApi/useFetch";

export const useUserLogin=()=>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useFetch()&&((body:any)=>useFetch().post("http://127.0.0.1:3000/api/auth/login", body))
}