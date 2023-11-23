import { useState } from 'react';
import { useGetProductDetails } from '../hooks/useProducts';
import { Modifiers, Sizes } from './modifiers';
import { queryClient } from '../utilities/queryClient';
import ExtraModifiers, { OptionObjSelected } from './modifiers/ExtraModifiers';
import { OptionObj } from './modifiers/Modifiers';
import { ProductInCart } from '../utilities/types.d';
import { setProductInCart } from '../store/slices/productsInCart.slice';
import { useAppDispatch } from '../hooks/useRedux';
import { setToggleModal } from '../store/slices/extrasModal.slice';
import { Ids } from './ProductsInCategory';
import decre from '../assets/Vector_-.svg';
import incre from '../assets/Vector_+.svg';
import Note from './modifiers/Note';

interface Props {
  ids: Ids;
  strProductName: string;
  strProductImage: string;
  dblDefaultPrice: number;
  idCompany: string;
  idBranch: string;
}

const ExtrasModal = (props: Props) => {
  const { ids, strProductName, strProductImage, dblDefaultPrice, idCompany, idBranch } = props;

  const [counter, setCounter] = useState<number>(1);

  const [sizeName, setSizeName] = useState('');

  const [dblSizePrice, setDblSizePrice] = useState<number>(0);

  const [arrUserModifierReq, setArrUserModifierReq] = useState<[] | OptionObj[]>([]);

  const [arrUserModifier, setArrUserModifier] = useState<[] | OptionObjSelected[]>([]);

  const [note, setNote] = useState('');

  const dispatch = useAppDispatch();

  const { data, isSuccess } = useGetProductDetails(idCompany, idBranch, ids);

  const getSizeInfo = (sizeName: string, sizePrice: number): void => {
    setSizeName(sizeName);
    setDblSizePrice(sizePrice);
  };

  const getOptionsModReq = (option: OptionObj, index: number): void => {
    setArrUserModifierReq((prevArr) => {
      const newArr = [...prevArr];

      if (option.boolDefault === undefined) {
        const newObj = { ...option, boolDefault: false };
        newArr[index] = newObj;

        return newArr;
      }

      newArr[index] = option;
      return newArr;
    });
  };

  const getUserOptionsNoRequired = (data: any, idModifier: string) => {
    const newObj: OptionObjSelected = { idModifier, ...data };

    setArrUserModifier((prevArr) => {
      const newArr = [...prevArr];

      const index = newArr.findIndex(
        (item) => item.idModifier === newObj.idModifier && item.strNameOption === newObj.strNameOption
      );

      if (index !== -1) {
        newArr.splice(index, 1);
      } else {
        newArr.push(newObj);
      }

      return newArr;
    });
  };

  const getUserNote = (note: string) => {
    setNote(note);
  };

  const increment = (): void => {
    setCounter(counter + 1);
  };

  const decrement = (): void => {
    setCounter(counter - 1);
  };

  const refetchData = () => {
    setDblSizePrice(0);
    setSizeName('');
    setArrUserModifierReq([]);
    setArrUserModifier([]);
    queryClient.removeQueries(['productDetails']);
    dispatch(setToggleModal());
  };

  const makeSuma = (dblDefaultPrice: number, dblSizePrice: number, arrUserModifierReq: any, arrUserModifier: any) => {
    const totalsModifieresReq = arrUserModifierReq.reduce((acumulador: number, elementoActual: any) => {
      const { dblPrice } = elementoActual;
      return acumulador + dblPrice;
    }, 0);

    const totalsModifiersNoReq = arrUserModifier.reduce((acumulador: number, elementoActual: any) => {
      const { dblPrice } = elementoActual;
      return acumulador + dblPrice;
    }, 0);

    return dblDefaultPrice + dblSizePrice + totalsModifieresReq + totalsModifiersNoReq;
  };

  const addProduct = () => {
    const objtToSend: ProductInCart = {
      idCompany: idCompany,
      idList: ids.idList,
      idProduct: ids.idProduct,
      strProductName: strProductName,
      strProductImage: strProductImage,
      intCant: counter,
      intTotal: makeSuma(dblDefaultPrice, dblSizePrice, arrUserModifierReq, arrUserModifier),
      strProdNote: note,
      strSizeName: sizeName,
      dblSizePrice: dblSizePrice === 0 ? '' : dblSizePrice,
      arrUserModifierReq: arrUserModifierReq,
      arrUserModifier: arrUserModifier,
      intTotalPercentageProd: 0,
      dblPointsPayOff: 0,
      intFinalTotal: makeSuma(dblDefaultPrice, dblSizePrice, arrUserModifierReq, arrUserModifier),
      dblProductPoints: 0,
      dblOasysPoints: 0,
      intTotalOasysPercentage: 0,
      Status: 'Sent',
    };

    dispatch(setProductInCart(objtToSend));
    refetchData();
  };

  return (
    <div className="w-full h-screen fixed z-30 top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center transition-all duration-200 ease-linear">
      <div className="scrollbar-none bg-foreground w-[375px] h-full overflow-auto pt-7 px-5 pb-36 flex flex-col gap-5 items-center">
        <div className="w-full flex justify-between items-center">
          <p className="text-xl font-semibold">Extras:</p>
          <button className="text-secondary text-2xl" onClick={refetchData}>
            <i className="las la-times cursor-pointer"></i>
          </button>
        </div>
        {isSuccess && (
          <>
            {data.objProduct.arrSize[0] && <Sizes data={data.objProduct.arrSize} getSizeInfo={getSizeInfo} />}
            {data.objProduct.arrModifier
              .filter((item) => item.boolRequired)
              .map((item, index: number) => (
                <Modifiers key={item._id} data={item} getOptionsModReq={getOptionsModReq} modifierIndex={index} />
              ))}
            {data.objProduct.arrModifier
              .filter((item) => !item.boolRequired)
              .map((item) => (
                <ExtraModifiers key={item._id} data={item} getUserOptionsNoRequired={getUserOptionsNoRequired} />
              ))}
            <Note getUserNote={getUserNote} />
          </>
        )}
        <div className="bg-foreground flex w-[375px] justify-center items-center fixed bottom-0 gap-4 py-5">
          <div className="flex card py-1 px-3">
            <button
              className={`text-lg px-3 rounded-l-2xl cursor-pointer ${
                counter === 1 ? 'text-secondary opacity-50' : null
              }`}
              onClick={decrement}
              disabled={counter === 1}
            >
              <div className="w-3 h-3">
                <img src={decre} className="w-full h-full object-cover" />
              </div>
            </button>
            <p className="w-8 py-1 flex justify-center items-center font-semibold text-lg">{counter}</p>
            <button className="text-lg px-3 rounded-r-2xl cursor-pointer text-givvy_blue" onClick={increment}>
              <div className="w-3 h-3">
                <img src={incre} className="w-full h-full object-cover" />
              </div>
            </button>
          </div>
          <button className="btn btn_primary" onClick={addProduct}>
            Agregar
            <div className="flex w-14">
              <p className="text-[8px] pt-1">MX$</p>
              <p className="text-lg">
                {makeSuma(dblDefaultPrice, dblSizePrice, arrUserModifierReq, arrUserModifier) * counter}
              </p>
              <p className="text-[8px] pt-1">00</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtrasModal;
