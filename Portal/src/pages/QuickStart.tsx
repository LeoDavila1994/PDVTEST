import AuthLayout from '../components/AuthLayout';
import PersonalUse from '../assets/personalUse.png';
import SharedUse from '../assets/sharedUse.png';
import { useGetUserPermissions } from '../hooks/usePermissions';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { decrypt, encrypt } from '../utilities/cryptoJs';

const getIds = async () => {
  const userId = decrypt('user-id');
  const idBranch = decrypt('branch-id');

  return { userId, idBranch };
};

const QuickStart = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('')
  const [idBranch, setIdBranch] = useState('')
  const { data } = useGetUserPermissions(userId,idBranch);
  
  useEffect(()=>{
    sessionStorage.removeItem('boolLoginType');
    const arrPermissions = JSON.stringify(data?.arrPermissions[0]);
    encrypt('arrPermissions', arrPermissions)
  },[data])

  useEffect(() => {
    async function fetchData() {
      try {
        const { userId, idBranch } = await getIds();
        if (userId && idBranch) {
          setUserId(userId);
          setIdBranch(idBranch);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);


  return (
    <>
      <AuthLayout menuOption="QuickStart">
        <div className="flex flex-col sm:grid sm:grid-flow-col w-full h-full items-center justify-center gap-7">
          <div
            className="card w-80 h-96 hover:cursor-pointer hover:scale-105 transition-transform duration-200 p-5"
            onClick={() => {navigate('/OpenBill'), sessionStorage.setItem('boolLoginType', 'true')}}
          >
            <img className="opacity-75" src={PersonalUse} />
            <hr />
            <div className="flex h-20 justify-center items-center">
              <p className="font-bold text-lg">Uso Personal</p>
            </div>
          </div>
          <p>- O -</p>
          <div
            className="card w-80 h-96 hover:cursor-pointer hover:scale-105 transition-transform duration-200 p-5"
            onClick={() => {navigate('/FastLogin')}}
          >
            <img className="opacity-75" src={SharedUse} />
            <hr />
            <div className="flex h-20 justify-center items-center">
              <p className="font-bold text-lg">Uso Compartido</p>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};

export default QuickStart;
