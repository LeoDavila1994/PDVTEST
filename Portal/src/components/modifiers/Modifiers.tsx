import { useEffect, useState } from 'react';
import { ArrModifiers } from '../../utilities/types.d';
import radio from '../../assets/radio1.png';
import radioChecked from '../../assets/radio2.png';

interface Props {
  data: ArrModifiers;
  getOptionsModReq: Function;
  modifierIndex: number;
}

export interface OptionObj {
  idModifier: string;
  boolUnavailable: boolean;
  dblPrice: number;
  strNameOption: string;
  boolDefault?: boolean;
}

const Modifiers = (props: Props) => {
  const { data, getOptionsModReq, modifierIndex } = props;

  const [checked, setChecked] = useState<number>(0);

  const [optionObj, setOptionObj] = useState<OptionObj>({
    ...data.arrOptions[0],
    idModifier: data._id,
  });

  const handleRadio = (option: any, index: number): void => {
    setOptionObj((prevData) => {
      const { idModifier } = prevData;

      return { idModifier, ...option };
    });

    setChecked(index);
  };

  useEffect(() => {
    getOptionsModReq(optionObj, modifierIndex);
  }, []);

  useEffect(() => {
    getOptionsModReq(optionObj, modifierIndex);
  }, [optionObj]);

  return (
    <>
      <div className="w-full h-min card">
        <div className="py-2 px-4 flex justify-between bg-givvy_blue text-white rounded-t-lg">
          <p className="font-bold">{data.strModifierName}</p>
          <p className="opacity-50 bg-gray-200 text-secondary font-bold px-2 rounded-lg text-xs">Obligatorio</p>
        </div>
        <div className="p-2">
          <form className="flex flex-col gap-4">
            {data.arrOptions?.map((option: any, index: number) => (
              <div key={option.strNameOption + index} className="text-secondary">
                <label className="flex justify-start gap-3 px-6 relative">
                  <div className="absolute bottom-5 w-3 h-3">
                    <img
                      src={!option.boolUnavailable && index === checked ? radioChecked : radio}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <input
                    className="cursor-pointer opacity-0"
                    type="radio"
                    value={option}
                    name={option.strNameOption}
                    onChange={() => handleRadio(option, index)}
                    checked={!option.boolUnavailable && index === checked}
                    disabled={option.boolUnavailable}
                  />
                  <div className="flex flex-col pt-4">
                    <p className="font-semibold">{option.strNameOption}</p>
                    <p className="text-xs opacity-50">
                      <strong>Costo extra:</strong> {option.dblPrice === 0 ? 'Gratis' : `+$${option.dblPrice}.00`}
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

export default Modifiers;
