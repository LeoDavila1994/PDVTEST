import apiClient from "../utilities/apiClient";
import { useQuery } from "@tanstack/react-query";

const fetchUserPermissions = async (userId:string, idBranch:string) => {
  const { data } = await apiClient.get<any>(`/getRoleUserCommand/${userId}/${idBranch}`);
  return data;
}

export function useGetUserPermissions(userId:string, idBranch:string) {
  return useQuery(['userPermissions'], () => fetchUserPermissions(userId, idBranch), {
    enabled: !!userId
  });
}