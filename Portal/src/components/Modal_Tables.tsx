import { useCloseTable } from '../hooks/useCloseTables';
import { useState, useEffect } from 'react';
import DropdownMenu from './DropdownMenu';
//import { productsList } from '../db/db';
import { useGetTicket } from '../hooks/useTicket';
import { useNavigate } from 'react-router-dom';
import { arrTickets } from '../utilities/types.d';
import { decrypt } from '../utilities/cryptoJs';

interface Props {
  showModal: boolean;
  hideModal: Function;
  closeTable: Function;
  optionCommand: number;
  setstrTableNumber: Function;
}

const Modal_Tables = (props: Props) => {
  const { showModal, hideModal, closeTable, optionCommand, setstrTableNumber } = props;
  const [products, setProducts] = useState<arrTickets[]>([]);
  const [payment, setPayment] = useState<any>({
    text: '',
    value: '',
  });
  const [tipment, setTipment] = useState<any>({
    text: '',
    value: '',
  });
  const [userPayment, setUserPayment] = useState<any>({
    Propina: '',
    Pago: '',
  });
  const [propina, setPropina] = useState<any>();
  const idBranch: any = decrypt('branch-id');
  const idTicket: any = decrypt('ticket-id');
  const idUser: any = decrypt('id-user');

  const { data } = useGetTicket(idBranch, idUser);
  const { mutate } = useCloseTable();
  const navigate = useNavigate();
  const optionsMenu = [
    { text: 'Efectivo', value: 'Cash' },
    { text: 'Tarjeta', value: 'Card' },
  ];
  //const [products] = useState(productsList);

  const subTotal: any = products.map((product) => {
    const subtotalProduct = product.arrProduct.reduce(
      (accumulator, currentValue) => accumulator + currentValue.intFinalTotal,
      0
    );
    return subtotalProduct;
  });

  const Total = parseInt(subTotal) + parseInt(propina);
  const Cambio = parseInt(userPayment.Pago) - (parseInt(subTotal) + parseInt(userPayment.Propina));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (/^\d*$/.test(value)) {
      setUserPayment({
        ...userPayment,
        [e.target.name]: value,
      });
    }
  };

  const handleTipment = (itemValue: string, itemText: string) => {
    setTipment({
      ...tipment,
      text: itemText,
      value: itemValue,
    });
  };

  const handlePayment = (itemValue: string, itemText: string) => {
    setPayment({
      ...payment,
      text: itemText,
      value: itemValue,
    });
  };

  const fnCloseTable = () => {
    const userValues = {
      idUser: idUser,
      idTicket: idTicket,
      strPaymentType: payment.value,
      strTipType: tipment.value,
    };
    mutate(userValues, {
      onSuccess: (res) => {
        switch (res.data.intResponse) {
          case 200:
            navigate('/OpenBill');
            closeTable();
            break;
        }
      },
    });
  };

  useEffect(() => {
    if (data) {
      switch (optionCommand) {
        case 1:
          setProducts(data.arrTicketsMesa.filter((item: arrTickets) => item._id.startsWith(idTicket)));
          break;

        case 2:
          setProducts(data.arrTicketsMostrador.filter((item: arrTickets) => item._id.startsWith(idTicket)));
          break;

        case 3:
          setProducts(data.arrTicketsDelivery.filter((item: arrTickets) => item._id.startsWith(idTicket)));
          break;
      }
    }
    if (userPayment.Propina !== '') {
      setPropina(userPayment.Propina);
    } else {
      setPropina((subTotal * 10) / 100);
    }
  }, [idTicket, showModal, userPayment, hideModal]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="flex flex-col bg-white rounded-lg p-4 z-10">
        <div className="p-1">
          <label className="font-bold text-sm">Cerrar Cuenta:</label>
        </div>
        <hr />
        <div className="flex flex-col w-full ssm:grid ssm:grid-flow-col p-1">
          <div className="flex flex-col ssm:w-72 p-1">
            <label className="rounded p-1 text-sm font-bold">Productos:</label>
            <div className="flex flex-col border pt-4 border-black rounded-2xl">
              <div className="flex flex-col overflow-scroll scrollbar-thin gap-2 px-4">
                {products.map(
                  (item, index): JSX.Element => (
                    <div key={index} className="h-24">
                      {item.arrProduct.map(
                        (item, index): JSX.Element => (
                          <div key={index}>
                            <div className="flex border-b border-r">
                              <div className="flex w-full px-3 items-center justify-between">
                                <p>{item.strProductName}</p>
                                <p>${item.intFinalTotal}</p>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )
                )}
              </div>
              <div className="px-4 pt-2">
                <label>Subtotal: ${subTotal}</label>
              </div>
              <div className="px-4 pb-2">
                <label>Propina 10%: ${propina}</label>
              </div>
            </div>
            <label className="flex p-1 text-sm font-bold">Total:</label>
            <div className="flex h-8 pl-5 items-center border border-black rounded-2xl"> ${Total}</div>
          </div>
          <div className="flex flex-col p-1">
            <label className="flex p-1 text-sm font-bold">Propina:</label>
            <div className="flex flex-col h-2/3">
              <div className="flex flex-row border border-black rounded-2xl p-3">
                <div className="flex w-1/2">
                  <DropdownMenu
                    title="Pago"
                    items={optionsMenu}
                    setOptionSelected={handleTipment}
                    optionSelected={tipment.text}
                  />
                </div>
                <label className="flex items-center p-1">$ </label>
                <div className="border w-1/2">
                  <input
                    value={userPayment.Propina}
                    name="Propina"
                    className="h-full w-full px-3"
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <label className="flex p-1 text-sm font-bold">Pago</label>
              <div className="flex flex-row border border-black rounded-2xl p-3">
                <div className="flex w-1/2">
                  <DropdownMenu
                    title="Pago"
                    items={optionsMenu}
                    setOptionSelected={handlePayment}
                    optionSelected={payment.text}
                  />
                </div>
                <label className="flex items-center p-1">$</label>
                <div className="border w-1/2">
                  <input
                    value={userPayment.Pago}
                    name="Pago"
                    className="h-full w-full px-3"
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
            </div>
            <label className="p-1 text-sm font-bold">Cambio:</label>
            <div className="flex h-8 pl-5 items-center border border-black rounded-2xl"> ${Cambio ? Cambio : null}</div>
          </div>
        </div>
        <hr className="bg-black" />
        <div className="flex justify-end pt-3 gap-1">
          <button
            onClick={() => {
              hideModal(), setstrTableNumber('');
            }}
            className="btn btn_secondary bg-givvy_blue"
          >
            Cancelar
          </button>
          <button
            className={`${
              userPayment.Pago === '' || userPayment.Propina === '' || payment.value === '' || tipment.value === ''
                ? 'pointer-events-none btn btn_secondary'
                : 'btn btn_primary'
            }`}
            onClick={() => {
              fnCloseTable();
            }}
          >
            Cerrar Mesa
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal_Tables;
