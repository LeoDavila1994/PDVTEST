const TopbarCommand = () => {
  return (
    <div className="w-full flex justify-between flex-wrap gap-4">
      <div>
        <h1 className="text-2xl font-medium">PUNTO DE VENTA</h1>
        <p className="opacity-80">Application → Point Of Sale</p>
      </div>
      <div className=" w-full lg:w-2/3 h-full flex flex-wrap gap-2 justify-between lg:justify-end items-start">
        <div className="w-full lg:w-auto relative">
          <i className="las la-search absolute right-4 top-1/2 -translate-y-1/2"></i>
          <input
            type="text"
            placeholder="Buscar"
            className="w-full px-4 py-2 rounded-full border focus:outline-none focus:shadow-none focus:border-givvy_blue"
          />
        </div>
        <div className="w-full lg:w-auto flex justify-center gap-1 ssm:gap-4 lg:gap-2 md:justify-end">
          <button className="btn btn_outlined flex gap-3">
            ORDENAR POR <i className="las la-sort-down"></i>
          </button>
          <button className="btn btn_primary">AGREGAR NUEVO</button>
        </div>
      </div>
    </div>
  );
};

export default TopbarCommand;
