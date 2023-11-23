import apiClient from '../utilities/apiClient';
import { useMutation } from '@tanstack/react-query';
import { DataLogin } from '../utilities/types.d';

export const useLogin = () => {
  const response = useMutation({
    mutationFn: async (data: DataLogin) => {
      const request = await apiClient.post('/LoginEmailCommand', data);

      return request;
    },
  });

  return response;
};

export const useForgotPassword = () => {
  const response = useMutation({
    mutationFn: async (data: string) => {
      const request = await apiClient.put('/BussinesSendEmailChangePasswordUser', data);

      return request;
    },
  });

  return response;
};
