import CardBranches from '../components/CardBranches';
import AuthLayout from '../components/AuthLayout';
import { useGetUserBranches } from '../hooks/useBranches';
import { decrypt, encrypt } from '../utilities/cryptoJs';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import { useStartWork } from '../hooks/useLoginPin';

const getUserId = async () => {
  const userId = await decrypt('user-id');
  const strUserEmail = await decrypt('user-email');
  return { userId, strUserEmail };
};

const Branches = () => {
  const [id, setId] = useState('');
  const [strUserEmail, setStrUserEmail] = useState('');
  
  const { mutate } = useStartWork();
  const { data, isLoading } = useGetUserBranches(id);
  const navigate = useNavigate();

  const handleClick = (
    idBranch: string,
    idCompany: string,
    companyName: string,
    branchName: string,
    tokenDevice: string
  ) => {
    const datos = {
      strUserEmail: strUserEmail,
      idBranch: idBranch,
    };
    mutate(datos);
    encrypt('branch-id', idBranch);
    encrypt('company-id', idCompany);
    encrypt('company-name', companyName);
    encrypt('branch-name', branchName);
    encrypt('device-token', tokenDevice);
    navigate('/QuickStart');
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { userId, strUserEmail } = await getUserId();
        if (userId && strUserEmail) {
          setId(userId);
          setStrUserEmail(strUserEmail);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();  
  }, []);

  useEffect(() => {
    if (data?.arrBranch.length === 1) {
      const datos = {
        strUserEmail: strUserEmail,
        idBranch: data.arrBranch[0].idBranch,
      };
      mutate(datos);
      encrypt('branch-id', data.arrBranch[0].idBranch);
      encrypt('company-id', data.arrBranch[0].idCompany);
      encrypt('company-name', data.arrBranch[0].strCompanyName);
      encrypt('branch-name', data.arrBranch[0].strBranchName);
      encrypt('device-token', data.arrBranch[0].strTokenDevice);
      navigate('/QuickStart');
    }
    sessionStorage.removeItem('arrPermissions');
    sessionStorage.removeItem('boolLoginType');
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <AuthLayout menuOption="Branches">
        <section className="w-full h-auto flex flex-wrap gap-10">
          {data?.arrBranch.map((card) => (
            <div
              key={card.idBranch}
              onClick={() =>
                handleClick(card.idBranch, card.idCompany, card.strCompanyName, card.strBranchName, card.strTokenDevice)
              }
            >
              <CardBranches branchInfo={card} />
            </div>
          ))}
        </section>
      </AuthLayout>
    </>
  );
};

export default Branches;
