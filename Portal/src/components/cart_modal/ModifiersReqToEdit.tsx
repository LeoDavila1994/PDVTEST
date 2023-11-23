import { useEffect, useState } from 'react';
import { ArrModifiers } from '../../utilities/types.d';
import radio from '../../assets/radio1.png';
import radioChecked from '../../assets/radio2.png';

interface OptionInfo {
  boolDefault: boolean;
  boolUnavailable: boolean;
  dblPrice: number;
  strNameOption: string;
}

interface Props {
  data: ArrModifiers;
  getModReqInfo: Function;
  optionSelected: any;
}

const ModifiersReqToEdit = (props: Props) => {
  const { data, getModReqInfo, optionSelected } = props;

  const [checked, setChecked] = useState<string>(optionSelected.strNameOption);

  const [optionEdited, setOptionEdited] = useState(optionSelected);

  const handleRadio = (option: OptionInfo) => {
    setOptionEdited((prevObj: any) => {
      const newObj = { ...prevObj, ...option };

      return newObj;
    });
    setChecked(option.strNameOption);
  };

  useEffect(() => {
    getModReqInfo(optionEdited);
  }, [optionEdited]);

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
                      src={!option.boolUnavailable && option.strNameOption === checked ? radioChecked : radio}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <input
                    className="cursor-pointer opacity-0"
                    type="radio"
                    value={option}
                    name={option.strNameOption}
                    onChange={() => handleRadio(option)}
                    checked={!option.boolUnavailable && option.strNameOption === checked}
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

export default ModifiersReqToEdit;
