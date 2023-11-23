import { decrypt, encrypt } from "./cryptoJs";
import apiClient from "./apiClient";

const getIds = async () => {
  const userId = decrypt('user-id');
  const idBranch = decrypt('branch-id');
  const arrPermissions = decrypt('arrPermissions');

  return { userId, idBranch, arrPermissions };
};

export const authCurrentPermissions = async () => {
  const { userId, idBranch, arrPermissions } = await getIds();
  const res = await apiClient.get<any>(`/GetAuthCurrentPermissions/${userId}/${idBranch}`).then((res) => {
    if (arrPermissions){
      var Permissions = JSON.parse(arrPermissions);
      if (Permissions != res.data.arrPermissions) {
        encrypt('arrPermissions',res.data.arrPermissions);
        return true;
      }
    }
    return true;
  });
  return res;
}