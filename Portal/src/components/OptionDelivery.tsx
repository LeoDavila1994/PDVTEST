import { useEffect, useState } from 'react';
import { useGetTicket } from '../hooks/useTicket';
import ModalPaidAdmin from './ModalPaidAdmin';
import { useNavigate } from 'react-router-dom';
import { decrypt, encrypt } from '../utilities/cryptoJs';
import { useSummary } from '../hooks/useSummaryMenu';

interface Props {
  closeTable: Function;
  FcloseTable: Function;
  openSideBar: boolean;
}

const getId = async () => {
  const idBranch = await decrypt('branch-id');
  const idUser = await decrypt('user-id');
  return { idBranch, idUser };
};

const OptionDelivery = (props: Props) => {
  const { closeTable, FcloseTable, openSideBar } = props;

  const [idBranch, setIdBranch] = useState('');
  const [idUser, setIdUser] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const { getTicket, features } = useSummary();

  const { data } = useGetTicket(idBranch, idUser);
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
      <div className="flex flex-wrap w-full h-full  cursor-pointer gap-5 p-5">
        {data?.arrTicketsDelivery.map((delivery, index) => (
          <div key={index} className="card w-60 h-56 p-3" onClick={() => {openModal(String(delivery._id)), closeTable()}}>
            <label className="font-bold">Nombre: </label>
            <p className="flex pb-2">{delivery.strDeliveryUserName}</p>
            <hr />
            <label className="flex pt-2">
              <span className="font-bold mr-1">Estado:</span>
              <p className="flex">
                {delivery.Status === 'Sent' && 'Enviado'}
                {delivery.Status === 'Process' && 'Procesando'}
                {delivery.Status === 'Finish' && 'Finalizado'}
                {delivery.Status === 'Cancel' && 'Cancelado'}
              </p>
            </label>
            <label className="flex pt-2">
              <span className="font-bold mr-1">Domicilio:</span>
              <p className="flex">{delivery.strCompleteAddress}</p>
            </label>
            <label className="flex py-2">
              <span className="font-bold mr-1">Telefono:</span>
              <p className="flex">{delivery.strPhoneNumber}</p>
            </label>
            <hr />
            <div className="flex justify-end mx-2 mt-4">
              <button
                className="btn btn-icon btn_outlined btn_secondary w-10 h-10 mr-2"
                onClick={() => {
                  navigate('/productslist'), sendInfoTicket(String(delivery._id)), FcloseTable();
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

export default OptionDelivery;
