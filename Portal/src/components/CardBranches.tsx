const CardBranches = (props: any) => {
  const { branchInfo } = props;

  return (
    <>
      <div className="card w-60 ssm:w-full lg:w-60 overflow-hidden hover:scale-105 hover:cursor-pointer duration-200 flex flex-col gap-2 ssm:grid lg:flex ssm:grid-cols-12">
        <div className="w-full h-44 col-span-3">
          <img src={branchInfo.strCompanyImage} alt="Branches-img" className=" object-cover w-full h-full" />
        </div>
        <hr />
        <div className="p-2 ssm:p-4 lg:p-2 col-span-6 flex flex-col sm:gap-3 lg:gap-0">
          <h4 className="font-semibold leading-7">{branchInfo.strBranchName}</h4>
          <p className="ssm:text-left lg:text-left opacity-80">{branchInfo.strCompanyName}</p>
        </div>
      </div>
    </>
  );
};

export default CardBranches;
