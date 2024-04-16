import logo from "../assets/logo.png";
import { InputField } from "../components";
import icons from "../utils/icons";
import { apiLogin, apiRegister, apiForgotPassword } from "../apis";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { login } from "../store/user/userSlice";
import validate from "../utils/validate";
const { useState, useEffect } = require("react");
const { IoIosCloseCircle } = icons;
const Login = ({ setIsShow, active, setActive }) => {
  const dispatch = useDispatch();
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [invalidField, setInvalidField] = useState([]);
  const closeForm = () => {
    setIsShow(false);
  };
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    fullname: "",
  });
  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      fullname: "",
    });
  };
  useEffect(() => {
    resetPayload()
    setInvalidField([])
  }, [active, isForgotPassword, ])
  const handleSubmit = async (payload) => {
    const invalid = validate(payload, setInvalidField);
    if (invalid === 0) {
      if (!active && !isForgotPassword) {
        const res = await apiLogin(payload);
        if (res?.success) {
          await dispatch(
            login({
              isLoggingIn: true,
              userData: res?.userData,
              token: res?.accessToken,
            })
          );
          setIsShow(false);
        } else {
          Swal.fire(
            "Thất bại!",
            "Vui lòng kiểm tra lại tài khoản và mật khẩu!",
            "error"
          );
        }
        // navigate(0)
      }
      if (active && !isForgotPassword) {
        const res = await apiRegister(payload);

        console.log(res?.data);
        if (res?.success) {
          Swal.fire({
            title: "Thành công!",
            icon: "success",
            position: "center",
            timer: 1500,
            text: "Đăng ký thành công! Vui lòng đăng nhập lại!",
          }).then(() => {
            setIsShow(false);
          });
        } else {
          Swal.fire("Thất bại!", res?.mes, "error");
        }
      }
      if (isForgotPassword) {
        const { email } = payload;
        console.log(email);
        const res = await apiForgotPassword(payload);
        console.log(res?.data);
        if (res?.success) {
          Swal.fire({
            title: "Thành công!",
            text: "Vui lòng kiểm tra email để lấy lại mật khẩu!",
            timer: 1500,
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Thất bại!",
            text: "Email này chưa được đăng ký!",
            timer: 1500,
            icon: "error",
          });
        }
      }
    }
  };
  return (
    <div className="fixed w-full h-full flex items-center justify-center bg-mainBg/25 z-50 duration-300">
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
              setIsForgotPassword(false);
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
              setIsForgotPassword(false);
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
                <InputField
                  label={"Email đăng kí"}
                  placeholder="example@example.com"
                  payload={payload}
                  setPayload={setPayload}
                  namekey="email"
                  value={payload.email}
                  invalidField={invalidField}
                  setInvalidField={setInvalidField}
                />
                <InputField
                  label={"Mật khẩu"}
                  type={"password"}
                  payload={payload}
                  setPayload={setPayload}
                  namekey="password"
                  value={payload.password}
                  invalidField={invalidField}
                  setInvalidField={setInvalidField}
                />
                {/* <InputField label={"Nhập lại mật khẩu"} type={"password"} payload={payload} setPayload={setPayload}/> */}
                <InputField
                  label={"Tên hiển thị"}
                  payload={payload}
                  setPayload={setPayload}
                  namekey="fullname"
                  value={payload.fullname}
                  invalidField={invalidField}
                  setInvalidField={setInvalidField}
                />
              </div>
            </div>
          ) : (
            <div className="mb-5 w-full flex flex-col justify-center items-center">
              <p className="text-xl font-[600]">Đăng nhập</p>
              <div className="w-full text-white mt-4">
                <InputField
                  label={"Tên đăng nhập hoặc Email"}
                  placeholder="example@example.com"
                  payload={payload}
                  setPayload={setPayload}
                  namekey="email"
                  value={payload.email}
                  invalidField={invalidField}
                  setInvalidField={setInvalidField}
                />
                {!isForgotPassword && (
                  <InputField
                    label={"Mật khẩu"}
                    type={"password"}
                    payload={payload}
                    setPayload={setPayload}
                    namekey={"password"}
                    value={payload.password}
                    invalidField={invalidField}
                    setInvalidField={setInvalidField}
                  />
                )}
              </div>
              <div className="flex w-full justify-end">
                <p
                  className="italic cursor-pointer hover:text-main hover:underline text-xs"
                  onClick={() => {
                    setIsForgotPassword(!isForgotPassword);
                  }}
                >
                  {isForgotPassword ? "Quay lại đăng nhập!" : "Quên mật khẩu?"}
                </p>
              </div>
            </div>
          )}
          <button
            className="bg-main rounded-md w-full py-[10px] text-center outline-none"
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              handleSubmit(payload);
            }}
          >
            {!isForgotPassword
              ? active
                ? "Đăng ký"
                : "Đăng nhập"
              : "Lấy lại mật khẩu"}
          </button>
        </div>
      </div>
      ;
    </div>
  );
};

export default Login;
