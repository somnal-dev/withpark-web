import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { QUERY_KEY } from "@withpark/constants/queryKeys.ts";
import { Fetcher } from "@withpark/api/fetcher.ts";
import useAuthAtom from "@withpark/hooks/useAuthAtom.ts";
import { User } from "@withpark/types/user";

const useUserInfo = (
  id: number | null = null,
  enabled: boolean = true
): UseQueryResult<User> => {
  const { accessToken } = useAuthAtom();

  return useQuery({
    enabled: !!accessToken && enabled, // accessToken이 있을 때만 쿼리 실행
    queryKey: [QUERY_KEY.USER], // 단순한 queryKey 사용
    queryFn: () => Fetcher.get<User>(`users/${id ?? "me"}?populate=*`),
    staleTime: 1000 * 60 * 10, // 10분 동안 데이터를 신선한 것으로 간주
    gcTime: 1000 * 60 * 15, // 15분 동안 가비지 컬렉션 방지
    refetchOnWindowFocus: false, // 창 포커스시 재요청 방지
    refetchOnMount: false, // 컴포넌트 마운트시 재요청 방지
    refetchOnReconnect: false, // 인터넷 재연결시 재요청 방지
    retry: 1, // 실패시 1번만 재시도
  });
};

export default useUserInfo;
