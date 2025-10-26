
const DashboardHeader = ({title, subtitle}) => {
  return (
    <div className="justify-center flex-col gap-1 flex">
      <h2 className="text-2xl text-blue-600 font-medium">{title}</h2>
      <p className="text-base text-gray-400 ">
        {subtitle}
      </p>
    </div>
  );
};

export default DashboardHeader;
