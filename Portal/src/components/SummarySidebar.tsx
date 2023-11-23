import classNames from 'classnames';
import { useSummary } from '../hooks/useSummaryMenu';
import bag from '../assets/shopping-bag-white@2x.png';
import arrow from '../assets/vuesax_bulk_arrow-square-left.svg';
import useWindowSize from '../hooks/useWindowSize';
import { useEffect, useState } from 'react';
import { useUpdateStatusProduct } from '../hooks/useProducts';
import { queryClient } from '../utilities/queryClient';
import ModalPaidAdmin from './ModalPaidAdmin';

const SummarySidebar = () => {
  const [products, setProducts] = useState<any>([]);
  const [isCanceled, setIsCanceled] = useState(false);
  const [productSelected, setProductSelected] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const { width } = useWindowSize();
  const { toggleSidebar, isSidebarOpened, features } = useSummary();

  const menuBarClasses = {
    open: isSidebarOpened,
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
          { idTicket: features._id, status: 'Cancel', idShoppingProd: productSelected },
          {
            onSuccess: () => {
              setIsCanceled(false);
              queryClient.invalidateQueries(['findTicket']);
              setProductSelected('');

              const { arrProduct } = features;

              setProducts(() => {
                const newArr = [...arrProduct];

                const arrCancel = newArr.filter((item: any) => item.Status === 'Cancel');

                const arrSent = newArr.filter((item: any) => item.Status === 'Sent');

                const arrProces = newArr.filter((item: any) => !item.Status);

                return arrSent.concat(arrProces, arrCancel);
              });
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

  useEffect(() => {
    if (!isSidebarOpened) {
      setProducts([]);
    }
  }, [isSidebarOpened]);

  return (
    <>
      {isSidebarOpened && <div className="w-full h-full bg-black bg-opacity-50 absolute top-0 left-0"></div>}
      <div className={classNames('sidebar pt-5 pb-7 px-5', menuBarClasses)}>
        <div
          onClick={toggleSidebar}
          className="w-8 h-9 flex justify-center items-center bg-givvy_blue hover:bg-givvy_blue_strong  absolute top-10
          rounded-l-lg -left-8 transition-all ease-in-out text-white text-2xl cursor-pointer"
        >
          <img src={bag} className="scale-75" />
        </div>
        <div className="flex items-center text-xl font-semibold">
          {width <= 375 && <img src={arrow} className="scale-75" onClick={toggleSidebar} />}
          <h2>Bolsa:</h2>
        </div>
        <hr />
        <div className="w-full h-full overflow-auto scrollbar-none p-3">
          {products.map(
            (product: any, index: any): JSX.Element => (
              <div key={index} className="flex flex-col gap-3 ">
                <div className="w-full flex ">
                  <div className="flex w-full justify-between gap-3">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 overflow-hidden rounded-lg">
                        <img src={product.strProductImage} className="w-full h-full object-cover" />
                      </div>
                      <div className="h-16 text-gray-600 font-semibold text-sm">
                        <p>{product.strProductName}</p>
                        <div className="flex w-14">
                          <p className="font-bold top-0 text-[8px] pt-0.5">MX$</p>
                          <p className="font-bold text-lg">{product.intTotal}</p>
                          <p className="font-bold text-[8px] pt-0.5">00</p>
                        </div>
                      </div>
                    </div>
                    {product.Status && (
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
                          {product.Status !== 'Cancel' ? 'Cancelar' : 'Cancelado'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full text-gray-400 flex flex-col gap-2">
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
                </div>
                <div className="w-full flex">
                  <div>
                    <p className="text-secondary">Indicaciones especiales:</p>
                    <div className="flex flex-wrap gap-1 w-full h-10 p-2 mb-10">
                      <p>{product.strProdNote}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        {products[0] && features.boolCommand && (
          <div>
            <hr />
            <div className="w-full pt-5 flex justify-center ">
              <button className="btn btn_primary" onClick={() => setIsVisible(true)}>
                Cerrar Mesa
              </button>
            </div>
          </div>
        )}
      </div>
      {isCanceled && (
        <div className="w-full h-full flex justify-center items-center absolute z-30 bg-black bg-opacity-30 top-0 left-0">
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

export default SummarySidebar;
