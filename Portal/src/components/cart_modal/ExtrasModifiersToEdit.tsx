import { useState } from 'react';
import { ArrModifierOptions, ArrModifiers } from '../../utilities/types.d';
import checkbox from '../../assets/checkbox1.png';
import checkboxChecked from '../../assets/checkbox2.png';

export interface OptionObjSelected {
  modifierId: string;
  optionsSelected: [] | ArrModifierOptions[];
}
interface Props {
  data: ArrModifiers;
  getUserOptionsNoRequired: Function;
  optionPreSelected: any;
}

const ExtrasModifiersToEdit = (props: Props) => {
  const { data, getUserOptionsNoRequired, optionPreSelected } = props;

  const [arrBool, setArrBool] = useState(() => {
    const newArr = new Array(data.arrOptions.length).fill(false);

    data.arrOptions.forEach((optBase, index) => {
      optionPreSelected.forEach((item: any) => {
        if (optBase.strNameOption === item.strNameOption) {
          newArr[index] = true;
        }
      });
    });

    return newArr;
  });

  const handleChange = (option: any, index: number) => {
    setArrBool((prevArr: boolean[]) => {
      const newArr = [...prevArr];

      newArr[index] = newArr[index] ? false : true;

      return newArr;
    });

    getUserOptionsNoRequired({ ...option, idModifier: data._id });
  };

  return (
    <>
      <div className="w-full h-min card">
        <div className="text-white bg-givvy_blue py-2 px-4 font-bold flex justify-between rounded-t-lg">
          <p>{data.strModifierName}</p>
        </div>
        <div className="p-2">
          <form className="flex flex-col gap-4">
            {data.arrOptions?.map((item: any, index: number) => (
              <div key={item.strNameOption + index}>
                <label className="flex justify-start px-6 gap-3 relative">
                  <div className="absolute bottom-5 w-3 h-3">
                    <img
                      src={arrBool[index] ? checkboxChecked : checkbox}
                      className={`w-full h-full object-cover ${
                        !arrBool[index] &&
                        arrBool.filter((item) => item).length >= Number(data.intMaxNumberOptions) &&
                        'opacity-30'
                      }`}
                    />
                  </div>
                  <input
                    className="cursor-pointer opacity-0"
                    type="checkbox"
                    value={item}
                    name={item.strNameOption}
                    checked={arrBool[index]}
                    onChange={() => handleChange(item, index)}
                    disabled={
                      arrBool.filter((item) => item).length >= Number(data.intMaxNumberOptions) && !arrBool[index]
                    }
                  />
                  <div className="flex flex-col pt-4">
                    <p className="text-secondary font-bold">{item.strNameOption}</p>
                    <p className="text-xs opacity-50">
                      <strong>Costo extra:</strong> {item.dblPrice === 0 ? 'Gratis' : `+$${item.dblPrice}.00`}
                    </p>
                  </div>
                </label>
              </div>
            ))}
          </form>
        </div>
      </div>
    </>
  );
};

export default ExtrasModifiersToEdit;
