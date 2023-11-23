import { useEffect, useState } from 'react';
import useWindowSize from '../hooks/useWindowSize';
import { useCloseTable } from '../hooks/useCloseTables';
import { decrypt } from '../utilities/cryptoJs';
import { useNavigate } from 'react-router-dom';
import { useSummary } from '../hooks/useSummaryMenu';

const idUser = decrypt('user-id');

const ModalPaidAdmin = ({ setIsVisible }: any) => {
  const { toggleSidebar, features } = useSummary();

  const [subTotal] = useState(() => {
    let amount = 0;

    features.arrProduct
      .filter((product: any) => product.Status !== 'Cancel')
      .forEach((product: any) => {
        amount += product.intTotal;
      });

    return amount;
  });

  const [tipSuggested, setTipSuggested] = useState(0);

  const [tip, setTip] = useState<string | number>('');

  const [total, setTotal] = useState(0);

  const [paidType, setPaidType] = useState('Cash');
  const [tipType, setTipType] = useState('Cash');
  const [legend, setLegend] = useState('Sugerida');

  const { width } = useWindowSize();

  const { mutate } = useCloseTable();

  const navigate = useNavigate();

  const handlePaidType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setPaidType(name);
  };

  const handleTipType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTipType(name);
  };

  const handleTip = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (/^\d*$/.test(value)) {
      setTip(value);
      setLegend('Sugerida');
      return;
    }

    setLegend('Solo cantidad');
  };

  const handlePaid = () => {
    const userValues = {
      idUser: idUser,
      idTicket: features._id,
      strPaymentType: tipType,
      strTipType: paidType,
    };
    mutate(userValues, {
      onSuccess: (res) => {
        switch (res.data.intResponse) {
          case 200:
            if(location.pathname == '/OpenBill'){
              navigate('/OpenBill');
              sessionStorage.removeItem('TableNumber');
              sessionStorage.removeItem('OptionCommand');
              sessionStorage.removeItem('AreaName');
              toggleSidebar();
            }else if (location.pathname == '/ticketsummary'){
              navigate('/ticketsummary');
              toggleSidebar();
            }
            break;
        }
      },
    });
  };
  
  const closeModal = () => {
    setIsVisible(false);
    toggleSidebar();
  };

  useEffect(() => {
    setTipSuggested(() => {
      const amount = Math.ceil(subTotal / 10);

      return amount;
    });

    setTotal(subTotal);
  }, [subTotal]);

  useEffect(() => {
    setTotal(() => {
      const finalTotal = subTotal + Number(tip);

      return finalTotal;
    });
  }, [tip]);

  return (
    <div className="w-full h-full flex justify-center items-center bg-black bg-opacity-30 fixed top-0 left-0 z-40">
      <div className="w-[350px] sm:w-[635px] overflow-auto sm:overflow-hidden scrollbar-none h-[388px] card">
        <div className="w-full h-7 flex flex-col justify-between px-4 pt-2 gap-1">
          <p className="font-bold">Cerrar cuenta:</p>
          <hr />
        </div>
        <div className={`w-full flex px-3 ${width < 640 ? 'flex-col' : 'flex-row'}`}>
          <div className="h-[340px] w-full sm:w-1/2 flex flex-col gap-2 p-2">
            <p className="font-bold">Productos:</p>
            <div className="w-full h-full rounded-lg border-[1px] border-gray-300 overflow-auto scrollbar-none p-2">
              {features.arrProduct
                .filter((product: any) => product.Status !== 'Cancel')
                .map((product: any) => (
                  <div
                    key={product.idShoppingProd}
                    className="w-full h-7 flex justify-between items-center border-b-[1px] border-gray-300"
                  >
                    <p className="text-gray-500">
                      <span className="text-givvy_blue">• </span>
                      {product.strProductName}
                    </p>
                    <div className="flex w-14">
                      <p className="font-bold top-0 text-[8px]">MX$</p>
                      <p className="font-bold text-lg">{product.intTotal}</p>
                      <p className="font-bold text-[8px]">00</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="w-full sm:w-1/2 flex flex-col gap-4 p-2">
            <div className="flex flex-col gap-2">
              <p className="font-bold">Propina:</p>
              <div className="w-full h-16 rounded-lg border-[1px] border-gray-300">
                <form className="w-full h-full flex justify-around items-center">
                  <label className="flex gap-2 text-gray-400 font-semibold text-xs cursor-pointer">
                    <input
                      type="radio"
                      value={paidType}
                      name="Cash"
                      checked={paidType === 'Cash'}
                      onChange={handlePaidType}
                      className="cursor-pointer"
                    />
                    Efectivo
                  </label>
                  <label className="flex gap-2 text-gray-400 font-semibold text-xs cursor-pointer">
                    <input
                      type="radio"
                      value={paidType}
                      name="Card"
                      checked={paidType === 'Card'}
                      onChange={handlePaidType}
                      className="cursor-pointer"
                    />
                    Tarjeta
                  </label>
                  <label className="relative">
                    <input
                      type="text"
                      className="w-20 h-6 rounded-lg border-[1px] border-gray-300 outline-none text-xs text-givvy_blue font-bold text-center"
                      placeholder={`${tipSuggested}`}
                      value={tip}
                      onChange={handleTip}
                    />
                    <span className="scale-90  absolute left-2 top-[3px] text-givvy_blue text-xs">$</span>
                    <span
                      className={`w-full scale-75 absolute -bottom-[17px]  text-xs font-bold ${
                        legend !== 'Sugerida' ? 'text-danger left-[4px]' : 'text-givvy_blue left-[14px]'
                      }`}
                    >
                      {legend}
                    </span>
                  </label>
                </form>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">Pago:</p>
              <div className="w-full h-16 rounded-lg border-[1px] border-gray-300">
                <form className="w-full h-full flex justify-around items-center">
                  <label className="flex gap-2 text-gray-400 font-semibold text-xs cursor-pointer">
                    <input
                      type="radio"
                      value={tipType}
                      name="Cash"
                      checked={tipType === 'Cash'}
                      onChange={handleTipType}
                      className="cursor-pointer"
                    />
                    Efectivo
                  </label>
                  <label className="flex gap-2 text-gray-400 font-semibold text-xs cursor-pointer">
                    <input
                      type="radio"
                      value={tipType}
                      name="Card"
                      checked={tipType === 'Card'}
                      onChange={handleTipType}
                      className="cursor-pointer"
                    />
                    Tarjeta
                  </label>
                </form>
              </div>
            </div>
            <div className="flex w-full justify-between gap-4">
              <div className="w-1/2 flex flex-col gap-2">
                <p className="font-bold">Subtotal:</p>
                <div className="w-full h-8 flex justify-center items-center  rounded-lg border-[1px] border-gray-300">
                  <div className="flex w-14">
                    <p className="font-bold top-0 text-[8px]">MX$</p>
                    <p className="font-bold text-lg">{subTotal}</p>
                    <p className="font-bold text-[8px]">00</p>
                  </div>
                </div>
              </div>
              <div className="w-1/2 flex flex-col gap-2">
                <p className="font-bold">Total:</p>
                  <div className="w-full h-8 flex justify-center items-center  rounded-lg border-[1px] border-gray-300">
                    <div className="flex w-14">
                      <p className="font-bold top-0 text-[8px] pt-0.5">MX$</p>
                      <p className="font-bold text-lg">{total}</p>
                      <p className="font-bold text-[8px] pt-0.5">00</p>
                    </div>
                  </div>
              </div>
            </div>
            <div className="w-full flex justify-between gap-4">
              <button className="btn btn_primary w-1/2" onClick={handlePaid}>
              <p className='text-sm'>Pagar</p>
              </button>
              <button className="btn bg-danger w-1/2" onClick={closeModal}>
                <p className='text-sm'>Cerrar</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPaidAdmin;
