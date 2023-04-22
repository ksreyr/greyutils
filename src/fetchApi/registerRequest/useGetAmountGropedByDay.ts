import {useFetch} from "@/fetchApi/useFetch";

export const useGetAmountGropedByDay = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useFetch() && (() => useFetch().get("/api/register/groupedbydate", null));
}