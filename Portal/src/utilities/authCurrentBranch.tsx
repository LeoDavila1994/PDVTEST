import { decrypt } from './cryptoJs';
import apiClient from './apiClient';
import { UserInfoBranch } from './types.d';

const getIds = async () => {
  const userId = decrypt('user-id');
  const idBranch = decrypt('branch-id');

  return { userId, idBranch };
};

export const authCurrentBranch = async () => {
  const { userId, idBranch } = await getIds();
  const res = await apiClient.get<UserInfoBranch>(`/GetAuthCurrentBranch/${userId}`).then((res) => {
    if (!res.data.arrBranch.find((item) => item.idBranch === idBranch)) {
      sessionStorage.clear();
      window.location.href = '/';
      return false;
    }

    return true;
  });

  return res;
};
