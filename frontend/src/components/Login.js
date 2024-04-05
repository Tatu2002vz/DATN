import logo from "../assets/logo.png";
import { InputField } from "../components";
import icons from "../utils/icons";
const { IoIosCloseCircle } = icons;
const Login = ({ isShow, setIsShow, active, setActive }) => {
  const closeForm = () => {
    setIsShow(false);
  };

  return (
    <div className="fixed w-full h-full flex items-center justify-center bg-mainBg/25 z-50">
      <div className="rounded-[10px] login-popup p-5 animate-login-animation relative w-[400px]">
        <IoIosCloseCircle
          className="absolute top-[-10px] right-[-10px] text-main bg-white rounded-full border-none cursor-pointer"
          size={30}
          onClick={closeForm}
        />
        <div className="flex justify-center text-[17px] font-[600] gap-5">
          <p
            className={
              active
                ? "relative after:content-[''] after:block after:absolute after:bg-main after:w-1/2 after:h-1 after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:rounded-md cursor-pointer"
                : "cursor-pointer text-gray-300"
            }
            onClick={() => {
              setActive(true);
            }}
          >
            Đăng ký
          </p>
          <p
            className={
              !active
                ? "relative after:content-[''] after:block after:absolute after:bg-main after:w-1/2 after:h-1 after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:rounded-md cursor-pointer"
                : "cursor-pointer text-gray-300"
            }
            onClick={() => {
              setActive(false);
            }}
          >
            Đăng nhập
          </p>
        </div>
        <div className="px-[10px]">
          <div className="flex justify-center items-center">
            <img src={logo} alt="" className="w-[188px] mt-5 mb-10" />
          </div>
          {active ? (
            <div className="mb-5 w-full flex flex-col justify-center items-center">
              <p className="text-xl font-[600]">Đăng ký thành viên</p>
              <div className="w-full text-white mt-4">
                <InputField label={"Tên đăng nhập"} type={"text"} />
                <InputField label={"Mật khẩu"} type={"password"} />
                <InputField label={"Nhập lại mật khẩu"} type={"password"} />
                <InputField label={"Tên hiển thị"} type={"text"} />
              </div>
            </div>
          ) : (
            <div className="mb-5 w-full flex flex-col justify-center items-center">
              <p className="text-xl font-[600]">Đăng nhập</p>
              <div className="w-full text-white mt-4">
                <InputField label={"Tên đăng nhập hoặc Email"} type={'text'} />
                <InputField label={"Mật khẩu"} type={'password'} />
              </div>
              <div className="flex w-full justify-end"><p className="italic cursor-pointer hover:text-main hover:underline text-xs">Quên mật khẩu?</p></div>
            </div>
          )}
          <button className="bg-main rounded-md w-full py-[10px] text-center">{active ? 'Đăng ký' : 'Đăng nhập'}</button>
        </div>
      </div>
      ;
    </div>
  );
};

export default Login;
