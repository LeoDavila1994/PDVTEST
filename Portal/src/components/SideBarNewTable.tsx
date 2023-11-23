import { useState, useEffect } from 'react';
import { useTable } from '../hooks/useTableMenu';
import { dataTables } from '../utilities/types.d';
import { ToastContainer, toast } from 'react-toastify';
import { useCreateTicket } from '../hooks/useTicket';
import SideBarButtons from './SideBarButtons';
import classNames from 'classnames';
import iconChooseTable from '../assets/vuesax_bulk_arrow-square-left.svg';
import plus from '../assets/Vector_+.svg';
import minus from '../assets/Vector_-.svg';
import { decrypt, encrypt } from '../utilities/cryptoJs';
import { useNavigate } from 'react-router-dom';

interface Props {
  optionCommand: number;
  openSideTable: boolean;
  strAreaName: string;
  closeSideTable: Function;
  strTableNumber: string;
  setstrTableNumber: Function;
  closeTable: boolean;
  getSidebarStatus: Function;
}

const maxCharacteres = 40;

const getIds = async () => {
  const idBranch = await decrypt('branch-id');
  const idCompany = await decrypt('company-id');
  const userId = await decrypt('user-id');

  return {
    idBranch,
    idCompany,
    userId,
  };
};

const SideBarNewTable = (props: Props) => {
  const {
    optionCommand,
    openSideTable,
    strAreaName,
    closeSideTable,
    strTableNumber,
    setstrTableNumber,
    getSidebarStatus,
  } = props;

  const [idBranch, setIdBranch] = useState('');
  const [idCompany, setIdCompany] = useState('');
  const [userId, setUserId] = useState('');
  const [strCommandType, setstrCommandType] = useState<string>('');
  const [strPhoneNumber, setStrPhoneNumber] = useState<string>('');
  const [userValues, setUserValues] = useState<dataTables>({
    intPerson: 1,
    strDeliveryUserName: '',
    strCompleteAddress: '',
  });
  const { toggleMenuTable, isMenuTableOpened } = useTable();
  const [strTableReference, setstrTableReference] = useState<string>('');

  const navigate = useNavigate();
  const { mutate } = useCreateTicket();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserValues({
      ...userValues,
      [e.target.name]: e.target.value,
    });
  };

  const menuBarClasses = {
    open: isMenuTableOpened,
  };

  const sum = () => {
    setUserValues({
      ...userValues,
      intPerson: userValues.intPerson + 1,
    });
  };

  const rest = () => {
    if (userValues.intPerson > 1) {
      setUserValues({
        ...userValues,
        intPerson: userValues.intPerson - 1,
      });
    }
  };

  const handleChangeReference = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxCharacteres) {
      setstrTableReference(inputValue);
    }
  };

  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 10) {
      setStrPhoneNumber(inputValue);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (strCommandType == 'Mostrador') {
      if (strTableReference == '') {
        toast.error('Ingrese la Referencia', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
          delay: 1,
        });
        return null;
      }
    }
    if (strCommandType == 'Delivery') {
      if (userValues.strDeliveryUserName == '' || userValues.strCompleteAddress == '' || strPhoneNumber == '') {
        toast.error('Rellene los Campos', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
          delay: 1,
        });
        return null;
      }
    }

    const datos = {
      idUser: userId,
      idBranch,
      intPerson: String(userValues.intPerson),
      strCommandType: strCommandType,
      strTableNumber: strTableNumber,
      strTableReference: strTableReference,
      strDeliveryUserName: userValues.strDeliveryUserName,
      strAreaName: strAreaName,
      strCompleteAddress: userValues.strCompleteAddress,
      idCompany: idCompany,
      strPhoneNumber: strPhoneNumber,
    };
    mutate(datos, {
      onSuccess: (res) => {
        switch (res.data.intResponse) {
          case 200:
            const ticketId = res.data.idTicket.replace(/"/g, '');
            encrypt('ticket-id', ticketId);
            sessionStorage.setItem('TableNumber',strTableNumber);
            sessionStorage.setItem('OptionCommand',String(optionCommand));
            sessionStorage.setItem('AreaName',strAreaName);
            navigate('/productslist');
            setstrTableNumber('');
            closeSideTable();
            setUserValues({ ...userValues, intPerson: 1, strDeliveryUserName: '', strCompleteAddress: '' });
            setstrTableReference('');
            setStrPhoneNumber('');
            navigate('/productslist');
            break;
          case 424:
            toast.error('Mesa ocupada', {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: 'light',
              delay: 1,
            });
        }
      },
    });
  };

  useEffect(() => {
    async function fetchData() {
      const ids = await getIds();

      const { idBranch, idCompany, userId } = ids;

      if (idBranch && idCompany && userId) {
        setIdBranch(idBranch);
        setIdCompany(idCompany);
        setUserId(userId);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (optionCommand == 1) {
      setstrCommandType('Mesa');
    } else if (optionCommand == 2) {
      setstrCommandType('Mostrador');
    } else if (optionCommand == 3) {
      setstrCommandType('Delivery');
    }
    getSidebarStatus(isMenuTableOpened);
  }, [optionCommand, isMenuTableOpened]);

  return (
    <>
      <div className={classNames('sidebar', menuBarClasses)}>
        <div
          onClick={toggleMenuTable}
          className="w-8 h-9 flex justify-center items-center bg-givvy_blue hover:bg-givvy_blue_strong absolute -left-8 top-10 transition-colors ease-in-out text-white text-2xl cursor-pointer rounded-l-lg"
        >
          <i className="las la-file-invoice-dollar"></i>
        </div>
        {optionCommand == 1 ? (
          <>
            {openSideTable ? (
              <>
                <div className="flex flex-col w-full pt-28 pb-14">
                  <div className="flex flex-col justify-center items-center p-3">
                    <label className="label pb-5">Numero de Personas:</label>
                    <div className="flex card py-1 px-3">
                      <button
                        className={`text-lg px-3 rounded-l-2xl cursor-pointer
                        }`}
                        onClick={rest}
                      >
                        <div className="w-3 h-3">
                          <img src={minus} className="w-full h-full object-cover" />
                        </div>
                      </button>
                      <p className="w-8 py-1 flex justify-center items-center font-semibold text-lg">
                        {userValues.intPerson}
                      </p>
                      <button className="text-lg px-3 rounded-r-2xl cursor-pointer" onClick={sum}>
                        <div className="w-3 h-3">
                          <img src={plus} className="w-full h-full object-cover" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col h-full justify-center items-center text-xl gap-1 font-bold">
                  Seleccione una Mesa
                  <img src={iconChooseTable} alt="" />
                </div>
              </>
            )}
            <ToastContainer />
          </>
        ) : null}
        {optionCommand == 2 ? (
          <>
            <div className="flex flex-col p-5">
              <label className="text-2xl font-bold pb-5">Nuevo Mostrador</label>
              <hr />
              <label className="label pt-5 pb-2">Referencia</label>
              <textarea
                className="input border resize-none h-40 p-2"
                value={strTableReference}
                onChange={handleChangeReference}
                required
              />
              {strTableReference.length}/{maxCharacteres}
            </div>
          </>
        ) : null}
        {optionCommand == 3 ? (
          <>
            <div className="flex flex-col p-5">
              <label className="text-2xl font-bold pb-5">Nuevo Delivery</label>
              <hr />
              <label className="label pt-5 pb-2">Nombre del Cliente</label>
              <input
                className="input border h-8 p-2"
                name="strDeliveryUserName"
                value={userValues.strDeliveryUserName}
                onChange={handleChange}
                required
              />
              <label className="label py-2">Domicilio</label>
              <input
                className="input border h-8 p-2"
                name="strCompleteAddress"
                value={userValues.strCompleteAddress}
                onChange={handleChange}
              />
              <label className="label py-2">Telefono</label>
              <input
                className="input border h-8 p-2"
                type="number"
                name="strPhoneNumber"
                value={strPhoneNumber}
                onChange={handleChangePhoneNumber}
              />
            </div>
          </>
        ) : null}
        <SideBarButtons
          openSideTable={openSideTable}
          strCommandType={strCommandType}
          handleSubmit={handleSubmit}
          closeSideTable={closeSideTable}
          setstrTableNumber={setstrTableNumber}
          setUserValues={setUserValues}
        />
      </div>
    </>
  );
};

export default SideBarNewTable;
