import { useNavigate } from 'react-router-dom';
import { useSummary } from '../hooks/useSummaryMenu';
import { encrypt } from '../utilities/cryptoJs';

const TicketStatusCard = ({ ticket }: any) => {
  const { getTicket } = useSummary();

  const navigate = useNavigate();

  const handleClick = () => {
    const { _id } = ticket;
    getTicket(_id);
  };

  const redirectToMenu = () => {
    encrypt('ticket-id', ticket._id);
    navigate('/productslist');
  };

  const printTicket = () => {
    encrypt('ticket-id', ticket._id);
    navigate('/ticketsummary/invoice');
  };

  return (
    <div className="card w-60 h-56 flex flex-col justify-between p-2 cursor-pointer" onClick={handleClick}>
      <div>
        <div className="w-full text-gray-400 text-xs flex flex-col gap-2">
          <p>
            <span className="text-secondary font-semibold">Usuario :</span> {ticket.strUserName}
          </p>
          <p>
            <span className="text-secondary font-semibold">Origen : </span>
            {ticket.boolCommand ? 'Comanda' : 'Guest'}
          </p>
          {ticket.boolCommand && (
            <p>
              <span className="text-secondary font-semibold">Tipo : </span>
              {ticket.strCommandType}
            </p>
          )}
          <p>
            <span className="text-secondary font-semibold">Hora :</span> {ticket.dteTimeOrder.slice(0, 5)}{' '}
            {ticket.dteTimeOrder[0] === '0' ? 'am' : 'pm'}
          </p>
          <p>
            <span className="text-secondary font-semibold">Estatus : </span>
            {ticket.Status === 'Sent' && 'Enviado'}
            {ticket.Status === 'Process' && 'Procesando'}
            {ticket.Status === 'Finish' && 'Finalizado'}
            {ticket.Status === 'Cancel' && 'Cancelado'}
          </p>
        </div>
      </div>
      <div>
        <hr />
        <div className="w-full flex justify-end p-2 gap-5">
          {ticket.boolCommand && (
            <button className="btn btn-icon btn_outlined btn_primary w-10 h-10" onClick={redirectToMenu}>
              <i className="las la-shopping-basket"></i>
            </button>
          )}
          <button className="btn btn-icon btn_outlined btn_primary w-10 h-10" onClick={printTicket}>
            <i className="las la-file-invoice-dollar"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketStatusCard;
