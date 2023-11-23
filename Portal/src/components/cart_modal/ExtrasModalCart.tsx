import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { setToggleModal } from '../../store/slices/extrasModal.slice';
import { useGetProductDetails } from '../../hooks/useProducts';
import { setDeselectProduct } from '../../store/slices/productToEdit.slice';
import { queryClient } from '../../utilities/queryClient';
import SizesToEdit from './SizesToEdit';
import {
  setAddNote,
  setEditModNoReq,
  setEditModReq,
  setEditSizeInfo,
  setRemakeSum,
} from '../../store/slices/productsInCart.slice';
import ModifiersReqToEdit from './ModifiersReqToEdit';
import ExtrasModifiersToEdit, { OptionObjSelected } from './ExtrasModifiersToEdit';
import NoteToEdit from './NoteToEdit';

interface Props {
  idCompany: string;
  idBranch: string;
  dblDefaultPrice: number;
}

const ExtrasModalCart = (props: Props) => {
  const { idCompany, idBranch, dblDefaultPrice } = props;

  const productToEdit = useAppSelector((state) => state.selectedProduct);

  const { index, product }: any = productToEdit;

  const [sizePrice, setSizePrice] = useState(product.dblSizePrice);

  const [sizeName, setSizeName] = useState(product.strSizeName);

  const [arrUserModifierReq, setArrUserModifierReq] = useState<any>(product.arrUserModifierReq);

  const [arrUserModifier, setArrUserModifier] = useState<[] | OptionObjSelected[]>(product.arrUserModifier);

  const [note, setNote] = useState(product.strProdNote);

  const [total, setTotal] = useState(() => {
    let newTotal = 0;

    const totalsModifieresReq = arrUserModifierReq.reduce((acumulador: number, elementoActual: any) => {
      const { dblPrice } = elementoActual;
      return acumulador + dblPrice;
    }, 0);

    const totalsModifiersNoReq = arrUserModifier.reduce((acumulador: number, elementoActual: any) => {
      const { dblPrice } = elementoActual;
      return acumulador + dblPrice;
    }, 0);

    newTotal = dblDefaultPrice + (sizePrice === '' ? 0 : sizePrice) + totalsModifieresReq + totalsModifiersNoReq;

    return newTotal;
  });

  const dispatch = useAppDispatch();

  const { data, isSuccess } = useGetProductDetails(idCompany, idBranch, {
    idList: product.idList,
    idProduct: product.idProduct,
  });

  const getSizeInfo = (sizePrice: number, sizeName: string) => {
    setSizePrice(sizePrice);
    setSizeName(sizeName);
  };

  const getModReqInfo = (optionEdited: any) => {
    setArrUserModifierReq((prevArr: any) => {
      const newArr = [...prevArr];

      newArr.find((item: any, index: number) => {
        if (item.idModifier === optionEdited.idModifier) {
          newArr[index] = optionEdited;
        }
      });

      return newArr;
    });
  };

  const getUserOptionsNoRequired = (option: any) => {
    setArrUserModifier((prevArr: any) => {
      const newArr = [...prevArr];

      const exist = newArr.find((item, index: number) => {
        if (item?.idModifier === option.idModifier && item.strNameOption === option.strNameOption) {
          newArr.splice(index, 1);

          return item;
        }
      });

      if (!exist) {
        newArr.push(option);
      }

      return newArr;
    });
  };

  const getUserNoteUpdated = (note: string) => {
    setNote(note);
  };

  const closeModal = () => {
    dispatch(setDeselectProduct());
    dispatch(setToggleModal());
    queryClient.removeQueries(['productDetails']);
  };

  const refetchData = () => {
    dispatch(setEditSizeInfo({ index, sizePrice, sizeName }));
    dispatch(setEditModReq({ arrUserModifierReq, index }));
    dispatch(setEditModNoReq({ arrUserModifier, index }));
    dispatch(setAddNote({ note, index }));
    dispatch(
      setRemakeSum({
        index,
        dblDefaultPrice: dblDefaultPrice,
        sizePrice,
        arrUserModifierReq,
        arrUserModifier,
      })
    );
    dispatch(setDeselectProduct());
    dispatch(setToggleModal());
    queryClient.removeQueries(['productDetails']);
  };

  useEffect(() => {
    setTotal(() => {
      let newTotal = 0;

      const totalsModifieresReq = arrUserModifierReq.reduce((acumulador: number, elementoActual: any) => {
        const { dblPrice } = elementoActual;
        return acumulador + dblPrice;
      }, 0);

      const totalsModifiersNoReq = arrUserModifier.reduce((acumulador: number, elementoActual: any) => {
        const { dblPrice } = elementoActual;
        return acumulador + dblPrice;
      }, 0);

      newTotal = dblDefaultPrice + (sizePrice === '' ? 0 : sizePrice) + totalsModifieresReq + totalsModifiersNoReq;

      return newTotal;
    });
  }, [dblDefaultPrice, sizePrice, arrUserModifierReq, arrUserModifier]);

  return (
    <div className="w-full h-screen fixed z-30 top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center transition-all duration-200 ease-linear">
      <div className="scrollbar-none bg-foreground w-[375px] h-full overflow-auto pt-7 pb-32 px-5 flex flex-col gap-5 items-center">
        <div className="w-full flex justify-between items-center">
          <p className="text-xl font-semibold">Extras:</p>
          <button className="text-secondary text-2xl" onClick={closeModal}>
            <i className="las la-times cursor-pointer"></i>
          </button>
        </div>
        {isSuccess && (
          <>
            {data.objProduct.arrSize[0] && (
              <SizesToEdit data={data.objProduct.arrSize} sizeName={product.strSizeName} getSizeInfo={getSizeInfo} />
            )}
            {data.objProduct.arrModifier
              .filter((item) => item.boolRequired)
              .map((item, i: number) => (
                <ModifiersReqToEdit
                  key={item._id}
                  data={item}
                  getModReqInfo={getModReqInfo}
                  optionSelected={product.arrUserModifierReq[i]}
                />
              ))}
            {data.objProduct.arrModifier
              .filter((item) => !item.boolRequired)
              .map((item) => (
                <ExtrasModifiersToEdit
                  key={item._id}
                  data={item}
                  getUserOptionsNoRequired={getUserOptionsNoRequired}
                  optionPreSelected={product.arrUserModifier}
                />
              ))}
            <NoteToEdit prevNote={note} getUserNoteUpdated={getUserNoteUpdated} />
          </>
        )}
        <div className="w-[375px] py-5 h-20 flex justify-center items-center bg-foreground fixed bottom-0">
          <button className="btn btn_primary" onClick={refetchData}>
            Actualizar
            <div className="flex w-14">
              <p className="text-[8px] pt-1">MX$</p>
              <p className="text-lg">{total}</p>
              <p className="text-[8px] pt-1">00</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtrasModalCart;
