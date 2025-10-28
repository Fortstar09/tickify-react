import DashboardHeader from "../../components/DashboardHead";
import DashboardLayout from "../../layouts/DashboardLayout";
import { UserContext } from "../../context/UserContext";
import { useContext, useState } from "react";

const Settings = () => {
  const { user, logout } = useContext(UserContext);
  const [message, setMessage] = useState("");

  const LogoutUser = () => {
    logout();
    setMessage("Logout successful!");
  };

  return (
    <DashboardLayout>
      <div>
        {/* welcome  */}
        <DashboardHeader
          title="Settings"
          subtitle="Manage account and application preference"
        />
        <div>
          <div className="flex flex-col mt-10 gap-3 md:gap-5">
            <h3 className="uppercase text-blue-500  text-sm font-normal">
              Profile
            </h3>

            <EachSettingList
              heading=" E-Mail Address"
              subheading={user?.email}
            />
            <EachSettingList
              heading="Username"
              subheading={
                user?.fullname ? user.fullname : user?.name.split(" ")[0]
              }
            />
            <EachSettingList
              heading="Log Out"
              subheading={`You are signed in as ${user?.email}`}
              actionComponent={
                <button
                  href="/ticket"
                  onClick={LogoutUser}
                  className="text-sm bg-red-600 text-white py-2 px-3 font-normal rounded-md cursor-pointer hover:bg-red-500"
                >
                  Log out
                </button>
              }
            />
          </div>
        </div>
      </div>
        {message && <Toast message={message} onClose={() => setMessage("")} />}
    </DashboardLayout>
  );
};

export default Settings;

const EachSettingList = ({
  heading,
  subheading,
  actionComponent,
  isDanger,
}) => {
  return (
    <div className="flex justify-between items-start md:item-center flex-col gap-3 md:flex-row">
      <div className="flex flex-col gap-0.5">
        <h2
          className={`${
            isDanger ? "text-[#DF1C41]" : "text-gray-400"
          } font-normal text-base md:text-[17px]`}
        >
          {heading}
        </h2>
        <p className="text-gray-700 font-normal text-sm md:text-base max-w-[200px] md:max-w-full">
          {subheading}
        </p>
      </div>
      {actionComponent}
    </div>
  );
};


