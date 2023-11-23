import { useState } from 'react';
import { useSummary } from '../hooks/useSummaryMenu';

interface Props {
  sendOptionCommand: Function;
  openSideTable: boolean;
  setStrAreaName: Function;
  setArea: Function;
  openSideBar: boolean;
}

const TopButtonsCommand = (props: Props) => {
  const { sendOptionCommand, openSideTable, setStrAreaName, setArea, openSideBar } = props;
  const [selectedOption, setSelectedOption] = useState<number>(1);
  const { cleanFeatures } = useSummary();

  const handleButtonClick = (area: number) => {
    setSelectedOption(area); // Actualizar la opción seleccionada al hacer clic en el botón
    sendOptionCommand(area);
    setArea();
  };

  return (
    <>
      <div
        className={`flex flex-wrap min-w-min pr-5 gap-2 w-full items-center ssm:justify-end ${
          openSideTable || openSideBar ? 'pointer-events-none' : ''
        } lg:pr-10 text-xs`}
      >
        <button
          className={`btn h-9 w-32 justify-center items-center ${
            selectedOption == 1 ? 'btn_primary bg-givvy_blue' : 'btn_secondary bg-gray-400'
          }`}
          onClick={() => {handleButtonClick(1), cleanFeatures()}}
        >
          <p className='text-sm'>Mesas</p>
        </button>
        <button
          className={`btn h-9 w-32 justify-center items-center ${
            selectedOption == 2 ? 'btn_primary bg-givvy_blue' : 'btn_secondary bg-gray-400'
          }`}
          onClick={() => {
            handleButtonClick(2), setStrAreaName(''), cleanFeatures();
          }}
        >
          <p className='text-sm'>Mostrador</p>
        </button>
        <button
          className={`btn h-9 w-32 justify-center items-center ${
            selectedOption == 3 ? 'btn_primary bg-givvy_blue' : 'btn_secondary bg-gray-400'
          }`}
          onClick={() => {
            handleButtonClick(3), setStrAreaName(''), cleanFeatures();
          }}
        >
          <p className='text-sm'>Delivery</p>
        </button>
      </div>
    </>
  );
};

export default TopButtonsCommand;
