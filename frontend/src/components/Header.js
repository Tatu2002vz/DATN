/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, memo } from "react";
import logo from "../assets/logo.png";
import bee_chibi from "../assets/bee_chibi.png";
import { Button, Login, SearchResult } from "../components/";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import icons from "../utils/icons";
import Swal from "sweetalert2";
import { getCurrent } from "../store/user/asyncAction";
import { apiGetComicWithTitle } from "../apis";
const {
  IoNotifications,
  IoPersonOutline,
  CgLogOut,
  RiMoneyDollarCircleFill,
  FiSearch,
} = icons;
const Header = () => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const [active, setActive] = useState();
  const [isShowOption, setIsShowOption] = useState(false);
  const [search, setSearch] = useState("");
  const [isShowNotification, setIsShowNotification] = useState(false);
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { isLoggingIn, userData } = useSelector((state) => state.user);

  const showForm = () => {
    setIsShow(true);
  };
  const fetchComic = async () => {
    try {
      const response = await apiGetComicWithTitle(search);
      setComics(response?.mes);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (isLoggingIn) {
      dispatch(getCurrent());
    }
  }, []);
  useEffect(() => {
    if (search !== "") {
      setIsLoading(true);
      const handler = setTimeout(() => {
        fetchComic();
      }, 500);
      return () => clearTimeout(handler);
    } else {
      setIsLoading(false);
    }
  }, [search]);
  return (
    <header className="bg-headerBg h-[70px] text-[15px] fixed left-0 right-0 top-0 z-10">
      {isShow && (
        <Login setIsShow={setIsShow} active={active} setActive={setActive} />
      )}
      <div className="max-w-screen-xl mx-auto flex items-center h-full justify-between">
        <div className="flex justify-center items-center">
          <Link to={"/"}>
            <img src={logo} alt="" className="h-[30px] w-auto" />
          </Link>
          <div className="rounded-full w-[400px] h-[44px] relative ml-5">
            <input
              type="text"
              placeholder="Bạn muốn tìm truyện gì"
              className="rounded-full w-full h-full bg-inputBg pl-5 focus:outline-none "
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              onBlur={() => {
                setSearch("");
              }}
            />
            {isLoading ? (
              <div className="text-main-text-color absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer w-6 h-6">
                <span className="loader-search"></span>
              </div>
            ) : (
              <FiSearch
                size={24}
                className="text-main-text-color absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              />
            )}
            {search !== "" && <SearchResult data={comics} />}
          </div>
        </div>

        {!isLoggingIn ? (
          <div className="flex items-center">
            <Button
              text={"Đăng ký"}
              css={"border-main"}
              onClick={() => {
                showForm();
                setActive(true);
              }}
            ></Button>
            <Button
              text={"Đăng nhập"}
              css={"bg-main border-main ml-5"}
              onClick={() => {
                showForm();
                setActive(false);
              }}
            ></Button>
          </div>
        ) : (
          <div className="flex items-center h-full">
            <div className="relative">
              <IoNotifications
                className="mr-5 cursor-pointer"
                size={26}
                onClick={() => {
                  setIsShowNotification(!isShowNotification);
                }}
              />
              {isShowNotification && (
                <div className="absolute top-full right-0 py-2 bg-chapter-border-color flex flex-col justify-center translate-y-2 rounded-lg w-[450px]">
                  <div className="border-b-[#3b4c89] border-b px-4 py-2">
                    Thông báo
                  </div>
                  <div className="h-[500px]">
                    <div className="py-[100px] flex flex-col items-center justify-center">
                      <img src={bee_chibi} alt="" className="" />
                      <div className="mt-4">Bạn không có thông báo nào</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              className="h-full w-auto py-3 flex items-center relative"
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
                  className="absolute top-full right-0 py-2 bg-chapter-border-color flex flex-col justify-center translate-y-2 rounded-lg w-[250px] p-[10px]"
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
        )}
      </div>
    </header>
  );
};

export default memo(Header);
