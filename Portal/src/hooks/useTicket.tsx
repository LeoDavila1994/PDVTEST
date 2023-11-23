import apiClient from '../utilities/apiClient';
import { useMutation, useQuery } from '@tanstack/react-query';
import { DataTable, DataTicket } from '../utilities/types.d';

export const useCreateTicket = () => {
  const response = useMutation({
    mutationFn: async (data: DataTicket) => {
      const request = await apiClient.post('/AddTicketCommand', data);
      return request;
    },
  });
  return response;
};

async function fetchTicket(idBranch: string, idUser: string) {
  const { data } = await apiClient.get<DataTable>(`/GetTicketsBranchCommand/${idBranch}/${idUser}`);
  
  return data;
}

export function useGetTicket(idBranch: string, idUser: string) {
  return useQuery(['ticketTables'], () => fetchTicket(idBranch, idUser), {
    enabled: !!(idBranch && idUser),
  });
}

async function fetchOneTicket(idTicket: string) {
  const { data } = await apiClient.get(`/findTicket/${idTicket}`);
  return data;
}

export function useFindTicket(idTicket: string) {
  return useQuery({ queryKey: ['findTicket'], queryFn: () => fetchOneTicket(idTicket), enabled: !!idTicket });
}
