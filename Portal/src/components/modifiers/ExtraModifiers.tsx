import { useState } from 'react';
import { ArrModifierOptions, ArrModifiers } from '../../utilities/types.d';
import checkbox from '../../assets/checkbox1.png';
import checkboxChecked from '../../assets/checkbox2.png';

interface Props {
  data: ArrModifiers;
  getUserOptionsNoRequired: Function;
}

export interface OptionObjSelected {
  boolUnavailable: boolean;
  dblPrice: number;
  idModifier: string;
  strNameOption: string;
}

const ExtraModifiers = (props: Props) => {
  const { data, getUserOptionsNoRequired } = props;

  const [arrIsChecked, setArrIsChecked] = useState<Array<boolean>>(new Array(data.arrOptions.length).fill(false));

  const handleChange = (option: ArrModifierOptions, index: number) => {
    setArrIsChecked((prevData) => {
      const newArrIsChecked = [...prevData];
      newArrIsChecked[index] = newArrIsChecked[index] ? false : true;

      return newArrIsChecked;
    });

    getUserOptionsNoRequired(option, data._id);
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
                <label className="flex px-6 gap-3 relative">
                  <div className="absolute bottom-5 w-3 h-3">
                    <img
                      src={arrIsChecked[index] ? checkboxChecked : checkbox}
                      className={`w-full h-full object-cover ${
                        !arrIsChecked[index] &&
                        arrIsChecked.filter((item) => item).length >= Number(data.intMaxNumberOptions) &&
                        'opacity-30'
                      }`}
                    />
                  </div>
                  <input
                    className="cursor-pointer opacity-0"
                    type="checkbox"
                    value={item}
                    name={item.strNameOption}
                    disabled={
                      arrIsChecked.filter((item) => item).length >= Number(data.intMaxNumberOptions) &&
                      !arrIsChecked[index]
                    }
                    onChange={() => handleChange(item, index)}
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

export default ExtraModifiers;
