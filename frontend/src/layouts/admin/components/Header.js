import { useState } from "react";
import icons from "../../../utils/icons";
import { Breadcrumbs, Notification } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { logout } from "../../../store/user/userSlice";
import { useNavigate } from "react-router-dom";
const { IoNotifications, RiMoneyDollarCircleFill, IoPersonOutline, CgLogOut } = icons;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowNotification, setIsShowNotification] = useState(false);
  const [isShowOption, setIsShowOption] = useState(false);
  const {userData} = useSelector(state => state.user)
  return (
    <div className="flex px-6 justify-between border-b h-[65px]">
      <p className="leading-[65px] flex">
        <Breadcrumbs/>
      </p>
      <div className="flex items-center relative">
        <IoNotifications
          className="mx-5 cursor-pointer"
          size={26}
          onClick={() => {
            setIsShowNotification(!isShowNotification);
          }}
        />
        {isShowNotification && <Notification className="bg-slate-200 text-black"/>}
        <div
              className="h-[65px] w-auto py-3 flex items-center relative"
              onClick={() => {
                setIsShowOption(!isShowOption);
              }}
            >
              <img
                src={`${process.env.REACT_APP_API_IMAGE}${userData?.avatar}`}
                alt="avatar"
                className="h-full mr-2 cursor-pointer"
              />
              <div>
                <p className="cursor-pointer font-semibold">
                  {userData?.fullname}
                </p>
                <p className="text-xs flex items-center ml-1">
                  {userData?.walletBalance}{" "}
                  <RiMoneyDollarCircleFill color="yellow" className="ml-1" />
                </p>
              </div>
              {isShowOption && (
                <div
                  className="absolute top-full right-0 py-2 flex flex-col justify-center translate-y-2 rounded-lg w-[250px] p-[10px] border bg-slate-200 text-black"
                  onClick={() => {}}
                >
                  {/* <div className="flex px-4 py-2 items-center cursor-pointer rounded-full hover:bg-main">
                    <LuSwords className="mr-2" />
                    Tu luyện
                  </div> */}
                  <div className="flex px-4 py-2 items-center cursor-pointer rounded-full hover:bg-main">
                    <IoPersonOutline className="mr-2" size={20} />
                    Trang cá nhân
                  </div>
                  <div
                    className="flex px-4 py-2 items-center cursor-pointer rounded-full hover:bg-main"
                    onClick={(event) => {
                      // dispatch(logout());
                      Swal.fire({
                        icon: "question",
                        title: "Bạn chắc chắn đăng xuất ?",
                        showCancelButton: true,
                        cancelButtonText: "Không",
                        confirmButtonText: "Đăng xuất",
                        showConfirmButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                      }).then((result) => {
                        console.log(result.isConfirmed);
                        if (result.isConfirmed) {
                          dispatch(logout());
                          navigate(0);
                        }
                      });
                    }}
                  >
                    <CgLogOut className="mr-2" size={20} />
                    Đăng xuất
                  </div>
                </div>
              )}
            </div>
      </div>
    </div>
  );
};

export default Header;
