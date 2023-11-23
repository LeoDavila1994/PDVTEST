import { useEffect, useState } from 'react';
import { useBill } from '../hooks/useBillMenu';
import classNames from 'classnames';
import { ProductInCart } from '../utilities/types.d';
import edit from '../assets/edit-2@2x.png';
import trash from '../assets/trash@2x.png';
import bag from '../assets/shopping-bag-white@2x.png';
import ProductNote from './ProductNote';
import arrow from '../assets/vuesax_bulk_arrow-square-left.svg';
import { setRemoveProducts, setConfirmOrder, setAddNote } from '../store/slices/productsInCart.slice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { setSelectProduct } from '../store/slices/productToEdit.slice';
import { setCartModal } from '../store/slices/whichModal.slice';
import { setToggleModal } from '../store/slices/extrasModal.slice';
import { useAddArrProducts } from '../hooks/useProducts';
import useWindowSize from '../hooks/useWindowSize';
import { decrypt } from '../utilities/cryptoJs';

const getTicket = async () => {
  const idTicket = await decrypt('ticket-id');
  const arrDevices = await decrypt('device-token');
  return { idTicket, arrDevices };
};

const ShoppingCart = () => {
  const arrProduct: [] | ProductInCart[] = useAppSelector((state) => state.productsInCart);

  const [idTicket, setIdTicket] = useState('');

  const [arrDevices, setArrDevices] = useState(['']);

  const [total, setTotal] = useState(0);

  const { width } = useWindowSize();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { toggleMenuBill, isMenuBillOpened } = useBill();

  const { mutate } = useAddArrProducts();

  const menuBarClasses = {
    open: isMenuBillOpened,
  };

  const getNoteByProduct = (note: string, index: number): void => {
    dispatch(setAddNote({ note, index }));
  };

  const editExtrasProduct = (product: any, index: number) => {
    dispatch(setCartModal());
    dispatch(setSelectProduct({ index, product }));
    dispatch(setToggleModal());
  };

  const removeProduct = (index: number) => {
    dispatch(setRemoveProducts(index));
  };

  const confirmOrder = async () => {
    mutate(
      { idTicket, arrProduct, arrDevices },
      {
        onSuccess: () => {
          dispatch(setConfirmOrder());
          toggleMenuBill();
          navigate('/OpenBill');
        },
      }
    );
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { idTicket, arrDevices } = await getTicket();

        if (idTicket) {
          setIdTicket(idTicket);
        }

        if (arrDevices) {
          setArrDevices([arrDevices]);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    setTotal(() => {
      const total = arrProduct.reduce((acumulador: any, elementoActual: any) => {
        const { intTotal } = elementoActual;

        return acumulador + intTotal;
      }, 0);

      return total;
    });
  }, [arrProduct]);

  return (
    <div className={classNames('sidebar pt-5 pb-7 px-5', menuBarClasses)}>
      <div
        onClick={toggleMenuBill}
        className="w-8 h-9 flex justify-center items-center bg-givvy_blue hover:bg-givvy_blue_strong  absolute top-10
          rounded-l-lg -left-8 transition-all ease-in-out text-white text-2xl cursor-pointer"
      >
        <img src={bag} className="scale-75" />
      </div>
      <div className="flex items-center text-xl font-semibold">
        {width <= 375 && <img src={arrow} className="scale-75" onClick={toggleMenuBill} />}
        <h2>Bolsa:</h2>
      </div>
      <hr />
      <div className="scrollbar-none flex flex-col gap-16 w-full h-full overflow-auto pt-5 pb-24">
        {arrProduct[0] &&
          arrProduct.map((product, index: number) => (
            <div key={index} className="flex flex-col gap-3">
              <div className="w-full flex justify-around">
                <div className="flex gap-3">
                  <div className="w-16 h-16 overflow-hidden rounded-lg">
                    <img src={product.strProductImage} className="w-full h-full object-cover" />
                  </div>
                  <div className="w-36 h-16 text-gray-600 font-semibold text-sm">
                    <p>{product.strProductName}</p>
                    <div className="flex w-14">
                      <p className="font-bold top-0 text-[8px] pt-0.5">MX$</p>
                      <p className="font-bold text-lg">{product.intTotal}</p>
                      <p className="font-bold text-[8px] pt-0.5">00</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center w-24 h-16 text-givvy_blue text-3xl gap-4">
                  <button className="scale-75" onClick={() => editExtrasProduct(product, index)}>
                    <img src={edit} />
                  </button>
                  <button className="scale-75" onClick={() => removeProduct(index)}>
                    <img src={trash} />
                  </button>
                </div>
              </div>
              <div className="w-full text-gray-400 flex flex-col gap-2">
                <div>
                  <p className="text-secondary">Extras requeridos:</p>
                  <div className="flex flex-wrap gap-1 w-full">
                    {product.arrUserModifierReq.map((modReq, index: number) => (
                      <p key={index}>
                        {modReq.strNameOption}(${modReq.dblPrice})
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-secondary">Extras añadidos:</p>
                  <div className="flex flex-wrap w-full gap-1">
                    {product.arrUserModifier.map((mod, index: number) => (
                      <p key={index}>
                        {mod.strNameOption}(${mod.dblPrice})
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <ProductNote getNoteByProduct={getNoteByProduct} noteIndex={index} prevNote={product.strProdNote} />
            </div>
          ))}
        {arrProduct[0] && (
          <div className="w-[335px] h-20 flex justify-center items-center bg-foreground fixed bottom-0">
            <button className="btn btn_primary" onClick={confirmOrder}>
              Confirmar pedido
              <div className="flex w-14">
                <p className="text-[8px] pt-1">MXN$</p>
                <p className="text-lg">{total}</p>
                <p className="text-[8px] pt-1">00</p>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
