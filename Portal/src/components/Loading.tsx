const Loading = () => {

  return (
    <>
      <div className="container flex items-center justify-center py-10">
        <div className="w-full md:w-1/2 xl:w-1/3">
          <div className="text-center">
            <h2 className="uppercase">
              Loading
              <span className="animate-spin la la-circle-notch ml-1"></span>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
