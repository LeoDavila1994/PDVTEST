import { QueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onSuccess: () => {
        toast.dismiss('toastCouldNotConnect');
        toast.dismiss('toastTryingConnect');
        toast.dismiss('toastConnectionFailed');
        toast.dismiss('toastForbidden');
      },
      onError: (error: any) => {
        if (error?.request?.status === 403) {
          toast.error('Sorry, you are not allowed to access this.', {
            autoClose: 3000,
            toastId: 'toastForbidden',
          });
        }
      },
      retry: (failureCount: number, error: any) => {
        const { message } = error;

        if (!(message.includes('timeout') || message.includes('Network Error'))) {
          return false;
        }

        if (failureCount === 0) {
          toast.error('Could not connect to the server.', {
            autoClose: 3000,
            toastId: 'toastCouldNotConnect',
          });
          toast.loading(`Trying to connect to the server ...`, {
            toastId: 'toastTryingConnect',
          });
          return true;
        }

        if (failureCount <= 2) return true;

        toast.dismiss('toastTryingConnect');
        toast.error(`Connection failed: ${message}. Contact your administrator.`, {
          autoClose: 5000,
          toastId: 'toastConnectionFailed',
        });

        return false;
      },
      retryDelay: 5000,
    },
  },
});
