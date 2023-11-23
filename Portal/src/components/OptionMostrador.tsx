import { useEffect, useState } from 'react';
import ModalPaidAdmin from './ModalPaidAdmin';
import { useGetTicket } from '../hooks/useTicket';
import { useNavigate } from 'react-router-dom';
import { decrypt, encrypt } from '../utilities/cryptoJs';
import { useSummary } from '../hooks/useSummaryMenu';

const getId = async () => {
  const idBranch = await decrypt('id-branch');
  const idUser = await decrypt('user-id');
  return { idBranch, idUser };
};

interface Props {
  closeTable: Function;
  FcloseTable: Function;
  openSideBar: boolean;
}

const OptionMostrador = (props: Props) => {
  const { closeTable, FcloseTable, openSideBar } = props;

  const [idBranch, setIdBranch] = useState('');
  const [idUser, setIdUser] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const { data } = useGetTicket(idBranch, idUser);
  const { getTicket, features } = useSummary();
  const navigate = useNavigate();

  const sendInfoTicket = (id: string) => {
    encrypt('ticket-id', id);
  };

  const openModal = (idTicket: string) => {
    encrypt('ticket-id', idTicket);
    getTicket(idTicket);
  };

  useEffect(() => {
    async function fetchData() {
      const { idBranch, idUser } = await getId();

      if (idBranch && idUser) {
        setIdBranch(idBranch);
        setIdUser(idUser);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (features._id && !openSideBar) {
      setIsVisible(true);
    }
  }, [features]);

  return (
    <>
      <div className="flex flex-wrap hover:cursor-pointer w-full h-full gap-5 p-5">
        {data?.arrTicketsMostrador.map((data, index) => (
          <div key={index} className="card w-60 h-56 p-3" onClick={() => {
            openModal(String(data._id)), closeTable()}} >
            <label className="flex">
              <span className="font-bold mr-1 hover:cursor-pointer">Estado:</span>
              <p className="flex pb-1">{data.Status}</p>
            </label>
            <hr />
            <label className="flex font-bold pt-4 hover:cursor-pointer">Referencia:</label>
            <div className="w-full h-20 p-1">
              <p>{data.strTableReference}</p>
            </div>
            <hr />
            <div className="flex justify-end mx-2 mt-4">
              <button
                className="btn btn-icon btn_outlined btn_secondary w-10 h-10 mr-2"
                onClick={() => {
                  navigate('/productslist'), sendInfoTicket(String(data._id)), FcloseTable();
                }}
              >
                <i className="las la-pen"></i>
              </button>
            </div>
          </div>
        ))}
        {isVisible && <ModalPaidAdmin setIsVisible={setIsVisible} />}
      </div>
    </>
  );
};

export default OptionMostrador;
