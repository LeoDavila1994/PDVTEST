import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { decrypt } from '../utilities/cryptoJs';
import { useGetAllTickets, useGetBranch } from '../hooks/useBranches';

const date = new Date().toLocaleString();

const getIds = async () => {
  const idTicket = await decrypt('ticket-id');
  const idBranch = await decrypt('branch-id');

  return { idTicket, idBranch };
};

const Invoice = () => {
  const [idTicket, setIdTicket] = useState('');
  const [idBranch, setIdBranch] = useState('');

  const [header, setHeader] = useState('');
  const [footer, setFooter] = useState('');

  const dataBranch = useGetBranch(idBranch);

  const dataTicket = useGetAllTickets(idBranch);

  useEffect(() => {
    if (dataBranch.isSuccess) {
      const { strTicketHeader, strTicketFooter } = dataBranch.data.objBranch;

      setHeader(strTicketHeader);
      setFooter(strTicketFooter);
    }
  }, [dataBranch.isSuccess]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { idTicket, idBranch } = await getIds();
        if (idTicket) {
          setIdTicket(idTicket);
        }

        if (idBranch) {
          setIdBranch(idBranch);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const printing = setTimeout(() => {
      window.print();
    }, 1000);

    return () => clearTimeout(printing);
  }, []);

  return (
    <>
      {dataBranch.isSuccess && dataTicket.isSuccess && (
        <div className="w-screen h-screen fixed top-0 left-0 z-50 bg-foreground px-4">
          <header className="w-full h-20 px-4 py-2 flex justify-between items-center">
            <div className="w-28 h-full">
              <img src={logo} alt="logo_givvy" className="w-full h-full object-cover" />
            </div>
            <div className="w-64 h-full flex flex-col justify-center items-end text-secondary text-right text-sm">
              <p>{header}</p>
            </div>
          </header>
          <div className="w-full px-4 py-2 text-secondary text-sm font-semibold">
            <p>
              Numero de cuenta:{' '}
              <span className="font-normal">
                {dataTicket.data.arrToAttendTickets.find((ticket: any) => ticket._id === idTicket)?._id}
              </span>
            </p>
            <p>
              Usuario:{' '}
              <span className="font-normal">
                {dataTicket.data.arrToAttendTickets.find((ticket: any) => ticket._id === idTicket)?.strUserName}
              </span>
            </p>
            <p>
              Origen:{' '}
              <span className="font-normal">
                {dataTicket.data.arrToAttendTickets.find((ticket: any) => ticket._id === idTicket)?.boolCommand
                  ? 'Comanda'
                  : 'Guest'}
              </span>
            </p>
            {dataTicket.data.arrToAttendTickets.find((ticket: any) => ticket._id === idTicket)?.boolCommand && (
              <p>
                Tipo:{' '}
                <span className="font-normal">
                  {dataTicket.data.arrToAttendTickets.find((ticket: any) => ticket._id === idTicket)?.strCommandType}
                </span>
              </p>
            )}
            <p>
              Fecha y hora: <span className="font-normal">{date}</span>
            </p>
          </div>
          <div className="w-full h-80 flex flex-col flex-wrap px-4 py-2 text-secondary text-sm font-semibold">
            {dataTicket.data.arrToAttendTickets
              .find((ticket: any) => ticket._id === idTicket)
              ?.arrProduct.map((product: any) => (
                <div key={product.strIdShopping}>
                  <div className=" w-80 flex justify-between items-center">
                    <p className="text-sm">{product.strProductName}</p>
                    <div className="flex w-14">
                      <p className="text-[6px]">MX$</p>
                      <p className="text-base">{product.intTotal}</p>
                      <p className="text-[6px]">00</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <footer className="w-full h-10 px-4 py-2 fixed left-0 bottom-0 text-secondary text-sm font-semibold">
            <p>{footer}</p>
          </footer>
        </div>
      )}
    </>
  );
};

export default Invoice;
