import { useEffect, useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import GivvyLoader from '../components/GivvyLoader';
import { SummaryProvider } from '../hooks/useSummaryMenu';
import { decrypt } from '../utilities/cryptoJs';
import { useGetAllTickets } from '../hooks/useBranches';
import TicketStatusCard from '../components/TicketStatusCard';
import SummarySidebar from '../components/SummarySidebar';

const getIdBranch = async () => {
  const idBranch = await decrypt('branch-id');
  return { idBranch };
};

const TicketsSummary = () => {
  const [idBranch, setIdBranch] = useState('');
  const [allTickets, setAllTickets] = useState<any>([]);
  const [filteredTickets, setFilteredTickets] = useState<any>([]);
  const [filterOptions] = useState(['Todos', 'Comanda', 'Guest', 'Kiosko']);
  const [optionSelected, setOptionSelected] = useState('Todos');

  const { data, isSuccess } = useGetAllTickets(idBranch);

  const handleFilter = (option: string) => {
    setOptionSelected(option);

    switch (option) {
      case 'Todos':
        setFilteredTickets(allTickets);
        break;
      case 'Comanda':
        setFilteredTickets(() => {
          const newArr = [...allTickets];

          const commandTickets = newArr.filter((item) => item.boolCommand);

          return commandTickets;
        });
        break;
      case 'Guest':
        setFilteredTickets(() => {
          const newArr = [...allTickets];

          const guestTickets = newArr.filter((item) => !item.boolCommand);

          return guestTickets;
        });
        break;
      case 'Kiosko':
        setFilteredTickets(() => {
          const newArr = [...allTickets];

          const kioskoTickets = newArr.filter((item) => item.boolKiosko);

          return kioskoTickets;
        });
        break;
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { idBranch } = await getIdBranch();
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
    if (isSuccess) {
      const { arrFinishTickets, arrProcessTickets, arrProgrammTickets, arrToAttendTickets } = data;

      setAllTickets(() => {
        const newArr = [...arrFinishTickets, ...arrProcessTickets, ...arrProgrammTickets, ...arrToAttendTickets];

        const paidTickets = newArr.filter((item) => !item.boolPaid);

        return paidTickets;
      });
    }
  }, [data]);

  useEffect(() => {
    setFilteredTickets(allTickets);
  }, [allTickets]);

  return (
    <>
      <GivvyLoader />
      <SummaryProvider>
        <AuthLayout menuOption="Ticketsummary" sidebar={<SummarySidebar />}>
          <main>
            <div className="w-full flex-wrap h-20 flex justify-end items-start gap-2 pr-10">
              {filterOptions.map((option, index) => (
                <button
                  key={index}
                  className={`btn w-32 h-9 text-sm ${
                    optionSelected === option ? 'btn_primary' : 'btn_secondary bg-gray-400'
                  }`}
                  onClick={() => handleFilter(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap w-full h-full gap-5 p-5">
              {isSuccess &&
                filteredTickets.map((ticket: any) => (
                  <div key={ticket._id}>
                    <TicketStatusCard ticket={ticket} />
                  </div>
                ))}
            </div>
          </main>
        </AuthLayout>
      </SummaryProvider>
    </>
  );
};

export default TicketsSummary;
