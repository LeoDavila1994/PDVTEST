import { useState, useEffect } from 'react';
import { useGetTicket } from '../hooks/useTicket';
import { useNavigate } from 'react-router-dom';
import TableFree from '../assets/TableFree.svg';
import TableBusyRed from '../assets/TableBusyRed.svg';
import TableBusyGreen from '../assets/TableBusyGreen.svg';
import iconAdd from '../assets/iconAdd2.svg';
import iconClose from '../assets/iconClose2.svg';
import { decrypt, encrypt } from '../utilities/cryptoJs';
import ModalPaidAdmin from './ModalPaidAdmin';
import { useSummary } from '../hooks/useSummaryMenu';

interface Props {
  openSideTable: Function;
  setstrTableNumber: Function;
  strTableNumber: string;
  setstrAreaName: Function;
  strAreaName: string;
  openSide: boolean;
  closeTable: Function;
  FcloseTable: Function;
  optionCommand: number;
  openSideBar: boolean;
}

const getId = async () => {
  const idBranch = await decrypt('branch-id');
  const idUser = await decrypt('user-id');
  const idTickets = await decrypt('ticket-id');
  return { idBranch, idUser ,idTickets };
};

const OptionMesas = (props: Props) => {
  const {
    openSideTable,
    setstrTableNumber,
    strTableNumber,
    setstrAreaName,
    strAreaName,
    openSide,
    closeTable,
    FcloseTable,
    openSideBar,
  } = props;

  const navigate = useNavigate();

  const [idBranch, setIdBranch] = useState('');

  const [idUser, setIdUser] = useState('');

  const [idTickets, setIdTickets] = useState('');

  const [seeTables, setSeeTables] = useState<number[]>([]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { idBranch, idUser, idTickets } = await getId();

      if (idBranch && idUser) {
        setIdBranch(idBranch);
        setIdUser(idUser);
      }
      if (idTickets) {
        setIdTickets(idTickets);
      }
    }
    fetchData();
  }, []);

  const { data } = useGetTicket(idBranch, idUser);

  const { getTicket, features } = useSummary();

  const ticketsTable = data?.arrTicketsMesa.filter((table) => table.strAreaName == strAreaName);
  const otherUsers = data?.arrAreas.filter((user) => user.strNameArea === strAreaName);

  useEffect(() => {
    if (data) {
      const size = data?.arrAreas.filter((item) => item.strNameArea === strAreaName);
      const long = Number(size[0]?.arrTables?.length);
      if (long) {
        setSeeTables(new Array(long).fill(null));
      }
    }
    setstrAreaName(strAreaName);
  }, [strAreaName]);

  const occupiedTables = seeTables.map((_num, index) => {
    const occupie = ticketsTable?.find((table) => table.strTableNumber === String(index + 1));
    if (otherUsers && !occupie) {
      const otherUsersTables = otherUsers[0]?.arrTables.find(
        (user) => user.id === String(index + 1) && user.boolState === true
      );
      return otherUsersTables ? { boolState: true } : null;
    }
    return occupie ? { busy: 'busy', id: occupie._id } : null;
  });

  const handleButtonClick = (area: string) => {
    setstrAreaName(area);
    FcloseTable();
  };

  const sendInfo = (id: string) => {
    encrypt('ticket-id', id);
    getTicket(id);
  };

  const openModal = (idTicket: string) => {
    encrypt('ticket-id', idTicket);
    getTicket(idTicket);
  };

  useEffect(() => {
    const optionCommand = sessionStorage.getItem('OptionCommand');
    const areaName = sessionStorage.getItem('AreaName');
    const tableNumber = sessionStorage.getItem('TableNumber');

    if(optionCommand && areaName && tableNumber){
      getTicket(idTickets);
      closeTable();
    }
  },[data])

  useEffect(() => {
    if (features._id && !openSideBar) {
      setIsVisible(true);
    }
  }, [features]);

  return (
    <>
      {!strAreaName ? (
        <div className=" w-full h-4/5 text-center items-center flex flex-col gap-3">
          <h2 className="text-primary font-semibold text-2xl">ÁREAS NO ENCONTRADAS</h2>
          <p className="font-semibold">NO TIENES AGREGADAS AREAS EN SU NEGOCIO</p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap justify-end w-full gap-2  py-5 items-center lg:pt-2 lg:pr-10 lg:pb-10">
            {data?.arrAreas.map(
              (tables, index): JSX.Element => (
                <div key={index}>
                  <button
                    className={`btn h-9 w-32 justify-center items-center text-sm ${
                      strAreaName == tables.strNameArea ? 'btn_primary bg-givvy_blue' : 'btn_secondary bg-gray-400'
                    } ${openSide || openSideBar ? 'pointer-events-none' : ''}`}
                    onClick={() => handleButtonClick(tables.strNameArea)}
                  >
                    {tables.strNameArea}
                  </button>
                </div>
              )
            )}
          </div>
          <div
            className={`flex flex-wrap justify-center items-center gap-10 w-full ${
              openSide || openSideBar ? 'pointer-events-none' : ''
            }`}
          >
            {seeTables.map((_tables, index) => (
              <div key={index}>
                {occupiedTables[index]?.busy === 'busy' ? (
                  <div className="flex flex-col justify-center items-center h-72 relative">
                    <div className="flex items-center justify-center text-xl text-red font-bold pb-2">{index + 1}</div>
                    <div className="w-56 h-56 ">
                      <img
                        className={`w-full h-full relative hover:cursor-pointer hover:border hover:border-black ${
                          String(strTableNumber) == String(index + 1) ? 'border border-black' : ''
                        }`}
                        src={TableBusyGreen}
                        onClick={() => {
                          sendInfo(String(String(occupiedTables[index]?.id))),
                          closeTable(),
                          setstrTableNumber(String(index + 1)),
                          openSideTable();
                        }}
                      />
                    </div>
                    <div className="absolute mt-auto flex gap-2 bottom-20">
                      <button
                        onClick={() => {
                          FcloseTable(), sendInfo(String(occupiedTables[index]?.id)), navigate('/productslist');
                        }}
                      >
                        <img className="scale-110" src={iconAdd} />
                      </button>
                      <button
                        onClick={() => {
                          openModal(String(occupiedTables[index]?.id));
                        }}
                      >
                        <img src={iconClose} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {occupiedTables[index]?.boolState ? (
                      <div className={`flex flex-col justify-center items-center h-72`}>
                        <div className="flex items-center justify-center text-xl text-red font-bold pb-2">
                          {index + 1}
                        </div>
                        <div className="w-56 h-56">
                          <img className={`w-full h-full relative hover:border-black`} src={TableBusyRed} />
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`flex flex-col justify-center items-center h-72`}
                        onClick={() => {
                          setstrTableNumber(String(index + 1)),
                            openSideTable(),
                            FcloseTable(),
                            useGetTicket(idBranch, idUser);
                        }}
                      >
                        <div className="flex items-center justify-center text-xl text-red font-bold pb-2">
                          {index + 1}
                        </div>
                        <div className="w-56 h-56">
                          <img
                            className={`w-full h-full relative hover:cursor-pointer hover:border hover:border-black ${
                              strTableNumber == String(index + 1) ? 'border border-black' : ''
                            }`}
                            src={TableFree}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
            {isVisible && <ModalPaidAdmin setIsVisible={setIsVisible} />}
          </div>
        </>
      )}
    </>
  );
};

export default OptionMesas;
