import apiClient from '../utilities/apiClient';
import { useMutation } from '@tanstack/react-query';
import { DataLoginPin } from '../utilities/types.d';

export const useLoginPin = () => {
  const response = useMutation({
    mutationFn: async (data: DataLoginPin) => {
      const request = await apiClient.post('/LoginPinCommand', data);
      return request;
    },
  });
  return response;
};

export const useStartWork = () => {
  const response = useMutation({
    mutationFn: async (data:any) => {
      const request = await apiClient.put('/StartWork', data);
      return request;
    },
  });
  return response;
}

export const useEndWork = () => {
  const response = useMutation({
    mutationFn: async (data:any) => {
      const request = await apiClient.put('/EndWork', data);
      return request;
    },
  });
  return response;
}