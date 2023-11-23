interface Props {
  openSideTable: boolean;
  strCommandType: string;
  handleSubmit: Function;
  closeSideTable: Function;
  setstrTableNumber: Function;
  setUserValues: Function;
}

const SideBarButtons = (props: Props) => {
  const { openSideTable, strCommandType, handleSubmit, closeSideTable, setstrTableNumber, setUserValues } = props;

  return (
    <>
      <div className={`w-full px-10 flex justify-between align-center`}>
        <button
          className={`btn btn_primary w-32 justify-center ${openSideTable ? '' : 'hidden'}`}
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Abrir
        </button>
        <button
          className={`btn btn_secondary w-32 justify-center ${openSideTable ? '' : 'hidden'}`}
          onClick={() => {
            closeSideTable(),
              setstrTableNumber(''),
              setUserValues({ intPerson: 1, strDeliveryUserName: '', strCompleteAddress: '' });
          }}
        >
          <label>Cancelar</label>
        </button>
      </div>
      <div className="flex px-5">
        <button
          className={`btn btn_primary w-32 justify-center ${
            strCommandType == 'Mostrador' || strCommandType == 'Delivery' ? '' : 'hidden'
          }`}
          onClick={(e) => handleSubmit(e)}
        >
          Abrir
        </button>
      </div>
    </>
  );
};

export default SideBarButtons;
