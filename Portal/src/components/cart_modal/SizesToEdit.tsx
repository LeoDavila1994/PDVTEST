import { useState } from 'react';
import { ArrProducts } from '../../utilities/types.d';
import radio from '../../assets/radio1.png';
import radioChecked from '../../assets/radio2.png';

interface Props {
  data: ArrProducts[];
  sizeName: string;
  getSizeInfo: Function;
}

const SizesToEdit = (props: Props) => {
  const { data, sizeName, getSizeInfo } = props;

  const [checked, setChecked] = useState<string>(sizeName);

  const handleRadio = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    getSizeInfo(Number(value), name);
  };

  const handleCheck = (index: string) => {
    setChecked(index);
  };

  return (
    <div className="w-full h-min card">
      <div className="py-2 px-4 flex justify-between bg-givvy_blue text-white rounded-t-lg">
        <p className="font-bold">¿Cúal tamaño deseas?</p>
        <p className="opacity-50 bg-gray-200 text-secondary font-bold px-2 rounded-lg text-xs">Obligatorio</p>
      </div>
      <div className="p-2">
        <form className="flex flex-col gap-4">
          {data.map((item) => (
            <div key={item._id} className="text-secondary">
              <label className="w-full flex justify-start px-6 gap-3 relative">
                <div className="absolute bottom-5 w-3 h-3">
                  <img
                    src={item.strSizeName === checked ? radioChecked : radio}
                    className="w-full h-full object-cover"
                  />
                </div>
                <input
                  className="cursor-pointer opacity-0"
                  type="radio"
                  value={item?.dblSizePrice}
                  name={item.strSizeName}
                  checked={item.strSizeName === checked}
                  onChange={handleRadio}
                  onClick={() => handleCheck(item.strSizeName)}
                />
                <div className="flex flex-col items-start pt-4">
                  <p className="font-semibold">
                    {item.strSizeName} <span>({item.strSizeMeasure})</span>
                  </p>
                  <p className="text-xs opacity-50">
                    <strong>Costo:</strong> {item.dblSizePrice === 0 ? 'Gratis' : `$${item.dblSizePrice}.00`}
                  </p>
                </div>
              </label>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default SizesToEdit;
