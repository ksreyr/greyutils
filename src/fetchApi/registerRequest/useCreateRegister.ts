import {useFetch} from "@/fetchApi/useFetch";
import {RegisterModel} from "../../../prisma/models/RegisterModel";

export const useCreateRegister = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useFetch() && ((body: RegisterModel) => useFetch().post('/api/register', body))
}