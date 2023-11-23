import { useEffect, useState } from 'react';
import { ArrProducts } from '../../utilities/types.d';
import radio from '../../assets/radio1.png';
import radioChecked from '../../assets/radio2.png';

interface Props {
  data: ArrProducts[];
  getSizeInfo: Function;
}

const Size = (props: Props) => {
  const { data, getSizeInfo } = props;

  const [checked, setChecked] = useState<number>(0);

  const handleRadio = (e: React.ChangeEvent<HTMLInputElement>): void => {
    getSizeInfo(e.target.name, parseFloat(e.target.value));
  };

  const handleCheck = (index: number) => {
    setChecked(index);
  };

  useEffect(() => {
    getSizeInfo(data[0]?.strSizeName, data[0]?.dblSizePrice);
  }, [data]);

  return (
    <div className="w-full h-min card">
      <div className="py-2 px-4 flex justify-between bg-givvy_blue text-white rounded-t-lg">
        <p className="font-bold">¿Cúal tamaño deseas?</p>
        <p className="opacity-50 bg-gray-200 text-secondary font-bold px-2 rounded-lg text-xs">Obligatorio</p>
      </div>
      <div className="p-2">
        <form className="flex flex-col gap-4">
          {data.map((item, index: number) => (
            <div key={item._id} className="text-secondary">
              <label className="w-full flex justify-start px-6 gap-3 relative">
                <div className="absolute bottom-5 w-3 h-3">
                  <img src={index === checked ? radioChecked : radio} className="w-full h-full object-cover" />
                </div>
                <input
                  className="cursor-pointer opacity-0"
                  type="radio"
                  value={item?.dblSizePrice}
                  name={item.strSizeName}
                  checked={index === checked}
                  onChange={handleRadio}
                  onClick={() => handleCheck(index)}
                />
                <div className="flex flex-col pt-4">
                  <p className="font-semibold">
                    {item.strSizeName} <span>({item.strSizeMeasure})</span>
                  </p>
                  <p className="px-6 text-xs opacity-50">
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

export default Size;
