import axios, { AxiosRequestConfig } from 'axios';
import { decrypt } from './cryptoJs';
import { authCurrentBranch } from './authCurrentBranch';
import { authCurrentPermissions } from './authCurrentPermissions';

const apiClient = axios.create();

const baseURL = import.meta.env.VITE_API_BASE_URL;

apiClient.defaults.baseURL = baseURL;

export const axiosInterceptor = () => {
  const updateHeader = async (request: AxiosRequestConfig) => {
    const token = decrypt('token-api');

    if (token) {
      const fullToken = `Bearer ${token}`;

      const newHeaders = {
        Authorization: fullToken,
        'Content-Type': 'application/json',
      };

      request.headers = newHeaders;

      return request;
    }

    return request;
  };

  apiClient.interceptors.request.use(async (request): Promise<any> => {
    try {
      const login = request.url?.includes('/LoginEmailCommand');
      const branches = request.url?.includes('/GetUserBranchesCommand');
      const auth = request.url?.includes('/GetAuthCurrentBranch');
      const authp = request.url?.includes('/GetAuthCurrentPermissions');

      if (!login && !branches && !auth && !authp) {
        const validation = await authCurrentBranch();
        console.log('interceptor1');

        if (!validation) {
          return request;
        }
      }

      /*if (!login && !branches && !auth && !authp) {
        const validationP = await authCurrentPermissions();
        console.log('interceptor2');

        if (!validationP) {
          return request;
        }
      }*/

      const req = updateHeader(request);

      return req;
    } catch (error) {
      console.log(error);
    }
  });
};

export default apiClient;
