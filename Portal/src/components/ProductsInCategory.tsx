import { useState } from 'react';
import { useGetProductsByCategory } from '../hooks/useProducts';
import ExtrasModal from './ExtrasModal';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { setToggleModal } from '../store/slices/extrasModal.slice';
import { setMenuModal } from '../store/slices/whichModal.slice';
import ExtrasModalCart from './cart_modal/ExtrasModalCart';
import addProduct from '../assets/shopping-bag-white@2x.png';
export interface Props {
  idList: string;
  idCompany: string;
  idBranch: string;
}

export interface Ids {
  idProduct: string;
  idList: string;
}

const ProductsInCategory = (props: Props) => {
  const { idList, idCompany, idBranch } = props;

  const [strProductName, setStrProductName] = useState<string>('');

  const [strProductImage, setStrProductImage] = useState<string>('');

  const [dblDefaultPrice, setDblDefaultPrice] = useState<number>(0);

  const [ids, setIds] = useState<Ids>({
    idProduct: '',
    idList: '',
  });

  const dispatch = useAppDispatch();

  const modal = useAppSelector((state) => state.extrasModal);

  const modalMenu = useAppSelector((state) => state.whichModal);

  const { data, isSuccess } = useGetProductsByCategory(idCompany, idBranch, idList);

  const showModal = (
    idProduct: string,
    idList: string,
    strProductName: string,
    strProductImage: string,
    dblDefaultPrice: string | number
  ): void => {
    dispatch(setMenuModal());
    setIds({ idProduct, idList });
    setStrProductName(strProductName);
    setStrProductImage(strProductImage);
    setDblDefaultPrice(Number(dblDefaultPrice));
    dispatch(setToggleModal());
  };

  return (
    <>
      <div className="w-full flex flex-wrap gap-10 justify-center overflow-auto scrollbar-none p-2">
        {isSuccess &&
          data.arrProducts.map((product) => (
            <div key={product._id} className="card w-72 h-36 flex overflow-hidden">
              <div className="w-36 h-36 flex justify-center items-center p-4">
                <div className="w-32 h-28 rounded-lg overflow-hidden border-[1px] border-givvy_blue">
                  <img src={product.strProductImage} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="w-full h-36 flex flex-col gap-6 pt-2 pb-4 font-semibold text-xs justify-center items-start text-start">
                <h2 className="uppercase leading-4">{product.strProductName}</h2>
                <div>
                  <button
                    className="btn btn_primary"
                    onClick={() =>
                      showModal(
                        product._id,
                        product.idList,
                        product.strProductName,
                        product.strProductImage,
                        product.dblDefaultPrice
                      )
                    }
                  >
                    Agregar
                    <div className="w-4 h-4 overflow-hidden">
                      <img src={addProduct} className="w-full h-full object-cover" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      {isSuccess && modal && modalMenu === 0 && (
        <ExtrasModal
          ids={ids}
          strProductName={strProductName}
          strProductImage={strProductImage}
          dblDefaultPrice={dblDefaultPrice}
          idCompany={idCompany}
          idBranch={idBranch}
        />
      )}
      {isSuccess && modal && modalMenu === 1 && (
        <ExtrasModalCart idCompany={idCompany} idBranch={idBranch} dblDefaultPrice={dblDefaultPrice} />
      )}
    </>
  );
};

export default ProductsInCategory;
