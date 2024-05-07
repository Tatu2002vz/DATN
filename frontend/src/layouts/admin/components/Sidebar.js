import { NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png";
import path from "../../../utils/path";
import icons from "../../../utils/icons";

const { MdManageAccounts, TfiDashboard,FaBookOpen, GiSecretBook } = icons;
const Sidebar = () => {
  return (
    <div className="bg-color-float text-white font-medium h-full min-h-fs">
      <div className="h-[65px] flex justify-center items-center border-b">
        <img src={logo} alt="logo" className="w-3/4 h-auto" />
      </div>
      <div className="p-2">
        <NavLink
          to={path.DASHBOARD}
          className={"py-3 px-4 rounded-md flex"}
          style={({ isActive }) => ({
            background: isActive ? "#2a303d" : "",
          })}
        >
          <TfiDashboard className="mr-3" size={20}/>DashBoard
        </NavLink>
        <NavLink
          to={path.MANAGER_USER}
          className={"py-3 px-4 rounded-md flex"}
          style={({ isActive }) => ({
            background: isActive ? "#2a303d" : "",
          })}
        >
          <MdManageAccounts className="mr-3" size={22}/>Manage User
        </NavLink>
        <NavLink
          to={path.MANAGER_COMIC}
          className={"flex py-3 px-4 rounded-md"}
          style={({ isActive }) => ({
            background: isActive ? "#2a303d" : "",
          })}
        >
          <GiSecretBook size={22} className="mr-3"/>Manage Comic
        </NavLink>

        <NavLink
          to={path.MANAGER_CHAPTER}
          className={"flex py-3 px-4 rounded-md"}
          style={({ isActive }) => ({
            background: isActive ? "#2a303d" : "",
          })}
        >
          <FaBookOpen size={22} className="mr-3"/>Manage Chapter
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
