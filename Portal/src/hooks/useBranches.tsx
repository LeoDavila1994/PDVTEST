import apiClient from '../utilities/apiClient';
import { useQuery } from '@tanstack/react-query';
import { UserInfoBranch } from '../utilities/types.d';

const fetchUserBranches = async (userId: string) => {
  const { data } = await apiClient.get<UserInfoBranch>(`/GetUserBranchesCommand/${userId}`);

  return data;
};

export function useGetUserBranches(userId: string) {
  return useQuery(['userBranches'], () => fetchUserBranches(userId), {
    enabled: !!userId,
  });
}

const fetchAllTicketsByBranch = async (idBranch: string) => {
  const { data } = await apiClient.get(`/GetTicketsBranch/${idBranch}/${true}`);

  return data;
};

export function useGetAllTickets(idBranch: string) {
  return useQuery(['allTickets'], () => fetchAllTicketsByBranch(idBranch), {
    enabled: !!idBranch,
  });
}

const fetchBranch = async (idBranch: string) => {
  const { data } = await apiClient.get(`/Branch/${idBranch}`);
  return data;
};

export function useGetBranch(idBranch: string) {
  return useQuery(['branchInfo'], () => fetchBranch(idBranch), {
    enabled: !!idBranch,
  });
}
