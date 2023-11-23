import { useState, useEffect } from 'react';
import { useTable } from '../hooks/useTableMenu';
import classNames from 'classnames';
import arrow_left from '../assets/arrow-left.svg';
import { useGetTicket } from '../hooks/useTicket';
import { decrypt } from '../utilities/cryptoJs';
import { useUpdateStatusProduct } from '../hooks/useProducts';
import { queryClient } from '../utilities/queryClient';
import ModalPaidAdmin from './ModalPaidAdmin';
import { useSummary } from '../hooks/useSummaryMenu';

interface Props {
  closeTable: Function;
  getSidebarStatus: Function;
  setstrTableNumber: Function;
  optionCommand: number;
  openSideTable: Function;
}

const getIds = async () => {
  const idBranch = await decrypt('branch-id');
  const idTicket = await decrypt('ticket-id');
  const idUser = await decrypt('user-id');

  return { idBranch, idTicket, idUser };
};

const CloseTable = (props: Props) => {
  const { closeTable, getSidebarStatus, setstrTableNumber, optionCommand, openSideTable } = props;
  const { toggleMenuTable, isMenuTableOpened } = useTable();
  const [products, setProducts] = useState<any>([]);
  const [isVisible, setIsVisible] = useState(false);

  const [isCanceled, setIsCanceled] = useState(false);
  const [productSelected, setProductSelected] = useState('');

  const [idBranch, setIdBranch] = useState('');
  const [idTicket, setIdTicket] = useState('');
  const [idUser, setIdUser] = useState('');

  const { features, cleanFeatures, toggleSidebar, getTicket } = useSummary();
 
  useEffect(() => {
    async function fetchData() {
      try {
        const { idBranch, idTicket, idUser } = await getIds();

        if (idBranch) {
          setIdBranch(idBranch);
        }

        if (idTicket) {
          setIdTicket(idTicket);
        }

        if (idUser) {
          setIdUser(idUser);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (features._id) {
      const { arrProduct } = features;

      setProducts(() => {
        const newArr = [...arrProduct];

        const arrCancel = newArr.filter((item: any) => item.Status === 'Cancel');

        const arrSent = newArr.filter((item: any) => item.Status === 'Sent');

        const arrProces = newArr.filter((item: any) => !item.Status);

        return arrSent.concat(arrProces, arrCancel);
      });
    }
  }, [features]);

  const menuBarClasses = {
    open: isMenuTableOpened,
  };

  const { mutate } = useUpdateStatusProduct();

  const handleModal = (idShoppingProd: string) => {
    setProductSelected(idShoppingProd);
    setIsCanceled(true);
  };

  const handleCancel = (action: string) => {
    switch (action) {
      case 'Yes':
        mutate(
          { idTicket, status: 'Cancel', idShoppingProd: productSelected },
          {
            onSuccess: (res) => {
              setIsCanceled(false);
              queryClient.invalidateQueries(['ticketTables']);
              setProducts(() => {
                const { arrProduct } = res.data.data;

                const arrProducts = [...arrProduct];

                const arrCancel = arrProducts.filter((item: any) => item.Status === 'Cancel');

                const arrSent = arrProducts.filter((item: any) => item.Status === 'Sent');

                return arrSent.concat(arrCancel);
              });

              setProductSelected('');
            },
          }
        );
        break;
      case 'No':
        setProductSelected('');
        setIsCanceled(false);
        break;
    }
  };

  const closeSideBarProducts = () => {
    closeTable();
    setstrTableNumber('');
    openSideTable();
    toggleSidebar();
    sessionStorage.removeItem('TableNumber');
    sessionStorage.removeItem('OptionCommand');
    sessionStorage.removeItem('AreaName');
  }

  return (
    <>
      {openSideTable && <div className="w-full h-full bg-black bg-opacity-50 absolute top-0 left-0"></div>}
      <div className={classNames('sidebar pt-5 pb-7 px-5', menuBarClasses)}>
        <div
          onClick={toggleMenuTable}
          className="w-8 h-9 flex justify-center items-center bg-givvy_blue hover:bg-givvy_blue_strong absolute -left-8 top-10 transition-colors ease-in-out text-white text-2xl cursor-pointer rounded-l-lg"
        >
          <i className="las la-file-invoice-dollar"></i>
        </div>
        <div className="flex text-left items-center pb-2">
          <button
            onClick={closeSideBarProducts}
          >
            <img src={arrow_left} />
          </button>
          <label className="pl-3 text-xl font-semibold">Productos Consumidos:</label>
        </div>
        <hr />
        <div className="scrollbar-none flex flex-col gap-16 w-full h-full overflow-auto pt-5">
          <div>
            {products.map(
              (product: any, index: any): JSX.Element => (
                <div key={index} className="flex flex-col gap-3 pt-3">
                  <div className="w-full flex ">
                    <div className="flex w-full justify-between gap-3">
                      <div className="flex gap-3">
                        <div className="w-16 h-16 overflow-hidden rounded-lg">
                          <img src={product.strProductImage} className="w-full h-full object-cover" />
                        </div>
                        <div className="h-16 text-gray-600 font-semibold text-sm">
                          <p>{product.strProductName}</p>
                          <div className="flex w-14">
                            <p className="font-bold top-0 text-[8px]">MX$</p>
                            <p className="font-bold text-lg">{product.intTotal}</p>
                            <p className="font-bold text-[8px]">00</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <button
                          disabled={product.Status === 'Cancel'}
                          className={`w-24 px-2 py-1 rounded-lg font-semibold ${
                            product.Status === 'Cancel'
                              ? 'text-white bg-danger border-0 opacity-70'
                              : 'text-danger border-[1px] border-danger'
                          }`}
                          onClick={() => handleModal(product.idShoppingProd)}
                        >
                          {product.Status === 'Sent' ? 'Cancelar' : 'Cancelado'}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-full text-gray-400 flex flex-col gap-2">
                    {product.arrUserModifierReq.length > 0?
                    <div>
                      <p className="text-secondary">Extras requeridos:</p>
                      <div className="flex flex-wrap gap-1 w-full">
                        {product.arrUserModifierReq?.map((modReq: any, index: number) => (
                          <p key={index}>
                            {modReq.strNameOption}(${modReq.dblPrice})
                          </p>
                        ))}
                      </div>
                    </div>
                    :null}
                    {product.arrUserModifier.length > 0?
                    <div>
                      <p className="text-secondary">Extras añadidos:</p>
                        <div className="flex flex-wrap w-full gap-1">
                          {product.arrUserModifier?.map((mod: any, index: number) => (
                            <p key={index}>
                              {mod.strNameOption}(${mod.dblPrice})
                            </p>
                          ))}
                        </div>
                    </div>
                    :null}
                  </div>
                  <div className="w-full flex">
                    {product.strProdNote !== ''?
                    <div>
                      <p className="text-secondary">Indicaciones especiales:</p>
                      <div className="flex flex-wrap gap-1 w-full h-10 p-2 mb-10">
                        <p>{product.strProdNote}</p>
                      </div>
                    </div>
                    :null}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <div className='pt-2'>
            <hr />
            <div className="w-full pt-5 flex justify-center ">
              <button className="btn h-9 w-32 btn_primary" onClick={() => {setIsVisible(true), getTicket(idTicket)}}>
                <p className='text-sm'>Cerrar Mesa</p>
              </button>
            </div>
          </div>
      </div>
      {isCanceled && (
        <div className="w-full h-full flex justify-center items-center absolute z-50 bg-black bg-opacity-50 top-0 left-0">
          <div className="w-80 h-40 card flex flex-col gap-5 justify-center items-center">
            <p className="text-base text-secondary font-semibold">¿Seguro quieres cancelar el producto?</p>
            <div className="flex gap-5">
              <button className="bg-givvy_blue text-white w-20 py-1 rounded-lg" onClick={() => handleCancel('Yes')}>
                Aceptar
              </button>
              <button className="bg-danger text-white w-20 py-1 rounded-lg" onClick={() => handleCancel('No')}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {isVisible && <ModalPaidAdmin setIsVisible={setIsVisible} />}
    </>
  );
};

export default CloseTable;