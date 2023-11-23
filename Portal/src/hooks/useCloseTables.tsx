import apiClient from '../utilities/apiClient';
import { useMutation } from '@tanstack/react-query';
import { CloseTables } from '../utilities/types.d';

export const useCloseTable = () => {
  const response = useMutation({
    mutationFn: async (data: CloseTables) => {
      const request = await apiClient.put('/StatusPaid', data);
      return request;
    },
  });
  return response;
};
