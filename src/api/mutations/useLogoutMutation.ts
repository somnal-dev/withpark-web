import {useMutation} from "@tanstack/react-query";
import {Fetcher} from "@withpark/api/fetcher.ts";

const useLogoutMutation = () =>
    useMutation({
        mutationFn: () => Fetcher.post('auth?action=logout')
    })

export default useLogoutMutation;